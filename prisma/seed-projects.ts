import 'dotenv/config'
import { PrismaClient, ProjectStatus, MediaType, DocumentType } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'

// Configure ffmpeg
if (ffmpegStatic) {
    ffmpeg.setFfmpegPath(ffmpegStatic)
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const CLOUDINARY_FOLDERS = {
    PROJECTS: "airc-portal/projects",
    PROJECT_MEDIA: "airc-portal/projects/media",
    PROJECT_DOCUMENTS: "airc-portal/projects/documents",
}

const TEMP_COMPRESSED_DIR = path.join(process.cwd(), 'public', 'temp-compressed')

// Ensure temp directory exists
if (!fs.existsSync(TEMP_COMPRESSED_DIR)) {
    fs.mkdirSync(TEMP_COMPRESSED_DIR, { recursive: true })
}

async function compressVideo(inputPath: string): Promise<string> {
    const stats = fs.statSync(inputPath)
    const sizeInMB = stats.size / (1024 * 1024)

    // Only compress if over 95MB
    if (sizeInMB <= 95) return inputPath

    const fileName = path.basename(inputPath)
    const outputPath = path.join(TEMP_COMPRESSED_DIR, `compressed_${fileName}`)

    console.log(`🎬 Compressing large video (${sizeInMB.toFixed(1)}MB): ${fileName}...`)

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                '-vcodec libx264',
                '-crf 28',
                '-preset fast',
                '-maxrate 1M',
                '-bufsize 2M',
                '-movflags +faststart'
            ])
            .on('end', () => {
                const outStats = fs.statSync(outputPath)
                console.log(`✅ Compression complete: ${(outStats.size / (1024 * 1024)).toFixed(1)}MB`)
                resolve(outputPath)
            })
            .on('error', (err) => {
                console.error(`❌ Compression failed: ${err.message}`)
                reject(err)
            })
            .save(outputPath)
    })
}

async function uploadToCloudinary(localPath: string, folder: string, resourceType: "image" | "video" | "raw" = "auto" as any) {
    if (!localPath || localPath.startsWith('http')) return localPath

    const absolutePath = path.join(process.cwd(), 'public', localPath)

    if (!fs.existsSync(absolutePath)) {
        console.warn(`⚠️  File not found at: ${absolutePath}`)
        return localPath
    }

    let fileToUpload = absolutePath
    let isTemp = false

    try {
        if (resourceType === "video") {
            fileToUpload = await compressVideo(absolutePath)
            isTemp = fileToUpload !== absolutePath
        }

        console.log(`📤 Uploading ${localPath} to Cloudinary...`)

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(fileToUpload, {
                folder,
                resource_type: resourceType,
                chunk_size: 6000000,
            }, (error, result) => {
                if (error) reject(error)
                else resolve(result)
            })
        }) as any

        if (isTemp && fs.existsSync(fileToUpload)) {
            fs.unlinkSync(fileToUpload)
        }

        return result.secure_url
    } catch (error) {
        console.error(`❌ Failed to upload ${localPath}:`, error)
        if (isTemp && fs.existsSync(fileToUpload)) {
            fs.unlinkSync(fileToUpload)
        }
        return localPath
    }
}

async function main() {
    console.log("🌱 Scanning database for local paths and uploading to Cloudinary...")

    // 1. Projects (Main Image)
    const projects = await prisma.project.findMany({
        where: { image: { startsWith: '/' } }
    })
    console.log(`🔎 Found ${projects.length} projects with local main images.`)
    for (const project of projects) {
        const url = await uploadToCloudinary(project.image, CLOUDINARY_FOLDERS.PROJECTS, "image")
        if (url.startsWith('http')) {
            await prisma.project.update({ where: { id: project.id }, data: { image: url } })
            console.log(`✅ Updated project image: ${project.name}`)
        }
    }

    // 2. MediaItems
    const mediaItems = await prisma.mediaItem.findMany({
        where: { url: { startsWith: '/' } }
    })
    console.log(`🔎 Found ${mediaItems.length} media items with local paths.`)
    for (const item of mediaItems) {
        const resourceType = item.type.toLowerCase() === 'video' ? 'video' : 'image'
        const url = await uploadToCloudinary(item.url, CLOUDINARY_FOLDERS.PROJECT_MEDIA, resourceType)

        let thumbnail = item.thumbnail
        if (resourceType === 'video' && thumbnail && thumbnail.startsWith('/')) {
            thumbnail = await uploadToCloudinary(thumbnail, CLOUDINARY_FOLDERS.PROJECT_MEDIA, "image")
        }

        if (url.startsWith('http')) {
            await prisma.mediaItem.update({
                where: { id: item.id },
                data: { url, thumbnail }
            })
            console.log(`✅ Updated media item: ${item.id} (${resourceType})`)
        }
    }

    // 3. Documents
    const documents = await prisma.document.findMany({
        where: { url: { startsWith: '/' } }
    })
    console.log(`🔎 Found ${documents.length} documents with local paths.`)
    for (const doc of documents) {
        const url = await uploadToCloudinary(doc.url, CLOUDINARY_FOLDERS.PROJECT_DOCUMENTS, "raw")
        if (url.startsWith('http')) {
            await prisma.document.update({ where: { id: doc.id }, data: { url } })
            console.log(`✅ Updated document: ${doc.title}`)
        }
    }

    console.log("\n🎉 Database cleanup and Cloudinary migration completed!")
}

main()
    .catch((e) => {
        console.error("❌ Cleanup failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

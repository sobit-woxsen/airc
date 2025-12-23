import { NextRequest, NextResponse } from "next/server"
import { cloudinary } from "@/lib/cloudinary"
import { getCurrentUser } from "@/lib/auth-helpers"
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { PDFDocument } from 'pdf-lib'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

// Configure ffmpeg
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic)
}

// Temporary directory for processing
const TEMP_DIR = path.join(process.cwd(), 'public', 'temp-uploads')
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true })
}

async function compressVideo(
  inputPath: string,
  onProgress: (percent: number) => void
): Promise<string> {
  const stats = fs.statSync(inputPath)
  const sizeInMB = stats.size / (1024 * 1024)

  const outputPath = path.join(TEMP_DIR, `compressed_${crypto.randomUUID()}.mp4`)

  console.log(`🎬 Compressing uploaded video (${sizeInMB.toFixed(1)}MB)...`)

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath)
      .outputOptions([
        '-vcodec libx264',
        '-crf 28',
        '-preset fast',
        '-movflags +faststart'
      ])

    if (sizeInMB > 100) {
      command = command.outputOptions(['-maxrate 1M', '-bufsize 2M'])
    } else {
      command = command.outputOptions(['-maxrate 2M', '-bufsize 4M'])
    }

    command
      .on('progress', (progress) => {
        if (progress.percent) {
          onProgress(Math.round(progress.percent))
        }
      })
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

async function compressPdf(
  inputPath: string,
  onProgress: (message: string) => void
): Promise<string> {
  const stats = fs.statSync(inputPath)
  const sizeInMB = stats.size / (1024 * 1024)

  const outputPath = path.join(TEMP_DIR, `compressed_${crypto.randomUUID()}.pdf`)

  console.log(`📄 Compressing uploaded PDF (${sizeInMB.toFixed(1)}MB)...`)
  onProgress(`Compressing PDF (${sizeInMB.toFixed(1)}MB)...`)

  try {
    // Load the PDF
    const existingPdfBytes = fs.readFileSync(inputPath)
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    onProgress('Optimizing PDF structure...')

    // Save with compression
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true, // Compress objects
      addDefaultPage: false,
      objectsPerTick: 50,
    })

    // Write to output file
    fs.writeFileSync(outputPath, compressedPdfBytes)

    const outStats = fs.statSync(outputPath)
    const outSizeInMB = outStats.size / (1024 * 1024)
    const reduction = ((1 - outStats.size / stats.size) * 100).toFixed(1)

    console.log(`✅ PDF compressed: ${sizeInMB.toFixed(1)}MB → ${outSizeInMB.toFixed(1)}MB (${reduction}% reduction)`)
    onProgress(`Compressed to ${outSizeInMB.toFixed(1)}MB`)

    return outputPath
  } catch (error: unknown) {
    console.error(`❌ PDF compression failed: ${"Upload failed"}`)
    throw error
  }
}

type UploadEvent =
  | { error: string }
  | { status: "uploading" | "compressing" | "processing" | "finalizing" | "done"; message: string; percent?: number }
  | { status: "uploading" | "compressing" | "processing" | "finalizing"; message: string }
  | { status: "done"; result: unknown }

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()
  const customStream = new TransformStream()
  const writer = customStream.writable.getWriter()

  const sendEvent = async (data: UploadEvent) => {
    try {
      await writer.write(encoder.encode(JSON.stringify(data) + '\n'))
    } catch (e) {
      console.error("Stream write error:", e)
    }
  }

  // Define the upload process worker
  const processUpload = async () => {
    const tempFiles: string[] = []
    try {
      const user = await getCurrentUser()
      if (!user) {
        await sendEvent({ error: "Unauthorized" })
        return
      }

      const formData = await request.formData()
      const file = formData.get("file") as File
      const folder = formData.get("folder") as string || "airc-portal"
      const resourceType = formData.get("resourceType") as string || "auto"

      if (!file) {
        await sendEvent({ error: "No file provided" })
        return
      }

      await sendEvent({ status: "uploading", message: "Receiving file..." })

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const originalTempPath = path.join(TEMP_DIR, `${crypto.randomUUID()}_${file.name}`)
      fs.writeFileSync(originalTempPath, buffer)
      tempFiles.push(originalTempPath)

      let fileToUpload = originalTempPath

      // Compress video files
      if (resourceType === "video" || file.type.startsWith('video/')) {
        await sendEvent({ status: "compressing", message: "Compressing video...", percent: 0 })

        try {
          fileToUpload = await compressVideo(originalTempPath, (percent) => {
            sendEvent({ status: "compressing", message: "Compressing video...", percent })
          })
          tempFiles.push(fileToUpload)
        } catch (err) {
          await sendEvent({ status: "processing", message: "Compression failed, using original..." })
        }
      }

      // Compress PDF files
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        await sendEvent({ status: "compressing", message: "Compressing PDF..." })

        try {
          fileToUpload = await compressPdf(originalTempPath, (message) => {
            sendEvent({ status: "compressing", message })
          })
          tempFiles.push(fileToUpload)
        } catch (err) {
          console.error("PDF compression error:", err)
          await sendEvent({ status: "processing", message: "Compression failed, using original..." })
        }
      }

      await sendEvent({ status: "finalizing", message: "Uploading to Cloudinary..." })

      let actualResourceType: "image" | "auto" | "video" | "raw" = resourceType === 'video' ? 'video' : 'auto'

      // Override for PDF files to ensure public access (Cloudinary "raw" restriction workaround)
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        actualResourceType = "image"
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          fileToUpload,
          { folder, resource_type: actualResourceType },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
      })

      await sendEvent({ status: "done", result })
    } catch (error: unknown) {
      console.error("Upload error:", error)
      await sendEvent({ error: "Upload failed" || "Upload failed" })
    } finally {
      // Cleanup
      for (const f of tempFiles) {
        if (fs.existsSync(f)) {
          try {
            fs.unlinkSync(f)
          } catch (e) { }
        }
      }
      try {
        await writer.close()
      } catch (e) { }
    }
  }

  // Run in background but don't await
  processUpload()

  return new Response(customStream.readable, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

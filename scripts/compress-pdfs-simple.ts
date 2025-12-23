/**
 * Compress PDFs using compress-pdf npm package
 *
 * Install: npm install compress-pdf --legacy-peer-deps
 * Run: npx tsx scripts/compress-pdfs-simple.ts
 */

import { prisma } from "../lib/prisma"
import { cloudinary } from "../lib/cloudinary"
import { newslettersData } from "../lib/newsletters-data"
import path from "path"
import fs from "fs"

const compressPdf = require('compress-pdf')

const PDF_DIR = path.join(process.cwd(), "public", "newsletter")
const TEMP_DIR = path.join(process.cwd(), "public", "temp-pdfs")

// Create temp directory
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true })
}

const FAILED_ISSUES = [13, 10, 4]

async function compressPdfFile(inputPath: string, outputPath: string): Promise<void> {
  const stats = fs.statSync(inputPath)
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)

  console.log(`  📄 Compressing PDF (${sizeInMB}MB)...`)

  try {
    await compressPdf(inputPath, outputPath, {
      compressionLevel: 'ebook', // 'screen' | 'ebook' | 'printer' | 'prepress'
      compatibilityLevel: '1.4'
    })

    const outStats = fs.statSync(outputPath)
    const outSizeInMB = (outStats.size / (1024 * 1024)).toFixed(2)
    const reduction = ((1 - outStats.size / stats.size) * 100).toFixed(1)

    console.log(`  ✓ Compressed: ${sizeInMB}MB → ${outSizeInMB}MB (${reduction}% reduction)`)

    // If still too large, try aggressive compression
    if (outStats.size > 10 * 1024 * 1024) {
      console.log(`  ⚠ Still >10MB, trying aggressive compression...`)
      await compressPdf(inputPath, outputPath, {
        compressionLevel: 'screen',
        compatibilityLevel: '1.4'
      })

      const finalStats = fs.statSync(outputPath)
      const finalSizeInMB = (finalStats.size / (1024 * 1024)).toFixed(2)
      console.log(`  ✓ Aggressive: ${finalSizeInMB}MB`)
    }
  } catch (error: unknown) {
    throw new Error(`PDF compression failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function uploadToCloudinary(pdfPath: string, issue: number): Promise<string> {
  console.log(`  📤 Uploading to Cloudinary...`)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_large(
      pdfPath,
      {
        folder: "airc-portal/newsletters/pdfs",
        resource_type: "image",
        public_id: `newsletter-issue-${issue}`,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
  })

  console.log(`  ✓ Uploaded: ${result.secure_url}`)
  return result.secure_url
}

async function main() {
  console.log("🔧 PDF Compression & Migration")
  console.log("=".repeat(50))

  let successCount = 0
  let errorCount = 0

  for (const issueNumber of FAILED_ISSUES) {
    const newsletter = newslettersData.find((n) => n.issue === issueNumber)

    if (!newsletter) {
      console.log(`\n❌ Issue ${issueNumber}: Not found`)
      errorCount++
      continue
    }

    console.log(`\nProcessing Issue ${issueNumber}: ${newsletter.title}`)

    try {
      // Check if already exists
      const existing = await prisma.newsletter.findUnique({
        where: { issue: issueNumber },
      })

      if (existing) {
        console.log(`  ⚠ Already exists in database`)
        continue
      }

      // Get PDF file path
      const pdfFileName = newsletter.pdfUrl.split("/").pop()!
      const inputPath = path.join(PDF_DIR, pdfFileName)
      const outputPath = path.join(TEMP_DIR, `compressed_${pdfFileName}`)

      if (!fs.existsSync(inputPath)) {
        throw new Error(`PDF not found: ${inputPath}`)
      }

      // Compress
      await compressPdfFile(inputPath, outputPath)

      // Upload
      const cloudinaryUrl = await uploadToCloudinary(outputPath, issueNumber)

      // Save to database
      await prisma.newsletter.create({
        data: {
          title: newsletter.title,
          description: newsletter.description,
          date: newsletter.date,
          issue: newsletter.issue,
          pdfUrl: cloudinaryUrl,
          coverImage: cloudinaryUrl,
          topics: newsletter.topics,
          featured: newsletter.featured || false,
          published: true,
          publishedAt: new Date(),
        },
      })

      console.log(`  ✓ Saved to database`)
      successCount++

      // Cleanup
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
      }
    } catch (error: unknown) {
      console.error(`  ✗ Error: ${error instanceof Error ? error.message : String(error)}`)
      errorCount++
    }
  }

  // Cleanup temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true })
  }

  console.log("\n" + "=".repeat(50))
  console.log(`✓ Successful: ${successCount}`)
  console.log(`✗ Errors: ${errorCount}`)
  console.log("=".repeat(50))
}

main()
  .then(() => {
    console.log("\n🎉 Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Failed:", error)
    process.exit(1)
  })

/**
 * Compress large PDF files using Ghostscript and upload to Cloudinary
 *
 * This script compresses PDFs that failed due to size limits during initial migration
 *
 * Usage:
 * 1. Install Ghostscript: https://ghostscript.com/releases/gsdnld.html
 * 2. Run: npx tsx scripts/compress-and-migrate-pdfs.ts
 */

import { prisma } from "../lib/prisma"
import { cloudinary } from "../lib/cloudinary"
import { newslettersData } from "../lib/newsletters-data"
import path from "path"
import fs from "fs"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const PDF_DIR = path.join(process.cwd(), "public", "newsletter")
const TEMP_DIR = path.join(process.cwd(), "public", "temp-pdfs")

// Create temp directory
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true })
}

// Failed issues from previous migration
const FAILED_ISSUES = [13, 10, 4] // June 2025, March 2025, Sept 2024

async function compressPdfWithGhostscript(
  inputPath: string,
  outputPath: string
): Promise<void> {
  const stats = fs.statSync(inputPath)
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)

  console.log(`  📄 Compressing PDF (${sizeInMB}MB)...`)

  // Ghostscript command for PDF compression
  // -dPDFSETTINGS=/ebook gives good balance between quality and size
  // Other options: /screen (lowest quality), /printer (higher quality), /prepress (highest quality)
  const gsCommand = process.platform === 'win32'
    ? `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`
    : `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`

  try {
    await execAsync(gsCommand)

    const outStats = fs.statSync(outputPath)
    const outSizeInMB = (outStats.size / (1024 * 1024)).toFixed(2)
    const reduction = ((1 - outStats.size / stats.size) * 100).toFixed(1)

    console.log(`  ✓ Compressed: ${sizeInMB}MB → ${outSizeInMB}MB (${reduction}% reduction)`)

    // Check if still too large
    if (outStats.size > 10 * 1024 * 1024) {
      console.log(`  ⚠ Still larger than 10MB, trying aggressive compression...`)

      // Try more aggressive compression
      const gsCommandAggressive = process.platform === 'win32'
        ? `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`
        : `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`

      await execAsync(gsCommandAggressive)

      const finalStats = fs.statSync(outputPath)
      const finalSizeInMB = (finalStats.size / (1024 * 1024)).toFixed(2)
      console.log(`  ✓ Aggressive compression: ${finalSizeInMB}MB`)
    }
  } catch (error: unknown) {
    throw new Error(`Ghostscript compression failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function uploadPdfToCloudinary(
  pdfPath: string,
  issue: number
): Promise<string> {
  console.log(`  📤 Uploading to Cloudinary...`)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_large(
      pdfPath,
      {
        folder: "airc-portal/newsletters/pdfs",
        resource_type: "image", // Workaround for PDF public access
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

async function processFailedNewsletters() {
  console.log("🔧 PDF Compression & Migration Script")
  console.log("=" .repeat(50))
  console.log("\nProcessing failed newsletters with PDF compression...\n")

  let successCount = 0
  let errorCount = 0

  for (const issueNumber of FAILED_ISSUES) {
    const newsletter = newslettersData.find((n) => n.issue === issueNumber)

    if (!newsletter) {
      console.log(`\n❌ Issue ${issueNumber}: Newsletter data not found`)
      errorCount++
      continue
    }

    console.log(`\nProcessing Issue ${issueNumber}: ${newsletter.title}`)

    try {
      // Check if already exists in database
      const existing = await prisma.newsletter.findUnique({
        where: { issue: issueNumber },
      })

      if (existing) {
        console.log(`  ⚠ Skipped: Already exists in database`)
        continue
      }

      // Find PDF file
      const pdfFileName = newsletter.pdfUrl.split("/").pop()
      if (!pdfFileName) {
        throw new Error("Could not extract PDF filename")
      }

      const inputPath = path.join(PDF_DIR, pdfFileName)

      if (!fs.existsSync(inputPath)) {
        throw new Error(`PDF file not found: ${inputPath}`)
      }

      // Compress PDF
      const outputPath = path.join(TEMP_DIR, `compressed_${pdfFileName}`)
      await compressPdfWithGhostscript(inputPath, outputPath)

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadPdfToCloudinary(outputPath, issueNumber)

      // Create database record
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

      console.log(`  ✓ Created database record`)
      successCount++

      // Cleanup compressed file
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
  console.log("Summary:")
  console.log(`  ✓ Successful: ${successCount}`)
  console.log(`  ✗ Errors: ${errorCount}`)
  console.log("=".repeat(50))

  if (successCount + errorCount === FAILED_ISSUES.length) {
    console.log("\n✅ All failed newsletters processed!")
  }
}

// Check if Ghostscript is installed
async function checkGhostscript() {
  try {
    const command = process.platform === 'win32' ? 'gswin64c -version' : 'gs -version'
    await execAsync(command)
    console.log("✓ Ghostscript is installed\n")
    return true
  } catch (error) {
    console.error("\n❌ Ghostscript is not installed!")
    console.error("\nPlease install Ghostscript:")
    console.error("- Windows: Download from https://ghostscript.com/releases/gsdnld.html")
    console.error("- Mac: brew install ghostscript")
    console.error("- Linux: sudo apt-get install ghostscript\n")
    return false
  }
}

// Run the script
checkGhostscript()
  .then((installed) => {
    if (!installed) {
      process.exit(1)
    }
    return processFailedNewsletters()
  })
  .then(() => {
    console.log("\n🎉 Script complete!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Script failed:", error)
    process.exit(1)
  })

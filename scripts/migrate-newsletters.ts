/**
 * Migration script to upload existing newsletters from /public/newsletter/ to Cloudinary
 * and create database records.
 *
 * Usage:
 * 1. Ensure all PDF files are in /public/newsletter/
 * 2. Run: npx tsx scripts/migrate-newsletters.ts
 * 3. Verify in admin panel: http://localhost:3000/admin/newsletters
 */

import { prisma } from "../lib/prisma"
import { cloudinary } from "../lib/cloudinary"
import { newslettersData } from "../lib/newsletters-data"
import path from "path"
import fs from "fs"

const PDF_DIR = path.join(process.cwd(), "public", "newsletter")

async function uploadPdfToCloudinary(
  pdfPath: string,
  issue: number
): Promise<string> {
  console.log(`  Uploading ${path.basename(pdfPath)} to Cloudinary...`)

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

async function migrateNewsletters() {
  console.log("Starting newsletter migration...")
  console.log(`Found ${newslettersData.length} newsletters to migrate\n`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const newsletter of newslettersData) {
    console.log(`\nProcessing Issue ${newsletter.issue}: ${newsletter.title}`)

    try {
      // Check if already exists
      const existing = await prisma.newsletter.findUnique({
        where: { issue: newsletter.issue },
      })

      if (existing) {
        console.log(
          `  ⚠ Skipped: Issue ${newsletter.issue} already exists in database`
        )
        skipCount++
        continue
      }

      // Find PDF file
      const pdfFileName = newsletter.pdfUrl.split("/").pop()
      if (!pdfFileName) {
        throw new Error("Could not extract PDF filename")
      }

      const pdfPath = path.join(PDF_DIR, pdfFileName)

      if (!fs.existsSync(pdfPath)) {
        throw new Error(`PDF file not found: ${pdfPath}`)
      }

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadPdfToCloudinary(pdfPath, newsletter.issue)

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

      console.log(`  ✓ Created database record for Issue ${newsletter.issue}`)
      successCount++
    } catch (error: unknown) {
      console.error(`  ✗ Error: ${error instanceof Error ? error.message : String(error)}`)
      errorCount++
    }
  }

  console.log("\n" + "=".repeat(50))
  console.log("Migration Summary:")
  console.log(`  Successful: ${successCount}`)
  console.log(`  Skipped: ${skipCount}`)
  console.log(`  Errors: ${errorCount}`)
  console.log("=".repeat(50))
}

// Run migration
migrateNewsletters()
  .then(() => {
    console.log("\nMigration complete!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\nMigration failed:", error)
    process.exit(1)
  })

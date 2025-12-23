import 'dotenv/config'
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("🛠️  Normalizing Project Document URLs...")

    // Fetch all projects that have documents but no docUrl, or just sync all
    const projects = await prisma.project.findMany({
        include: {
            documents: {
                orderBy: { order: 'asc' },
                take: 1
            }
        }
    })

    console.log(`🔎 Found ${projects.length} projects to check.`)

    let updatedCount = 0

    for (const project of projects) {
        const primaryDoc = project.documents[0]

        if (primaryDoc && primaryDoc.url !== project.docUrl) {
            await prisma.project.update({
                where: { id: project.id },
                data: { docUrl: primaryDoc.url }
            })
            console.log(`✅ Updated docUrl for: ${project.name}`)
            updatedCount++
        }
    }

    console.log(`\n🎉 Normalization complete! ${updatedCount} projects updated.`)
}

main()
    .catch((e) => {
        console.error("❌ Normalization failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

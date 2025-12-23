import 'dotenv/config'
import { PrismaClient, Role } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Template users - Replace with actual user details
const userTemplates = [
  // AI & ML Department
  {
    email: "pankajkumar.singh@woxsen.edu.in",
    name: "Pankaj Kumar Singh",
    designation: "Senior AI Engineer",
    departmentId: "ai-ml",
    roles: [Role.ENGINEER, Role.ADMIN],
  },
  {
    email: "madhav.janumula@woxsen.edu.in",
    name: "Janumula Madhav",
    designation: "Junior Robotics Engineer",
    departmentId: "ai-ml",
    roles: [Role.ENGINEER],
  },

  // Blockchain Department
  {
    email: "samir.jumade@woxsen.edu.in",
    name: "Samir Anil Jumade",
    designation: "Senior Blockchain Engineer",
    departmentId: "blockchain",
    roles: [Role.ENGINEER],
  },
  {
    email: "shivam.yadav@woxsen.edu.in",
    name: "Shivam Yadav",
    designation: "Blockchain Developer",
    departmentId: "blockchain",
    roles: [Role.ENGINEER],
  },



  // Robotics Department
  {
    email: "vishal.sharma@woxsen.edu.in",
    name: "Vishal Kumar Sharma",
    designation: "Senior Project Engineer",
    departmentId: "robotics",
    roles: [Role.ENGINEER, Role.ADMIN],
  },
  {
    email: "sheikshoaib.akhtar@woxsen.edu.in",
    name: "Sheik Shoaib Akhtar",
    designation: "Robotic Engineer",
    departmentId: "robotics",
    roles: [Role.ENGINEER],
  },

  // AR/VR Department
  {
    email: "yash.dushettiwar@woxsen.edu.in",
    name: "Yash Dushettiwar",
    designation: "Metaverse Engineer",
    departmentId: "metaverse",
    roles: [Role.ENGINEER],
  },
  {
    email: "manikandaraj.ravichandran@woxsen.edu.in",
    name: "Manikandaraj Ravichandran",
    designation: "3D Artist",
    departmentId: "metaverse",
    roles: [Role.ENGINEER],
  },
]

async function main() {
  console.log("🌱 Starting user seeding...")

  // Check if departments exist
  const departments = await prisma.department.findMany()
  console.log(`📁 Found ${departments.length} departments`)

  let created = 0
  let skipped = 0

  for (const template of userTemplates) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: template.email },
      })

      if (existingUser) {
        console.log(`⏭️  Skipping ${template.email} - already exists`)
        skipped++
        continue
      }

      // Verify department exists (if specified)
      if (template.departmentId) {
        const department = await prisma.department.findUnique({
          where: { id: template.departmentId },
        })

        if (!department) {
          console.log(`⚠️  Skipping ${template.email} - department ${template.departmentId} not found`)
          skipped++
          continue
        }
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          email: template.email,
          name: template.name,
          designation: template.designation,
          emailVerified: true,
          departmentId: template.departmentId,
          roles: template.roles,// Set first role as active
        },
      })

      console.log(`✅ Created ${user.roles[0]} user: ${user.email} (${user.name})`)
      created++
    } catch (error) {
      console.error(`❌ Error creating user ${template.email}:`, error)
    }
  }

  console.log("\n📊 Seeding Summary:")
  console.log(`   ✅ Created: ${created} users`)
  console.log(`   ⏭️  Skipped: ${skipped} users`)
  console.log("\n🎉 Seeding completed!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

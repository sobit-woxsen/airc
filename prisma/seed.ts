import 'dotenv/config'
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { auth } from '../lib/auth'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Create user with Better Auth's password hashing
async function createUserWithBetterAuth(email: string, password: string, name: string, roles: string[], departmentId?: string) {
  // Use Better Auth's internal signup method
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  })

  if (!result.user) {
    throw new Error(`Failed to create user: ${email}`)
  }

  // Update user with custom fields (roles, department)
  const updatedUser = await prisma.user.update({
    where: { id: result.user.id },
    data: {
      roles: roles as any,
      departmentId,
      emailVerified: true,
    },
  })

  return updatedUser
}

async function main() {
  console.log("🌱 Starting database seed...")

  // Create departments based on existing products-data.ts structure
  console.log("📁 Creating departments...")

  const blockchainDept = await prisma.department.upsert({
    where: { slug: "blockchain" },
    update: {},
    create: {
      id: "blockchain",
      name: "Blockchain",
      slug: "blockchain",
      description: "Decentralized solutions for secure and transparent systems",
      longDescription:
        "Our blockchain division develops cutting-edge decentralized applications, smart contracts, and Web3 infrastructure. We focus on creating secure, scalable, and transparent solutions for finance, supply chain, and digital identity verification.",
      icon: "Blocks",
      color: "#F7931A",
      image: "/departments/blockchain.jpg",
      videoUrl: "",
    },
  })

  const metaverseDept = await prisma.department.upsert({
    where: { slug: "metaverse" },
    update: {},
    create: {
      id: "metaverse",
      name: "Metaverse",
      slug: "metaverse",
      description: "Immersive virtual experiences and spatial computing",
      longDescription:
        "We create immersive virtual worlds, augmented reality applications, and spatial computing experiences. Our metaverse solutions enable new forms of collaboration, entertainment, and commerce in virtual environments.",
      icon: "Globe",
      color: "#8B5CF6",
      image: "/departments/metaverse.jpg",
      videoUrl: "",
    },
  })

  const roboticsDept = await prisma.department.upsert({
    where: { slug: "robotics" },
    update: {},
    create: {
      id: "robotics",
      name: "Robotics",
      slug: "robotics",
      description: "Autonomous systems and intelligent automation",
      longDescription:
        "Our robotics team builds autonomous systems, robotic process automation, and intelligent machines. From industrial automation to humanoid robots, we push the boundaries of what's possible in human-machine collaboration.",
      icon: "Bot",
      color: "#EF4444",
      image: "/departments/robotics.jpg",
      videoUrl: "",
    },
  })

  const aiMlDept = await prisma.department.upsert({
    where: { slug: "ai-ml" },
    update: {},
    create: {
      id: "ai-ml",
      name: "AI & Machine Learning",
      slug: "ai-ml",
      description: "Intelligent systems that learn and adapt",
      longDescription:
        "Our AI & ML division develops state-of-the-art machine learning models, neural networks, and intelligent systems. We specialize in natural language processing, computer vision, and predictive analytics that transform data into actionable insights.",
      icon: "Brain",
      color: "#06B6D4",
      image: "/departments/ai-ml.jpg",
      videoUrl: "",
    },
  })

  console.log("✅ Departments created successfully")

  // Create initial admin user
  console.log("👤 Creating admin user...")

  try {
    await createUserWithBetterAuth(
      "sobit.prasad@woxsen.edu.in",
      "admin123456",
      "Sobit Prasad (ADMIN)",
      ["ADMIN"]
    )

    console.log("✅ Admin user created successfully")
    console.log("📧 Email: sobit.prasad@woxsen.edu.in")
    console.log("🔑 Password: admin123456")
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("already exists")) {
      console.log("ℹ️  Admin user already exists")
    } else {
      throw error
    }
  }
  console.log("")

  // Create a sample engineer user
  console.log("👤 Creating sample engineer user...")

  try {
    await createUserWithBetterAuth(
      "engineer@airc.edu",
      "engineer12345678",
      "Test Engineer",
      ["ENGINEER"],
      "ai-ml"
    )

    console.log("✅ Engineer user created successfully")
    console.log("📧 Email: engineer@airc.edu")
    console.log("🔑 Password: engineer12345678")
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("already exists")) {
      console.log("ℹ️  Engineer user already exists")
    } else {
      throw error
    }
  }
  console.log("")

  // Create a user with multiple roles
  console.log("👤 Creating multi-role user...")

  try {
    await createUserWithBetterAuth(
      "dual@airc.edu",
      "dual12345678",
      "Dual Role User",
      ["ADMIN", "ENGINEER"],
      "blockchain"
    )

    console.log("✅ Multi-role user created successfully")
    console.log("📧 Email: dual@airc.edu")
    console.log("🔑 Password: dual12345678")
    console.log("🎭 Roles: ADMIN, ENGINEER (can switch between both)")
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes("already exists")) {
      console.log("ℹ️  Multi-role user already exists")
    } else {
      throw error
    }
  }
  console.log("")

  // Get the engineer user for project creation
  const engineerUser = await prisma.user.findUnique({
    where: { email: "engineer@airc.edu" },
  })

  // Create sample projects
  if (engineerUser) {
    console.log("📝 Creating sample projects...")

    // Project 1: Single department project
    const project1 = await prisma.project.create({
      data: {
        name: "AI Research Assistant",
        tagline: "Intelligent research companion powered by machine learning",
        description:
          "An advanced AI-powered research assistant that helps students and researchers find relevant papers, summarize complex topics, and generate research insights using state-of-the-art natural language processing.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        tags: ["AI", "NLP", "Research", "Machine Learning"],
        status: "APPROVED",
        productStatus: "Beta",
        technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI", "React"],
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/airc/research-assistant",
        previewUrl: "https://preview.example.com",
        submittedById: engineerUser.id,
        submittedAt: new Date(),
        reviewedAt: new Date(),
        departments: {
          create: [
            { departmentId: "ai-ml" }
          ]
        }
      },
    })

    // Project 2: Multi-department collaborative project
    const project2 = await prisma.project.create({
      data: {
        name: "Blockchain + AI Trading Platform",
        tagline: "Decentralized trading powered by machine learning predictions",
        description:
          "A collaborative project combining blockchain technology for secure, transparent transactions with AI-powered market analysis and prediction algorithms. This platform enables automated trading with smart contracts.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        tags: ["Blockchain", "AI", "Trading", "DeFi", "Smart Contracts"],
        status: "UNDER_REVIEW",
        productStatus: "Alpha",
        technologies: ["Solidity", "Python", "Web3.js", "TensorFlow", "Next.js"],
        demoUrl: "https://demo-trading.example.com",
        githubUrl: "https://github.com/airc/ai-blockchain-trading",
        previewUrl: "https://preview-trading.example.com",
        submittedById: engineerUser.id,
        submittedAt: new Date(),
        departments: {
          create: [
            { departmentId: "blockchain" },
            { departmentId: "ai-ml" }
          ]
        }
      },
    })

    // Project 3: Draft project (multiple departments)
    const project3 = await prisma.project.create({
      data: {
        name: "Metaverse Robotics Simulation",
        tagline: "Virtual testing environment for robotic systems",
        description:
          "An immersive metaverse platform for testing and training robotic systems in virtual environments before real-world deployment. Combines VR/AR with robotics simulation.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        tags: ["Metaverse", "Robotics", "VR", "Simulation", "AI"],
        status: "DRAFT",
        productStatus: "Coming Soon",
        technologies: ["Unity", "ROS", "Python", "WebXR", "C++"],
        submittedById: engineerUser.id,
        departments: {
          create: [
            { departmentId: "metaverse" },
            { departmentId: "robotics" },
            { departmentId: "ai-ml" }
          ]
        }
      },
    })

    console.log("✅ 3 sample projects created successfully")
    console.log("  - AI Research Assistant (1 dept, Approved)")
    console.log("  - Blockchain + AI Trading (2 depts, Under Review)")
    console.log("  - Metaverse Robotics Simulation (3 depts, Draft)")
  }
  console.log("")

  console.log("🎉 Database seed completed!")
  console.log("")
  console.log("Summary:")
  console.log("- 4 departments created")
  console.log("- 3 users created:")
  console.log("  • Admin: sobit.prasad@woxsen.edu.in / admin123456")
  console.log("  • Engineer: engineer@airc.edu / engineer12345678")
  console.log("  • Multi-role: dual@airc.edu / dual12345678 (ADMIN + ENGINEER)")
  console.log("- 3 sample projects created (showcasing collaborative departments)")
  console.log("")
  console.log("You can now sign in at http://localhost:3000/auth/login")
  console.log("")
  console.log("Test the multi-role user to see role switching in action!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e)
    await prisma.$disconnect()
    process.exit(1)
  })

// import { PrismaClient } from "@prisma/client"

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     datasourceUrl: process.env.DATABASE_URL,
//   })
// }

// declare global {
//   var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
// }

// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

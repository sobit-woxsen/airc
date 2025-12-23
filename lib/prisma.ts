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

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = (() => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const connectionString = process.env.DATABASE_URL

  // If no connection string, return a basic client that will only fail when used
  // This prevents build-time crashes if DB is not needed for static pages
  if (!connectionString) {
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
      console.warn("DATABASE_URL is missing in production environment")
    }
    return new PrismaClient()
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
})()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { z } from "zod"

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  designation: z.string().optional(),
  password: z.string().optional(),
  roles: z.array(z.enum(["ADMIN", "ENGINEER"])).min(1, "At least one role is required"),
  departmentId: z.string().optional(),
})

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  designation: z.string().nullable().optional(),
  roles: z.array(z.enum(["ADMIN", "ENGINEER"])).min(1, "At least one role is required").optional(),
  departmentId: z.string().nullable().optional(),
})

export async function getAllUsers() {
  await requireAdmin()

  const users = await prisma.user.findMany({
    include: {
      department: true,
      _count: {
        select: {
          projects: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return users
}

export async function createUser(data: z.infer<typeof createUserSchema>) {
  await requireAdmin()

  // Validate input
  const validatedData = createUserSchema.parse(data)

  try {
    // Use Better Auth's signup API to create user
    const result = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password || Math.random().toString(36).slice(-10),
        name: validatedData.name,
      },
    })

    if (!result.user) {
      return {
        success: false,
        message: "Failed to create user",
      }
    }

    // Update user with roles, designation, and department
    await prisma.user.update({
      where: { id: result.user.id },
      data: {
        roles: validatedData.roles,
        designation: validatedData.designation,
        departmentId: validatedData.departmentId,
        emailVerified: true,
      },
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User created successfully",
    }
  } catch (error: unknown) {
    console.error("Error creating user:", error)
    return {
      success: false,
      message: "Failed to create user",
    }
  }
}

export async function updateUser(
  userId: string,
  data: z.infer<typeof updateUserSchema>
) {
  await requireAdmin()

  // Validate input
  const validatedData = updateUserSchema.parse(data)
  console.log("Updating user:", userId, "with data:", validatedData)

  try {
    const oldUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true }
    })

    if (!oldUser) {
      throw new Error("User not found")
    }

    // Better Auth synchronization: If email is changing, we must update the accountId in the Account table
    // for any provider that uses email as the account ID (like 'credential', 'magic-link', etc.)
    if (validatedData.email && validatedData.email !== oldUser.email) {
      console.log("Email change detected. Synchronizing accounts for user:", userId)

      // Update any account where accountId matches the old email
      for (const account of oldUser.accounts) {
        if (account.accountId === oldUser.email) {
          console.log(`Updating account ${account.id} (provider: ${account.providerId}) accountId to:`, validatedData.email)
          await prisma.account.update({
            where: { id: account.id },
            data: { accountId: validatedData.email }
          })
        }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
    })
    console.log("User updated successfully in Prisma:", updatedUser.id)

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User updated successfully",
    }
  } catch (error: any) {
    console.error("Error updating user:", error)
    // Handle unique constraint violation (email already exists)
    if (error.code === "P2002") {
      return {
        success: false,
        message: "This email is already in use by another user",
      }
    }
    return {
      success: false,
      message: error.message || "Failed to update user",
    }
  }
}

export async function deleteUser(userId: string) {
  await requireAdmin()

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting user:", error)
    return {
      success: false,
      message: "Failed to delete user",
    }
  }
}

export async function getUserById(userId: string) {
  await requireAdmin()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      department: true,
      projects: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  return user
}

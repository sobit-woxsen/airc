"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin, getCurrentUser } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"
import { cloudinary } from "@/lib/cloudinary"

// ============================================
// READ OPERATIONS
// ============================================

/**
 * Get all newsletters for admin (including unpublished)
 */
export async function getAllNewsletters() {
  await requireAdmin()

  const newsletters = await prisma.newsletter.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      issue: "desc",
    },
  })

  return newsletters
}

/**
 * Get published newsletters for public frontend
 */
export async function getPublishedNewsletters() {
  const newsletters = await prisma.newsletter.findMany({
    where: { published: true },
    orderBy: {
      issue: "desc",
    },
  })

  return newsletters
}

/**
 * Get single newsletter by ID
 */
export async function getNewsletterById(newsletterId: string) {
  await requireAdmin()

  const newsletter = await prisma.newsletter.findUnique({
    where: { id: newsletterId },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return newsletter
}

// ============================================
// CREATE OPERATION
// ============================================

export async function createNewsletter(data: {
  title: string
  description: string
  date: string
  pdfUrl: string
  coverImage: string
  topics: string[]
  featured: boolean
  published: boolean
}) {
  const user = await getCurrentUser()
  if (!user || !user.roles.includes("ADMIN")) {
    throw new Error("Unauthorized")
  }

  try {
    // Auto-generate issue number by finding the max issue and incrementing
    const lastNewsletter = await prisma.newsletter.findFirst({
      orderBy: { issue: "desc" },
      select: { issue: true },
    })

    const nextIssue = (lastNewsletter?.issue || 0) + 1

    const newsletter = await prisma.newsletter.create({
      data: {
        ...data,
        issue: nextIssue,
        createdById: user.id,
      },
    })

    revalidatePath("/admin/newsletters")
    revalidatePath("/newsletter")

    return {
      success: true,
      message: "Newsletter created successfully",
      newsletterId: newsletter.id,
    }
  } catch (error: unknown) {
    console.error("Error creating newsletter:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to create newsletter",
    }
  }
}

// ============================================
// UPDATE OPERATION
// ============================================

export async function updateNewsletter(
  newsletterId: string,
  data: {
    title?: string
    description?: string
    date?: string
    issue?: number
    pdfUrl?: string
    coverImage?: string
    topics?: string[]
    featured?: boolean
    published?: boolean
  }
) {
  await requireAdmin()

  try {
    // If updating issue number, check for conflicts
    if (data.issue !== undefined) {
      const existing = await prisma.newsletter.findFirst({
        where: {
          issue: data.issue,
          id: { not: newsletterId },
        },
      })

      if (existing) {
        return {
          success: false,
          message: `Issue ${data.issue} already exists`,
        }
      }
    }

    await prisma.newsletter.update({
      where: { id: newsletterId },
      data,
    })

    revalidatePath("/admin/newsletters")
    revalidatePath(`/admin/newsletters/${newsletterId}`)
    revalidatePath("/newsletter")

    return {
      success: true,
      message: "Newsletter updated successfully",
    }
  } catch (error: unknown) {
    console.error("Error updating newsletter:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to update newsletter",
    }
  }
}

// ============================================
// DELETE OPERATION
// ============================================

export async function deleteNewsletter(newsletterId: string) {
  await requireAdmin()

  try {
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
    })

    if (!newsletter) {
      return { success: false, message: "Newsletter not found" }
    }

    // Delete from Cloudinary first
    try {
      // Extract public_id from Cloudinary URL
      const pdfPublicId = extractCloudinaryPublicId(newsletter.pdfUrl)
      if (pdfPublicId) {
        await cloudinary.uploader.destroy(pdfPublicId, {
          resource_type: "image",
        })
      }
    } catch (cloudinaryError) {
      console.error("Failed to delete from Cloudinary:", cloudinaryError)
      // Continue with DB deletion even if Cloudinary fails
    }

    // Delete from database
    await prisma.newsletter.delete({
      where: { id: newsletterId },
    })

    revalidatePath("/admin/newsletters")
    revalidatePath("/newsletter")

    return {
      success: true,
      message: "Newsletter deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting newsletter:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to delete newsletter",
    }
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function extractCloudinaryPublicId(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
    const match = url.match(/\/upload\/v\d+\/(.+)\.\w+$/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

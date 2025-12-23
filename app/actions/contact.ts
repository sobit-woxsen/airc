"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ============================================
// CREATE OPERATION
// ============================================

/**
 * Submit a contact form message
 */
export async function createContact(data: {
  firstName: string
  lastName: string
  email: string
  subject: "bootcamp" | "collaboration" | "consulting" | "press" | "other"
  message: string
}) {
  try {
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Invalid email address",
      }
    }

    // Map subject to enum
    const subjectMap: Record<string, string> = {
      bootcamp: "BOOTCAMP",
      collaboration: "COLLABORATION",
      consulting: "CONSULTING",
      press: "PRESS",
      other: "OTHER",
    }

    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: subjectMap[data.subject] as any,
        message: data.message,
      },
    })

    revalidatePath("/contact")

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      contactId: contact.id,
    }
  } catch (error: unknown) {
    console.error("Error creating contact:", error)
    return {
      success: false,
      message: "An error occurred while submitting your message. Please try again.",
    }
  }
}

// ============================================
// READ OPERATIONS (Admin only)
// ============================================

/**
 * Get all contacts for admin
 */
export async function getAllContacts() {
  const { requireAdmin } = await import("@/lib/auth-helpers")
  await requireAdmin()

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return contacts
  } catch (error: unknown) {
    console.error("Error getting contacts:", error)
    throw new Error("Failed to get contacts")
  }
}

/**
 * Update contact status
 */
export async function updateContactStatus(
  contactId: string,
  status: "NEW" | "READ" | "RESPONDED" | "ARCHIVED"
) {
  const { requireAdmin } = await import("@/lib/auth-helpers")
  await requireAdmin()

  try {
    await prisma.contact.update({
      where: { id: contactId },
      data: { status },
    })

    revalidatePath("/admin/contacts")

    return {
      success: true,
      message: "Contact status updated",
    }
  } catch (error: unknown) {
    console.error("Error updating contact status:", error)
    return {
      success: false,
      message: "Failed to update contact status",
    }
  }
}

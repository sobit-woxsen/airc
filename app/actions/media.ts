"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"

export async function addMediaToProject(
  projectId: string,
  media: {
    type: "IMAGE" | "VIDEO"
    url: string
    thumbnail?: string
    alt?: string
    order: number
  }
) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    const mediaItem = await prisma.mediaItem.create({
      data: {
        projectId,
        ...media,
      },
    })

    revalidatePath(`/engineer/projects/${projectId}`)

    return {
      success: true,
      message: "Media added successfully",
      mediaId: mediaItem.id,
    }
  } catch (error: unknown) {
    console.error("Error adding media:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to add media",
    }
  }
}

export async function addDocumentToProject(
  projectId: string,
  document: {
    title: string
    url: string
    type: "WHITEPAPER" | "DOCUMENTATION" | "RESEARCH" | "OTHER"
    order: number
  }
) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    const doc = await prisma.document.create({
      data: {
        projectId,
        ...document,
      },
    })

    revalidatePath(`/engineer/projects/${projectId}`)

    return {
      success: true,
      message: "Document added successfully",
      documentId: doc.id,
    }
  } catch (error: unknown) {
    console.error("Error adding document:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to add document",
    }
  }
}

export async function deleteMedia(mediaId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    await prisma.mediaItem.delete({
      where: { id: mediaId },
    })

    return {
      success: true,
      message: "Media deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting media:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to delete media",
    }
  }
}

export async function deleteDocument(documentId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    await prisma.document.delete({
      where: { id: documentId },
    })

    return {
      success: true,
      message: "Document deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting document:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to delete document",
    }
  }
}

export async function clearProjectMedia(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    await prisma.mediaItem.deleteMany({
      where: { projectId },
    })

    revalidatePath(`/engineer/projects/${projectId}`)

    return {
      success: true,
      message: "All media cleared successfully",
    }
  } catch (error: unknown) {
    console.error("Error clearing media:", error)
    return {
      success: false,
      message: "Failed to clear media",
    }
  }
}

export async function clearProjectDocuments(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    await prisma.document.deleteMany({
      where: { projectId },
    })

    revalidatePath(`/engineer/projects/${projectId}`)

    return {
      success: true,
      message: "All documents cleared successfully",
    }
  } catch (error: unknown) {
    console.error("Error clearing documents:", error)
    return {
      success: false,
      message: "Failed to clear documents",
    }
  }
}

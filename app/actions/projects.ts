"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin, getCurrentUser } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"
import { ProjectStatus } from "@prisma/client"

export async function getAllProjects(status?: ProjectStatus) {
  await requireAdmin()

  const projects = await prisma.project.findMany({
    where: status ? { status } : undefined,
    include: {
      departments: {
        include: {
          department: true,
        },
      },
      submittedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          departmentId: true,
        },
      },
      _count: {
        select: {
          media: true,
          documents: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return projects
}

export async function getProjectById(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      departments: {
        include: {
          department: true,
        },
      },
      submittedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          departmentId: true,
        },
      },
      media: {
        orderBy: { order: "asc" },
      },
      documents: {
        orderBy: { order: "asc" },
      },
    },
  })

  return project
}

export async function approveProject(projectId: string, notes?: string) {
  await requireAdmin()

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewNotes: notes,
      },
    })

    revalidatePath("/admin/projects")
    revalidatePath(`/admin/projects/${projectId}`)

    return {
      success: true,
      message: "Project approved successfully",
    }
  } catch (error: unknown) {
    console.error("Error approving project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to approve project",
    }
  }
}

export async function rejectProject(projectId: string, notes?: string) {
  await requireAdmin()

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewNotes: notes,
      },
    })

    revalidatePath("/admin/projects")
    revalidatePath(`/admin/projects/${projectId}`)

    return {
      success: true,
      message: "Project rejected",
    }
  } catch (error: unknown) {
    console.error("Error rejecting project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to reject project",
    }
  }
}

export async function deleteProject(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    // Check if user has delete access
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        departments: true,
        submittedBy: {
          select: {
            departmentId: true,
          },
        },
      },
    })

    if (!project) {
      return { success: false, message: "Project not found" }
    }

    // Check if user can delete:
    // 1. Admin can always delete
    // 2. Project owner can delete
    // 3. Users from same department can delete
    // 4. Users whose department is involved in collaborative project can delete
    const canDelete =
      user.roles.includes("ADMIN") ||
      project.submittedById === user.id ||
      (user.departmentId &&
        (project.submittedBy?.departmentId === user.departmentId ||
          project.departments.some((pd) => pd.departmentId === user.departmentId)))

    if (!canDelete) {
      return { success: false, message: "Unauthorized to delete this project" }
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    revalidatePath("/admin/projects")
    revalidatePath("/engineer/projects")

    return {
      success: true,
      message: "Project deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to delete project",
    }
  }
}

export async function getMyProjects() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  // Build where clause for projects visible to this engineer:
  // 1. Their own projects
  // 2. Projects from teammates in same department
  // 3. Collaborative projects involving their department
  const projectsWhereClause = user.departmentId
    ? {
        OR: [
          { submittedById: user.id }, // Own projects
          {
            submittedBy: {
              departmentId: user.departmentId, // Same department projects
            },
          },
          {
            departments: {
              some: {
                departmentId: user.departmentId, // Collaborative projects
              },
            },
          },
        ],
      }
    : { submittedById: user.id } // If no department, only show own projects

  const projects = await prisma.project.findMany({
    where: projectsWhereClause,
    include: {
      departments: {
        include: {
          department: true,
        },
      },
      submittedBy: {
        select: { name: true, email: true },
      },
      _count: {
        select: {
          media: true,
          documents: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return projects
}

export async function createProject(data: {
  name: string
  departmentIds: string[]
  tagline: string
  description: string
  image: string
  tags: string[]
  productStatus: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  docUrl?: string
  previewUrl?: string
}) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    const { departmentIds, ...projectData } = data

    const project = await prisma.project.create({
      data: {
        ...projectData,
        status: "DRAFT",
        submittedById: user.id,
        departments: {
          create: departmentIds.map((deptId) => ({
            departmentId: deptId,
          })),
        },
      },
    })

    revalidatePath("/engineer/projects")

    return {
      success: true,
      message: "Project created as draft",
      projectId: project.id,
    }
  } catch (error: unknown) {
    console.error("Error creating project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to create project",
    }
  }
}

export async function updateProject(
  projectId: string,
  data: {
    name?: string
    departmentIds?: string[]
    tagline?: string
    description?: string
    image?: string
    tags?: string[]
    productStatus?: string
    technologies?: string[]
    demoUrl?: string
    githubUrl?: string
    docUrl?: string
    previewUrl?: string
  }
) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    // Check if user has edit access
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        departments: true,
        submittedBy: {
          select: {
            departmentId: true,
          },
        },
      },
    })

    if (!project) {
      return { success: false, message: "Project not found" }
    }

    // Check if user can edit:
    // 1. Admin can always edit
    // 2. Project owner can edit
    // 3. Users from same department can edit
    // 4. Users whose department is involved in collaborative project can edit
    const canEdit =
      user.roles.includes("ADMIN") ||
      project.submittedById === user.id ||
      (user.departmentId &&
        (project.submittedBy?.departmentId === user.departmentId ||
          project.departments.some((pd) => pd.departmentId === user.departmentId)))

    if (!canEdit) {
      return { success: false, message: "Unauthorized" }
    }

    const { departmentIds, ...projectData } = data

    // Update project and departments
    await prisma.project.update({
      where: { id: projectId },
      data: {
        ...projectData,
        ...(departmentIds && {
          departments: {
            deleteMany: {},
            create: departmentIds.map((deptId) => ({
              departmentId: deptId,
            })),
          },
        }),
      },
    })

    revalidatePath("/engineer/projects")
    revalidatePath(`/engineer/projects/${projectId}`)
    revalidatePath("/admin/projects")
    revalidatePath(`/admin/projects/${projectId}`)

    return {
      success: true,
      message: "Project updated successfully",
    }
  } catch (error: unknown) {
    console.error("Error updating project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to update project",
    }
  }
}

export async function submitProjectForReview(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        departments: true,
        submittedBy: {
          select: {
            departmentId: true,
          },
        },
      },
    })

    if (!project) {
      return { success: false, message: "Project not found" }
    }

    // Check if user can submit:
    // 1. Project owner can submit
    // 2. Users from same department can submit
    // 3. Users whose department is involved in collaborative project can submit
    const canSubmit =
      project.submittedById === user.id ||
      (user.departmentId &&
        (project.submittedBy?.departmentId === user.departmentId ||
          project.departments.some((pd) => pd.departmentId === user.departmentId)))

    if (!canSubmit) {
      return { success: false, message: "Unauthorized" }
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: "UNDER_REVIEW",
        submittedAt: new Date(),
      },
    })

    revalidatePath("/engineer/projects")
    revalidatePath(`/engineer/projects/${projectId}`)

    return {
      success: true,
      message: "Project submitted for review",
    }
  } catch (error: unknown) {
    console.error("Error submitting project:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to submit project",
    }
  }
}

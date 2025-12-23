"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  image: z.string().url("Valid image URL is required"),
  videoUrl: z.string().url().optional().or(z.literal("")),
})

export async function getAllDepartments() {
  await requireAdmin()

  const departments = await prisma.department.findMany({
    include: {
      _count: {
        select: {
          users: true,
          projects: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  return departments
}

export async function getDepartmentById(departmentId: string) {
  await requireAdmin()

  const department = await prisma.department.findUnique({
    where: { id: departmentId },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          roles: true,
        },
      },
      projects: {
        include: {
          project: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
        take: 10,
      },
      _count: {
        select: {
          users: true,
          projects: true,
        },
      },
    },
  })

  return department
}

export async function createDepartment(data: z.infer<typeof departmentSchema>) {
  await requireAdmin()

  const validatedData = departmentSchema.parse(data)

  try {
    await prisma.department.create({
      data: validatedData,
    })

    revalidatePath("/admin/departments")

    return {
      success: true,
      message: "Department created successfully",
    }
  } catch (error: unknown) {
    console.error("Error creating department:", error)

    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return {
        success: false,
        message: "A department with this name or slug already exists",
      }
    }

    return {
      success: false,
      message: "Failed to create department",
    }
  }
}

export async function updateDepartment(
  departmentId: string,
  data: z.infer<typeof departmentSchema>
) {
  await requireAdmin()

  const validatedData = departmentSchema.parse(data)

  try {
    await prisma.department.update({
      where: { id: departmentId },
      data: validatedData,
    })

    revalidatePath("/admin/departments")
    revalidatePath(`/admin/departments/${departmentId}`)

    return {
      success: true,
      message: "Department updated successfully",
    }
  } catch (error: unknown) {
    console.error("Error updating department:", error)

    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return {
        success: false,
        message: "A department with this name or slug already exists",
      }
    }

    return {
      success: false,
      message: "Failed to update department",
    }
  }
}

export async function deleteDepartment(departmentId: string) {
  await requireAdmin()

  try {
    // Check if department has users or projects
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
    })

    if (!department) {
      return {
        success: false,
        message: "Department not found",
      }
    }

    if (department._count.users > 0 || department._count.projects > 0) {
      return {
        success: false,
        message: `Cannot delete department with ${department._count.users} users and ${department._count.projects} projects. Please reassign them first.`,
      }
    }

    await prisma.department.delete({
      where: { id: departmentId },
    })

    revalidatePath("/admin/departments")

    return {
      success: true,
      message: "Department deleted successfully",
    }
  } catch (error: unknown) {
    console.error("Error deleting department:", error)
    return {
      success: false,
      message: "An error occurred" || "Failed to delete department",
    }
  }
}

"use server"

import { prisma } from "@/lib/prisma"
import { type Product, type Department, type MediaItem, type ProductDocument } from "@/lib/products-data"
import { Project as PrismaProject, MediaItem as PrismaMedia, Document as PrismaDocument, Department as PrismaDepartment, ProjectDepartment } from "@prisma/client"

// Interface for Project with relations
type ProjectWithRelations = PrismaProject & {
    departments: ProjectDepartment[]
    media: PrismaMedia[]
    documents: PrismaDocument[]
}

/**
 * Maps a Prisma Project with relations to the public Product interface.
 * Ensures all nullable fields from Prisma are converted to undefined for the UI.
 */
function mapProjectToProduct(project: ProjectWithRelations): Product {
    return {
        id: project.id,
        name: project.name,
        departmentId: project.departments[0]?.departmentId || "unknown",
        tagline: project.tagline,
        description: project.description,
        image: project.image,
        status: project.productStatus as Product["status"],
        tags: project.tags,
        technologies: project.technologies,
        demoUrl: project.demoUrl || undefined,
        githubUrl: project.githubUrl || undefined,
        docUrl: project.docUrl || undefined,
        media: project.media.map((m): MediaItem => ({
            type: m.type.toLowerCase() as MediaItem["type"],
            url: m.url
        })),
        documents: project.documents.map((d): ProductDocument => ({
            title: d.title,
            url: d.url,
            type: d.type.toLowerCase() as ProductDocument["type"]
        }))
    }
}

/**
 * Maps a Prisma Department to the public Department interface.
 */
function mapDepartment(dept: PrismaDepartment): Department {
    return {
        id: dept.id,
        name: dept.name,
        slug: dept.slug,
        description: dept.description,
        longDescription: dept.longDescription,
        icon: dept.icon,
        color: dept.color,
        image: dept.image,
        videoUrl: dept.videoUrl || undefined
    }
}

export async function getPublicProducts(): Promise<Product[]> {
    const projects = await prisma.project.findMany({
        where: {
            status: "APPROVED",
        },
        include: {
            departments: true,
            media: {
                orderBy: { order: "asc" },
            },
            documents: {
                orderBy: { order: "asc" },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    }) as ProjectWithRelations[]

    return projects.map(mapProjectToProduct)
}

export async function getPublicDepartments(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
        orderBy: {
            name: "asc",
        },
    })

    return departments.map(mapDepartment)
}

export async function getPublicDepartmentBySlug(slug: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
        where: { slug },
    })

    if (!department) return null
    return mapDepartment(department)
}

export async function getPublicProductsByDepartment(departmentId: string): Promise<Product[]> {
    const projects = await prisma.project.findMany({
        where: {
            status: "APPROVED",
            departments: {
                some: {
                    departmentId,
                },
            },
        },
        include: {
            departments: true,
            media: {
                orderBy: { order: "asc" },
            },
            documents: {
                orderBy: { order: "asc" },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    }) as ProjectWithRelations[]

    return projects.map(mapProjectToProduct)
}

export async function getPublicProductById(id: string): Promise<Product | null> {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            departments: true,
            media: {
                orderBy: { order: "asc" },
            },
            documents: {
                orderBy: { order: "asc" },
            },
        }
    }) as ProjectWithRelations | null

    if (!project || project.status !== "APPROVED") return null

    return mapProjectToProduct(project)
}

export async function getPublicDepartmentById(id: string): Promise<Department | null> {
    const department = await prisma.department.findUnique({
        where: { id },
    })

    if (!department) return null
    return mapDepartment(department)
}

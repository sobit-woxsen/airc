import { notFound } from "next/navigation"
import { getPublicDepartmentBySlug, getPublicProductsByDepartment, getPublicDepartments } from "@/app/actions/public-data"
import DepartmentPageClient from "./client"

interface DepartmentPageProps {
    params: Promise<{ slug: string }>
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
    const { slug } = await params
    const department = await getPublicDepartmentBySlug(slug)

    if (!department) {
        notFound()
    }

    const products = await getPublicProductsByDepartment(department.id)

    return <DepartmentPageClient department={department} products={products} />
}

// Generate static params for all departments
export async function generateStaticParams() {
    const departments = await getPublicDepartments()
    return departments.map(dept => ({
        slug: dept.slug
    }))
}

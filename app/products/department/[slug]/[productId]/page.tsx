import { notFound } from "next/navigation"
import { getPublicDepartmentBySlug, getPublicProductById, getPublicDepartments, getPublicProducts } from "@/app/actions/public-data"
import ProductDetailClient from "./client"

interface ProductDetailPageProps {
    params: Promise<{ slug: string; productId: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug, productId } = await params

    const department = await getPublicDepartmentBySlug(slug)
    if (!department) {
        notFound()
    }

    const product = await getPublicProductById(productId)
    if (!product || product.departmentId !== department.id) {
        notFound()
    }

    return <ProductDetailClient product={product} department={department} />
}

// Generate static params for all department/product combinations
export async function generateStaticParams() {
    const params: { slug: string; productId: string }[] = []
    const allDepartments = await getPublicDepartments()
    const allProducts = await getPublicProducts()

    for (const department of allDepartments) {
        const departmentProducts = allProducts.filter(p => p.departmentId === department.id)
        for (const product of departmentProducts) {
            params.push({
                slug: department.slug,
                productId: product.id,
            })
        }
    }

    return params
}

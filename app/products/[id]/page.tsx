import { getPublicProductById, getPublicDepartmentById, getPublicProducts, getPublicDepartments, getPublicProductsByDepartment } from "@/app/actions/public-data"
import ProductDetailPageClient from "./ProductDetailPageClient"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const products = await getPublicProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getPublicProductById(id)

  if (!product) {
    return { title: "Product Not Found" }
  }

  const department = await getPublicDepartmentById(product.departmentId)

  return {
    title: `${product.name} — AI Research Center`,
    description: product.description,
    keywords: [product.name, department?.name, ...product.technologies].filter(Boolean),
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getPublicProductById(id)

  if (!product) {
    notFound()
  }

  const department = await getPublicDepartmentById(product.departmentId)

  // Fetch suggested products from the same department
  const allDeptProducts = await getPublicProductsByDepartment(product.departmentId)
  const suggestedProducts = allDeptProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3)

  return (
    <ProductDetailPageClient
      product={product}
      department={department || undefined}
      suggestedProducts={suggestedProducts}
    />
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Search, Filter } from "lucide-react"
import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { type Product, type Department } from "@/lib/products-data"

// Removed unused DepartmentIcon

function ProductCard({
  product,
  index,
  id,
  allDepartments
}: {
  product: Product;
  index: number;
  id: string;
  allDepartments: Department[]
}) {
  const department = allDepartments.find(d => d.id === product.departmentId)
  const searchParams = useSearchParams()
  const currentDept = searchParams.get("dept") || "all"

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product.id}?from=${currentDept}`}
        className="block h-full group"
      >
        <div className="flex flex-col h-full bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

          {/* Product Image */}
          <div className="relative h-56 bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Department Badge */}
            {department && (
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase backdrop-blur-md border border-white/20"
                  style={{ backgroundColor: `${department.color}22`, color: department.color, borderColor: `${department.color}33` }}
                >
                  {department.name}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-8 flex flex-col">
            <h3 className="text-2xl font-medium text-black mb-1 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-accent">
              {product.tagline}
            </p>

            {/* Action */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-black/5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase text-black group-hover:text-accent transition-all">
                Exploration
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>

              {product.demoUrl && (
                <div
                  className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-accent hover:border-accent/20 transition-all"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(product.demoUrl, "_blank")
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dbProducts, setDbProducts] = useState<Product[]>([])
  const [dbDepartments, setDbDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const hasScrolled = useRef(false)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/projects/public')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setDbProducts(data.projects)
        setDbDepartments(data.departments)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Initialize filter from URL params
  useEffect(() => {
    if (isLoading) return

    const dept = searchParams.get("dept")
    const scrollTo = searchParams.get("scroll")

    if (dept && (dept === "all" || dbDepartments.some(d => d.id === dept))) {
      setActiveFilter(dept)
    }

    // Scroll to product if specified
    if (scrollTo && !hasScrolled.current) {
      hasScrolled.current = true
      // Wait for products to render
      setTimeout(() => {
        const element = document.getElementById(`product-${scrollTo}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          // Add highlight effect
          element.classList.add("ring-2", "ring-black", "ring-offset-2")
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-black", "ring-offset-2")
          }, 2000)
        }
      }, 300)
    }
  }, [searchParams, isLoading, dbDepartments])

  // Update URL when filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    const url = new URL(window.location.href)
    url.searchParams.set("dept", filter)
    url.searchParams.delete("scroll") // Remove scroll param when changing filter
    router.replace(url.pathname + url.search, { scroll: false })
  }

  const filteredProducts = dbProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = activeFilter === "all" || product.departmentId === activeFilter

    return matchesSearch && matchesDepartment
  })

  // Get current department name for display
  const currentDepartmentName = activeFilter === "all"
    ? "All Departments"
    : dbDepartments.find(d => d.id === activeFilter)?.name || "All Departments"

  return (
    <PageShell mainClassName="relative flex-1 bg-background px-2 md:px-16">
      <PageHeader
        title="Our Products"
        description="Cutting-edge tools and platforms born from research. Explore our innovations across blockchain, metaverse, robotics, and artificial intelligence."
        breadcrumbs={[
          { label: "Products" }
        ]}
      >
        <div className="flex flex-row gap-2 sm:gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full border border-black/5 text-base"
            />
          </div>

          {/* Department Filter Dropdown */}
          <div className="w-auto sm:w-64 flex-shrink-0">
            <Select value={activeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="min-h-12 w-12 sm:w-auto rounded-full border border-black/5 px-3 sm:px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10 [&>svg:last-child]:hidden sm:[&>svg:last-child]:block justify-center sm:justify-start">
                <Filter className="h-5 w-5 sm:hidden flex-shrink-0" />
                <span className="hidden sm:inline">
                  <SelectValue placeholder="All Departments" />
                </span>
              </SelectTrigger>
              <SelectContent className="rounded-lg border-black/5">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Filter by department
                </div>
                <SelectItem value="all" className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12">
                  All Departments
                </SelectItem>
                {dbDepartments.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={dept.id}
                    className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
                  >
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PageHeader>

      {/* Products Grid */}
      <section className="py-12 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">Loading products...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col -space-y-1">
                      <span className="text-[10px] font-semibold uppercase text-black/20">Inventory</span>
                      <span className="text-sm font-medium text-black">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                        <span className="text-black/40 font-normal"> in {currentDepartmentName}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      id={`product-${product.id}`}
                      allDepartments={dbDepartments}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-24 bg-neutral-50/50 rounded-3xl border border-dashed border-black/10">
                    <Search className="h-10 w-10 text-black/20 mx-auto mb-4" />
                    <p className="text-lg font-medium text-black/40">No products found within this sector.</p>
                    <button
                      onClick={() => { setSearchQuery(""); handleFilterChange("all"); }}
                      className="mt-4 text-xs font-semibold uppercase text-accent hover:underline"
                    >
                      Clear search filters
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-foreground mb-1">{dbDepartments.length}</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-foreground mb-1">{dbProducts.length}+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-foreground mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </motion.div>
            </div>
          </div>
        </section> */}
    </PageShell>
  )
}

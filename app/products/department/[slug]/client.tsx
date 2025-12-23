"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Play, Pause, ChevronRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { useState, useRef } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { type Product, type Department } from "@/lib/products-data"

const statusColors: Record<string, string> = {
    Production: "bg-green-500/15 text-green-700 border-green-500/30",
    Beta: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    Alpha: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    "Coming Soon": "bg-gray-500/15 text-gray-700 border-gray-500/30",
}

import type { LucideIcon } from "lucide-react"

function DepartmentIcon({ iconName, className }: { iconName: string; className?: string }) {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    const Icon = icons[iconName]
    if (!Icon) return null
    return <Icon className={className} />
}

function ProductCard({ product, departmentSlug }: { product: Product; departmentSlug: string }) {
    return (
        <SpotlightCard className="h-full">
            <Link href={`/products/department/${departmentSlug}/${product.id}`} className="block h-full">
                <div className="flex flex-col h-full bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <Badge
                            variant="outline"
                            className={`absolute top-4 right-4 ${statusColors[product.status]}`}
                        >
                            {product.status}
                        </Badge>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.tagline}</p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.technologies.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded-full bg-black/5 text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                            {product.technologies.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-muted-foreground">
                                    +{product.technologies.length - 3}
                                </span>
                            )}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/5">
                            {product.demoUrl && (
                                <Button variant="ghost" size="sm" className="text-sm gap-2" asChild>
                                    <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                        Demo
                                    </a>
                                </Button>
                            )}
                            {product.githubUrl && (
                                <Button variant="ghost" size="sm" className="text-sm gap-2" asChild>
                                    <a href={product.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" />
                                        Code
                                    </a>
                                </Button>
                            )}
                            <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </Link>
        </SpotlightCard>
    )
}

function VideoPlayer({ videoUrl, poster }: { videoUrl: string; poster?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    if (!videoUrl) return null

    return (
        <div className="relative rounded-2xl overflow-hidden bg-black/5">
            <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                poster={poster}
                loop
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {isPlaying ? (
                        <Pause className="h-6 w-6 text-black" />
                    ) : (
                        <Play className="h-6 w-6 text-black ml-1" />
                    )}
                </div>
            </button>
        </div>
    )
}

interface DepartmentPageClientProps {
    department: Department
    products: Product[]
}

export default function DepartmentPageClient({ department, products }: DepartmentPageClientProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative pt-32 pb-16 bg-white border-b border-black/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Products
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Department Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${department.color}20` }}
                                    >
                                        <DepartmentIcon iconName={department.icon} className="h-6 w-6" />
                                    </div>
                                    <Badge variant="outline" className="text-sm">
                                        {products.length} Products
                                    </Badge>
                                </div>

                                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                                    {department.name}
                                </h1>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {department.longDescription}
                                </p>
                            </motion.div>

                            {/* Video or Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {department.videoUrl ? (
                                    <VideoPlayer videoUrl={department.videoUrl} poster={department.image} />
                                ) : (
                                    <div className="rounded-2xl overflow-hidden bg-black/5">
                                        <img
                                            src={department.image}
                                            alt={department.name}
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-foreground mb-8">
                            All {department.name} Products
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} departmentSlug={department.slug} />
                                </motion.div>
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">No products in this department yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, FileText, Play, ChevronRight, Maximize2, X, BookOpen } from "lucide-react"
import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Product, type Department, type MediaItem, type ProductDocument } from "@/lib/products-data"

const statusColors: Record<string, string> = {
    Production: "bg-green-500/15 text-green-700 border-green-500/30",
    Beta: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    Alpha: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    "Coming Soon": "bg-gray-500/15 text-gray-700 border-gray-500/30",
}

const documentTypeColors: Record<string, string> = {
    whitepaper: "bg-purple-500/15 text-purple-700 border-purple-500/30",
    documentation: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    research: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    other: "bg-gray-500/15 text-gray-700 border-gray-500/30",
}

interface ProductDetailClientProps {
    product: Product
    department: Department
}

export default function ProductDetailClient({ product, department }: ProductDetailClientProps) {
    // Build media array - use product.media if available, otherwise fallback to single image
    const mediaItems: MediaItem[] = product.media && product.media.length > 0
        ? product.media
        : [{ type: "image", url: product.image, alt: product.name }]

    const [activeMediaIndex, setActiveMediaIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null)
    const [activePdfTitle, setActivePdfTitle] = useState<string>("")
    const activeMedia = mediaItems[activeMediaIndex]

    const openPdfViewer = (doc: ProductDocument) => {
        setActivePdfUrl(doc.url)
        setActivePdfTitle(doc.title)
    }

    const closePdfViewer = () => {
        setActivePdfUrl(null)
        setActivePdfTitle("")
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/products" className="hover:text-foreground transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link
                            href={`/products/department/${department.slug}`}
                            className="hover:text-foreground transition-colors"
                        >
                            {department.name}
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">{product.name}</span>
                    </nav>

                    {/* Back Button */}
                    <Link href={`/products/department/${department.slug}`}>
                        <Button variant="ghost" className="mb-8 -ml-4 rounded-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {department.name}
                        </Button>
                    </Link>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column - Sticky Media Viewer */}
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                {/* Main Media Viewer */}
                                <div className="relative rounded-2xl overflow-hidden border border-black/5 bg-gray-100 aspect-video group">
                                    {activeMedia.type === "image" ? (
                                        <motion.img
                                            key={activeMediaIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            src={activeMedia.url}
                                            alt={activeMedia.alt || product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <motion.video
                                            key={activeMediaIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            src={activeMedia.url}
                                            controls
                                            autoPlay
                                            className="w-full h-full object-cover"
                                        >
                                            Your browser does not support the video tag.
                                        </motion.video>
                                    )}

                                    {/* Expand Button */}
                                    <button
                                        onClick={() => setIsFullscreen(true)}
                                        className="absolute top-4 right-4 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/70 opacity-0 group-hover:opacity-100 z-10"
                                        title="View fullscreen"
                                    >
                                        <Maximize2 className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Thumbnail Gallery */}
                                {mediaItems.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {mediaItems.map((media, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveMediaIndex(index)}
                                                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === activeMediaIndex
                                                    ? "border-foreground ring-2 ring-foreground/20"
                                                    : "border-black/10 hover:border-black/30"
                                                    }`}
                                            >
                                                {media.type === "image" ? (
                                                    <img
                                                        src={media.url}
                                                        alt={media.alt || `Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <video
                                                                src={media.url}
                                                                className="w-full h-full object-cover"
                                                                muted
                                                                preload="metadata"
                                                            />
                                                        </div>
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                            <Play className="h-5 w-5 text-white fill-white" />
                                                        </div>
                                                    </>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Media Counter */}
                                <p className="text-sm text-muted-foreground text-center">
                                    {activeMediaIndex + 1} of {mediaItems.length} {mediaItems.length === 1 ? "item" : "items"}
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column - Product Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge
                                        variant="outline"
                                        className="text-xs font-bold uppercase tracking-wider"
                                        style={{
                                            backgroundColor: `${department.color}15`,
                                            borderColor: `${department.color}30`,
                                            color: department.color
                                        }}
                                    >
                                        {department.name}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={statusColors[product.status]}
                                    >
                                        {product.status}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    {product.tagline}
                                </p>
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="space-y-3">
                                    <h2 className="text-lg font-bold text-foreground">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 border border-gray-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">About</h2>
                                <p className="text-foreground/70 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
                                <div className="flex flex-wrap gap-3">
                                    {product.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-bold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Documents / Whitepapers */}
                            {product.documents && product.documents.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-foreground">Documents</h2>
                                    <div className="space-y-3">
                                        {product.documents.map((doc, index) => (
                                            <button
                                                key={index}
                                                onClick={() => openPdfViewer(doc)}
                                                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-black/5 hover:bg-gray-100 transition-colors text-left group"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                    <BookOpen className="h-6 w-6 text-red-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-foreground group-hover:underline">
                                                        {doc.title}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className={`mt-1 text-xs capitalize ${documentTypeColors[doc.type]}`}
                                                    >
                                                        {doc.type}
                                                    </Badge>
                                                </div>
                                                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                {product.demoUrl && (
                                    <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                                        <Button size="lg" className="w-full rounded-full font-bold bg-foreground text-background">
                                            View Live Demo
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                )}
                                {product.githubUrl && (
                                    <a href={product.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" variant="outline" className="rounded-full border-2 font-bold bg-transparent">
                                            <Github className="mr-2 h-5 w-5" />
                                            GitHub
                                        </Button>
                                    </a>
                                )}
                                {product.docUrl && (
                                    <a href={product.docUrl} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" variant="outline" className="rounded-full border-2 font-bold bg-transparent">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Docs
                                        </Button>
                                    </a>
                                )}
                            </div>

                            {/* Quick Info Card */}
                            <div className="p-6 rounded-2xl bg-gray-50 border border-black/5">
                                <h3 className="text-lg font-bold text-foreground mb-4">Quick Info</h3>
                                <dl className="space-y-3">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Status</dt>
                                        <dd className="font-medium text-foreground">{product.status}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Department</dt>
                                        <dd className="font-medium text-foreground">{department.name}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Technologies</dt>
                                        <dd className="font-medium text-foreground">{product.technologies.length}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Media Items</dt>
                                        <dd className="font-medium text-foreground">{mediaItems.length}</dd>
                                    </div>
                                    {product.documents && (
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">Documents</dt>
                                            <dd className="font-medium text-foreground">{product.documents.length}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Fullscreen Media Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-4"
                        onClick={() => setIsFullscreen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 z-50"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Fullscreen Media */}
                        <div
                            className="relative w-full max-w-6xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeMedia.type === "image" ? (
                                <motion.img
                                    key={`fullscreen-${activeMediaIndex}`}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={activeMedia.url}
                                    alt={activeMedia.alt || product.name}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            ) : (
                                <motion.video
                                    key={`fullscreen-${activeMediaIndex}`}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={activeMedia.url}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain rounded-lg"
                                >
                                    Your browser does not support the video tag.
                                </motion.video>
                            )}
                        </div>

                        {/* Fullscreen Thumbnails */}
                        {mediaItems.length > 1 && (
                            <div
                                className="flex gap-4 mt-6 overflow-x-auto pb-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {mediaItems.map((media, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveMediaIndex(index)}
                                        className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === activeMediaIndex
                                            ? "border-white ring-2 ring-white/30"
                                            : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        {media.type === "image" ? (
                                            <img
                                                src={media.url}
                                                alt={media.alt || `Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <>
                                                <div className="w-full h-full bg-gray-800">
                                                    <video
                                                        src={media.url}
                                                        className="w-full h-full object-cover"
                                                        muted
                                                        preload="metadata"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                    <Play className="h-5 w-5 text-white fill-white" />
                                                </div>
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Caption */}
                        <p className="text-white/70 text-sm mt-4">
                            {activeMedia.alt || product.name} • {activeMediaIndex + 1} of {mediaItems.length}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {activePdfUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/90 flex flex-col"
                        onClick={closePdfViewer}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-6 py-4 bg-gray-900/80 backdrop-blur-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-white" />
                                <h3 className="text-white font-semibold text-lg">{activePdfTitle}</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={activePdfUrl}
                                    download
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium"
                                >
                                    <FileText className="h-4 w-4" />
                                    Download
                                </a>
                                <button
                                    onClick={closePdfViewer}
                                    className="rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Embed */}
                        <div
                            className="flex-1 p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`${activePdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                                className="w-full h-full rounded-lg bg-white"
                                title={activePdfTitle}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

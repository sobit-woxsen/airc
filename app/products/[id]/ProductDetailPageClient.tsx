"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, FileText, Play, Maximize2, X, ArrowRight, Download, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlurImage from "@/components/blur-image"
import type { Product, Department } from "@/lib/products-data"
import { cn } from "@/lib/utils"

interface ProductDetailPageClientProps {
  product: Product
  department?: Department
  suggestedProducts?: Product[]
}

export default function ProductDetailPageClient({ product, department, suggestedProducts = [] }: ProductDetailPageClientProps) {
  const searchParams = useSearchParams()
  const fromDept = searchParams.get("from") || "all"

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  // Build back link with department filter and scroll to this product
  const backLink = `/products?dept=${fromDept}&scroll=${product.id}`

  // Combine images and videos for the gallery
  const allMedia = [
    ...(product.media?.filter(m => m.type === "video") || []),
    ...(product.media?.filter(m => m.type === "image") || [])
  ]

  const hasMedia = allMedia.length > 0
  const hasDocuments = product.documents && product.documents.length > 0

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-cream relative overflow-hidden text-black">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link href={backLink} className="inline-block my-12">
            <div className="group flex items-center gap-2 text-[10px] font-semibold uppercase text-black/40 hover:text-black transition-colors">
              <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Products
            </div>
          </Link>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Product Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {hasMedia ? (
                <div className="rounded-2xl border border-black/5 overflow-hidden bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative">
                  <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                  <div className="p-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 relative group">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full"
                        >
                          {allMedia[currentSlide]?.type === "video" ? (
                            <div className="w-full h-full bg-black relative">
                              <video
                                src={allMedia[currentSlide]?.url}
                                controls
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <BlurImage
                              src={allMedia[currentSlide]?.url || "/placeholder.svg"}
                              alt={`Media ${currentSlide + 1}`}
                              fill
                              className="object-cover"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {allMedia.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-xl z-10"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setCurrentSlide((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-xl z-10"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      <button
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-xl z-10"
                        onClick={() => setIsMediaModalOpen(true)}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase z-10">
                        {currentSlide + 1} / {allMedia.length}
                      </div>
                    </div>

                    {allMedia.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        {allMedia.map((media, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all relative ${i === currentSlide
                              ? "border-accent shadow-lg shadow-accent/20"
                              : "border-transparent opacity-60 hover:opacity-100 hover:border-black/10"
                              }`}
                          >
                            {media?.type === "video" ? (
                              <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                                <Play className="h-4 w-4 text-black/40" />
                              </div>
                            ) : (
                              <BlurImage
                                src={media?.url || "/placeholder.svg"}
                                alt={`Thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden bg-neutral-100 aspect-video relative shadow-xl">
                  <BlurImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-12 pt-8">
                {product.tags && product.tags.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[10px] font-semibold uppercase text-black/40">Research Focus</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white border border-black/5 rounded-full text-[11px] font-semibold text-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[10px] font-semibold uppercase text-black/40">Architecture</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-black text-white rounded-full text-[11px] font-semibold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold uppercase rounded-full">
                    {department?.name}
                  </span>
                  <span className={cn(
                    "px-3 py-1 text-[10px] font-semibold uppercase rounded-full border",
                    product.status === "Production" ? "bg-green-50 text-green-600 border-green-100" :
                      product.status === "Beta" ? "bg-blue-50 text-blue-600 border-blue-100" :
                        "bg-orange-50 text-orange-600 border-orange-100"
                  )}>
                    {product.status} Phase
                  </span>
                </div>

                <div>
                  <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-black mb-4">
                    {product.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-accent font-medium leading-tight">
                    {product.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-black/5">
                <div className="flex items-center gap-3">
                  <h2 className="text-[11px] font-semibold uppercase text-black/40">Innovation Overview</h2>
                </div>
                <div className="text-lg text-black/60 leading-relaxed font-medium">
                  {product.description}
                </div>
              </div>

              {hasDocuments && (
                <div className="space-y-6 pt-12">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[11px] font-semibold uppercase text-black/40">Research Materials</h2>
                  </div>
                  <div className="grid gap-3">
                    {product.documents!.map((doc, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedPdf({ title: doc.title, url: doc.url })
                          setIsPdfModalOpen(true)
                        }}
                        className="group flex items-center justify-between p-6 bg-white border border-black/5 rounded-2xl hover:border-accent/20 transition-all hover:bg-neutral-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shadow-lg overflow-hidden relative">
                            <div className="absolute inset-0 bg-noise opacity-20" />
                            <FileText className="h-5 w-5 relative z-10" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-black uppercase">{doc.title}</p>
                            <p className="text-xs text-black/40 font-semibold uppercase">Technical Documentation</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-black/20 group-hover:text-accent transition-all group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-8">
                {product.demoUrl && product.demoUrl.trim().toLowerCase().startsWith("http") && (
                  <Link href={product.demoUrl} target="_blank" className="flex-1">
                    <Button size="lg" className="w-full h-16 rounded-full bg-black text-white text-[11px] font-semibold uppercase tracking-widest hover:scale-[1.02] hover:bg-black/90 transition-all shadow-xl shadow-black/10">
                      Access Live Environment
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <section className="mt-32 py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.02]" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase text-accent">Related Research</span>
                </div>
                <h2 className="text-4xl font-medium tracking-tighter text-black">Suggested Innovations</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {suggestedProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/products/${p.id}?from=${fromDept}`} className="group block h-full">
                      <div className="flex flex-col h-full bg-white rounded-2xl border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                        <div className="relative h-48 overflow-hidden">
                          <BlurImage src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-8">
                          <h3 className="text-xl font-medium text-black mb-1 group-hover:text-accent transition-colors">{p.name}</h3>
                          <p className="text-xs font-semibold text-accent uppercase">{p.tagline}</p>
                          <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold uppercase text-black/40 group-hover:text-black transition-colors">
                            Exploration
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-black text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-10" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-24 top-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full"
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 ">
                Ready to <span className="text-accent underline underline-offset-8 decoration-1">Innovate</span>?
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                Have a question about {product.name} or interested in collaborating with our research team? We'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link href="/contact">
                  <Button className="px-10 py-4 bg-white text-black text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all hover:scale-105 hover:bg-accent hover:text-white h-auto">Get In Touch</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="px-10 py-4 border border-white/20 bg-black text-white text-[11px] font-semibold uppercase tracking-widest rounded-full transition-all hover:bg-white hover:text-black h-auto">Learn More</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
          <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none flex flex-col p-0 gap-0 !rounded-none !border-0">
            <DialogHeader className="p-4 border-b border-black/5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold">{selectedPdf?.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  {selectedPdf && (
                    <a href={selectedPdf.url} download>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 min-h-0">
              {selectedPdf && <iframe src={selectedPdf.url} className="w-full h-full border-0" title="PDF Viewer" />}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
          <DialogContent className="fixed !inset-0 !z-50 !w-screen !h-screen !max-w-none !bg-black/95 !p-0 !m-0 !gap-0 !border-none !rounded-none !top-0 !left-0 !translate-x-0 !translate-y-0 flex items-center justify-center outline-none">
            <DialogHeader className="absolute top-4 right-4 z-50">
              <button onClick={() => setIsMediaModalOpen(false)} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </DialogHeader>
            <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  {allMedia[currentSlide]?.type === "video" ? (
                    <video src={allMedia[currentSlide]?.url} controls autoPlay className="max-w-full max-h-full mx-auto" />
                  ) : (
                    <BlurImage src={allMedia[currentSlide]?.url || "/placeholder.svg"} alt={`Image ${currentSlide + 1}`} fill className="object-contain" />
                  )}
                  {allMedia.length > 1 && (
                    <>
                      <button onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm">
                        <ArrowLeft className="h-8 w-8" />
                      </button>
                      <button onClick={() => setCurrentSlide((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm">
                        <ArrowRight className="h-8 w-8" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-6 py-2 rounded-full text-lg font-semibold backdrop-blur-md">
                    {currentSlide + 1} / {allMedia.length}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  )
}

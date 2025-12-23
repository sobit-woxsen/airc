"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, FileText, Play, Maximize2, X, ArrowRight, Download, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlurImage from "@/components/blur-image"

interface Department {
  id: string
  name: string
  color: string
}

export default function PreviewClient() {
  const searchParams = useSearchParams()

  // Decode project data from URL
  const name = searchParams.get("name") || "Project Name"
  const tagline = searchParams.get("tagline") || "Project tagline"
  const description = searchParams.get("description") || "Project description"
  const image = searchParams.get("image") || ""
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) || []
  const technologies = searchParams.get("technologies")?.split(",").filter(Boolean) || []
  const productStatus = searchParams.get("productStatus") || "Alpha"
  const demoUrl = searchParams.get("demoUrl") || ""
  const githubUrl = searchParams.get("githubUrl") || ""
  const docUrl = searchParams.get("docUrl") || ""
  const previewUrl = searchParams.get("previewUrl") || ""

  // Parse departments
  const departmentsData = searchParams.get("departments")
  const departments: Department[] = departmentsData ? JSON.parse(decodeURIComponent(departmentsData)) : []

  // Parse media items (additional images/videos)
  const mediaData = searchParams.get("media")
  const additionalMedia: { type: string; url: string }[] = mediaData ? JSON.parse(decodeURIComponent(mediaData)) : []

  // Parse documents
  const docData = searchParams.get("documents")
  const documentsParam: { title: string; url: string; type: string }[] = docData ? JSON.parse(decodeURIComponent(docData)) : []

  const allMedia = [
    { type: "image", url: image },
    ...additionalMedia.map(m => ({ type: m.type.toLowerCase(), url: m.url }))
  ].filter(m => m.url)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const hasMedia = allMedia.length > 0

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Preview Header Info */}
          <div className="bg-white/50 border border-black/5 rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Preview Mode — View unsaved changes</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => window.close()}
            >
              Close Preview
            </Button>
          </div>

          <Alert className="mb-12 bg-blue-50 border-blue-100 text-blue-800 rounded-2xl">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="font-medium">
              This is a live preview. Some interactive features like "Suggested Innovations" are placeholders for design visualization.
            </AlertDescription>
          </Alert>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {departments.map((dept) => (
                    <Badge
                      key={dept.id}
                      className="text-xs font-bold uppercase tracking-wider border-0"
                      style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                    >
                      {dept.name}
                    </Badge>
                  ))}
                  <Badge
                    className={`text-xs font-medium ${productStatus === "Production"
                      ? "bg-green-500/15 text-green-700 border-green-500/30"
                      : productStatus === "Beta"
                        ? "bg-blue-500/15 text-blue-700 border-blue-500/30"
                        : productStatus === "Alpha"
                          ? "bg-orange-500/15 text-orange-700 border-orange-500/30"
                          : "bg-gray-500/15 text-gray-700 border-gray-500/30"
                      }`}
                  >
                    {productStatus}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">{name}</h1>
                <p className="text-xl font-medium text-muted-foreground">{tagline}</p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">About</h2>
                <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {description}
                </div>
              </div>

              {/* Documents */}
              {documentsParam.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Documents</h2>
                  <div className="grid gap-3">
                    {documentsParam.map((doc, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedPdf({ title: doc.title, url: doc.url })
                          setIsPdfModalOpen(true)
                        }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white border border-black/5 hover:border-black/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50/50 text-left group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-black">{doc.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{doc.type}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-black" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button size="lg" className="flex-1 min-w-[200px] rounded-full font-bold bg-black text-white cursor-not-allowed opacity-70">
                  View Live Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 font-bold bg-transparent cursor-not-allowed opacity-70">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Media Viewer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {hasMedia ? (
                <div className="rounded-2xl border border-black/5 overflow-hidden bg-white">
                  <div className="p-4">
                    <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative group">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full"
                        >
                          {allMedia[currentSlide].type === "video" ? (
                            <div className="w-full h-full bg-black relative">
                              <video
                                src={allMedia[currentSlide].url}
                                controls
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <img
                              src={allMedia[currentSlide].url || "/placeholder.svg"}
                              alt={`Media ${currentSlide + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {allMedia.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setCurrentSlide((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black z-10"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              setCurrentSlide((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black z-10"
                          >
                            <ArrowLeft className="h-4 w-4 rotate-180" />
                          </button>
                        </>
                      )}

                      <button
                        className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black z-10"
                        onClick={() => setIsMediaModalOpen(true)}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>

                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                        {currentSlide + 1} / {allMedia.length}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    {allMedia.length > 1 && (
                      <div className="grid grid-cols-5 gap-2 mt-4">
                        {allMedia.map((media, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`aspect-video rounded-lg overflow-hidden border-2 transition-all relative ${i === currentSlide
                              ? "border-black"
                              : "border-transparent hover:border-black/20"
                              }`}
                          >
                            {media.type === "video" ? (
                              <div className="w-full h-full bg-black/20 flex items-center justify-center">
                                <Play className="h-4 w-4 text-black/40" />
                              </div>
                            ) : (
                              <img
                                src={media.url || "/placeholder.svg"}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video relative">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground uppercase tracking-widest text-xs font-bold">
                    No Cover Image
                  </div>
                </div>
              )}

              {/* Tags & Tech */}
              <div className="flex flex-col gap-8 pt-4">
                {tags.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Focus Areas</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium border-black/5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {technologies.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Technologies</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className="rounded-full bg-black text-white px-2.5 py-0.5 text-[10px] font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Suggested Products Placeholder */}
        <section className="mt-24 py-24 bg-white/50 border-t border-black/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 opacity-40 grayscale pointer-events-none">
            <div className="flex flex-col mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Suggested Innovations</h2>
              <p className="text-muted-foreground font-medium mt-2">More breakthroughs from the same department</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-6 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-black rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant-blue/20 via-transparent to-vibrant-purple/20 opacity-30" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                  Ready to innovate?
                </h2>
                <p className="text-xl text-white/60 mb-10 leading-relaxed font-medium">
                  Have a question about {name} or interested in collaborating with our research team? We&apos;d love to hear from you.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200 px-10 h-14 text-lg font-bold">
                    Get In Touch
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-10 h-14 text-lg font-bold group">
                    Learn About Us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Modal */}
        <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
          <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none flex flex-col p-0 gap-0 !rounded-none !border-0">
            <DialogHeader className="p-4 border-b border-black/5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold">{selectedPdf?.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  {selectedPdf && (
                    <a href={selectedPdf.url} download>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsPdfModalOpen(false)} className="rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 min-h-0">
              {selectedPdf && (
                <iframe src={selectedPdf.url} className="w-full h-full border-0" title="PDF Viewer" />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Media Modal */}
        <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
          <DialogContent className="fixed !inset-0 !z-50 !w-screen !h-screen !max-w-none !bg-black/95 !p-0 !m-0 !gap-0 !border-none !rounded-none !top-0 !left-0 !translate-x-0 !translate-y-0 flex items-center justify-center outline-none">
            <DialogHeader className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </DialogHeader>
            <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden p-8">
              <div className="relative w-full h-full flex items-center justify-center">
                {allMedia[currentSlide]?.type === "video" ? (
                  <video
                    src={allMedia[currentSlide].url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full mx-auto"
                  />
                ) : (
                  <img
                    src={allMedia[currentSlide]?.url || "/placeholder.svg"}
                    alt={`Image ${currentSlide + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                )}

                {/* Fullscreen Navigation */}
                {allMedia.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm"
                    >
                      <ArrowLeft className="h-8 w-8" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlide((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors backdrop-blur-sm"
                    >
                      <ArrowLeft className="h-8 w-8 rotate-180" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  )
}

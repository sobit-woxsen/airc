"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { useState, useMemo } from "react"
import { BlurImage } from "@/components/blur-image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Image as ImageIcon, Maximize2, Camera, Binary, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { galleryItems } from "@/lib/gallery-data"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = useMemo(() => ["All", ...Array.from(new Set(galleryItems.map((item) => item.category))).sort()], [])

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="px-2 md:px-16 relative z-10 bg-transparent">
        <PageHeader
          title="Optic Archives"
          description="A visual synthesis of architectural breakthroughs, laboratory interactions, and research-grade collaboration sequences."
          breadcrumbs={[
            { label: "Documentation", href: "/" },
            { label: "Gallery" }
          ]}
        >
          <div className="flex flex-col lg:flex-row gap-6 mt-8 lg:mt-0 items-center">
            {/* Search Bar - Maintained current styling shape */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20 group-focus-within:text-accent transition-colors" />
              <Input
                type="search"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border border-black/5 bg-white text-base focus:ring-1 focus:ring-black/5 focus:border-black/10 transition-all shadow-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === category
                    ? "bg-black text-white border-black shadow-lg scale-105"
                    : "bg-white/50 backdrop-blur-sm border-black/5 text-black/40 hover:border-black/10 hover:text-black"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </PageHeader>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Metadata */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-black/5" />
            <div className="flex items-center gap-3 px-4 py-1.5 bg-neutral-50 rounded-lg border border-black/5">
              <Camera className="h-3.5 w-3.5 text-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                {filteredItems.length} Plates Identified
              </span>
            </div>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <div className="relative">
            {filteredItems.length > 0 ? (
              <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-3 space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      className="mb-6 break-inside-avoid"
                    >
                      <Link
                        href={`/gallery/p/${item.id}`}
                        className="group relative block w-full overflow-hidden rounded-lg bg-white border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03]"
                      >
                        <SpotlightCard
                          className="h-full border-none rounded-none bg-transparent"
                          spotlightColor="rgba(0, 0, 0, 0.02)"
                        >
                          <div className="relative aspect-auto overflow-hidden">
                            <BlurImage
                              src={item.src || "/placeholder.svg"}
                              alt={item.alt}
                              width={720}
                              height={480}
                              className="w-full h-auto transform transition-all duration-700 group-hover:scale-105"
                              priority={index < 4}
                            />

                            {/* Cinematic Overlays */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none z-20 m-2 rounded-lg" />

                            {/* Command Bar on Hover */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-30 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em]">Plate Sequence</span>
                                <span className="text-white text-[11px] font-semibold tracking-tight uppercase">{item.category}</span>
                              </div>
                              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white text-black hover:bg-neutral-100 transition-colors shadow-xl">
                                <Maximize2 className="h-4 w-4" />
                              </div>
                            </div>

                            {/* Corner Indicator */}
                            <div className="absolute top-4 right-4 z-30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                              <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/20">
                                <ImageIcon className="h-3 w-3 text-white" />
                              </div>
                            </div>
                          </div>
                        </SpotlightCard>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-32 rounded-lg border border-dashed border-black/10 bg-white/20 backdrop-blur-sm">
                <Binary className="h-12 w-12 text-black/10 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-black/40 mb-6 tracking-tight leading-none text-balance">No optic samples match your current query parameters.</h3>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                  className="rounded-lg h-12 px-8 bg-black text-white hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 text-[11px] font-bold uppercase tracking-widest border border-white/10"
                >
                  Reset Optics Matrix
                </Button>
              </div>
            )}
          </div>
        </div>
      </PageShell>
    </div>
  )
}

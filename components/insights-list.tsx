"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react"
import { BlurImage } from "@/components/blur-image"
import { Article } from "@/lib/mdx"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Button } from "@/components/ui/button"
import { ArticleShareButton } from "@/components/article-share-button"

interface InsightsListProps {
  articles: Article[]
  searchQuery?: string
  selectedCategory?: string
  layout?: "grid" | "list"
}

export function InsightsList({
  articles = [],
  searchQuery = "",
  selectedCategory = "All",
  layout = "grid",
}: InsightsListProps) {
  const allInsights = articles

  const insights = allInsights.filter((insight) => {
    const matchesSearch =
      searchQuery === "" ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      insight.tags?.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase()))

    return matchesSearch && matchesCategory
  })



  if (insights.length === 0) {
    return (
      <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-black/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <p className="text-sm font-semibold uppercase tracking-widest text-black/40">No research findings matching your criteria.</p>
      </div>
    )
  }

  return (
    <>
      {/* Results Count */}
      <div className="mb-12 flex items-center gap-3">
        <div className="flex flex-col -space-y-1">
          <span className="text-[10px] font-semibold uppercase text-black/20">Archive</span>
          <span className="text-sm font-medium text-black">
            {selectedCategory} {insights.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>
      </div>

      <div className={layout === "grid" ? "grid gap-12 md:grid-cols-2" : "flex flex-col gap-10"}>
        {insights.map((insight, index) => (
          <motion.div
            key={insight.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <SpotlightCard
              className="group rounded-2xl bg-white border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              spotlightColor="rgba(0, 0, 0, 0.02)"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
              <div className={`flex flex-col h-full ${layout === "list" ? "md:flex-row" : ""}`}>
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-neutral-100 ${layout === "list" ? "h-64 md:h-auto md:w-1/3 min-h-[300px]" : "h-64 w-full"
                    }`}
                >
                  <BlurImage
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-between p-8 space-y-6 ${layout === "list" ? "md:w-2/3" : "flex-1"
                    }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold uppercase rounded-full">
                        {insight.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-left text-balance mb-4 line-clamp-2">
                      <Link href={`/insights/${insight.slug}`} className="hover:text-black/70 transition-colors">
                        {insight.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed font-medium line-clamp-3">
                      {insight.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-black/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-[10px] text-black/40 font-semibold uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={insight.date}>
                            {new Date(insight.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{insight.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <ArticleShareButton
                          article={insight}
                          className="h-9 w-9 border-black/5 hover:border-black/10 hover:bg-neutral-50"
                        />
                        <Link href={`/insights/${insight.slug}`}>
                          <button
                            className="group relative cursor-pointer inline-flex h-10 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-black text-white px-6 text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              Read <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </>
  )
}

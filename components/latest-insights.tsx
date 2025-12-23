"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react"
import { Article } from "@/lib/mdx"

interface LatestInsightsProps {
  articles?: Article[]
}

export function LatestInsights({ articles = [] }: LatestInsightsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const insights = articles.slice(0, 3)

  // Don't render if no articles
  if (insights.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-24 border-y border-black/5 relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <motion.h2
              className="text-4xl md:text-5xl font-medium tracking-tighter text-left text-balance mb-4 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Latest Insights
            </motion.h2>
            <motion.p
              className="text-neutral-500 text-left text-balance font-medium text-lg leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Deep dives, tutorials, and thought leadership from our research team pushing the AI frontier.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link href="/insights">
              <button className="group relative cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-black px-10 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
                <span className="relative z-10 flex items-center gap-2">
                  View All Insights <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link href={`/insights/${insight.slug}`} className="group block h-full">
                <div className="relative flex flex-col h-full overflow-hidden rounded-lg border border-black/5 bg-white/40 p-8 backdrop-blur-md transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.04]">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase  text-accent">
                        {insight.category}
                      </span>
                      <div className="flex items-center gap-4 text-[10px] font-medium uppercase  text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {insight.readTime}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-medium tracking-tight leading-tight group-hover:text-accent transition-colors duration-300 mb-4">
                      {insight.title}
                    </h3>

                    <p className="text-neutral-500 text-sm  line-clamp-3 mb-8 font-medium">
                      {insight.excerpt}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-black/5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase  text-black group-hover:text-accent transition-all duration-300">
                        Read Article
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(insight.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Hover accent point */}
                  <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

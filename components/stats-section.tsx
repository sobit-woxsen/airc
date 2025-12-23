"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Users, BookOpen, Rocket } from "lucide-react"

// Counter component for animated counting
function Counter({ value, isInView }: { value: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  // Extract numeric value and suffix from string like "50+" or "500+"
  const numericValue = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/\d/g, "")

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds in milliseconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const currentValue = Math.round(easeOut * numericValue)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animateCount)
      }
    }

    requestAnimationFrame(animateCount)
  }, [isInView, numericValue])

  return (
    <span className="font-[family-name:var(--font-archivo)] tabular-nums">
      {displayValue}
      <span className="text-accent ml-1">{suffix}</span>
    </span>
  )
}

const stats = [
  {
    id: 1,
    icon: BookOpen,
    name: "Applied Research Papers",
    value: "50+",
    description: "Published in top-tier conferences",
  },
  {
    id: 2,
    icon: Rocket,
    name: "Products Launched",
    value: "15+",
    description: "From research to production",
  },
  {
    id: 3,
    icon: Users,
    name: "Bootcamp Alumni",
    value: "500+",
    description: "Trained innovators worldwide",
  },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-black/5 bg-white py-12">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
          {stats.map((stat, index) => {
            const isLast = index === stats.length - 1
            return (
              <motion.div
                key={stat.id}
                className="group relative flex flex-col items-center text-center gap-4 py-12 md:py-20 px-8 transition-colors hover:bg-black/[0.01]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-6xl md:text-7xl font-normal text-foreground mb-4 tracking-tighter transition-transform duration-500 group-hover:scale-105">
                    <Counter value={stat.value} isInView={isInView} />
                  </div>
                  <div className="text-sm font-bold text-black/40 uppercase tracking-[0.2em] mb-2">
                    {stat.name}
                  </div>
                  <div className="text-base text-neutral-500 max-w-[200px] leading-relaxed font-medium">
                    {stat.description}
                  </div>
                </div>

                {/* Subtle highlight dot */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

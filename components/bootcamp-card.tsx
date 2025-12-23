"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp, Check } from "lucide-react"
import Link from "next/link"

interface Bootcamp {
  id: string
  title: string
  duration: string
  nextCohort: string
  price: string
  level: string
  description: string
  syllabus: string[]
  prerequisites: string[]
  outcomes: string[]
}

export function BootcampCard({ bootcamp }: { bootcamp: Bootcamp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex h-full flex-col transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50/50 border-2 border-foreground/10 rounded-3xl overflow-hidden bg-white shadow-none font-sans">
        <CardHeader className="p-8">
          <div className="flex items-center justify-between gap-2 mb-6">
            <Badge
              variant={bootcamp.level === "Beginner" ? "secondary" : "default"}
              className="rounded-full px-4 py-1.5 font-semibold bg-primary/5 text-primary border-primary/10"
            >
              {bootcamp.level}
            </Badge>
            <span className="text-lg font-semibold text-foreground tracking-tight">{bootcamp.price}</span>
          </div>
          <CardTitle className="text-2xl font-medium leading-tight tracking-tighter">{bootcamp.title}</CardTitle>
          <CardDescription className="leading-relaxed text-sm text-foreground/70 mt-3 font-medium">
            {bootcamp.description}
          </CardDescription>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/50 font-medium tracking-tight">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {bootcamp.duration}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Next: {bootcamp.nextCohort}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-8 px-8 pb-8">
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground uppercase tracking-widest">Syllabus</h4>
            <ul className="space-y-3">
              {bootcamp.syllabus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed font-medium">
                  <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground uppercase tracking-widest">
              <TrendingUp className="h-4 w-4" />
              Outcomes
            </h4>
            <ul className="space-y-2">
              {bootcamp.outcomes.map((item) => (
                <li key={item} className="text-sm text-foreground/70 leading-relaxed font-medium">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/contact" className="block">
            <Button className="w-full rounded-full py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95">
              Apply now — {bootcamp.nextCohort}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

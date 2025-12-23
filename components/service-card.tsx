"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  caseStudies: string[]
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="flex h-full flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl border-2 border-foreground/10 bg-white">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold text-foreground">{service.title}</CardTitle>
          <CardDescription className="leading-relaxed text-base text-foreground/60 mt-2">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-8 px-8 pb-8">
          <div>
            <h4 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Features</h4>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                  <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-foreground uppercase tracking-wide">Case Studies</h4>
            <ul className="space-y-3">
              {service.caseStudies.map((study) => (
                <li key={study} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                  <Badge variant="outline" className="shrink-0 rounded-full border-primary/20 text-primary">
                    <ArrowRight className="h-3 w-3" />
                  </Badge>
                  <span>{study}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/contact" className="block pt-4">
            <button className="group flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

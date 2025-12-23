"use client"

import { motion } from "framer-motion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import React from "react"
import { DottedGlowBackground } from "./ui/dotted-glow-background"

interface PageHeaderProps {
  title: string
  description: string
  className?: string
  breadcrumbs?: { label: string; href?: string }[]
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  className = "",
  breadcrumbs,
  children
}: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12 ${className}`}>
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.03]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand/5 blur-3xl rounded-full" />
        <div className="absolute inset-0 z-0 opacity-[0.08]">
          <DottedGlowBackground
            gap={12}
            radius={2}
            color="black"
            glowColor="black"
            opacity={0.3}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
        )}

        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-left text-balance mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 text-left text-balance leading-relaxed mb-8"
          >
            {description}
          </motion.p>
        </div>

        {/* Action/Filter Area */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

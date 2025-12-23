"use client"

import type React from "react"

import { motion } from "framer-motion"

export function GridBackground({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground/10"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {children}
    </div>
  )
}

export function DotPattern({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Dot pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      {children}
    </div>
  )
}

export function AnimatedBeams() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 h-[500px] w-[2px] bg-gradient-to-b from-transparent via-accent/50 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          height: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 h-[500px] w-[2px] bg-gradient-to-b from-transparent via-secondary/50 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          height: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 1,
        }}
      />
    </div>
  )
}

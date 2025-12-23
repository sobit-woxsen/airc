"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReactNode } from "react"

interface PageShellProps {
  children: ReactNode
  className?: string
  mainClassName?: string
}

export function PageShell({ children, className = "", mainClassName = "bg-cream px-16" }: PageShellProps) {
  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      <Header />
      <main className={`flex-1 ${mainClassName}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

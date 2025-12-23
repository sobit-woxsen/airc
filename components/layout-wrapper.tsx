"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Check if we're on admin or engineer routes
  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/engineer")

  return (
    <div
      className={
        isDashboard
          ? "relative min-h-screen bg-white"
          : "max-w-[80vw] mx-auto border-xl border-black/5 relative min-h-screen bg-white shadow-sm"
      }
    >
      {children}
    </div>
  )
}

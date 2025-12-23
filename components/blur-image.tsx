"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlurImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  disableZoom?: boolean
}

export function BlurImage({ src, alt, fill, width, height, className, priority = false, disableZoom = false }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden", fill && "relative w-full h-full")}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? `${disableZoom ? "scale-100" : "scale-105"} blur-lg grayscale` : "scale-100 blur-0 grayscale-0",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  )
}

export default BlurImage

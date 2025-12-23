"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoIntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoHeight, setVideoHeight] = useState(30) // Start at 30% visible

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)))

      // Expand from 30% to 100% based on scroll
      const newHeight = 30 + scrollProgress * 70
      setVideoHeight(newHeight)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const togglePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              See Our Lab in Action
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we're pushing the boundaries of AI research and innovation
          </p>
        </div>

        <div className="relative mx-auto" style={{ width: "80%" }}>
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out group"
            style={{ height: `${videoHeight}vh` }}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              poster="/ai-research-lab-interior.jpg"
            >
              <source src="/placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay with play/pause button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                <Button
                  size="lg"
                  onClick={togglePlayPause}
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
                >
                  {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
                </Button>

                <div className="text-white font-medium text-sm">Scroll to reveal more</div>
              </div>
            </div>

            {/* Border glow effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-50 blur-xl -z-10" />
          </div>

          {/* Scroll indicator */}
          {videoHeight < 95 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <div className="text-sm text-muted-foreground font-medium">Scroll down</div>
              <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                <div className="w-1 h-3 rounded-full bg-gradient-to-b from-purple-500 to-cyan-500 animate-scroll" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

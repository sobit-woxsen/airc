"use client"

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { motion } from "framer-motion"
import Link from "next/link"
import { Play, Pause, ChevronRight } from "lucide-react"
import { MovingBorder } from "@/components/ui/moving-border"
import { useRef, useEffect } from "react"
import { useVideoPlayer } from "@/contexts/video-player-context"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    isPlaying,
    togglePlayPause,
    setPipMode,
    isPipMode,
    currentTime,
    syncState,
    registerMainVideo
  } = useVideoPlayer()

  // Register this video ref with the context
  useEffect(() => {
    if (videoRef.current) {
      registerMainVideo(videoRef.current)
    }
    return () => registerMainVideo(null)
  }, [registerMainVideo])

  // Sync context state to local video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!isPipMode) {
      if (Math.abs(video.currentTime - currentTime) > 0.5) {
        video.currentTime = currentTime
      }
      if (isPlaying && video.paused) {
        video.play().catch(e => console.log("Hero play prevented", e))
      } else if (!isPlaying && !video.paused) {
        video.pause()
      }
    } else {
      video.pause()
    }
  }, [isPlaying, isPipMode, currentTime])


  // Intersection Observer for PiP
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && isPlaying && !isPipMode) {
          setPipMode(true)
        } else if (entry.isIntersecting && isPipMode) {
          setPipMode(false)
        }
      })
    }, options)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isPlaying, isPipMode, setPipMode])

  // Sync time to context when playing locally
  const handleTimeUpdate = () => {
    if (!isPipMode && videoRef.current) {
      syncState(videoRef.current.currentTime, !videoRef.current.paused)
    }
  }

  // Handle manual play/pause click
  const handlePlayClick = () => {
    if (isPipMode) {
      setPipMode(false)
      setTimeout(() => {
        togglePlayPause()
      }, 100)
    } else {
      togglePlayPause()
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#fafafa] pt-32 pb-20 sm:pt-48 sm:pb-32 text-foreground">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Background Mesh/Blobs */}
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

        {/* Official Aceternity Dotted Glow Background */}
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_90%)]">
          <DottedGlowBackground
            className="pointer-events-none opacity-20 dark:opacity-100 h-full w-full"
            opacity={1}
            gap={10}
            radius={1.6}
            colorLightVar="--color-neutral-500"
            glowColorLightVar="--color-neutral-600"
            colorDarkVar="--color-neutral-500"
            glowColorDarkVar="--color-sky-800"
            backgroundOpacity={0}
            speedMin={0.3}
            speedMax={1.6}
            speedScale={1}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Animated Shiny Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <div className="group relative rounded-full border border-black/5 bg-white/50 px-4 py-1.5 backdrop-blur-md shadow-sm transition-all hover:bg-white/80">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="bg-gradient-to-r from-neutral-600 to-black bg-clip-text text-transparent font-semibold tracking-wide text-xs uppercase text-balance">
                  Pioneering AI Research & Innovation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Headline - High-end typography with gradient text */}
          <motion.h1
            className="text-balance text-5xl font-medium tracking-tighter sm:text-7xl lg:text-8xl text-neutral-950 font-sans leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Research that{" "}
            <span
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-accent via-accent/80 to-accent/60 px-[4px]">
              shapes
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1.5 bg-accent/20 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1, ease: "circOut" }}
              />
            </span>{" "}
            the future
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-pretty text-lg text-neutral-600 sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Turning deep research into world-class products. We bridge the gap between academic discovery and industrial innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/bootcamps">
              <button className="group relative cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-accent px-10 text-sm font-medium text-accent-foreground transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20">
                <span className="relative z-10 flex items-center gap-2">
                  Apply to Bootcamp <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
            <Link href="/products">
              <div className="relative p-[2px] rounded-full overflow-hidden group">
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "2px",
                  }}
                >
                  {/* <MovingBorder duration={5000} rx="35px" ry="35px">
                    <div className="h-3 w-10 opacity-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,var(--accent)_0%,transparent_100%)]" />
                  </MovingBorder> */}
                </div>
                <button
                  className="relative z-10 group cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-white/50 px-10 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white hover:border-black/10 hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Products <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-neutral-400 group-hover:text-black" />
                  </span>
                </button>
              </div>
            </Link>
          </motion.div>

          {/* Video Section with moving border beam effect */}
          <motion.div
            className="mt-24 mb-12 relative max-w-8xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            id="hero-video-section"
            ref={containerRef}
          >
            {/* Background decorative glow */}
            <div className="absolute -inset-20 bg-accent/5 blur-[120px] rounded-full opacity-50 -z-10" />

            {/* Video Container with Dynamic Border */}
            <div className="relative rounded-sm p-[0.5px] overflow-hidden group">
              {/* Aceternity Moving Border */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              >
                <MovingBorder duration={10000} rx="24px" ry="24px">
                  <div
                    className="h-32 w-32 opacity-[1] bg-[radial-gradient(var(--accent)_40%,transparent_60%)]"
                  />
                </MovingBorder>
              </div>

              {/* Glass Container */}
              <div className="relative z-10 rounded-sm border border-white/20 bg-white/40 p-1.5 shadow-2xl backdrop-blur-2xl">
                <div className="relative aspect-video overflow-hidden rounded-sm bg-neutral-100 shadow-inner">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://res.cloudinary.com/dtc5bdjew/video/upload/so_11,f_jpg,q_auto/v1766397931/AI_Research_Centre_at_Woxsen_University_by_Dr_Hemachandran_1080P_zgghiv.jpg"
                    onTimeUpdate={handleTimeUpdate}
                  >
                    <source
                      src="https://res.cloudinary.com/dtc5bdjew/video/upload/v1766397931/AI_Research_Centre_at_Woxsen_University_by_Dr_Hemachandran_1080P_zgghiv.mp4"
                      type="video/mp4"
                    />
                  </video>

                  {/* Glass Play Button */}
                  {!isPipMode && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/10 backdrop-blur-[2px]">
                      <motion.div
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlayClick}
                        className="rounded-full bg-white/20 backdrop-blur-2xl p-8 cursor-pointer border border-white/40 shadow-2xl flex items-center justify-center group/btn transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="h-10 w-10 text-white fill-white" />
                        ) : (
                          <Play className="h-10 w-10 text-white fill-white ml-1 group-hover/btn:scale-110 transition-transform" />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {/* PiP Indicator */}
                  {isPipMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                      <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <p className="text-neutral-900 font-bold text-sm">Watching in Mini Player</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

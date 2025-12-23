"use client"

import { useState, useRef, useEffect } from "react"
import { useAudioPlayer } from "@/contexts/audio-player-context"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, X, GripVertical } from "lucide-react"
import { motion, AnimatePresence, useDragControls } from "framer-motion"

export function FloatingAudioPlayer() {
  const { currentEpisode, isPlaying, currentTime, duration, togglePlayPause, seek, stopAndClear } = useAudioPlayer()
  const pathname = usePathname()
  const router = useRouter()
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [lastEpisodeId, setLastEpisodeId] = useState<number | null>(null)

  // Reset dismissed state when a new episode starts playing
  useEffect(() => {
    if (currentEpisode && currentEpisode.id !== lastEpisodeId) {
      setIsDismissed(false)
      setLastEpisodeId(currentEpisode.id)
    }
  }, [currentEpisode, lastEpisodeId])

  // Hide on podcast pages (/podcast and /podcast/[id]), show everywhere else
  const isPodcastPage = pathname === "/podcast" || pathname.startsWith("/podcast/")
  const shouldShow = currentEpisode && !isPodcastPage && !isDismissed

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleNavigateToPodcast = () => {
    if (!currentEpisode) return
    router.push(`/podcast/${currentEpisode.id}`)
  }

  const handleClose = () => {
    if (stopAndClear) {
      stopAndClear()
    }
    setIsDismissed(true)
  }

  return (
    <>
      {/* Drag constraints container - covers entire viewport */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      <AnimatePresence>
        {shouldShow && (
          <motion.div
            drag
            dragControls={dragControls}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-[60] w-[360px] rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-black/5 overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          >
            {/* Drag handle bar */}
            <div
              className="flex items-center justify-between px-3 py-2 bg-gray-50/80 border-b border-black/5"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span className="font-medium">Now Playing</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-600"
                onClick={handleClose}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Player content */}
            <div className="p-4">
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                {currentEpisode.image && (
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={currentEpisode.image}
                      alt={currentEpisode.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Play/Pause Button */}
                <Button
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-full bg-black hover:bg-black/90"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                </Button>

                <div className="flex-1 min-w-0 cursor-pointer" onClick={handleNavigateToPodcast}>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-foreground hover:text-accent transition-colors">
                        {currentEpisode.title}
                      </h4>
                      <p className="truncate text-xs text-muted-foreground">{currentEpisode.guest}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 tabular-nums">
                      <span>{formatTime(currentTime)}</span>
                      <span>/</span>
                      <span>{duration ? formatTime(duration) : currentEpisode.duration}</span>
                    </div>
                  </div>

                  {/* Progress Slider */}
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={(value) => seek(value[0])}
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

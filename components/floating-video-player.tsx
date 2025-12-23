"use client"

import { useVideoPlayer } from "@/contexts/video-player-context"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, Maximize2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function FloatingVideoPlayer() {
    const {
        isPipMode,
        floatingVideoRef,
        togglePlayPause,
        setPipMode,
        isPlaying,
        currentTime,
        syncState
    } = useVideoPlayer()

    // Sync state when mounting the floating player
    useEffect(() => {
        if (isPipMode && floatingVideoRef.current) {
            floatingVideoRef.current.currentTime = currentTime
            if (isPlaying) {
                floatingVideoRef.current.play().catch(e => console.log("Autoplay prevented", e))
            }
        }
    }, [isPipMode]) // Run when mode changes

    // Keep state synced while playing
    const handleTimeUpdate = () => {
        if (floatingVideoRef.current) {
            syncState(floatingVideoRef.current.currentTime, !floatingVideoRef.current.paused)
        }
    }

    const handleClose = () => {
        setPipMode(false)
        // pause when closing completely? or just return to hero? 
        // Usually if user closes PiP, they probably want to stop watching.
        if (floatingVideoRef.current) {
            floatingVideoRef.current.pause()
            syncState(floatingVideoRef.current.currentTime, false)
        }
    }

    // If user scrolls back up (handled by Hero), or clicks expand
    const handleExpand = () => {
        // Logic to scroll back to hero could go here, 
        // but for now we just disable PiP mode which will (ideally) hand control back to Hero if it's in view.
        // If Hero is NOT in view, we might need to scroll to it.
        // For this implementation, we'll assume Hero logic handles the "in view" part,
        // and this button essentially just "restores" the video to where it was.

        const heroElement = document.getElementById("hero-video-section")
        if (heroElement) {
            heroElement.scrollIntoView({ behavior: "smooth" })
        }
        // setPipMode(false) - this will happen automatically via IntersectionObserver in Hero when it scrolls into view
    }

    return (
        <AnimatePresence>
            {isPipMode && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 shadow-2xl rounded-lg overflow-hidden border-1 border-black/5"
                >
                    <div className="relative aspect-video group">
                        <video
                            ref={floatingVideoRef}
                            className="w-full h-full object-cover"
                            src="https://res.cloudinary.com/dtc5bdjew/video/upload/q_auto,f_auto/v1/intro_ptrka3.mp4"
                            loop
                            playsInline
                            onTimeUpdate={handleTimeUpdate}
                            onClick={togglePlayPause}
                        />

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                                onClick={togglePlayPause}
                            >
                                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                            </Button>
                        </div>

                        {/* Top Right Controls */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-white hover:bg-black/50 rounded-full"
                                onClick={handleExpand}
                                title="Scroll to video"
                            >
                                <Maximize2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-white hover:bg-red-500/80 hover:text-white rounded-full"
                                onClick={handleClose}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

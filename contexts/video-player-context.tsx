"use client"

import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react"

interface VideoPlayerContextType {
    isPlaying: boolean
    isPipMode: boolean
    currentTime: number
    duration: number
    isMuted: boolean
    volume: number
    videoRef: React.MutableRefObject<HTMLVideoElement | null> // Ref for the main video (in Hero)
    floatingVideoRef: React.MutableRefObject<HTMLVideoElement | null> // Ref for the floating video
    togglePlayPause: () => void
    setPipMode: (isPip: boolean) => void
    seek: (time: number) => void
    setVolume: (volume: number) => void
    toggleMute: () => void
    syncState: (time: number, playing: boolean) => void
    registerMainVideo: (element: HTMLVideoElement | null) => void
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined)

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPipMode, setIsPipMode] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolumeState] = useState(1)

    // We maintain refs to both possible video elements to sync them
    const mainVideoRef = useRef<HTMLVideoElement | null>(null)
    const floatingVideoRef = useRef<HTMLVideoElement | null>(null)

    // Keep track of which ref is currently the "active" one for state updates
    // When PiP is active, floating ref drives state. When not, main ref drives state.

    const syncState = (time: number, playing: boolean) => {
        setCurrentTime(time)
        setIsPlaying(playing)
    }

    const registerMainVideo = (element: HTMLVideoElement | null) => {
        mainVideoRef.current = element
    }

    const togglePlayPause = () => {
        const activeVideo = isPipMode ? floatingVideoRef.current : mainVideoRef.current

        // We update state regardless, but we try to control video if possible
        // Actually, if we just update state, the effects in components will trigger play/pause!
        // But for immediate response we often want to trigger it here.
        // However, if mainVideoRef is missing, we should still arguably toggle state
        // if we trust the component will eventually sync (or if it's just loading).
        // BUT for now, let's rely on the ref being present.

        if (activeVideo) {
            if (isPlaying) {
                activeVideo.pause()
            } else {
                activeVideo.play().catch(e => console.error("Play failed", e))
            }
            setIsPlaying(!isPlaying)
        } else {
            console.warn("No active video ref found to toggle")
        }
    }

    const setPipMode = (enabled: boolean) => {
        // When switching modes, we need to sync the time to the new player
        const sourceVideo = enabled ? mainVideoRef.current : floatingVideoRef.current
        const targetVideo = enabled ? floatingVideoRef.current : mainVideoRef.current

        if (sourceVideo) {
            // Capture current state
            const time = sourceVideo.currentTime
            const playing = !sourceVideo.paused

            // Update state
            setIsPipMode(enabled)
            setCurrentTime(time)
            setIsPlaying(playing)

            // Apply to target if it exists (it might not be mounted yet if switching to PiP)
            // We handle the actual syncing in a useEffect or when the component mounts
        } else {
            setIsPipMode(enabled)
        }
    }

    const seek = (time: number) => {
        const activeVideo = isPipMode ? floatingVideoRef.current : mainVideoRef.current
        if (activeVideo) {
            activeVideo.currentTime = time
            setCurrentTime(time)
        }
    }

    const setVolume = (vol: number) => {
        setVolumeState(vol)
        if (mainVideoRef.current) mainVideoRef.current.volume = vol
        if (floatingVideoRef.current) floatingVideoRef.current.volume = vol
    }

    const toggleMute = () => {
        const newMuted = !isMuted
        setIsMuted(newMuted)
        if (mainVideoRef.current) mainVideoRef.current.muted = newMuted
        if (floatingVideoRef.current) floatingVideoRef.current.muted = newMuted
    }

    return (
        <VideoPlayerContext.Provider
            value={{
                isPlaying,
                isPipMode,
                currentTime,
                duration,
                isMuted,
                volume,
                videoRef: mainVideoRef, // Exposed for HeroSection to attach to
                floatingVideoRef,
                togglePlayPause,
                setPipMode,
                seek,
                setVolume,
                toggleMute,
                syncState,
                registerMainVideo
            }}
        >
            {children}
        </VideoPlayerContext.Provider>
    )
}

export function useVideoPlayer() {
    const context = useContext(VideoPlayerContext)
    if (context === undefined) {
        throw new Error("useVideoPlayer must be used within a VideoPlayerProvider")
    }
    return context
}

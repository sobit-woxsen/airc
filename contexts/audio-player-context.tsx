"use client"

import type React from "react"

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react"

interface Episode {
  id: number
  title: string
  guest: string
  audioUrl: string
  duration: string
  image?: string
}

interface AudioPlayerContextType {
  currentEpisode: Episode | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playEpisode: (episode: Episode) => void
  togglePlayPause: () => void
  seek: (time: number) => void
  stopAndClear: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentEpisode) return

    audio.src = currentEpisode.audioUrl
    audio.load()

    const handleCanPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        setIsPlaying(false)
      }
    }

    audio.addEventListener("canplay", handleCanPlay, { once: true })

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [currentEpisode])

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode)
    setCurrentTime(0)
  }

  const togglePlayPause = async () => {
    const audio = audioRef.current

    if (!audio || !currentEpisode) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        setIsPlaying(false)
      }
    }
  }

  const seek = (time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }

  const stopAndClear = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      audio.src = ""
    }
    setCurrentEpisode(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playEpisode,
        togglePlayPause,
        seek,
        stopAndClear,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} preload="auto" className="hidden" />
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}

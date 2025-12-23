"use client"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Calendar, Clock, ArrowRight } from "lucide-react"
import { useAudioPlayer } from "@/contexts/audio-player-context"

import { BlurImage } from "@/components/blur-image"
import { SpotlightCard } from "@/components/ui/spotlight-card"

import Link from "next/link"
import { Episode } from "@/lib/podcast-data"

export function PodcastEpisode({ episode }: { episode: Episode }) {
  const { currentEpisode, isPlaying, togglePlayPause, playEpisode } = useAudioPlayer()

  const isCurrentEpisode = currentEpisode?.id === episode.id
  const isThisPlaying = isCurrentEpisode && isPlaying

  const handlePlayPause = () => {
    if (isCurrentEpisode) {
      togglePlayPause()
    } else {
      playEpisode(episode)
    }
  }

  return (
    <SpotlightCard
      className="w-full group rounded-lg transition-all duration-500 hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.02]"
      spotlightColor="rgba(0, 0, 0, 0.02)"
    >
      <div id={`episode-${episode.id}`} className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

        <div className="flex flex-col md:flex-row min-h-[300px]">
          {/* Image Section */}
          <div className="md:w-2/5 relative aspect-square md:aspect-auto overflow-hidden bg-neutral-100">
            <Link href={`/podcast/${episode.slug}`} className="block w-full h-full cursor-pointer relative z-10">
              <BlurImage
                src={episode.image || "/placeholder.svg"}
                alt={episode.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
            </Link>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 flex flex-col p-8 relative z-10">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-semibold uppercase tracking-wider text-black/40 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {new Date(episode.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-accent" />
                {episode.duration}
              </div>
            </div>

            <div className="space-y-4">
              <Link href={`/podcast/${episode.slug}`} className="block group/title">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tighter text-black group-hover/title:text-accent transition-colors duration-300 line-clamp-2">
                  {episode.title}
                </h3>
              </Link>

              <div className="text-[11px] font-semibold uppercase tracking-widest text-accent/80">
                GUEST: <span className="text-black">{episode.guest}</span>
              </div>

              <p className="text-sm font-medium leading-relaxed text-black/60 line-clamp-3">
                {episode.description}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button
                  onClick={handlePlayPause}
                  className="w-14 h-14 flex items-center justify-center bg-black text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                >
                  {isThisPlaying ? (
                    <Pause className="h-6 w-6 fill-white" />
                  ) : (
                    <Play className="h-6 w-6 ml-1 fill-white" />
                  )}
                </button>

                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-black/20">{isThisPlaying ? "Listening" : "Listen"}</span>
                  <span className="text-sm font-semibold text-black">
                    {isThisPlaying ? "Pause" : "Play"}
                  </span>
                </div>
              </div>

              <Link href={`/podcast/${episode.slug}`} className="group/btn hidden sm:block">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40 group-hover/btn:text-black transition-colors flex items-center gap-2">
                  See More <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlurImage } from "@/components/blur-image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause, Calendar, Clock, Share2, Headphones, Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAudioPlayer } from "@/contexts/audio-player-context"
import { Episode } from "@/lib/podcast-data"
import { Badge } from "@/components/ui/badge"

export default function PodcastEpisodeClient({ episode }: { episode: Episode }) {
    const { currentEpisode, isPlaying, togglePlayPause, playEpisode } = useAudioPlayer()
    const [isCopied, setIsCopied] = useState(false)

    const isCurrentEpisode = currentEpisode?.id === episode.id
    const isThisPlaying = isCurrentEpisode && isPlaying

    const handlePlayPause = () => {
        if (isCurrentEpisode) {
            togglePlayPause()
        } else {
            playEpisode(episode)
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-cream relative overflow-hidden">
            <Header />

            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

            <main className="flex-1 relative z-10 pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-12">
                        <Link
                            href="/podcast"
                            className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                        >
                            <div className="p-2 bg-white rounded-lg border border-black/5 group-hover:border-black/10 group-hover:bg-neutral-50 transition-all">
                                <ArrowLeft className="h-3.5 w-3.5" />
                            </div>
                            Back to Frequency
                        </Link>
                    </div>

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="relative w-full md:w-[450px] aspect-square rounded-lg overflow-hidden shadow-2xl shadow-black/5 flex-shrink-0 border border-black/5">
                                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-10" />
                                <BlurImage
                                    src={episode.image || "/placeholder.svg"}
                                    alt={episode.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-semibold uppercase rounded-sm border border-accent/20">
                                            Episode {episode.id}
                                        </span>
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">{episode.date}</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black leading-[1.1] text-balance">
                                        {episode.title}
                                    </h1>
                                    <div className="flex items-center gap-4 py-4 px-6 bg-white/50 backdrop-blur-sm border border-black/5 rounded-lg w-fit">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-black/20">Guest</span>
                                        <span className="text-sm font-semibold text-black">{episode.guest}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 items-center">
                                    <button
                                        onClick={handlePlayPause}
                                        className="h-14 px-10 bg-black cursor-pointer text-white rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/10 flex items-center gap-3 group"
                                    >
                                        {isThisPlaying ? (
                                            <>
                                                <Pause className="h-4 w-4 fill-white" />
                                                Playing
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4 fill-white ml-0.5" />
                                                Play this Episode
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-6 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-accent" />
                                            {episode.duration}
                                        </div>
                                        {/* <div className="flex items-center gap-2">
                                            <Headphones className="w-4 h-4 text-accent" />
                                            Direct Feed
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-16 border-t border-black/5">
                        <div className="lg:col-span-8 space-y-16">
                            {/* Description */}
                            <section>
                                <div className="flex items-center gap-4 mb-4">
                                    {/* <div className="h-px flex-1 bg-black/5" /> */}
                                    <h2 className="text-[10px] font-semibold uppercase tracking-widest text-black/40">About this Podcast</h2>
                                    {/* <div className="h-px flex-1 bg-black/5" /> */}
                                </div>
                                <div className="prose prose-neutral max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-black/70 prose-strong:text-black">
                                    <p>{episode.description}</p>
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 rounded-lg border border-black/5 bg-white relative overflow-hidden shadow-xl shadow-black/[0.02]">
                                    <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                    <h3 className="text-[10px] font-semibold uppercase tracking-widest text-black/20 mb-4">Relay Signal</h3>
                                    <p className="text-sm text-black/60 font-medium mb-8">Disseminate this transmission through your secure network.</p>
                                    <button
                                        onClick={handleCopyLink}
                                        className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-black/5 bg-transparent text-black text-[10px] font-semibold uppercase tracking-widest hover:border-black/10 hover:bg-neutral-50 transition-all group"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                Relayed
                                            </>
                                        ) : (
                                            <>
                                                <Share2 className="w-3.5 h-3.5 text-accent transition-transform group-hover:scale-110" />
                                                Copy Signal
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="p-8 rounded-lg border border-black/5 bg-black text-white relative overflow-hidden shadow-2xl shadow-black/10">
                                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                                    <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-4">Frequency Subscription</h3>
                                    <p className="text-sm text-white/60 font-medium mb-8">Maintain persistent connection to high-frequency updates.</p>
                                    <div className="space-y-3">
                                        <button className="w-full h-12 flex items-center justify-between px-6 rounded-lg bg-white/10 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:scale-[1.02]">
                                            <span className="flex items-center gap-3">
                                                <Headphones className="w-4 h-4" />
                                                Apple Pods
                                            </span>
                                            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                                        </button>
                                        <button className="w-full h-12 flex items-center justify-between px-6 rounded-lg bg-white/10 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:scale-[1.02]">
                                            <span className="flex items-center gap-3">
                                                <Headphones className="w-4 h-4" />
                                                Spotify
                                            </span>
                                            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

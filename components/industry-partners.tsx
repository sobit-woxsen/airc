"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"

export const partners = [
    { name: "AgMatrix", src: "/industry/AgMatrix.png", category: "Technology" },
    { name: "ECCU", src: "/industry/ECCU-new.png", category: "Education" },
    { name: "University of Johannesburg", src: "/industry/University_of_Johannesburg_Logo.svg.png", category: "Academic" },
    { name: "Venus Ventures", src: "/industry/Venusventures-logo.webp", category: "Ventures" },
    { name: "Xaltius", src: "/industry/XaltiusLogo_Resized_Big-1536x452.png", category: "Technology" },
    { name: "Advertflair", src: "/industry/advertflair.webp", category: "Technology" },
    { name: "African AI Academy", src: "/industry/african-artificial-intelligence-academy.png", invert: true, category: "Academic" },
    { name: "Arcomm", src: "/industry/arcomm.jpg", category: "Engineering" },
    { name: "Autorox", src: "/industry/autorox.png", category: "Technology" },
    { name: "Banka Bio", src: "/industry/banka-bio.png", category: "Sustainability" },
    { name: "Course5", src: "/industry/course5.png", category: "Technology" },
    { name: "Dhavalas", src: "/industry/dhavalas.jpg", category: "Engineering" },
    { name: "Edubuk", src: "/industry/edubuklogo.png", category: "Technology" },
    { name: "Goldern Signatures", src: "/industry/goldern-signatures.jpg", category: "Ventures" },
    { name: "IBA", src: "/industry/iba.webp", category: "Technology" },
    { name: "Boston SC", src: "/industry/logo-boston-sc-white.svg", invert: true, category: "Academic" },
    { name: "Postjer Group", src: "/industry/postjer-group.avif", category: "Logistics" },
    { name: "Prognica", src: "/industry/prognica.png", invert: true, category: "Healthcare" },
    { name: "Sleep Therapeutics", src: "/industry/sleep-therapeutics.png", category: "Healthcare" },
    { name: "The Scubaverse", src: "/industry/thescubaverse.webp", category: "Media" },
    { name: "Tianno", src: "/industry/tianno.png", category: "Technology" },
    { name: "TIH", src: "/industry/tih_logo.jpg", category: "Technology" },
    { name: "WaysAhead", src: "/industry/waysahead.png", category: "Technology" },
    { name: "Women on the Move", src: "/industry/women-on-the-move.png", category: "Community" },
    { name: "Xcel", src: "/industry/xcel.jpg", category: "Engineering" },
    { name: "PPCRC", src: "/industry/PPCRC-black.png", category: "Research" },
    { name: "GBY Teks", src: "/industry/Logo-GBY-Teks-Samping-scaled.png", invert: true, category: "Technology" },
]

export function IndustryPartners() {
    // Show a selection of partners on the home page
    const featuredPartners = partners.slice(0, 12)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="py-24 border-y border-black/5 relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -90, 0],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full"
                />

                {/* Official Aceternity Dotted Glow Background */}
                <DottedGlowBackground
                    className="opacity-20 pointer-events-none"
                    gap={15}
                    backgroundOpacity={0.01}
                    opacity={0.2}
                    color="rgba(0,0,0,0.1)"
                    glowColor="rgba(0,0,0,0.05)"
                />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl text-left">
                        <motion.h2
                            className="text-4xl md:text-5xl font-medium tracking-tighter text-left text-balance mb-4 leading-[1.1]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            Global Partner Network
                        </motion.h2>
                        <motion.p
                            className="text-neutral-500 text-left text-balance font-medium text-lg leading-relaxed max-w-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            We collaborate with forward-thinking organizations to bridge the gap between AI research and real-world impact.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        <Link href="/partners">
                            <button
                                className="group relative cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-white/50 px-10 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white hover:border-black/10 hover:scale-105 active:scale-95 shadow-xl shadow-black/5"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View all Partners <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-neutral-400 group-hover:text-black" />
                                </span>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/40 backdrop-blur-md shadow-2xl shadow-black/[0.02] divide-x divide-y divide-black/5">
                    {featuredPartners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.03, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="group relative h-44 flex flex-col items-center justify-center p-8 transition-all duration-500 border-black/5 hover:bg-white"
                        >
                            <div className="relative w-full h-12 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-110">
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    fill
                                    className={`object-contain ${partner.invert ? 'invert brightness-0 group-hover:invert-0 group-hover:brightness-100' : ''}`}
                                    sizes="(max-width: 768px) 50vw, 15vw"
                                />
                            </div>

                            <div className="absolute inset-x-0 bottom-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">{partner.name}</p>
                            </div>

                            {/* Hover accent point */}
                            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

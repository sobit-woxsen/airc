"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { partners } from "@/components/industry-partners"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"

export default function PartnersPage() {
    // Categorize partners for a cleaner layout
    const categorizedPartners = {
        "Technology & Engineering": partners.filter(p => ["Technology", "Engineering"].includes(p.category)),
        "Academic & Research": partners.filter(p => ["Academic", "Research", "Education"].includes(p.category)),
        "Healthcare & Sustainability": partners.filter(p => ["Healthcare", "Sustainability"].includes(p.category)),
        "Strategic & Ventures": partners.filter(p => ["Ventures", "Logistics", "Media", "Community"].includes(p.category)),
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />
            <main className="flex-1 pt-32 pb-24 relative">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.03)_0%,transparent_70%)]" />
                    <DottedGlowBackground
                        className="opacity-20 translate-y-[-10%]"
                        backgroundOpacity={0.0}
                        opacity={0.3}
                        color="rgba(0,0,0,0.2)"
                        glowColor="rgba(0,0,0,0.1)"
                    />
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Hero Section of Partners Page */}
                    <div className="mb-24 text-center max-w-3xl mx-auto">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-black transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-neutral-950 font-sans mb-6">
                            Global Innovation <span className="text-neutral-400">Partners</span>
                        </h1>
                        <p className="text-xl text-neutral-500 font-medium leading-relaxed">
                            We power our research by collaborating with the world's most innovative companies, academic institutions, and technology providers.
                        </p>
                    </div>

                    {/* Partner Categories */}
                    <div className="space-y-32">
                        {Object.entries(categorizedPartners).map(([category, items], catIndex) => (
                            <section key={category}>
                                <div className="flex items-center gap-4 mb-12">
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 font-sans">
                                        {category}
                                    </h2>
                                    <div className="h-px bg-black/[0.05] flex-1 mt-2" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-300">
                                        {items.length} Partners
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-dashed border-neutral-200">
                                    {items.map((partner, index) => (
                                        <motion.div
                                            key={partner.name}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="group relative h-40 flex flex-col items-center justify-center p-6 border-b border-r border-dashed border-neutral-200 hover:bg-neutral-50/50 transition-colors"
                                        >
                                            <div className="relative w-full h-12 grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100">
                                                <Image
                                                    src={partner.src}
                                                    alt={partner.name}
                                                    fill
                                                    className={`object-contain ${partner.invert ? 'invert brightness-0 group-hover:invert-0 group-hover:brightness-100' : ''}`}
                                                    sizes="(max-width: 768px) 50vw, 15vw"
                                                />
                                            </div>
                                            <div className="absolute inset-x-0 bottom-2 text-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-tight">{partner.name}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Join Section */}
                    <div className="mt-40 rounded-[3rem] bg-neutral-950 p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-8">
                                Want to join our network?
                            </h2>
                            <p className="text-neutral-400 text-lg mb-12 font-medium">
                                We're always looking for new research collaborations and strategic industry partnerships to build the future of AI together.
                            </p>
                            <Link href="/contact">
                                <Button className="rounded-full h-14 px-12 bg-white text-black hover:bg-neutral-100 font-bold text-base transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
                                    Become a Partner
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

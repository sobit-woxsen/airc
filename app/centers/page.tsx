"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Microscope, BrainCircuit } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export default function CentersPage() {
    const centers = [
        {
            title: "Centre for AI Governance and Human Infrastructure (CAGHI)",
            description: "A hub dedicated to fostering societal well-being without compromising AI innovation, focusing on ethical and responsible AI governance.",
            href: "/centers/caghi",
            isNew: true,
            icon: Microscope
        },
    ]

    return (
        <div className="relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

            <PageShell mainClassName="flex-1 bg-transparent px-2 md:px-16 relative z-10">
                <PageHeader
                    title="Research Labs & Centres"
                    description="Our specialized ecosystems where interdisciplinary research converges with ethical AI development to shape the future of technology architecture."
                    breadcrumbs={[
                        { label: "Organization", href: "/" },
                        { label: "Centres" }
                    ]}
                />

                <section className="pb-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-8 px-4 sm:px-0">
                            {centers.map((center, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                >
                                    <Link href={center.href} className="group block h-full">
                                        <SpotlightCard
                                            className="h-full rounded-lg border border-black/5 bg-white overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-2xl hover:shadow-black/[0.02]"
                                            spotlightColor="rgba(0, 0, 0, 0.02)"
                                        >
                                            <div className="relative p-10 flex flex-col h-full bg-white">
                                                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

                                                <div className="flex justify-between items-start mb-12 relative z-10">
                                                    <div className="p-4 rounded-lg bg-neutral-50 border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:scale-105 shadow-sm">
                                                        <center.icon className="h-7 w-7" />
                                                    </div>
                                                    {center.isNew && (
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-1">Status</span>
                                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-accent/5 rounded-lg border border-accent/10 text-accent text-[10px] font-semibold uppercase tracking-wider">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                                Active Log
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 relative z-10 mb-12">
                                                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter mb-5 group-hover:text-accent transition-colors leading-[1.1]">
                                                        {center.title}
                                                    </h2>
                                                    <p className="text-black/60 font-semibold leading-relaxed text-sm md:text-base max-w-md">
                                                        {center.description}
                                                    </p>
                                                </div>

                                                <div className="pt-8 border-t border-black/5 flex items-center justify-between relative z-10">
                                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                                                        Access Documentation
                                                    </span>
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-black text-white transform transition-all duration-500 group-hover:scale-105 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20">
                                                        <ArrowRight className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Coming Soon Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="h-full"
                            >
                                <div className="h-full min-h-[440px] rounded-lg border border-dashed border-black/10 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center text-center p-12 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                                    <div className="mb-8 p-6 rounded-lg bg-neutral-50/50 border border-black/5 group-hover:scale-110 transition-transform duration-700">
                                        <BrainCircuit className="h-10 w-10 text-black/20 group-hover:text-accent transition-colors" />
                                    </div>
                                    <div className="space-y-4 relative z-10">
                                        <h3 className="text-2xl font-semibold tracking-tighter text-black/40 group-hover:text-black transition-colors">Next Phase Initializing</h3>
                                        <p className="text-black/30 font-semibold max-w-xs mx-auto text-sm leading-relaxed">
                                            Expanding research parameters and architectural capabilities for next-generation intelligence paradigms.
                                        </p>
                                    </div>
                                    <div className="mt-8 px-6 py-2 rounded-lg bg-neutral-50 border border-black/5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/20">
                                        Pending Transmission
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </PageShell>
        </div>
    )
}

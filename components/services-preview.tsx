"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
    {
        id: "product-development",
        title: "Product Development",
        description: "We transform theoretical models into production-ready AI systems. Our engineering team specializes in building scalable pipelines that solve real-world challenges.",
        image: "/machine-learning-engine.jpg",
        features: ["Custom ML Architectures", "End-to-end Deployment", "Scalable Infrastructure"],
        link: "/products"
    },
    {
        id: "research-collaborations",
        title: "Research Collaborations",
        description: "Partner with our world-class researchers to explore the frontiers of Artificial Intelligence. We facilitate joint projects that push the boundaries of what's possible.",
        image: "/ai-research-lab-interior.jpg",
        features: ["Joint Research Initiatives", "Resource Sharing", "Co-authored Publications"],
        link: "/resources"
    },
    {
        id: "strategic-consulting",
        title: "Strategic Consulting",
        description: "Navigate the complex AI landscape with our expert guidance. We help organizations define their AI strategy, assess technology readiness, and implement best practices.",
        image: "/ai-startup-growth.jpg",
        features: ["Technology Roadmap", "Architecture Review", "Team Upskilling"],
        link: "/services"
    }
]

export function ServicesPreview() {
    return (
        <section className="py-24 border-y border-black/5 relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 45, 0],
                        x: [0, 30, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -45, 0],
                        x: [0, -30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand/5 blur-[120px] rounded-full"
                />
            </div>

            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-center text-balance mb-6 leading-[1.1]">
                            Our Expertise
                        </h2>
                        <p className="text-neutral-500 text-center text-balance font-medium text-lg leading-relaxed max-w-xl mx-auto">
                            We bridge the gap between academic research and industrial application through three core pillars.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-32 md:space-y-48">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`flex flex-col gap-16 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                }`}
                        >
                            {/* Image Side with Premium Frame */}
                            <motion.div
                                className="w-full lg:w-1/2 relative group"
                                initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            >
                                <div className="relative rounded-lg p-1.5 overflow-hidden group/frame">
                                    {/* Subtle Animated Border for Image */}
                                    {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/5 to-transparent group-hover/frame:from-accent/20 transition-colors duration-500" /> */}

                                    {/* <div className="relative z-10 rounded-lg bg-white p-1.5 shadow-2xl backdrop-blur-2xl"> */}
                                    <div className="relative aspect-video overflow-hidden border border-accent/20 rounded-lg bg-neutral-100 shadow-inner">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                                    </div>
                                    {/* </div> */}
                                </div>

                                {/* Decorative Floating Orb */}
                                <div className={`absolute -z-10 w-64 h-64 bg-accent/5 blur-[80px] rounded-full ${index % 2 === 1 ? '-left-10 -bottom-10' : '-right-10 -top-10'
                                    }`} />
                            </motion.div>

                            {/* Content Side */}
                            <motion.div
                                className="w-full lg:w-1/2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                            >
                                <div className="flex flex-col gap-8 max-w-xl">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-left leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-neutral-500 text-left text-lg leading-relaxed font-medium">
                                            {service.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-5">
                                        {service.features.map((feature, i) => (
                                            <motion.li
                                                key={i}
                                                className="flex items-center gap-4 text-neutral-900 font-medium text-base group/item"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-colors duration-300">
                                                    <Check className="w-3.5 h-3.5" />
                                                </div>
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="pt-6">
                                        <Link href={service.link}>
                                            <button
                                                className="group relative cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-white/50 px-10 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white hover:border-black/10 hover:scale-105 active:scale-95 shadow-xl shadow-black/5"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Explore Pillar <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-neutral-400 group-hover:text-black" />
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    )
}

"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, ChevronRight, Cpu, FlaskConical, BarChart3, Binary, ShieldCheck, Zap, Activity } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const services = [
  {
    id: "product-development",
    title: "Product Engineering",
    description: "Transforming theoretical machine intelligence into high-availability production systems. Our engineering collective architects scalable pipelines that resolve complex operational constraints.",
    image: "/machine-learning-engine.jpg",
    icon: <Cpu className="w-6 h-6" />,
    features: [
      "Custom ML Architectures",
      "End-to-end Neural Deployment",
      "Scalable Inference Infrastructure",
      "Latency & Throughput Optimization",
      "System Integrity Maintenance",
      "Cryptographic Security Layers"
    ],
    caseStudies: [
      { name: "Pathology Diagnostic Grid", result: "95% accuracy in automated detection" },
      { name: "High-Frequency Risk Matrix", result: "60% reduction in false signals" },
      { name: "Logistics Optimization Sequence", result: "30% reduction in overhead" }
    ],
    link: "/products"
  },
  {
    id: "research-collaborations",
    title: "Research Collaborations",
    description: "Partner with primary investigators to explore the boundaries of neural logic. We facilitate multi-disciplinary sequences that push the limits of modern machine intelligence.",
    image: "/ai-research-lab-interior.jpg",
    icon: <FlaskConical className="w-6 h-6" />,
    features: [
      "Joint Artificial Intelligence Initiatives",
      "Computational Resource Partitioning",
      "Direct Technology Transfer",
      "Access to Tier-1 Infrastructure",
      "Grant Architectural Support",
      "Collaborative Patent Development"
    ],
    caseStudies: [
      { name: "Quantum-Neural Optimization", result: "Archived in Primary Journals" },
      { name: "Biometric Identity Guard", result: "0.0001% false acceptance rate" },
      { name: "Global Environmental Synthesis", result: "40% efficiency amplification" }
    ],
    link: "/research"
  },
  {
    id: "strategic-consulting",
    title: "Strategic Architecture",
    description: "Navigating the machine intelligence landscape through technical auditing and roadmap synthesis. We assist organizations in defining their technological trajectory and risk posture.",
    image: "/ai-startup-growth.jpg",
    icon: <BarChart3 className="w-6 h-6" />,
    features: [
      "Technology Trajectory Mapping",
      "Neuromorphic System Audits",
      "Organizational Intelligence Upscaling",
      "Standardized Protocol Implementation",
      "Operational Risk Mitigation",
      "ROI Quantitative Analysis"
    ],
    caseStudies: [
      { name: "Sovereign AI Infrastructure", result: "3x acceleration in deployment" },
      { name: "Distributive Logic Optimization", result: "50% reduction in compute cost" },
      { name: "Ethical Governance Protocols", result: "Verified regulatory alignment" }
    ],
    link: "/contact"
  },
]

export function ServicesClient() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="px-2 md:px-16 relative z-10 bg-transparent">
        <PageHeader
          title="Our Services"
          description="From hardware-integrated product engineering to strategic research architecture, we facilitate technical synchronization across the enterprise spectrum."
          breadcrumbs={[
            { label: "Organization", href: "/" },
            { label: "Services" }
          ]}
        />

        {/* Services Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-40">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col gap-16 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-2xl shadow-black/[0.02]">
                    <div className="absolute inset-0 bg-noise opacity-[0.02] z-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Architectural Corner Accent */}
                    <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">Module 0{index + 1}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 space-y-10"
                >
                  <div className="space-y-6">
                    <span className="text-[10px] font-bold text-accent uppercase ">Operational Phase</span>
                    <h3 className="text-4xl font-semibold tracking-tighter text-black leading-none">
                      {service.title}
                    </h3>
                    <p className="text-black/60 font-semibold leading-relaxed text-lg max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-black/5">
                        <div className="p-1 bg-accent/10 rounded-md">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-xs font-semibold text-black/70 tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Case Studies - Spotlight Implementation */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-black uppercase">Validated Deployment Logs</span>
                    <div className="grid gap-3">
                      {service.caseStudies.map((study, i) => (
                        <SpotlightCard
                          key={i}
                          className="rounded-lg border border-black/5 bg-white transition-all duration-300 hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.02]"
                          spotlightColor="rgba(0, 0, 0, 0.02)"
                        >
                          <div className="p-5 flex items-center justify-between gap-6 group/item">
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-black tracking-tight">{study.name}</p>
                              <div className="flex items-center gap-2">
                                <Activity className="w-3 h-3 text-accent/40" />
                                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{study.result}</p>
                              </div>
                            </div>
                            <div className="h-8 w-8 rounded-lg bg-neutral-50 border border-black/5 flex items-center justify-center transition-colors group-hover/item:bg-black group-hover/item:text-white">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link href={service.link}>
                      <Button
                        className="h-14 rounded-full bg-black text-white px-10 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-black/10 group"
                      >
                        <span className="flex items-center gap-3">
                          See Products
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Infrastructure Sync CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-60 relative"
          >
            <div className="absolute inset-0 bg-black rounded-lg transform -rotate-1 scale-105 opacity-5 blur-2xl" />
            <div className="relative rounded-lg bg-black p-16 md:p-24 text-center overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                {/* <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Initialization Relay</span> */}
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight">
                  Integrate with our primary research core.
                </h2>
                <p className="text-white/60 text-lg font-medium leading-relaxed">
                  Authorize collaboration sequences to leverage our proprietary machine intelligence infrastructure for your unique organizational constraints.
                </p>
                <div className="pt-6">
                  <Link href={'/contact'}>
                    <Button
                      className="h-16 rounded-full bg-white text-black px-12 text-sm hover:bg-white hove:text-black cursor-pointer  transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 group"
                    >
                      <span className="flex items-center gap-3">
                        Contact Us
                        <ChevronRight className="w-4 h-4 " />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </PageShell>
    </div>
  )
}

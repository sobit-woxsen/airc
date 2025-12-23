
"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, ShieldCheck, Lightbulb, Users, Building, GraduationCap, Fingerprint, HeartPulse, Check, Info, BrainCircuit } from "lucide-react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export default function CAGHIPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const focusAreas = [
    {
      title: "AI & Education",
      description: "How should AI be ethically and responsibly integrated into teaching, exams, learning models, and curriculum?",
      icon: GraduationCap,
      color: "text-accent"
    },
    {
      title: "AI & Identity & Job",
      description: "How to regulate the impact of AI on the misuse of digital identity and unemployment?",
      icon: Fingerprint,
      color: "text-brand"
    },
    {
      title: "AI & Healthcare",
      description: "What government models and policies should be followed before deploying an AI-based healthcare system?",
      icon: HeartPulse,
      color: "text-accent"
    },
    {
      title: "AI & Public Services",
      description: "Identifying the existing key policies and government laws in promoting ethical and responsible AI.",
      icon: Building,
      color: "text-brand"
    }
  ]

  const activities = [
    {
      title: "Creating Awareness",
      description: "A knowledge hub that takes initiative in creating public awareness on the use of an ethical and responsible AI-based System and helps individuals, organisations, and society in understanding its need.",
      icon: Lightbulb
    },
    {
      title: "Responsible Governance",
      description: "Developing regulatory standards and policies for ethical design, deployment, and auditing AI-based systems in various sectors.",
      icon: ShieldCheck
    },
    {
      title: "Ethical Innovation",
      description: "Serve as a cooperative platform for innovators, policymakers, and researchers that together aim to reach new heights in AI innovation.",
      icon: Globe
    },
    {
      title: "Human Infrastructure",
      description: "Addressing the societal impact of AI through educational and training programs and ensuring human skills evolve side by side.",
      icon: Users
    }
  ]

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="flex-1 bg-transparent px-2 md:px-16 relative z-10">
        <PageHeader
          title="Centre for AI Governance & Human Infrastructure"
          description="We envision a future where Artificial Intelligence is realized equitably and ethically, ensuring robust protection for society and individuals."
          breadcrumbs={[
            { label: "Organization", href: "/" },
            { label: "Centres", href: "/centers" },
            { label: "CAGHI" }
          ]}
        >
          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mt-8 lg:mt-0">
            <Button asChild size="lg" className="rounded-lg h-12 px-8 bg-black text-white hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 text-[11px] font-semibold uppercase tracking-widest border border-white/10">
              <Link href="#contact" className="flex items-center gap-2">
                Collaborate with us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg h-12 px-8 border-black/5 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-black/10 transition-all text-[11px] font-semibold uppercase tracking-widest">
              <Link href="#mission">
                Read Mission
              </Link>
            </Button>
          </div>
        </PageHeader>

        {/* Mission Section */}
        <section id="mission" className="py-24 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-8"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-4 block underline decoration-accent/20 underline-offset-8">Core Mandate</span>
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[0.9] text-black mb-6">Equitable Future Architecture</h2>
                  <p className="text-black/60 font-semibold leading-relaxed text-lg max-w-xl">
                    Our mission is to establish a global standard for finding a critical balance between societal well-being and technological advancement in the field of AI.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Societal Well-being First",
                    "Ethical Policy Frameworks",
                    "Human-Centric Design",
                    "Global Standard Alignment"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-black/5">
                      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-black/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/5 to-transparent blur-2xl rounded-[2rem] pointer-events-none" />
                <div className="aspect-[4/3] rounded-lg bg-white border border-black/5 flex items-center justify-center p-12 shadow-2xl shadow-black/[0.02] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-noise opacity-[0.01]" />
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 delay-100">
                    <Globe className="w-48 h-48 rotate-12" />
                  </div>
                  <div className="relative z-10 text-center space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <p className="text-2xl md:text-3xl font-semibold tracking-tighter text-black leading-tight max-w-sm mx-auto">
                      Balanced Innovation for a Protected Society
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Identity & Functionality */}
        <section className="py-24 border-y border-black/5 bg-neutral-50/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1 space-y-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 block">Foundational Identity</span>
                <h2 className="text-3xl font-semibold tracking-tighter leading-none text-black">Who We Are</h2>
                <div className="h-1 w-12 bg-accent/20 rounded-full" />
              </div>
              <div className="lg:col-span-2">
                <p className="text-xl md:text-2xl font-semibold tracking-tight text-black flex flex-col gap-6 leading-snug">
                  The Centre for AI Governance and Human Infrastructure is an interdisciplinary research and policy hub under the AI Research Centre, Woxsen University.
                  <span className="text-black/40 text-lg">
                    We act as the critical intersection of AI research, ethical policy creation, and societal infrastructure planning, promoting human-centric solutions in AI deployments.
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent block">Operational Vectors</span>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter leading-none text-black">Strategic Pillars</h2>
                </div>
                <p className="text-black/40 font-semibold text-sm max-w-xs md:text-right">Contributing to the ecosystem through four primary axes of direct action.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <SpotlightCard
                    key={index}
                    className="p-10 rounded-lg border border-black/5 bg-white hover:border-black/10 transition-all duration-500 group shadow-xl shadow-black/[0.01]"
                    spotlightColor="rgba(0, 0, 0, 0.02)"
                  >
                    <div className="relative z-10 flex flex-col h-full bg-white">
                      <div className="mb-8 inline-flex p-4 rounded-lg bg-neutral-50 border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm">
                        <activity.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 tracking-tight group-hover:text-accent transition-colors leading-none">{activity.title}</h3>
                      <p className="text-black/60 font-semibold leading-relaxed text-base">{activity.description}</p>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Focus Matrix */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40 underline decoration-black/10 underline-offset-8">Research Parameters</span>
              <h2 className="text-4xl font-semibold tracking-tighter text-black">Key Focus Matrix</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-lg p-8 border border-black/5 hover:border-black/10 hover:shadow-2xl hover:shadow-black/[0.02] transition-all duration-500 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-lg bg-neutral-50 border border-black/5 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-black group-hover:text-white shadow-sm`}>
                      <area.icon className={`h-6 w-6 ${area.color} group-hover:text-white transition-colors`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 tracking-tighter leading-[1.1]">{area.title}</h3>
                    <p className="text-black/60 font-semibold leading-relaxed text-sm">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Module */}
        <section id="contact" className="py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative p-1 bg-gradient-to-br from-black/5 via-white/50 to-black/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/[0.02]">
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
              <div className="relative bg-white/40 backdrop-blur-3xl rounded-[1.9rem] p-10 md:p-16 border border-white/40 overflow-hidden text-center">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-12">
                  <div className="space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/5 rounded-lg border border-accent/10 text-accent text-[10px] font-semibold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Transmission Request Open
                    </span>
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-none text-black">Initialize Collaboration</h2>
                    <p className="text-black/60 font-semibold max-w-2xl mx-auto leading-relaxed text-lg">
                      Join us in shaping the ethical future of intelligence architecture. We welcome high-fidelity partnerships across government and industry.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 pt-4 text-left">
                    {[
                      { label: "Research Sync", email: "research@airc.edu", icon: BrainCircuit },
                      { label: "Education Logic", email: "edu@airc.edu", icon: GraduationCap },
                      { label: "Policy Counsel", email: "policy@airc.edu", icon: Info }
                    ].map((channel, i) => (
                      <div key={i} className="bg-white/60 p-6 rounded-lg border border-black/5 hover:border-black/10 transition-all duration-300 group/item">
                        <div className="flex items-center gap-3 mb-3">
                          <channel.icon className="h-4 w-4 text-black/20 group-hover/item:text-black transition-colors" />
                          <h4 className="font-semibold text-[10px] uppercase tracking-widest text-black/40">{channel.label}</h4>
                        </div>
                        <p className="text-sm font-semibold text-black hover:text-accent transition-colors cursor-pointer">{channel.email}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Clock, DollarSign, Users, Zap, Heart, Rocket, Binary, Cpu, Activity, Target, Sparkles, CheckCircle2, Globe } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const openPositions = [
  {
    id: "ml-engineer",
    title: "Senior Neural Systems Engineer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    salary: "$150k - $220k",
    description: "Architect production-grade machine intelligence systems and contribute to cutting-edge neural research initiatives.",
  },
  {
    id: "quantum-researcher",
    title: "Quantum Computation Researcher",
    department: "Research",
    location: "Hybrid / Boston",
    type: "Full-time",
    salary: "$140k - $200k",
    description: "Develop quantum algorithms and expand the computational boundaries of quantum logic systems.",
  },
  {
    id: "product-designer",
    title: "Senior Interface Architect",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $180k",
    description: "Design intuitive interfaces for complex AI and research-grade analytical tools.",
  },
  {
    id: "research-intern",
    title: "Research Associate (Internship)",
    department: "Research",
    location: "On-site / Multiple locations",
    type: "Internship",
    salary: "$8k - $12k/month",
    description: "3-6 month intensive research program alongside principal investigators.",
  },
  {
    id: "devops-engineer",
    title: "Infrastructure Operations Engineer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$140k - $190k",
    description: "Build and maintain high-availability infrastructure for large-scale ML deployment systems.",
  },
  {
    id: "technical-writer",
    title: "Technical Documentation Specialist",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Document research findings and create educational content for technical audiences.",
  },
]

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Compensation Matrix",
    description: "Industry-leading salaries, equity participation, and performance-based incentive structures.",
  },
  {
    icon: Heart,
    title: "Comprehensive Wellness Protocol",
    description: "Premium health, dental, vision coverage, and integrated mental health support systems.",
  },
  {
    icon: Rocket,
    title: "Professional Development Track",
    description: "Conference attendance budget, continuous learning programs, mentorship, and dedicated research time.",
  },
  {
    icon: Users,
    title: "Work-Life Integration",
    description: "Flexible scheduling parameters, unlimited time-off allocation, and remote-first operational model.",
  },
  {
    icon: Zap,
    title: "Advanced Research Infrastructure",
    description: "Latest hardware, GPU clusters, quantum computing access, and comprehensive research resources.",
  },
  {
    icon: Clock,
    title: "20% Autonomous Research Time",
    description: "Dedicate 20% of operational bandwidth to personal research initiatives and experimental projects.",
  },
]

const values = [
  {
    title: "Research Excellence Protocol",
    description: "We publish in tier-1 venues and continuously push the boundaries of computational possibility.",
  },
  {
    title: "Open Collaboration Framework",
    description: "Knowledge sharing, open source contributions, and transparent communication across all operational levels.",
  },
  {
    title: "Diverse Cognitive Perspectives",
    description: "We believe optimal solutions emerge from diverse teams and inclusive collaborative environments.",
  },
  {
    title: "Real-World Impact Metrics",
    description: "Our research solves tangible problems and creates measurable value for global society.",
  },
]

export default function CareersClient() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedLocation, setSelectedLocation] = useState<string>("All")

  const departments = ["All", "Engineering", "Research", "Design", "Content"]
  const types = ["All", "Full-time", "Internship"]
  const locations = ["All", "Remote", "Hybrid", "On-site"]

  const filteredPositions = useMemo(() => {
    return openPositions.filter((position) => {
      const matchesDepartment = selectedDepartment === "All" || position.department === selectedDepartment
      const matchesType = selectedType === "All" || position.type === selectedType
      const matchesLocation = selectedLocation === "All" || position.location.includes(selectedLocation)
      return matchesDepartment && matchesType && matchesLocation
    })
  }, [selectedDepartment, selectedType, selectedLocation])

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="px-2 md:px-16 relative z-10 bg-transparent">
        <PageHeader
          title="Talent Acquisition Portal"
          description="Join a collective of principal investigators and systems engineers working on problems that define the future. We're expanding the boundaries of machine intelligence, quantum computation, and sustainable technology."
          breadcrumbs={[
            { label: "Organization", href: "/" },
            { label: "Careers" }
          ]}
        >
          <div className="flex items-center gap-3 mt-8 lg:mt-0">
            <Badge className="rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-accent/10 text-accent border border-accent/20">
              <Activity className="h-3 w-3 mr-2 inline" />
              Active Recruitment
            </Badge>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              {filteredPositions.length} Open Positions
            </span>
          </div>
        </PageHeader>

        {/* Open Positions with Filters */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="mb-12 space-y-6">
            <div className="flex items-center gap-3">
              <Binary className="h-4 w-4 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Filter Parameters</span>
              <div className="h-px flex-1 bg-black/5" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Department Filter */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Department Vector</p>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedDepartment === dept
                          ? "bg-black text-white border-black shadow-lg"
                          : "bg-white/50 backdrop-blur-sm border-black/5 text-black/40 hover:border-black/10 hover:text-black"
                        }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Engagement Type</p>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedType === type
                          ? "bg-black text-white border-black shadow-lg"
                          : "bg-white/50 backdrop-blur-sm border-black/5 text-black/40 hover:border-black/10 hover:text-black"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Location Protocol</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedLocation === location
                          ? "bg-black text-white border-black shadow-lg"
                          : "bg-white/50 backdrop-blur-sm border-black/5 text-black/40 hover:border-black/10 hover:text-black"
                        }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Positions Grid */}
          <AnimatePresence mode="wait">
            {filteredPositions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-32 rounded-lg border border-dashed border-black/10 bg-white/20 backdrop-blur-sm"
              >
                <Binary className="h-12 w-12 text-black/10 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-black/40 mb-6 tracking-tight leading-none">
                  No positions match current filter parameters.
                </h3>
                <Button
                  onClick={() => {
                    setSelectedDepartment("All")
                    setSelectedType("All")
                    setSelectedLocation("All")
                  }}
                  className="rounded-lg h-12 px-8 bg-black text-white hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 text-[11px] font-bold uppercase tracking-widest"
                >
                  Reset Filter Matrix
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedDepartment}-${selectedType}-${selectedLocation}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6"
              >
                {filteredPositions.map((position, index) => (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <SpotlightCard
                      className="rounded-lg border border-black/5 bg-white hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.03]"
                      spotlightColor="rgba(0, 0, 0, 0.02)"
                    >
                      <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                                <Cpu className="h-5 w-5 text-accent" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <h3 className="text-xl font-semibold text-black tracking-tight">{position.title}</h3>
                                  <Badge className="rounded-lg text-[9px] font-bold uppercase tracking-wider bg-neutral-50 text-black/60 border border-black/5">
                                    {position.department}
                                  </Badge>
                                </div>
                                <p className="text-black/60 font-semibold leading-relaxed">{position.description}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-black/40 font-semibold">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>{position.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{position.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span>{position.salary}</span>
                              </div>
                            </div>
                          </div>

                          <Link href={`/contact?position=${position.id}`}>
                            <Button className="h-14 rounded-lg bg-black text-white px-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-black/10 group whitespace-nowrap">
                              <span className="flex items-center gap-3">
                                Initialize Application
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Benefits */}
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] block mb-4">Operational Benefits</span>
            <h2 className="text-4xl font-semibold text-black mb-4 tracking-tight">Comprehensive Support Infrastructure</h2>
            <p className="text-lg text-black/60 font-semibold max-w-2xl mx-auto leading-relaxed">
              We invest in our collective's growth, well-being, and success with comprehensive benefits and a supportive operational culture.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <SpotlightCard
                  className="h-full rounded-lg border border-black/5 bg-white hover:border-black/10 transition-all duration-500"
                  spotlightColor="rgba(0, 0, 0, 0.02)"
                >
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 text-accent border border-accent/20">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-black tracking-tight">{benefit.title}</h3>
                    <p className="text-black/60 font-semibold leading-relaxed">{benefit.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] block mb-4">Core Principles</span>
            <h2 className="text-4xl font-semibold text-black mb-4 tracking-tight">Operational Values Framework</h2>
            <p className="text-lg text-black/60 font-semibold max-w-2xl mx-auto leading-relaxed">
              These principles guide how we collaborate, innovate, and make decisions across all operational levels.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SpotlightCard
                  className="h-full rounded-lg border border-black/5 bg-white hover:border-black/10 transition-all duration-500"
                  spotlightColor="rgba(0, 0, 0, 0.02)"
                >
                  <div className="p-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-semibold text-black tracking-tight">{value.title}</h3>
                    </div>
                    <p className="text-lg text-black/60 font-semibold leading-relaxed">{value.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-black rounded-lg transform -rotate-1 scale-105 opacity-5 blur-2xl" />
            <div className="relative rounded-lg bg-black p-16 md:p-24 text-center overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Open Application Protocol</span>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight">
                  Don't see the optimal role configuration?
                </h2>
                <p className="text-white/60 text-lg font-semibold leading-relaxed">
                  We're continuously seeking exceptional talent. Transmit your credentials and let us know your research interests and technical specializations.
                </p>
                <div className="pt-6">
                  <Link href="/contact">
                    <Button className="h-16 rounded-lg bg-white text-black px-12 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 group">
                      <span className="flex items-center gap-3">
                        Initiate Contact Sequence
                        <Sparkles className="h-4 w-4" />
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

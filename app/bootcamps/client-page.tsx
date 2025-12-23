"use client"

import { useState, useMemo } from "react"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Clock, Calendar, Search, Target, Sparkles, BookOpen, ExternalLink, CheckCircle2, ChevronRight, Binary, Cpu, Activity, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { bootcampsData, bootcampCategories, type Bootcamp } from "@/lib/bootcamps-data"
import Link from "next/link"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function BootcampsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"short-term" | "long-term">("short-term")

  const filteredBootcamps = useMemo(() => {
    return bootcampsData.filter((bootcamp) => {
      const matchesType = bootcamp.type === activeTab
      const matchesSearch =
        searchQuery === "" ||
        bootcamp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bootcamp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bootcamp.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || bootcamp.category === selectedCategory

      return matchesType && matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, activeTab])

  const categories = useMemo(() => {
    const cats = new Set(
      bootcampsData.filter((b) => b.type === activeTab).map((b) => b.category)
    )
    return Array.from(cats)
  }, [activeTab])

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="px-2 md:px-16 relative z-10 bg-transparent">
        <PageHeader
          title="Educational Parameters"
          description="A dual-track pedagogical framework: focused short-term instructional modules for immediate impact, and dual-diploma cycles for architectural domain mastery."
          breadcrumbs={[
            { label: "Instruction", href: "/" },
            { label: "Bootcamps" }
          ]}
        >
          <div className="flex flex-col md:flex-row gap-4 mt-8 lg:mt-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search bootcamps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border border-black/5 text-base"
              />
            </div>

            {/* Type Filter Dropdown */}
            <div className="w-full md:w-48 flex-shrink-0">
              <Select value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <SelectTrigger className="min-h-12 min-w-30 rounded-full border border-black/5 px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10">
                  <SelectValue placeholder="Course type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-black/5">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Filter by type
                  </div>
                  <SelectItem value="short-term" className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12">
                    Short-Term ({bootcampsData.filter((b) => b.type === "short-term").length})
                  </SelectItem>
                  <SelectItem value="long-term" className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12">
                    Long-Term ({bootcampsData.filter((b) => b.type === "long-term").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter Dropdown */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="min-h-12 min-w-30 rounded-full border border-black/5 px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-black/5">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Filter by category
                  </div>
                  <SelectItem value="all" className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12">
                    All Categories
                  </SelectItem>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
                    >
                      {bootcampCategories[cat as keyof typeof bootcampCategories]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PageHeader>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Status */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-black/5" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
              {filteredBootcamps.length} Modules Identified
            </span>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsContent value={activeTab} className="mt-0">
              {filteredBootcamps.length === 0 ? (
                <div className="p-24 text-center rounded-lg border border-dashed border-black/10 bg-white/20 backdrop-blur-sm">
                  <Binary className="h-12 w-12 text-black/10 mx-auto mb-6" />
                  <p className="text-black/40 font-semibold tracking-tight text-lg">No matching instructional sequences found.</p>
                  <Button
                    variant="link"
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}
                    className="mt-4 text-accent uppercase text-[10px] font-bold tracking-widest"
                  >
                    Reset Parameters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBootcamps.map((bootcamp, index) => (
                    <BootcampCard key={bootcamp.id} bootcamp={bootcamp} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Infrastructure Support Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40"
          >
            <div className="text-center mb-20 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent underline underline-offset-8 decoration-accent/20">System Integration</span>
              <h2 className="text-4xl font-semibold tracking-tighter text-black">Instructional Scaffolding</h2>
              <p className="text-black/40 font-semibold max-w-xl mx-auto text-sm leading-relaxed">
                Standardized support protocols integrated into every pedagogical sequence for high-fidelity research training.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <GraduationCap className="h-5 w-5" />, title: "Lead Architects", desc: "Guidance from primary research directors and industry heads." },
                { icon: <Cpu className="h-5 w-5" />, title: "Tactile Labs", desc: "Computational access and real-world implementation logs." },
                { icon: <Activity className="h-5 w-5" />, title: "Career Relay", desc: "Automated deployment pipelines and placement assistance." },
                { icon: <Sparkles className="h-5 w-5" />, title: "Seal of Integrity", desc: "Industry-standard certification of master proficiency." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-lg border border-black/5 hover:border-black/10 transition-all duration-500 group shadow-xl shadow-black/[0.01]"
                >
                  <div className="w-12 h-12 rounded-lg bg-neutral-50 border border-black/5 flex items-center justify-center mb-8 transition-colors group-hover:bg-black group-hover:text-white shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 tracking-tight leading-none">{item.title}</h3>
                  <p className="text-black/60 text-sm font-semibold leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageShell>
    </div>
  )
}

function BootcampCard({ bootcamp, index }: { bootcamp: Bootcamp; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <SpotlightCard
        className="h-full rounded-lg border border-black/5 bg-white overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-2xl hover:shadow-black/[0.02] flex flex-col group"
        spotlightColor="rgba(0, 0, 0, 0.02)"
      >
        <div className="p-10 flex flex-col h-full bg-white relative">
          <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

          <div className="flex items-start justify-between gap-4 mb-10 relative z-10">
            <Badge className="rounded-lg px-3 py-1 bg-black text-white text-[9px] font-semibold uppercase tracking-[0.2em] border-none">
              {bootcampCategories[bootcamp.category as keyof typeof bootcampCategories]}
            </Badge>
            <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-lg border border-black/5 text-[9px] font-bold uppercase tracking-widest text-black/40">
              <Calendar className="h-3 w-3 text-accent" />
              {bootcamp.month}
            </div>
          </div>

          <div className="space-y-4 mb-8 relative z-10">
            <h3 className="text-2xl font-semibold tracking-tighter text-black leading-[1.1] group-hover:text-accent transition-colors">
              {bootcamp.title}
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-black/60">
                <Clock className="h-3.5 w-3.5 text-accent/40" />
                {bootcamp.duration}
              </div>
              <div className="h-1 w-1 rounded-full bg-black/10" />
              <div className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                Lvl. Advanced
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 relative z-10">
            <p className="text-black/60 text-sm font-semibold leading-relaxed line-clamp-3">
              {bootcamp.description}
            </p>

            {bootcamp.takeaways && bootcamp.takeaways.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-black/5">
                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Syllabus Focus</span>
                <ul className="grid gap-3">
                  {bootcamp.takeaways.slice(0, 3).map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-3 text-xs text-black/40 font-semibold group/li">
                      <div className="h-4 w-4 rounded-md bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0 group-hover/li:bg-accent group-hover/li:text-white transition-colors">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </div>
                      <span className="group-hover/li:text-black transition-colors">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-12 relative z-10">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeHW3NxmY92M3tyyBjdF32eRa885TGeyeP7ljvwiAViLVI0sw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full h-14 rounded-lg bg-black text-white hover:bg-neutral-900 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10 text-[10px] font-bold uppercase tracking-[0.2em] group overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  Initialize Application
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent/20 transition-all duration-300 group-hover:h-full group-hover:bg-accent/5" />
              </Button>
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

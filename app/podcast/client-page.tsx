"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { PodcastEpisode } from "@/components/podcast-episode"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { motion } from "framer-motion"

import { episodes } from "@/lib/podcast-data"

export default function PodcastPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState("All")

  const guests = ["All", ...Array.from(new Set(episodes.map((ep) => ep.guest.split(",")[0].trim()))).sort()]

  const filteredEpisodes = episodes.filter((episode) => {
    const matchesSearch =
      searchQuery === "" ||
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGuest = selectedGuest === "All" || episode.guest.includes(selectedGuest)

    return matchesSearch && matchesGuest
  })

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <PageShell mainClassName="flex-1 bg-transparent px-2 md:px-16 relative z-10">
        <PageHeader
          title="AI Research Center Podcast"
          description="Conversations with researchers, builders, and innovators shaping the future of technology. Subscribe to never miss an episode."
          breadcrumbs={[
            { label: "Resources", href: "/insights" },
            { label: "Podcast" }
          ]}
        >
          <div className="flex flex-row gap-2 sm:gap-4 lg:max-w-2xl">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border border-black/5 text-base"
              />
            </div>

            {/* Guest Filter Dropdown */}
            <div className="w-auto sm:w-64 flex-shrink-0">
              <Select value={selectedGuest} onValueChange={setSelectedGuest}>
                <SelectTrigger className="min-h-12 w-12 sm:w-auto rounded-full border border-black/5 px-3 sm:px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10 [&>svg:last-child]:hidden sm:[&>svg:last-child]:block justify-center sm:justify-start">
                  <Filter className="h-5 w-5 sm:hidden flex-shrink-0" />
                  <span className="hidden sm:inline">
                    <SelectValue placeholder="All Guests" />
                  </span>
                </SelectTrigger>
                <SelectContent className="rounded-lg border-black/5">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Filter by guest
                  </div>
                  {guests.map((guest) => (
                    <SelectItem
                      key={guest}
                      value={guest}
                      className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
                    >
                      {guest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PageHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto px-4 py-8 sm:px-6 lg:px-8"
        >
          {filteredEpisodes.length > 0 ? (
            <>
              {/* Results Count */}
              <div className="mb-12 max-w-7xl mx-auto flex items-center gap-3">
                <div className="flex flex-col -space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-black/20">Frequency</span>
                  <span className="text-sm font-medium text-black">
                    {selectedGuest} {filteredEpisodes.length === 1 ? 'Episode' : 'Episodes'}
                  </span>
                </div>
              </div>

              <div className="space-y-10 max-w-6xl mx-auto">
                {filteredEpisodes.map((episode, index) => (
                  <motion.div
                    key={episode.id}
                    id={`episode-${episode.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
                  >
                    <PodcastEpisode episode={episode} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-32 bg-white rounded-lg border border-dashed border-black/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
              <p className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-8">
                No research audio matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedGuest("All")
                }}
                variant="outline"
                className="rounded-lg px-8 h-12 text-[11px] font-semibold uppercase tracking-widest border border-black/5 hover:border-black/10 hover:bg-neutral-50 transition-all hover:scale-105"
              >
                Clear Signal
              </Button>
            </div>
          )}
        </motion.div>
      </PageShell>
    </div>
  )
}

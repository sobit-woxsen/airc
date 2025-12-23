"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ArrowRight, Calendar, MapPin, Filter, ChevronRight } from "lucide-react"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { BlurImage } from "@/components/blur-image"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { conferences } from "@/lib/conferences-data"

const statuses = ["All", "Upcoming", "Past"]

const statusColors = {
    "Upcoming": "bg-secondary/15 text-secondary-foreground border-secondary/30",
    "Registration Open": "bg-primary/5 text-primary dark:text-primary border-primary/10",
    "Past": "bg-muted text-muted-foreground border-border",
}

export default function ConferencesPage() {
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredConferences = conferences.filter((conference) => {
        const matchesStatus =
            selectedStatus === "All" ||
            (selectedStatus === "Upcoming" && (conference.status === "Upcoming" || conference.status === "Registration Open")) ||
            conference.status === selectedStatus

        const matchesSearch =
            searchQuery === "" ||
            conference.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conference.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conference.location.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    return (
        <PageShell mainClassName="bg-cream relative overflow-hidden px-2 md:px-16">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

            <PageHeader
                title="Conferences & Events"
                description="Join leading experts, researchers, and innovators at our upcoming global conferences."
                breadcrumbs={[
                    { label: "Resources", href: "/insights" },
                    { label: "Conferences" }
                ]}
            >
                <div className="flex flex-row items-center gap-2">
                    <div className="w-full lg:max-w-md">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search conferences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 rounded-full border border-black/5 text-base"
                            />
                        </div>
                    </div>

                    {/* Status Filter Dropdown */}
                    <div className="flex-shrink-0">
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="min-h-12 w-12 sm:w-auto rounded-full border border-black/5 px-3 sm:px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10 [&>svg:last-child]:hidden sm:[&>svg:last-child]:block justify-center sm:justify-start">
                                <Filter className="h-5 w-5 sm:hidden flex-shrink-0" />
                                <span className="hidden sm:inline">
                                    <SelectValue>
                                        {selectedStatus === "All" ? "All Status" : selectedStatus}
                                    </SelectValue>
                                </span>
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border-black/5">
                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                    Filter by status
                                </div>
                                {statuses.map((status) => (
                                    <SelectItem
                                        key={status}
                                        value={status}
                                        className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
                                    >
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </PageHeader>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Results Count */}
                <div className="mb-12 flex items-center gap-3">
                    <div className="flex flex-col -space-y-1">
                        <span className="text-[10px] font-semibold uppercase text-black/20">Archive</span>
                        <span className="text-sm font-medium text-black">
                            {selectedStatus} {filteredConferences.length === 1 ? 'Event' : 'Events'}
                        </span>
                    </div>
                </div>

                {/* Conferences List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-12 pb-16"
                >
                    {filteredConferences.map((conference, index) => (
                        <motion.article
                            key={conference.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <SpotlightCard
                                className="group rounded-2xl bg-white border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                                spotlightColor="rgba(0, 0, 0, 0.02)"
                            >
                                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Conference Image */}
                                    <div className="relative h-64 md:h-auto md:w-1/3 overflow-hidden bg-neutral-100 min-h-[300px]">
                                        <BlurImage
                                            src={conference.image || "/placeholder.svg"}
                                            alt={conference.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    </div>

                                    {/* Conference Content */}
                                    <div className="p-8 space-y-6 md:w-2/3 flex flex-col">
                                        <div>
                                            {/* Status Tag */}
                                            <div className="flex items-center gap-3 mb-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusColors[conference.status as keyof typeof statusColors] || "bg-muted text-muted-foreground"}`}
                                                >
                                                    {conference.status}
                                                </span>
                                            </div>

                                            {/* Title & Date */}
                                            <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-left text-balance mb-2">
                                                {conference.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-4 text-[11px] font-semibold text-accent uppercase mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {conference.date}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {conference.location}
                                                </div>
                                            </div>

                                            <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">{conference.description}</p>
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex items-center gap-4 pt-2 mt-auto">
                                            {/* <Link href={`/conferences/${conference.id}`}>
                                                <Button
                                                    size="lg"
                                                    className="rounded-full font-medium bg-black text-white hover:bg-black/90 px-8"
                                                >
                                                    View Details
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link> */}

                                            <Link href={`/conferences/${conference.id}`}>
                                                <button
                                                    className="group relative cursor-pointer inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-black text-white px-8 text-[11px] font-semibold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        Explore Detail <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                                    </span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.article>
                    ))}
                </motion.div>

                {/* No Results */}
                {filteredConferences.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-6 font-medium">
                            No conferences found matching your criteria.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedStatus("All")
                            }}
                            variant="outline"
                            className="rounded-full px-8 font-semibold border"
                        >
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </PageShell>
    )
}

"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { BookOpen, FileText, X, Calendar, Search, Download, Mail, Filter, Check } from "lucide-react"
import { Newsletter } from "@prisma/client"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"

export function NewsletterClient({ newsletters }: { newsletters: Newsletter[] }) {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscribeError, setSubscribeError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedMonth, setSelectedMonth] = useState<string>("All")
    const [selectedYear, setSelectedYear] = useState<string>("All")
    const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null)
    const [activePdfTitle, setActivePdfTitle] = useState<string>("")

    // Extract unique months and years from newsletters
    const { months, years } = useMemo(() => {
        const monthsSet = new Set<string>()
        const yearsSet = new Set<string>()

        newsletters.forEach((newsletter) => {
            const date = new Date(newsletter.date)
            const month = date.toLocaleString('en-US', { month: 'long' })
            const year = date.getFullYear().toString()
            monthsSet.add(month)
            yearsSet.add(year)
        })

        return {
            months: ["All", ...Array.from(monthsSet).sort()],
            years: ["All", ...Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a))]
        }
    }, [newsletters])

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubscribeError("")

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                setSubscribeError(data.error || "Something went wrong")
                return
            }

            setIsSubscribed(true)
            setEmail("")
            setTimeout(() => setIsSubscribed(false), 3000)
        } catch {
            setSubscribeError("Failed to subscribe. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const openPdfViewer = (newsletter: Newsletter) => {
        setActivePdfUrl(newsletter.pdfUrl)
        setActivePdfTitle(`${newsletter.title} - Issue ${newsletter.issue}`)
    }

    const closePdfViewer = () => {
        setActivePdfUrl(null)
        setActivePdfTitle("")
    }

    const filteredNewsletters = newsletters.filter((newsletter) => {
        const matchesSearch =
            searchQuery === "" ||
            newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            newsletter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            newsletter.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

        const date = new Date(newsletter.date)
        const month = date.toLocaleString('en-US', { month: 'long' })
        const year = date.getFullYear().toString()

        const matchesMonth = selectedMonth === "All" || month === selectedMonth
        const matchesYear = selectedYear === "All" || year === selectedYear

        return matchesSearch && matchesMonth && matchesYear
    })

    const featuredNewsletters = filteredNewsletters.filter((n) => n.featured)
    const regularNewsletters = filteredNewsletters.filter((n) => !n.featured)

    return (
        <div className="relative overflow-hidden min-h-screen">
            <ScrollToTopButton />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

            <PageShell mainClassName="flex-1 bg-transparent px-2 md:px-16 relative z-10">
                <PageHeader
                    title="Newsletter Archives"
                    description="Our transmission logs featuring breakthrough research, technical deep dives, and market synthesis from the edge of artificial intelligence."
                    breadcrumbs={[
                        { label: "Resources", href: "/insights" },
                        { label: "Newsletter" }
                    ]}
                >
                    <div className="flex flex-row items-center gap-4">
                        <div className="flex-1 lg:max-w-md">
                            {/* Search Bar - Maintained current styling shape */}
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/20" />
                                <Input
                                    type="search"
                                    placeholder="Search newsletters..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12 rounded-full border border-black/5 bg-white text-base focus:ring-1 focus:ring-black/5 focus:border-black/10 transition-all"
                                />
                            </div>
                        </div>

                        {/* Mobile Filter Button */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="sm:hidden w-12 h-12 rounded-full border border-black/5 p-0 bg-white shadow-sm"
                                >
                                    <Filter className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[400px] rounded-t-[2rem] border-t-0 p-8">
                                <SheetHeader className="mb-8">
                                    <SheetTitle className="text-2xl font-semibold tracking-tighter">Filter Archives</SheetTitle>
                                </SheetHeader>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-semibold uppercase tracking-widest text-black/40 px-2">Temporal Unit: Year</label>
                                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                                            <SelectTrigger className="h-14 rounded-xl border border-black/5 bg-neutral-50 px-6 font-semibold shadow-inner transition-all">
                                                <SelectValue>{selectedYear === "All" ? "All Years" : selectedYear}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-black/5 shadow-2xl">
                                                {years.map((year) => (
                                                    <SelectItem key={year} value={year} className="h-12 font-semibold">
                                                        {year === "All" ? "All Years" : year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-semibold uppercase tracking-widest text-black/40 px-2">Temporal Unit: Month</label>
                                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                            <SelectTrigger className="h-14 rounded-xl border border-black/5 bg-neutral-50 px-6 font-semibold shadow-inner transition-all">
                                                <SelectValue>{selectedMonth === "All" ? "All Months" : selectedMonth}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-black/5 shadow-2xl">
                                                {months.map((month) => (
                                                    <SelectItem key={month} value={month} className="h-12 font-semibold">
                                                        {month === "All" ? "All Months" : month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Desktop Filters - Maintained current styling shape */}
                        <div className="hidden sm:flex items-center gap-0">
                            <Select value={selectedYear} onValueChange={setSelectedYear}>
                                <SelectTrigger className="w-auto min-h-12 rounded-full rounded-r-none border border-black/5 bg-white px-6 text-sm font-semibold hover:bg-neutral-50 transition-all">
                                    <SelectValue>{selectedYear === "All" ? "Year" : selectedYear}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border-black/5 shadow-xl shadow-black/5">
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year} className="h-11 font-semibold text-sm">
                                            {year === "All" ? "All Years" : year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="w-auto min-h-12 rounded-full rounded-l-none border-l-0 border-black/5 bg-white px-6 text-sm font-semibold hover:bg-neutral-50 transition-all">
                                    <SelectValue>{selectedMonth === "All" ? "Month" : selectedMonth}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border-black/5 shadow-xl shadow-black/5">
                                    {months.map((month) => (
                                        <SelectItem key={month} value={month} className="h-11 font-semibold text-sm">
                                            {month === "All" ? "All Months" : month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </PageHeader>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {/* Subscribe Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="relative p-1 bg-gradient-to-br from-black/5 via-white/50 to-black/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/[0.02]">
                            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                            <div className="relative bg-white/40 backdrop-blur-3xl rounded-[1.9rem] p-8 lg:p-12 border border-white/40 overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                                <div className="flex-1 text-center lg:text-left relative z-10">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-4 block">Connect with our frequency</span>
                                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-black italic">Laboratory Dispatch</h2>
                                    <p className="text-black/60 font-semibold leading-relaxed max-w-lg text-balance">
                                        Join over 15,000+ researchers receiving monthly synthesis of the most critical breakthroughs in modern machine intelligence.
                                    </p>
                                </div>

                                <div className="w-full lg:w-fit relative z-10">
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30 group-focus-within:text-accent transition-colors duration-300" />
                                            <Input
                                                type="email"
                                                placeholder="Enter secure relay address..."
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-14 rounded-full bg-white/80 border-black/5 pl-12 pr-6 text-sm font-semibold min-w-[320px] transition-all focus:bg-white focus:ring-0 focus:border-black/10"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || isSubscribed}
                                            className="h-14 rounded-full bg-black text-white px-10 text-[11px] font-semibold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
                                        >
                                            {isSubscribed ? <Check className="h-4 w-4" /> : isSubmitting ? "Syncing..." : "Initialize Relay"}
                                        </Button>
                                    </form>
                                    {subscribeError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 text-[10px] font-semibold uppercase text-red-500 tracking-wider text-center lg:text-left"
                                        >
                                            {subscribeError}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Context */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-px flex-1 bg-black/5" />
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-black/20">
                            {filteredNewsletters.length} Total Logs Identified
                        </span>
                        <div className="h-px flex-1 bg-black/5" />
                    </div>

                    {/* Featured Section */}
                    {featuredNewsletters.length > 0 && (
                        <div className="mb-24">
                            <div className="flex items-end justify-between mb-8 px-2">
                                <div>
                                    <span className="text-[10px] font-semibold uppercase text-accent tracking-widest mb-2 block">High Fidelity</span>
                                    <h2 className="text-3xl font-semibold tracking-tighter italic">Essential Reading</h2>
                                </div>
                            </div>
                            <div className="grid gap-8 md:grid-cols-2">
                                {featuredNewsletters.map((newsletter, index) => (
                                    <NewsletterCard
                                        key={newsletter.id}
                                        newsletter={newsletter}
                                        index={index}
                                        onOpenPdf={openPdfViewer}
                                        featured
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Newsletters */}
                    <div>
                        <div className="flex items-end justify-between mb-8 px-2">
                            <div>
                                <span className="text-[10px] font-semibold uppercase text-black/40 tracking-widest mb-2 block">Archive Matrix</span>
                                <h2 className="text-3xl font-semibold tracking-tighter">Full Documentation</h2>
                            </div>
                        </div>

                        {regularNewsletters.length === 0 && featuredNewsletters.length === 0 ? (
                            <div className="text-center py-40 bg-white/20 backdrop-blur-sm rounded-3xl border border-dashed border-black/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                                <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
                                    <X className="h-8 w-8 text-black/20" />
                                    <p className="text-lg font-semibold tracking-tight text-black/60 italic">No matching transmission logs found.</p>
                                    <Button
                                        onClick={() => {
                                            setSearchQuery("")
                                            setSelectedYear("All")
                                            setSelectedMonth("All")
                                        }}
                                        variant="outline"
                                        className="rounded-full h-12 px-8 text-[11px] font-semibold uppercase tracking-widest border-black/5 hover:border-black/10 transition-all hover:scale-105"
                                    >
                                        Reset Matrix
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {regularNewsletters.map((newsletter, index) => (
                                    <NewsletterCard
                                        key={newsletter.id}
                                        newsletter={newsletter}
                                        index={index}
                                        onOpenPdf={openPdfViewer}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </PageShell>

            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {activePdfUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col"
                        onClick={closePdfViewer}
                    >
                        <div
                            className="flex items-center justify-between px-8 py-6 bg-black/50 border-b border-white/5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold italic text-lg tracking-tight leading-tight">{activePdfTitle}</h3>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Secure Connection Established</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <a
                                    href={activePdfUrl}
                                    download
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black hover:scale-105 transition-all text-[11px] font-semibold uppercase tracking-widest shadow-xl shadow-white/5"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Log
                                </a>
                                <button
                                    onClick={closePdfViewer}
                                    className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-8" onClick={(e) => e.stopPropagation()}>
                            <iframe
                                src={`${activePdfUrl}#toolbar=1&navpanes=0&scrollbar=0`}
                                className="w-full h-full rounded-2xl bg-white shadow-2xl"
                                title={activePdfTitle}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function NewsletterCard({
    newsletter,
    index,
    onOpenPdf,
    featured = false,
}: {
    newsletter: Newsletter
    index: number
    onOpenPdf: (newsletter: Newsletter) => void
    featured?: boolean
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <div
                className="group relative h-[600px] w-full cursor-pointer flex flex-col overflow-hidden rounded-lg bg-white border border-black/5 hover:border-black/10 transition-all duration-500 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1"
                onClick={() => onOpenPdf(newsletter)}
            >
                {/* PDF Preview Background */}
                <div className="absolute inset-0 z-0 bg-neutral-100 opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] z-10" />
                    <embed
                        src={`${newsletter.coverImage}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                        type="application/pdf"
                        className="w-full h-full pointer-events-none scale-[1.15] origin-top"
                    />
                </div>

                {/* Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Highlight line */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none z-30 m-2 rounded-lg" />

                {/* Content */}
                <div className="relative z-20 mt-auto p-10 flex flex-col">
                    <div className="flex items-center justify-between mb-8 transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-accent" />
                            <span className="text-[11px] font-semibold text-white/60 tracking-widest">{newsletter.date}</span>
                        </div>
                        {featured && (
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/20">
                                Essential
                            </span>
                        )}
                    </div>

                    <div className="space-y-4 transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tighter leading-[0.9] italic group-hover:text-accent transition-colors">
                            {newsletter.title}
                        </h3>
                        <p className="text-white/40 text-sm font-semibold leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors">
                            {newsletter.description}
                        </p>
                    </div>

                    <div className="mt-12 flex items-center gap-4 transform transition-all duration-700 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                        <Button
                            className="flex-1 h-14 bg-white text-black rounded-lg text-[11px] font-semibold uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-2xl shadow-black/10"
                            onClick={(e) => {
                                e.stopPropagation()
                                onOpenPdf(newsletter)
                            }}
                        >
                            <BookOpen className="mr-3 h-4 w-4" />
                            View Transmission
                        </Button>
                        <div className="h-14 w-14 flex items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all">
                            <Download className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

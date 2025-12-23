"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Package, BookOpen, Mic, Users, Sparkles, ArrowRight, TrendingUp, Loader2, Newspaper, Binary, Layout, Cpu, History } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  href: string
  metadata?: string
}

interface GlobalSearchProps {
  className?: string
  onOpen?: () => void
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showTrigger?: boolean
}

export function GlobalSearch({ className, onOpen, isOpen, onOpenChange, showTrigger = true }: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const selectedItemRef = useRef<HTMLButtonElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Client-side cache for search results
  const cacheRef = useRef<Map<string, { results: SearchResult[]; timestamp: number }>>(new Map())
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  // Support both controlled and uncontrolled modes
  const open = isOpen !== undefined ? isOpen : internalOpen
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value)
    } else {
      setInternalOpen(value)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    onOpen?.()
  }

  /**
   * Fetch search results from API with caching
   */
  const fetchSearchResults = useCallback(async (searchQuery: string) => {
    const lowerQuery = searchQuery.toLowerCase().trim()

    // Check client-side cache first
    const cached = cacheRef.current.get(lowerQuery)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setResults(cached.results)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/search?q=${encodeURIComponent(lowerQuery)}`)

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      // Cache the results on client-side
      cacheRef.current.set(lowerQuery, {
        results: data.results,
        timestamp: Date.now(),
      })

      setResults(data.results)
      setSelectedIndex(0)
    } catch (error: unknown) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [CACHE_DURATION])

  /**
   * Debounced search function
   */
  const debouncedSearch = useCallback((searchQuery: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // If empty query, fetch immediately (for popular suggestions)
    if (!searchQuery.trim()) {
      fetchSearchResults("")
      return
    }

    // Set loading state immediately for better UX
    setIsLoading(true)

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSearchResults(searchQuery)
    }, 300) // 300ms debounce delay
  }, [fetchSearchResults])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  // Keyboard navigation handler
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (results.length === 0) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        const selectedResult = results[selectedIndex]
        if (selectedResult) {
          handleResultClick(selectedResult.href)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex])

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Search when query changes (with debouncing)
  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  // Load popular suggestions when dialog opens
  useEffect(() => {
    if (open && results.length === 0) {
      fetchSearchResults("")
    }
  }, [open])

  const handleResultClick = (href: string) => {
    setOpen(false)
    setQuery("")
    setSelectedIndex(0)
    router.push(href)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Projects":
        return <Binary className="h-4 w-4" />
      case "Products":
        return <Cpu className="h-4 w-4" />
      case "Research":
        return <FileText className="h-4 w-4" />
      case "Insights":
        return <BookOpen className="h-4 w-4" />
      case "Newsletter":
        return <Newspaper className="h-4 w-4" />
      case "Podcast":
        return <Mic className="h-4 w-4" />
      case "Team":
        return <Users className="h-4 w-4" />
      default:
        return <Layout className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Projects":
        return "Computational Modules"
      case "Products":
        return "Operational Units"
      case "Research":
        return "Neural Documentation"
      case "Insights":
        return "Synthesis Logs"
      case "Newsletter":
        return "Transmission Archives"
      case "Podcast":
        return "Aural Sequences"
      case "Team":
        return "Unit Personnel"
      default:
        return category
    }
  }

  // Group results by category
  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>,
  )

  return (
    <>
      {/* Search Trigger Button in Header */}
      {showTrigger && (
        <button
          onClick={handleOpen}
          className={cn("flex w-full lg:w-auto items-center gap-3 rounded-full border border-black/5 px-4 py-2 text-sm text-black/60 hover:border-black/10 transition-all hover:bg-neutral-50 cursor-pointer shadow-sm group", className)}
        >
          <Search className="h-4 w-4 text-black/20 group-hover:text-accent transition-colors" />
          <span className="font-semibold tracking-tight">Search Matrix</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded-lg border border-black/[0.05] bg-neutral-50 px-2 font-mono text-[10px] text-black/40 font-bold ml-1">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 overflow-hidden bg-white rounded-lg border border-black/10 shadow-2xl sm:max-w-2xl">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

          <DialogTitle className="sr-only">Search Interface</DialogTitle>

          <div className="flex items-center border-b border-black/5 px-6 relative z-10 bg-white/80 backdrop-blur-md">
            <Search className="h-5 w-5 text-black/20" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query projects, neural logs, synthetic datasets..."
              className="h-16 border-0 text-base font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-black/20"
              autoFocus
            />
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Loader2 className="h-5 w-5 text-accent animate-spin mr-2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ScrollArea className="h-[500px] relative z-10">
            <div className="p-4">
              {isLoading && query && results.length === 0 && (
                <div className="h-full py-24 text-center">
                  <Loader2 className="h-10 w-10 text-accent/20 animate-spin mx-auto mb-4" />
                  <p className="text-black/40 font-semibold uppercase tracking-widest text-[10px]">Initializing Retrieval...</p>
                </div>
              )}

              {!isLoading && query && results.length === 0 && (
                <div className="h-full py-24 text-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-50 border border-black/5 flex items-center justify-center mx-auto mb-6 text-black/10">
                    <Binary className="h-8 w-8" />
                  </div>
                  <p className="text-black/40 font-semibold text-sm">No neural logs identified for "{query}"</p>
                </div>
              )}

              {!isLoading && !query && results.length > 0 && (
                <div className="mb-6 px-2">
                  <div className="flex items-center gap-3 mb-6">
                    <History className="h-3.5 w-3.5 text-accent" />
                    <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em]">Frequent Access Nodes</h3>
                    <div className="h-px flex-1 bg-black/5" />
                  </div>
                  <div className="space-y-1">
                    {results.map((result) => {
                      const globalIndex = results.findIndex((r) => r.id === result.id)
                      const isSelected = globalIndex === selectedIndex

                      return (
                        <button
                          key={result.id}
                          ref={isSelected ? selectedItemRef : null}
                          onClick={() => handleResultClick(result.href)}
                          className={cn(
                            "w-full flex items-start gap-4 rounded-lg p-4 text-left transition-all duration-300 group relative overflow-hidden",
                            isSelected ? "bg-neutral-50 ring-1 ring-black/[0.05] shadow-sm transform scale-[1.01] z-10" : "hover:bg-neutral-50/50"
                          )}
                        >
                          <div className={cn(
                            "mt-1 p-2 rounded-lg border transition-colors",
                            isSelected ? "bg-white border-black/10 text-accent" : "bg-neutral-50 border-black/5 text-black/20 group-hover:text-black/40"
                          )}>
                            {getCategoryIcon(result.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              "font-semibold text-sm mb-1 truncate transition-colors",
                              isSelected ? "text-black" : "text-black/70 group-hover:text-black"
                            )}>
                              {result.title}
                            </div>
                            <div className="text-[11px] text-black/40 font-semibold line-clamp-1 italic-none">{result.description}</div>
                          </div>
                          <div className={cn(
                            "mt-2 transition-all duration-300",
                            isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                          )}>
                            <ArrowRight className="h-4 w-4 text-accent" />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {!isLoading && query &&
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="mb-8 last:mb-0 px-2">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em]">{getCategoryLabel(category)}</h3>
                      <div className="h-px flex-1 bg-black/5" />
                    </div>
                    <div className="space-y-1">
                      {items.map((result) => {
                        const globalIndex = results.findIndex((r) => r.id === result.id)
                        const isSelected = globalIndex === selectedIndex

                        return (
                          <button
                            key={result.id}
                            ref={isSelected ? selectedItemRef : null}
                            onClick={() => handleResultClick(result.href)}
                            className={cn(
                              "w-full flex items-start gap-4 rounded-lg p-4 text-left transition-all duration-300 group relative overflow-hidden",
                              isSelected ? "bg-neutral-50 ring-1 ring-black/[0.05] shadow-sm transform scale-[1.01] z-10" : "hover:bg-neutral-50/50"
                            )}
                          >
                            <div className={cn(
                              "mt-1 p-2 rounded-lg border transition-colors",
                              isSelected ? "bg-white border-black/10 text-accent" : "bg-neutral-50 border-black/5 text-black/20 group-hover:text-black/40"
                            )}>
                              {getCategoryIcon(result.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={cn(
                                "font-semibold text-sm mb-1 truncate transition-colors",
                                isSelected ? "text-black" : "text-black/70 group-hover:text-black"
                              )}>
                                {result.title}
                              </div>
                              <div className="text-[11px] text-black/40 font-semibold line-clamp-1">{result.description}</div>
                            </div>
                            <div className={cn(
                              "mt-2 transition-all duration-300",
                              isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                            )}>
                              <ArrowRight className="h-4 w-4 text-accent" />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>

          <footer className="border-t border-black/5 p-4 bg-neutral-50/50 relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-black/10 text-[9px] font-bold text-black/40 shadow-sm">↑↓</kbd>
                <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest">Navigate Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-black/10 text-[9px] font-bold text-black/40 shadow-sm">↵</kbd>
                <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest">Authorize Access</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-black/20">
              <Sparkles className="h-3 w-3" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Neural Search Core v4.0</span>
            </div>
          </footer>
        </DialogContent>
      </Dialog >
    </>
  )
}

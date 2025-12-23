"use client"

import { PageHeader } from "@/components/page-header"
import { InsightsList } from "@/components/insights-list"
import { InsightsFilters } from "@/components/insights-filters"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Article } from "@/lib/mdx"
import { LayoutGrid, List } from "lucide-react"

interface InsightsPageContentProps {
    articles: Article[]
}

export function InsightsPageContent({ articles }: InsightsPageContentProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [layout, setLayout] = useState<"grid" | "list">("grid")

    return (
        <div className="relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

            <PageHeader
                title="Latest Insights"
                description="In-depth articles, tutorials, and insights from our research team. Learn about cutting-edge developments in AI, quantum computing, and more."
                breadcrumbs={[
                    { label: "Resources" },
                    { label: "Insights" }
                ]}
            >
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 lg:max-w-2xl">
                        <InsightsFilters
                            onSearchChange={setSearchQuery}
                            onCategoryChange={setSelectedCategory}
                            searchQuery={searchQuery}
                            selectedCategory={selectedCategory}
                        />
                    </div>

                    {/* Layout Toggle */}
                    <div className="hidden sm:flex h-12 items-center gap-2 bg-muted/50 p-1 rounded-full border border-border/50 flex-shrink-0">
                        <button
                            onClick={() => setLayout("grid")}
                            className={`p-2 rounded-full transition-all ${layout === "grid"
                                ? "bg-white text-black shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            aria-label="Grid view"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setLayout("list")}
                            className={`p-2 rounded-full transition-all ${layout === "list"
                                ? "bg-white text-black shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            aria-label="List view"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </PageHeader>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
                <InsightsList
                    articles={articles}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    layout={layout}
                />

                {(searchQuery !== "" || selectedCategory !== "All") && (
                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCategory("All")
                            }}
                            variant="outline"
                            className="rounded-full px-8 font-bold border-2"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

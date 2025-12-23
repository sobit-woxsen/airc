"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ResearchList } from "@/components/research-list"
import { ResearchFilters } from "@/components/research-filters"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("All")

  return (
    <PageShell mainClassName="px-2 md:px-16">
      <PageHeader
        title="Our Research"
        description="Our research spans machine learning, quantum computing, sustainable AI, and more. Filter by domain to explore specific areas of interest."
        breadcrumbs={[
          { label: "Resources", href: "/insights" },
          { label: "Research" }
        ]}
      >
        <ResearchFilters
          onSearchChange={setSearchQuery}
          onDomainChange={setSelectedDomain}
          searchQuery={searchQuery}
          selectedDomain={selectedDomain}
        />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ResearchList searchQuery={searchQuery} selectedDomain={selectedDomain} />

        {(searchQuery !== "" || selectedDomain !== "All") && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedDomain("All")
              }}
              variant="outline"
              className="rounded-full px-8 font-bold border-2"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </PageShell>
  )
}

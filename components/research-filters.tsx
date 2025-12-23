"use client"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ResearchFiltersProps {
  onSearchChange: (query: string) => void
  onDomainChange: (domain: string) => void
  searchQuery: string
  selectedDomain: string
}

const domains = ["All", "Machine Learning", "Quantum Computing", "Sustainability", "Computer Vision", "NLP", "Robotics"]

export function ResearchFilters({ onSearchChange, onDomainChange, searchQuery, selectedDomain }: ResearchFiltersProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-row items-center gap-2">
        {/* Search Bar */}
        <div className="w-full lg:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search research papers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 rounded-full border border-black/5 text-base w-full"
            />
          </div>
        </div>

        {/* Domain Filter Dropdown */}
        <div className="flex-shrink-0">
          <Select value={selectedDomain} onValueChange={onDomainChange}>
            <SelectTrigger className="min-h-12 w-12 sm:w-auto rounded-full border border-black/5 px-3 sm:px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10 [&>svg:last-child]:hidden sm:[&>svg:last-child]:block justify-center sm:justify-start">
              <Filter className="h-5 w-5 sm:hidden flex-shrink-0" />
              <span className="hidden sm:inline">
                <SelectValue>
                  {selectedDomain === "All" ? "All Domains" : selectedDomain}
                </SelectValue>
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-lg border-black/5">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                Filter by domain
              </div>
              {domains.map((domain) => (
                <SelectItem
                  key={domain}
                  value={domain}
                  className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
                >
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

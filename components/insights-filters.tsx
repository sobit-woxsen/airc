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

interface InsightsFiltersProps {
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  searchQuery: string
  selectedCategory: string
}

const categories = ["All", "AI", "Healthcare", "Climate", "Finance", "Education", "Marketing", "Technology"]

export function InsightsFilters({
  onSearchChange,
  onCategoryChange,
  searchQuery,
  selectedCategory,
}: InsightsFiltersProps) {
  return (
    <div className="flex flex-row items-center gap-2 sm:gap-4">
      {/* Search Bar */}
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 rounded-full border border-black/5 text-base w-full"
        />
      </div>

      <div className="flex-shrink-0">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="min-h-12 w-12 sm:w-auto rounded-full border border-black/5 px-3 sm:px-4 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:border-black/10 hover:border-black/10 [&>svg:last-child]:hidden sm:[&>svg:last-child]:block justify-center sm:justify-start">
            <Filter className="h-5 w-5 sm:hidden flex-shrink-0" />
            <span className="hidden sm:inline">
              <SelectValue>
                {selectedCategory === "All" ? "All Categories" : selectedCategory}
              </SelectValue>
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-lg border-black/5">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Filter by category
            </div>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="font-normal text-sm focus:bg-gray-100 focus:text-black h-12"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

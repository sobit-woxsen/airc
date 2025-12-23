"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, ExternalLink } from "lucide-react"

const papers = [
  {
    id: "neural-architecture-search",
    title: "Automated Neural Architecture Search Using Evolutionary Algorithms",
    authors: ["Dr. Sarah Chen", "Prof. Michael Roberts", "Dr. James Kim"],
    abstract:
      "We present a novel approach to neural architecture search that combines evolutionary algorithms with reinforcement learning.",
    publishedDate: "2024-11-15",
    domain: "Machine Learning",
    citations: 127,
  },
  {
    id: "quantum-framework",
    title: "Scalable Quantum Computing Framework for Optimization Problems",
    authors: ["Prof. Michael Roberts", "Dr. Emily Park", "Alex Johnson"],
    abstract:
      "This paper introduces QuOptimize, an open-source framework for developing and testing quantum algorithms at scale.",
    publishedDate: "2024-10-20",
    domain: "Quantum Computing",
    citations: 89,
  },
  {
    id: "sustainable-ai",
    title: "Reducing Carbon Footprint in Large-Scale AI Training",
    authors: ["Dr. Emily Park", "Dr. Sarah Chen", "Maria Garcia"],
    abstract: "We propose a suite of techniques for reducing the environmental impact of training large AI models.",
    publishedDate: "2024-09-05",
    domain: "Sustainability",
    citations: 203,
  },
  {
    id: "multimodal-learning",
    title: "Cross-Modal Learning for Enhanced Visual Understanding",
    authors: ["Dr. James Kim", "Alex Johnson"],
    abstract: "A new architecture for learning joint representations across vision and language modalities.",
    publishedDate: "2024-08-12",
    domain: "Computer Vision",
    citations: 156,
  },
  {
    id: "federated-privacy",
    title: "Privacy-Preserving Federated Learning at Scale",
    authors: ["Maria Garcia", "Dr. Sarah Chen"],
    abstract:
      "Novel differential privacy techniques for secure distributed machine learning across thousands of devices.",
    publishedDate: "2024-07-28",
    domain: "Machine Learning",
    citations: 178,
  },
  {
    id: "robotics-manipulation",
    title: "Dexterous Manipulation Through Imitation Learning",
    authors: ["Prof. Michael Roberts", "Dr. James Kim"],
    abstract:
      "Learning complex manipulation skills from human demonstrations using vision-based reinforcement learning.",
    publishedDate: "2024-06-10",
    domain: "Robotics",
    citations: 94,
  },
]

interface ResearchListProps {
  searchQuery: string
  selectedDomain: string
}

export function ResearchList({ searchQuery, selectedDomain }: ResearchListProps) {
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDomain = selectedDomain === "All" || paper.domain === selectedDomain

    return matchesSearch && matchesDomain
  })

  return (
    <>
      {/* Results Count */}
      <div className="mb-8">
        <span className="text-sm font-medium">
          {selectedDomain} {filteredPapers.length === 1 ? 'Research Paper' : 'Research Papers'}
        </span>
      </div>

      <div className="space-y-6">
        {filteredPapers.length === 0 ? (
        <Card className="p-12 text-center border-2 border-dashed border-foreground/10 rounded-3xl">
          <p className="text-muted-foreground text-lg">No research papers found matching your criteria.</p>
        </Card>
      ) : (
        filteredPapers.map((paper, index) => (
        <motion.div
          key={paper.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link href={`/research/${paper.id}`}>
            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-foreground/10 rounded-3xl overflow-hidden bg-white">
              <CardHeader className="p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full px-4 py-1.5 text-sm font-bold bg-primary/5 text-primary border-primary/10"
                  >
                    {paper.domain}
                  </Badge>
                  <div className="flex items-center gap-4 text-xs text-foreground/50 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(paper.publishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {paper.citations} citations
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
                  {paper.title}
                </CardTitle>
                <CardDescription className="leading-relaxed text-base text-foreground/60 mt-3">
                  {paper.abstract}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Users className="h-4 w-4" />
                    <span>{paper.authors.join(", ")}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:text-primary font-semibold rounded-full hover:bg-primary/5"
                  >
                    Read paper
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        ))
      )}
      </div>
    </>
  )
}

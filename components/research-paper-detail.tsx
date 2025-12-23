"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FileText, Download, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

interface Paper {
  title: string
  authors: string[]
  abstract: string
  publishedDate: string
  domain: string
  citations: number
  pdfUrl: string
  arxivId: string
  keywords: string[]
}

export function ResearchPaperDetail({ paper }: { paper: Paper }) {
  const [copied, setCopied] = useState(false)

  const handleCopyBibTeX = () => {
    const bibtex = `@article{${paper.arxivId},
  title={${paper.title}},
  author={${paper.authors.join(" and ")}},
  journal={AI Research Center},
  year={${new Date(paper.publishedDate).getFullYear()}},
  note={${paper.arxivId}}
}`
    navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Badge className="mb-4">{paper.domain}</Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {paper.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(paper.publishedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {paper.citations} citations
          </div>
          <div>{paper.arxivId}</div>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-foreground">Authors</h2>
          <p className="mt-2 text-muted-foreground">{paper.authors.join(", ")}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={handleCopyBibTeX}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy BibTeX
              </>
            )}
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
            <a
              href={`https://arxiv.org/abs/${paper.arxivId.replace("arXiv:", "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View on arXiv
            </a>
          </Button>
        </div>

        <Card className="mt-12">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-foreground">Abstract</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{paper.abstract}</p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground">Keywords</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {paper.keywords.map((keyword) => (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="mt-12 bg-muted/30">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-foreground">Citation</h2>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-card p-4 text-xs text-card-foreground">
              {`@article{${paper.arxivId},
  title={${paper.title}},
  author={${paper.authors.join(" and ")}},
  journal={AI Research Center},
  year={${new Date(paper.publishedDate).getFullYear()}},
  note={${paper.arxivId}}
}`}
            </pre>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

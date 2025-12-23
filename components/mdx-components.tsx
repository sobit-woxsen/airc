"use client"

import ReactMarkdown from "react-markdown"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { BlurImage } from "@/components/blur-image"
import React from "react"

export function MDXComponents({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <div className="my-6 rounded-2xl bg-neutral-900 p-6 overflow-x-auto">
              <div className="text-xs text-neutral-400 mb-2 font-mono uppercase">{match[1]}</div>
              <pre className="text-sm">
                <code className="font-mono text-neutral-100">{String(children).replace(/\n$/, "")}</code>
              </pre>
            </div>
          ) : (
            <code className="bg-neutral-100 text-coral-600 px-2 py-1 rounded-md font-mono text-sm" {...props}>
              {children}
            </code>
          )
        },
        blockquote({ children }: React.HTMLAttributes<HTMLQuoteElement>) {
          return (
            <Alert className="my-6 border-2 border-neutral-900/10 bg-white rounded-lg">
              <Info className="h-4 w-4" />
              <AlertDescription>{children}</AlertDescription>
            </Alert>
          )
        },
        img({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) {
          return (
            <Card className="my-6 overflow-hidden rounded-lg border-1 border-black/5">
              <BlurImage
                src={src || "/placeholder.svg"}
                alt={alt || "Article image"}
                width={800}
                height={500}
                className="w-full"
              />
            </Card>
          )
        },
        h1({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
          return <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-left text-balance text-foreground mt-12 mb-6">{children}</h1>
        },
        h2({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
          return <h2 className="text-xl md:text-2xl font-bold tracking-tighter text-left text-balance text-foreground mt-10 mb-5">{children}</h2>
        },
        h3({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
          return <h3 className="text-xl md:text-xl font-bold tracking-tighter text-left text-balance text-foreground mt-8 mb-4">{children}</h3>
        },
        p({ children }: React.HTMLAttributes<HTMLParagraphElement>) {
          return <p className="text-base text-foreground/80 leading-relaxed mb-6">{children}</p>
        },
        ul({ children }: React.HTMLAttributes<HTMLUListElement>) {
          return <ul className="my-6 ml-6 list-disc space-y-2 text-lg text-foreground/80">{children}</ul>
        },
        ol({ children }: React.HTMLAttributes<HTMLOListElement>) {
          return <ol className="my-6 ml-6 list-decimal space-y-2 text-lg text-foreground/80">{children}</ol>
        },
        li({ children }: React.HTMLAttributes<HTMLLIElement>) {
          return <li className="leading-relaxed pl-2">{children}</li>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

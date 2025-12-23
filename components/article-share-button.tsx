"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface Article {
    title: string
    excerpt: string
    slug: string
}

interface ArticleShareButtonProps {
    article: Article
    className?: string
    iconSize?: number
}

export function ArticleShareButton({ article, className, iconSize = 4 }: ArticleShareButtonProps) {
    const { toast } = useToast()

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const url = `${window.location.origin}/insights/${article.slug}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: url,
                })
            } catch (err) {
                console.error("Error sharing:", err)
            }
        } else {
            navigator.clipboard.writeText(url)
            toast({
                title: "Link copied",
                description: "The article link has been copied to your clipboard.",
            })
        }
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            className={cn("rounded-full text-muted-foreground hover:text-black hover:bg-black/5", className)}
            onClick={handleShare}
        >
            <Share2 className={`h-${iconSize} w-${iconSize}`} />
            <span className="sr-only">Share</span>
        </Button>
    )
}

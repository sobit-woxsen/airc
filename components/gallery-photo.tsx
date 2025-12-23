"use client"

import { BlurImage } from "@/components/blur-image"
import { GalleryItem, galleryItems } from "@/lib/gallery-data"
import { Download, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

export function GalleryPhoto({ photo }: { photo: GalleryItem }) {
    const router = useRouter()
    const currentIndex = galleryItems.findIndex(p => p.id === photo.id)
    const prevPhoto = galleryItems[currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1]
    const nextPhoto = galleryItems[currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0]

    const copyToClipboard = () => {
        const url = `${window.location.origin}/gallery/p/${photo.id}`
        navigator.clipboard.writeText(url)
        toast({
            title: "Link copied to clipboard",
            description: "You can now share this specific photo.",
        })
    }

    const navigateToPhoto = useCallback((id: number) => {
        router.replace(`/gallery/p/${id}`)
    }, [router])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                navigateToPhoto(prevPhoto.id)
            } else if (e.key === "ArrowRight") {
                navigateToPhoto(nextPhoto.id)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [prevPhoto, nextPhoto, navigateToPhoto])

    return (
        <div className="mx-auto w-full max-w-full h-full flex flex-col justify-center gap-4">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-transparent shadow-none group">
                <BlurImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority
                    className="object-contain"
                    disableZoom
                />

                {/* Navigation Arrows (Visible on Group Hover) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        navigateToPhoto(prevPhoto.id)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                >
                    <ChevronLeft className="h-8 w-8" />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        navigateToPhoto(nextPhoto.id)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/70 backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                >
                    <ChevronRight className="h-8 w-8" />
                </button>

                {/* Gradient Overlay & Text - Visible Only on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                    <div className="pointer-events-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{photo.alt}</h2>
                        <p className="text-white/80 font-medium">{photo.category}</p>

                        <div className="flex gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyToClipboard}
                                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm px-3 h-9"
                            >
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                            <a
                                href={photo.src}
                                download
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 px-3 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-0 overflow-x-auto py-4 px-1 snap-x scroll-smooth hide-scrollbar justify-center items-center">
                {galleryItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigateToPhoto(item.id)}
                        className={cn(
                            "relative h-16 w-24 flex-shrink-0 overflow-hidden transition-all duration-300 snap-center rounded-sm",
                            item.id === photo.id
                                ? "scale-125 z-10 shadow-lg opacity-100"
                                : "scale-90 opacity-50 hover:opacity-100 hover:scale-100"
                        )}
                    >
                        <BlurImage
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

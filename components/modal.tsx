"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    const onDismiss = () => {
        router.back()
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss()
        }

        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [])

    return createPortal(
        <div
            ref={overlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
            onClick={(e) => {
                if (e.target === overlay.current || e.target === wrapper.current) {
                    onDismiss()
                }
            }}
        >
            <div
                ref={wrapper}
                className="w-full h-full flex flex-col pt-12 pb-4 px-4 overflow-y-auto"
            >
                {/* Close Button at global level */}
                <button
                    onClick={onDismiss}
                    className="absolute right-4 top-4 z-50 rounded-full bg-black/10 p-2 text-black transition-colors hover:bg-black/20"
                >
                    <X className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

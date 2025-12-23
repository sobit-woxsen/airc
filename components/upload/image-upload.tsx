"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Compress image using Canvas API
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (event) => {
      const img = new window.Image()
      img.src = event.target?.result as string

      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        const maxWidth = 1920
        const maxHeight = 1080

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (height / width) * maxWidth
            width = maxWidth
          } else {
            width = (width / height) * maxHeight
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"))
              return
            }

            // Create new file from blob
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })

            resolve(compressedFile)
          },
          "image/jpeg",
          0.8 // Quality (80%)
        )
      }

      img.onerror = () => reject(new Error("Failed to load image"))
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
  })
}

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  folder?: string
  maxSize?: number // in bytes
  className?: string
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  folder = "airc-portal",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      return
    }

    setIsUploading(true)

    try {
      const originalSize = (file.size / (1024 * 1024)).toFixed(2)

      // Compress image before upload
      const compressedFile = await compressImage(file)
      const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2)

      console.log(`Image compressed: ${originalSize}MB → ${compressedSize}MB`)

      const formData = new FormData()
      formData.append("file", compressedFile)
      formData.append("folder", folder)
      formData.append("resourceType", "image")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      // Read stream for progress
      const reader = response.body?.getReader()
      if (!reader) throw new Error("Could not read response stream")

      const decoder = new TextDecoder()
      let data: { secure_url: string } | null = null

      while (true) {
        const { done, value: chunk } = await reader.read()
        if (done) break

        const lines = decoder.decode(chunk).split("\n").filter(Boolean)
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line)
            if (parsed.error) throw new Error(parsed.error)
            if (parsed.status === "done") data = parsed.result
          } catch (e: unknown) {
            console.error("Error parsing NDJSON:", e)
            if (e instanceof Error) throw e
          }
        }
      }

      if (data) {
        onChange(data.secure_url)
        toast.success(`Image uploaded successfully`)
      }
    } catch (error: unknown) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled || isUploading) return

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled && !isUploading) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {value ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border group">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          {!disabled && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleClick}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer",
            "flex flex-col items-center justify-center gap-2",
            isDragging && "border-primary bg-primary/5",
            !isDragging && "border-muted-foreground/25 hover:border-primary/50",
            (disabled || isUploading) && "opacity-50 cursor-not-allowed"
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WEBP up to {maxSize / (1024 * 1024)}MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { Upload, X, Film, ImageIcon, Loader2 } from "lucide-react"
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

import { Progress } from "@/components/ui/progress"

interface MediaItem {
  url: string
  type: "IMAGE" | "VIDEO"
  file?: File
}

interface MediaUploadProps {
  value: MediaItem[]
  onChange: (items: MediaItem[]) => void
  folder?: string
  maxFiles?: number
  maxSize?: number // in bytes
  className?: string
  disabled?: boolean
}

export function MediaUpload({
  value = [],
  onChange,
  folder = "airc-portal/projects/media",
  maxFiles = 10,
  maxSize = 200 * 1024 * 1024, // 200MB limit as requested
  className,
  disabled = false,
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    if (value.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    const uploadedItems: MediaItem[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        let file = files[i]

        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
          toast.error(`${file.name} is not an image or video`)
          continue
        }

        if (file.size > maxSize) {
          toast.error(
            `${file.name} is too large. Max size: ${maxSize / (1024 * 1024)}MB`
          )
          continue
        }

        const isImage = file.type.startsWith("image/")
        const isVideo = file.type.startsWith("video/")
        let fileToUpload = file

        // Compress images before upload (client-side)
        if (isImage) {
          setUploadStatus("Optimizing image...")
          setUploadProgress(20)
          fileToUpload = await compressImage(file)
        }

        const formData = new FormData()
        formData.append("file", fileToUpload)
        formData.append("folder", folder)
        formData.append("resourceType", isVideo ? "video" : "image")

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
        let result: { secure_url: string } | null = null

        while (true) {
          const { done, value: chunk } = await reader.read()
          if (done) break

          const lines = decoder.decode(chunk).split("\n").filter(Boolean)
          for (const line of lines) {
            try {
              const data = JSON.parse(line)

              if (data.error) throw new Error(data.error)

              if (data.status) {
                setUploadStatus(data.message || data.status)
                if (data.percent !== undefined) {
                  setUploadProgress(data.percent)
                } else if (data.status === 'uploading') {
                  setUploadProgress(10)
                } else if (data.status === 'finalizing') {
                  setUploadProgress(90)
                }
              }

              if (data.status === "done") {
                result = data.result
              }
            } catch (e: unknown) {
              console.error("Error parsing NDJSON:", e)
              if (e instanceof Error) throw e
            }
          }
        }

        if (result) {
          uploadedItems.push({
            url: result.secure_url,
            type: isVideo ? "VIDEO" : "IMAGE",
          })
          toast.success(`${file.name} uploaded successfully`)
        }
      }

      onChange([...value, ...uploadedItems])
    } catch (error: unknown) {
      console.error("Upload error:", error)
      toast.error("Failed to upload files")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      setUploadStatus("")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled || isUploading) return

    const files = e.dataTransfer.files
    if (files.length > 0) handleFiles(files)
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
    if (!disabled && !isUploading && value.length < maxFiles) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleFiles(files)
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
        onChange={handleFileChange}
        className="hidden"
        multiple
        disabled={disabled || isUploading}
      />

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative w-full h-40 rounded-xl border-2 border-dashed transition-all duration-300",
          "flex flex-col items-center justify-center gap-2 overflow-hidden",
          value.length < maxFiles && !isUploading && "cursor-pointer",
          isDragging && "border-primary bg-primary/5 scale-[1.01]",
          !isDragging && "border-muted-foreground/25 hover:border-primary/50",
          (disabled || isUploading || value.length >= maxFiles) &&
          "opacity-80"
        )}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center w-full px-8 text-center animate-in fade-in zoom-in duration-300">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <div className="w-full max-w-[240px] space-y-3">
              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span>{uploadStatus}</span>
                {uploadProgress > 0 && <span>{uploadProgress}%</span>}
              </div>
              <Progress value={uploadProgress} className="h-1.5 w-full bg-primary/10" />
              <p className="text-xs text-muted-foreground italic">
                {uploadProgress > 0 && uploadProgress < 100 ? "This might take a moment..." : "Finalizing assets..."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <Film className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Images or videos up to {maxSize / (1024 * 1024)}MB ({value.length}/
                {maxFiles})
              </p>
            </div>
          </>
        )}
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((item, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border bg-muted">
                {item.type === "IMAGE" ? (
                  <Image
                    src={item.url}
                    alt={`Media ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

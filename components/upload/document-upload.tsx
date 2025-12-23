"use client"

import { useState, useRef } from "react"
import { Upload, X, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface DocumentItem {
  url: string
  title: string
  type: string
}

interface DocumentUploadProps {
  value: DocumentItem[]
  onChange: (items: DocumentItem[]) => void
  folder?: string
  maxFiles?: number
  maxSize?: number // in bytes
  className?: string
  disabled?: boolean
}

export function DocumentUpload({
  value = [],
  onChange,
  folder = "airc-portal/projects/documents",
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
  disabled = false,
}: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    if (value.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    const uploadedItems: DocumentItem[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (!file.type.includes("pdf") && !file.type.includes("document")) {
          toast.error(`${file.name} is not a supported document format`)
          continue
        }

        if (file.size > maxSize) {
          toast.error(
            `${file.name} is too large. Max size: ${maxSize / (1024 * 1024)}MB`
          )
          continue
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder)
        formData.append("resourceType", "auto")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        // Read stream
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
          uploadedItems.push({
            url: data.secure_url,
            title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            type: "DOCUMENTATION",
          })
          toast.success(`${file.name} uploaded successfully`)
        }
      }

      onChange([...value, ...uploadedItems])
    } catch (error: unknown) {
      console.error("Upload error:", error)
      toast.error("Failed to upload documents")
    } finally {
      setIsUploading(false)
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
        accept="application/pdf,.pdf"
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
          "w-full h-32 rounded-lg border-2 border-dashed transition-colors",
          "flex flex-col items-center justify-center gap-2",
          value.length < maxFiles && "cursor-pointer",
          isDragging && "border-primary bg-primary/5",
          !isDragging && "border-muted-foreground/25 hover:border-primary/50",
          (disabled || isUploading || value.length >= maxFiles) &&
          "opacity-50 cursor-not-allowed"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </>
        ) : (
          <>
            <FileText className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF documents up to {maxSize / (1024 * 1024)}MB ({value.length}/
                {maxFiles})
              </p>
            </div>
          </>
        )}
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{doc.title}</span>
              </div>
              {!disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

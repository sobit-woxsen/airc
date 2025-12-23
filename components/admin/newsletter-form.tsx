"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Newsletter } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Upload, X, Loader2, FileText } from "lucide-react"
import { createNewsletter, updateNewsletter } from "@/app/actions/newsletters"
import { useToast } from "@/hooks/use-toast"
import { PDFDocument } from "pdf-lib"

interface NewsletterFormProps {
  newsletter?: Newsletter
}

export function NewsletterForm({ newsletter }: NewsletterFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const isEditing = !!newsletter

  // Form state
  const [title, setTitle] = useState(newsletter?.title || "")
  const [description, setDescription] = useState(newsletter?.description || "")
  const [date, setDate] = useState(newsletter?.date || "")
  const [topics, setTopics] = useState<string[]>(newsletter?.topics || [])
  const [topicInput, setTopicInput] = useState("")
  const [featured, setFeatured] = useState(newsletter?.featured || false)
  const [published, setPublished] = useState(newsletter?.published ?? true)
  const [pdfUrl, setPdfUrl] = useState(newsletter?.pdfUrl || "")
  const [coverImage, setCoverImage] = useState(newsletter?.coverImage || "")

  // Upload state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)

  const compressPdfClient = async (file: File): Promise<Blob> => {
    setUploadProgress("Compressing PDF...")

    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)

    // Save with compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    })

    const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2)
    const compressedSizeMB = (compressedBytes.length / (1024 * 1024)).toFixed(2)
    const reduction = ((1 - compressedBytes.length / file.size) * 100).toFixed(1)

    console.log(`PDF compressed: ${originalSizeMB}MB → ${compressedSizeMB}MB (${reduction}% reduction)`)
    setUploadProgress(`Compressed to ${compressedSizeMB}MB`)

    return new Blob([compressedBytes], { type: "application/pdf" })
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress("Starting upload...")

    try {
      // Compress PDF on client side first
      const compressedBlob = await compressPdfClient(file)

      setUploadProgress("Uploading to server...")

      const formData = new FormData()
      formData.append("file", compressedBlob, file.name)
      formData.append("folder", "airc-portal/newsletters/pdfs")
      formData.append("resourceType", "auto")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error("No response reader")

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n").filter(Boolean)

        for (const line of lines) {
          try {
            const data = JSON.parse(line)

            if (data.error) {
              throw new Error(data.error)
            }

            if (data.status) {
              setUploadProgress(data.message || data.status)
            }

            if (data.result) {
              setPdfUrl(data.result.secure_url)
              setCoverImage(data.result.secure_url) // Use same URL for cover
              toast({
                title: "PDF uploaded successfully",
                description: "Newsletter PDF is ready",
              })
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    } catch (error: unknown) {
      toast({
        title: "Upload failed",
        description: "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress("")
    }
  }

  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      setTopics([...topics, topicInput.trim()])
      setTopicInput("")
    }
  }

  const handleRemoveTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const data = {
        title,
        description,
        date,
        pdfUrl,
        coverImage,
        topics,
        featured,
        published,
      }

      let result
      if (isEditing) {
        result = await updateNewsletter(newsletter.id, data)
      } else {
        result = await createNewsletter(data)
      }

      if (result.success) {
        toast({
          title: isEditing ? "Newsletter updated" : "Newsletter created",
          description: result.message,
        })
        router.push("/admin/newsletters")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PDF Upload */}
      <Card className="rounded-2xl border-slate-200 shadow-none">
        <CardHeader>
          <CardTitle className="font-medium tracking-tighter">PDF Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pdfUrl ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
                disabled={isUploading}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
                    <p className="text-sm text-muted-foreground">
                      {uploadProgress}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="font-medium">Click to upload PDF</p>
                    <p className="text-sm text-muted-foreground">
                      Max size: 30MB
                    </p>
                  </>
                )}
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-medium">PDF Uploaded</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPdfUrl("")
                  setCoverImage("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Newsletter Details */}
      <Card className="rounded-2xl border-slate-200 shadow-none">
        <CardHeader>
          <CardTitle className="font-medium tracking-tighter">Newsletter Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date (e.g., &quot;August 2025&quot;) *</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="August 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="AI Research Monthly - August 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of newsletter content..."
              required
              rows={4}
            />
          </div>

          {/* Topics */}
          <div className="space-y-2">
            <Label htmlFor="topic-input">Topics</Label>
            <div className="flex gap-2">
              <Input
                id="topic-input"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Add a topic..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTopic()
                  }
                }}
              />
              <Button type="button" onClick={handleAddTopic} className="rounded-full">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {topics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveTopic(topic)}
                >
                  {topic}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="featured">Featured Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Show in featured section
                </p>
              </div>
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make visible to public
                </p>
              </div>
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/newsletters")}
          className="rounded-full px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving || !pdfUrl}
          className="bg-black text-white hover:bg-black/90 rounded-full px-8 transition-all hover:scale-105 active:scale-95"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            "Update Newsletter"
          ) : (
            "Create Newsletter"
          )}
        </Button>
      </div>
    </form>
  )
}

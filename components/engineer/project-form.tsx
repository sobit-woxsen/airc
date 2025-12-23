
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useHeaderActions } from "@/components/dashboard/header-actions-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Department, Project, Prisma } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createProject, updateProject, submitProjectForReview } from "@/app/actions/projects"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Save, Send, Eye } from "lucide-react"
import { ImageUpload } from "@/components/upload/image-upload"
import { MediaUpload } from "@/components/upload/media-upload"
import { DocumentUpload } from "@/components/upload/document-upload"

const projectFormSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  departmentIds: z.string().min(1, "Please select at least one department"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  image: z.string().url("Please provide a valid image URL"),
  tags: z.string().min(1, "Please add at least one tag"),
  productStatus: z.enum(["Production", "Beta", "Alpha", "Coming Soon"]),
  technologies: z.string().min(1, "Please add at least one technology"),
  demoUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  // Store media and documents as JSON strings
  mediaJson: z.string().default("[]"),
  documentsJson: z.string().default("[]"),
})

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    departments: {
      include: {
        department: true
      }
    },
    media: true,
    documents: true
  }
}>

interface ProjectFormProps {
  project?: ProjectWithRelations
  departments: Department[]
}

export function ProjectForm({ project, departments }: ProjectFormProps) {
  const router = useRouter()
  const { setActions } = useHeaderActions()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    project?.departments?.map((d) => d.department.id) || []
  )
  const [newTag, setNewTag] = useState("")
  const [newTech, setNewTech] = useState("")
  const [additionalMedia, setAdditionalMedia] = useState<{ url: string; type: "IMAGE" | "VIDEO" }[]>(
    project?.media?.map(m => ({ url: m.url, type: m.type as "IMAGE" | "VIDEO" })) || []
  )
  const [documents, setDocuments] = useState<{ url: string; title: string; type: string }[]>(
    project?.documents?.map(d => ({ url: d.url, title: d.title, type: d.type })) || []
  )

  // Wrapper functions with logging
  const handleMediaChange = (newMedia: { url: string; type: "IMAGE" | "VIDEO" }[]) => {
    console.log("🎬 Media onChange called with:", newMedia)
    setAdditionalMedia(newMedia)
    form.setValue("mediaJson", JSON.stringify(newMedia), { shouldValidate: true })
  }

  const handleDocumentsChange = (newDocs: { url: string; title: string; type: string }[]) => {
    console.log("📄 Documents onChange called with:", newDocs)
    setDocuments(newDocs)
    form.setValue("documentsJson", JSON.stringify(newDocs), { shouldValidate: true })
  }

  const handleDepartmentsChange = (newDepts: string[]) => {
    console.log("🏢 Departments onChange called with:", newDepts)
    setSelectedDepartments(newDepts)
    form.setValue("departmentIds", newDepts.join(","), { shouldValidate: true })
  }

  const isEditing = !!project

  // Track component mount/unmount
  useEffect(() => {
    console.log("🔵 ProjectForm MOUNTED")
    return () => {
      console.log("🔴 ProjectForm UNMOUNTED - State will be lost!")
    }
  }, [])

  // Track state changes
  useEffect(() => {
    console.log("✅ State changed - selectedDepartments:", selectedDepartments)
    if (selectedDepartments.length === 0) {
      console.warn("⚠️ Departments reset to empty!")
    }
  }, [selectedDepartments])

  useEffect(() => {
    console.log("✅ State changed - additionalMedia:", additionalMedia)
    if (additionalMedia.length === 0) {
      console.warn("⚠️ Media reset to empty!")
    }
  }, [additionalMedia])

  useEffect(() => {
    console.log("✅ State changed - documents:", documents)
    if (documents.length === 0) {
      console.warn("⚠️ Documents reset to empty!")
    }
  }, [documents])

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project?.name || "",
      departmentIds: selectedDepartments.join(",") || "",
      tagline: project?.tagline || "",
      description: project?.description || "",
      image: project?.image || "",
      tags: (project?.tags || []).join(", ") || "",
      productStatus: (project?.productStatus as any) || "Alpha",
      technologies: (project?.technologies || []).join(", ") || "",
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
      mediaJson: JSON.stringify(project?.media?.map(m => ({ url: m.url, type: m.type })) || []),
      documentsJson: JSON.stringify(project?.documents?.map(d => ({ url: d.url, title: d.title, type: d.type })) || []),
    },
  })

  // Get tags and technologies as arrays from form string values
  const getTagsArray = (): string[] => {
    const tagsString = form.watch("tags")
    return tagsString ? tagsString.split(",").map((t: string) => t.trim()).filter((t: string) => t) : []
  }

  const getTechnologiesArray = (): string[] => {
    const techString = form.watch("technologies")
    return techString ? techString.split(",").map((t: string) => t.trim()).filter((t: string) => t) : []
  }

  const addTag = () => {
    const currentTags = getTagsArray()
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      const updatedTags = [...currentTags, newTag.trim()]
      form.setValue("tags", updatedTags.join(", "), { shouldValidate: true })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    const currentTags = getTagsArray()
    const updatedTags = currentTags.filter((t) => t !== tag)
    form.setValue("tags", updatedTags.join(", "), { shouldValidate: true })
  }

  const addTechnology = () => {
    const currentTech = getTechnologiesArray()
    if (newTech.trim() && !currentTech.includes(newTech.trim())) {
      const updatedTech = [...currentTech, newTech.trim()]
      form.setValue("technologies", updatedTech.join(", "), { shouldValidate: true })
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    const currentTech = getTechnologiesArray()
    const updatedTech = currentTech.filter((t) => t !== tech)
    form.setValue("technologies", updatedTech.join(", "), { shouldValidate: true })
  }

  // Open full preview in new tab
  const openPreview = () => {
    const formValues = form.getValues()
    const selectedDepts = departments
      .filter((d) => selectedDepartments.includes(d.id))
      .map((d) => ({ id: d.id, name: d.name, color: d.color }))

    const params = new URLSearchParams({
      name: formValues.name || "Project Name",
      tagline: formValues.tagline || "Project tagline",
      description: formValues.description || "Project description",
      image: formValues.image || "",
      tags: getTagsArray().join(","),
      technologies: getTechnologiesArray().join(","),
      productStatus: formValues.productStatus || "Alpha",
      demoUrl: formValues.demoUrl || "",
      githubUrl: formValues.githubUrl || "",
      departments: encodeURIComponent(JSON.stringify(selectedDepts)),
      media: encodeURIComponent(JSON.stringify(additionalMedia)),
      documents: encodeURIComponent(JSON.stringify(documents)),
    })

    window.open(`/preview?${params.toString()}`, "_blank")
  }

  async function onSubmit(values: z.infer<typeof projectFormSchema>, submitForReview: boolean = false) {
    console.log("=== FORM SUBMISSION STARTED ===")
    console.log("Submit for review:", submitForReview)
    console.log("Is editing:", isEditing)
    console.log("Form values:", values)
    console.log("Selected departments STATE:", selectedDepartments)
    console.log("Selected departments COUNT:", selectedDepartments.length)
    console.log("Form departmentIds field:", values.departmentIds)
    console.log("Additional media count:", additionalMedia.length)
    console.log("Documents count:", documents.length)

    setIsLoading(true)

    try {
      // Use values from the form submission or form.getValues() to avoid stale closure issues
      const tagsArray = getTagsArray()
      const technologiesArray = getTechnologiesArray()

      // Parse fields that are stored as JSON or are extra-form state
      const media = JSON.parse(values.mediaJson || "[]")
      const docs = JSON.parse(values.documentsJson || "[]")
      const deptIds = values.departmentIds ? values.departmentIds.split(",").filter(Boolean) : []

      console.log("⚠️ DATA FOR SUBMISSION (from form values):")
      console.log("departmentIds:", deptIds)
      console.log("media:", media)
      console.log("documents:", docs)

      const projectData = {
        name: values.name,
        departmentIds: deptIds,
        tagline: values.tagline,
        description: values.description,
        image: values.image,
        tags: tagsArray,
        productStatus: values.productStatus,
        technologies: technologiesArray,
        demoUrl: values.demoUrl || undefined,
        githubUrl: values.githubUrl || undefined,
        media: media,
        documents: docs,
      }

      console.log("Project data prepared:", {
        ...projectData,
        departmentIds: selectedDepartments,
        mediaItemsCount: additionalMedia.length,
        documentsCount: documents.length,
      })
      console.log("FULL projectData object:", JSON.stringify(projectData, null, 2))

      let result
      let projectId = project?.id

      if (isEditing) {
        console.log("Updating existing project:", project.id)
        result = await updateProject(project.id, projectData)
      } else {
        console.log("Creating new project...")
        console.log("Submit for review:", submitForReview)
        result = await createProject(projectData, submitForReview)
        projectId = result.projectId
      }

      console.log("Project creation/update result:", result)

      if (result.success) {
        toast.success(result.message)

        // Ensure projectId is set
        if (!projectId) {
          console.error("Project ID is missing after creation/update")
          toast.error("Error: Project ID not found")
          setIsLoading(false)
          return
        }

        console.log("Project created/updated successfully with all data!")
        console.log("Project ID:", projectId)
        console.log("Media items saved:", additionalMedia.length)
        console.log("Documents saved:", documents.length)

        // Only call submitProjectForReview when editing an existing project
        // For new projects, status is already set during creation
        if (submitForReview && projectId && isEditing) {
          console.log("Submitting edited project for review...")
          const submitResult = await submitProjectForReview(projectId)
          console.log("Submit result:", submitResult)
          if (submitResult.success) {
            toast.success("Project submitted for review!")
            console.log("=== FORM SUBMISSION COMPLETED SUCCESSFULLY ===")
            router.push("/engineer/projects")
            router.refresh()
          } else {
            toast.error(submitResult.message)
            console.error("Failed to submit for review:", submitResult.message)
          }
        } else if (isEditing) {
          console.log("=== FORM SUBMISSION COMPLETED (EDIT) ===")
          router.refresh()
        } else {
          console.log("=== FORM SUBMISSION COMPLETED ===")
          // Redirect to projects list after creating project (draft or submitted)
          router.push("/engineer/projects")
          router.refresh()
        }
      } else {
        console.error("Project creation/update failed:", result.message)
        toast.error(result.message)
      }
    } catch (error) {
      console.error("=== FORM SUBMISSION ERROR ===", error)
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Set header actions
  useEffect(() => {
    setActions(
      <>
        <>
          <Button
            type="button"
            variant="outline"
            onClick={openPreview}
            disabled={isLoading}
            className="rounded-full shadow-none hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.handleSubmit((values) => onSubmit(values, false))()}
            disabled={isLoading}
            className="rounded-full shadow-none hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
          >
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? "Save Changes" : "Save Draft"}
          </Button>
          {(!isEditing || project?.status === "DRAFT" || project?.status === "REJECTED") && (
            <Button
              type="button"
              className="bg-black text-white hover:bg-black/90 rounded-full px-6 transition-all hover:scale-105 active:scale-95"
              onClick={() => form.handleSubmit((values) => onSubmit(values, true))()}
              disabled={isLoading}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit for Review
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/engineer/projects")}
            disabled={isLoading}
            className="rounded-full px-6"
          >
            Cancel
          </Button>
        </>
      </>
    )

    // Clean up when component unmounts
    return () => setActions(null)
  }, [
    isLoading,
    form,
    router,
    setActions,
    isEditing,
    project?.status,
    selectedDepartments,
    additionalMedia,
    documents
  ])

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter text-xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="AI Research Assistant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departmentIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departments * (Collaborative)</FormLabel>
                  <div className="space-y-3 rounded-lg border p-4">
                    {departments.map((dept) => (
                      <div key={dept.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept.id}
                          checked={selectedDepartments.includes(dept.id)}
                          onCheckedChange={(checked) => {
                            const newDepartments = checked
                              ? [...selectedDepartments, dept.id]
                              : selectedDepartments.filter((id) => id !== dept.id)
                            handleDepartmentsChange(newDepartments)
                            field.onChange(newDepartments.join(","))
                          }}
                        />
                        <label
                          htmlFor={dept.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {dept.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    Select all departments involved in this project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="A brief, catchy description of your project"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short, compelling summary (1-2 sentences)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of your project, its features, and benefits..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed explanation of what your project does
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                      <SelectItem value="Alpha">Alpha</SelectItem>
                      <SelectItem value="Beta">Beta</SelectItem>
                      <SelectItem value="Production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current development stage of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter text-xl">Media & Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      folder="airc-portal/projects"
                      maxSize={5 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a cover image for your project (max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://demo.example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Live demo or preview link</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/project"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link to GitHub repository</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter text-xl">Additional Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload additional images or videos to showcase your project
            </p>

            <MediaUpload
              value={additionalMedia}
              onChange={handleMediaChange}
              folder="airc-portal/projects/media"
              maxFiles={10}
              maxSize={200 * 1024 * 1024}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter text-xl">Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload PDFs, whitepapers, research papers, or other documentation
            </p>

            <DocumentUpload
              value={documents}
              onChange={handleDocumentsChange}
              folder="airc-portal/projects/documents"
              maxFiles={10}
              maxSize={10 * 1024 * 1024}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter text-xl">Tags & Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormLabel>Tags *</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a tag (e.g., AI, Machine Learning)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} className="rounded-full px-6">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {getTagsArray().map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeTag(tag)
                      }}
                      className="ml-1 hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem className="mt-2">
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Technologies *</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add a technology (e.g., Python, React)"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTechnology()
                    }
                  }}
                />
                <Button type="button" onClick={addTechnology} className="rounded-full px-6">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {getTechnologiesArray().map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1 pr-1">
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeTechnology(tech)
                      }}
                      className="ml-1 hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormField
                control={form.control}
                name="technologies"
                render={() => (
                  <FormItem className="mt-2">
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

      </form>
    </Form>
  )
}

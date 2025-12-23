"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Department } from "@prisma/client"
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
import { createDepartment, updateDepartment } from "@/app/actions/departments"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/upload/image-upload"

const departmentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().min(50, "Long description must be at least 50 characters"),
  icon: z.string().min(1, "Icon name is required"),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex color (e.g., #FF5733)"),
  image: z.string().url("Valid image URL is required"),
  videoUrl: z.string().url("Valid video URL is required").optional().or(z.literal("")),
})

interface DepartmentFormProps {
  department?: Department
}

export function DepartmentForm({ department }: DepartmentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!department

  const form = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: department?.name || "",
      slug: department?.slug || "",
      description: department?.description || "",
      longDescription: department?.longDescription || "",
      icon: department?.icon || "",
      color: department?.color || "#52c2cb",
      image: department?.image || "",
      videoUrl: department?.videoUrl || "",
    },
  })

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    if (!isEditing) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      form.setValue("slug", slug)
    }
  }

  async function onSubmit(values: z.infer<typeof departmentFormSchema>) {
    setIsLoading(true)

    try {
      const result = isEditing
        ? await updateDepartment(department.id, values)
        : await createDepartment(values)

      if (result.success) {
        toast.success(result.message)
        router.push("/admin/departments")
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Artificial Intelligence & Machine Learning"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        handleNameChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ai-ml"
                      {...field}
                      disabled={isEditing}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (auto-generated from name). {isEditing && "Cannot be changed after creation."}
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
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief description for cards and previews"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    1-2 sentence summary
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the department's focus, research areas, and goals..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed description for the department page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter">Visual Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brain (Lucide icon name)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Lucide icon name (e.g., Brain, Blocks, Globe, Cpu)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Color *</FormLabel>
                  <div className="flex gap-4">
                    <FormControl>
                      <Input
                        placeholder="#52c2cb"
                        {...field}
                        className="flex-1"
                      />
                    </FormControl>
                    <div
                      className="w-12 h-10 rounded border"
                      style={{ backgroundColor: field.value || "#52c2cb" }}
                    />
                  </div>
                  <FormDescription>
                    Hex color code for department branding
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Image *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      folder="airc-portal/departments"
                      maxSize={5 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormDescription>
                    Main image for the department (max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    YouTube or Vimeo video URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-8 transition-all hover:scale-105 active:scale-95"
          >
            {isLoading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Update Department"
                : "Create Department"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/departments")}
            disabled={isLoading}
            className="rounded-full px-6"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}

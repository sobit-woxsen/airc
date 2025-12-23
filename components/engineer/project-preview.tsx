"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, FileText, Eye } from "lucide-react"
import { Department } from "@prisma/client"

const statusColors: Record<string, string> = {
  Production: "bg-green-500/15 text-green-700 border-green-500/30",
  Beta: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Alpha: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  "Coming Soon": "bg-gray-500/15 text-gray-700 border-gray-500/30",
}

interface ProjectPreviewProps {
  formData: {
    name: string
    tagline: string
    description: string
    image: string
    tags: string[]
    technologies: string[]
    productStatus: string
    demoUrl?: string
    githubUrl?: string
    docUrl?: string
    previewUrl?: string
  }
  departments: Department[]
  selectedDepartmentIds: string[]
}

export function ProjectPreview({ formData, departments, selectedDepartmentIds }: ProjectPreviewProps) {
  const selectedDepts = departments.filter((d) => selectedDepartmentIds.includes(d.id))

  return (
    <div className="space-y-6 sticky top-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>Live Preview</span>
      </div>

      {/* Media Section */}
      <div className="relative rounded-xl overflow-hidden border border-black/10 bg-gray-100 aspect-video">
        {formData.image ? (
          <img
            src={formData.image}
            alt={formData.name || "Project preview"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No cover image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {selectedDepts.length > 0 ? (
              selectedDepts.map((dept) => (
                <Badge
                  key={dept.id}
                  variant="outline"
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${dept.color}15`,
                    borderColor: `${dept.color}30`,
                    color: dept.color,
                  }}
                >
                  {dept.name}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs">
                No Department
              </Badge>
            )}
            <Badge
              variant="outline"
              className={statusColors[formData.productStatus] || statusColors.Alpha}
            >
              {formData.productStatus}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            {formData.name || "Project Name"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {formData.tagline || "Project tagline will appear here"}
          </p>
        </div>

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">About</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {formData.description || "Project description will appear here"}
          </p>
        </div>

        {/* Technologies */}
        {formData.technologies.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-foreground text-background px-3 py-1.5 text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {formData.demoUrl && (
            <Button size="sm" className="text-xs rounded-full font-bold bg-foreground text-background" disabled>
              View Live Demo
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          )}
          {formData.previewUrl && (
            <Button size="sm" variant="outline" className="text-xs rounded-full border-2 font-bold" disabled>
              Preview
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          )}
          {formData.githubUrl && (
            <Button size="sm" variant="outline" className="text-xs rounded-full border-2 font-bold" disabled>
              <Github className="mr-1 h-3 w-3" />
              GitHub
            </Button>
          )}
          {formData.docUrl && (
            <Button size="sm" variant="outline" className="text-xs rounded-full border-2 font-bold" disabled>
              <FileText className="mr-1 h-3 w-3" />
              Docs
            </Button>
          )}
        </div>

        {/* Quick Info Card */}
        <div className="p-4 rounded-xl bg-gray-50 border border-black/5">
          <h4 className="text-sm font-bold text-foreground mb-3">Quick Info</h4>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium text-foreground">{formData.productStatus}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Departments</dt>
              <dd className="font-medium text-foreground">
                {selectedDepts.length > 0 ? selectedDepts.length : "None"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Technologies</dt>
              <dd className="font-medium text-foreground">{formData.technologies.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tags</dt>
              <dd className="font-medium text-foreground">{formData.tags.length}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

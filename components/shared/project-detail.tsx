"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Prisma } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Calendar,
  User,
  FileText,
  Link as LinkIcon,
  Github,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  FileImage,
  File,
  Pencil,
  Eye
} from "lucide-react"
import { approveProject, rejectProject, submitProjectForReview } from "@/app/actions/projects"
import { toast } from "sonner"
import { format } from "date-fns"
import Link from "next/link"

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    departments: {
      include: {
        department: true
      }
    }
    media: true
    documents: true
  }
}> & {
  submittedBy: {
    id: string
    name: string
    email: string
    departmentId: string | null
  } | null
}

interface ProjectDetailProps {
  project: ProjectWithRelations
  isAdmin: boolean
}

export function ProjectDetail({ project, isAdmin }: ProjectDetailProps) {
  const router = useRouter()
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    const result = await approveProject(project.id, notes)

    if (result.success) {
      toast.success(result.message)
      setApproveDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const handleReject = async () => {
    setIsLoading(true)
    const result = await rejectProject(project.id, notes)

    if (result.success) {
      toast.success(result.message)
      setRejectDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const result = await submitProjectForReview(project.id)

    if (result.success) {
      toast.success(result.message)
      setSubmitDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any; className: string }> = {
      DRAFT: { label: "Draft", variant: "secondary", icon: FileText, className: "" },
      UNDER_REVIEW: { label: "Under Review", variant: "default", icon: Clock, className: "bg-slate-600" },
      APPROVED: { label: "Approved", variant: "default", icon: CheckCircle, className: "bg-green-600" },
      REJECTED: { label: "Rejected", variant: "destructive", icon: XCircle, className: "" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <>
      {/* Rejected Status Warning */}
      {project.status === "REJECTED" && project.reviewNotes && (
        <Card className="rounded-2xl border-red-200 bg-red-50 shadow-none">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Project Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 mb-2 font-medium">Feedback from admin:</p>
            <p className="text-red-700 whitespace-pre-wrap">{project.reviewNotes}</p>
            {!isAdmin && (
              <p className="text-sm text-red-600 mt-4">
                Please address the feedback above, edit your project, and resubmit for review.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tighter">{project.name}</h1>
          <p className="text-muted-foreground mt-1 font-medium">{project.tagline}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(project.status)}
          {!isAdmin && (project.status === "DRAFT" || project.status === "REJECTED") && (
            <>
              <Link href={`/engineer/projects/${project.id}/edit`}>
                <Button variant="outline" size="sm" className="rounded-full px-4 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setSubmitDialogOpen(true)}
                className="bg-black text-white hover:bg-black/90 rounded-full px-6 transition-all hover:scale-105 active:scale-95"
              >
                {project.status === "REJECTED" ? "Resubmit for Review" : "Submit for Review"}
              </Button>
            </>
          )}
          {isAdmin && project.status === "UNDER_REVIEW" && (
            <>
              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(true)}
                className="text-destructive hover:text-destructive rounded-full px-6 transition-all hover:scale-105 active:scale-95"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() => setApproveDialogOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {project.image && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-black font-semibold hover:underline"
                >
                  <Play className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.previewUrl && (
                <a
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-black font-semibold hover:underline"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-black font-semibold hover:underline"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.docUrl && (
                <a
                  href={project.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-black font-semibold hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  Documentation
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-slate-200 shadow-none">
            <CardHeader>
              <CardTitle className="font-medium tracking-tighter">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.submittedBy && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{project.submittedBy.name}</p>
                    <p className="text-muted-foreground text-xs">{project.submittedBy.email}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-xs">Departments</p>
                </div>
                <div className="flex flex-wrap gap-1 ml-6">
                  {project.departments.map((pd) => (
                    <Badge key={pd.department.id} variant="outline" className="rounded-full shadow-none">
                      {pd.department.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{format(new Date(project.createdAt), "PPP")}</p>
                  <p className="text-muted-foreground text-xs">Created</p>
                </div>
              </div>

              {project.submittedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{format(new Date(project.submittedAt), "PPP")}</p>
                    <p className="text-muted-foreground text-xs">Submitted</p>
                  </div>
                </div>
              )}

              {project.reviewedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{format(new Date(project.reviewedAt), "PPP")}</p>
                    <p className="text-muted-foreground text-xs">Reviewed</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <Badge variant="outline">{project.productStatus}</Badge>
              </div>
            </CardContent>
          </Card>

          {project.reviewNotes && (
            <Card className="rounded-2xl border-slate-200 shadow-none">
              <CardHeader>
                <CardTitle className="font-medium tracking-tighter">Review Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {project.reviewNotes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {project.media && project.media.length > 0 && (
        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter">Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {project.media.map((item) => (
                <div key={item.id} className="space-y-2">
                  {item.type === "IMAGE" ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                      <Image
                        src={item.url}
                        alt="Project media"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-black">
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileImage className="h-4 w-4" />
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {project.documents && project.documents.length > 0 && (
        <Card className="rounded-2xl border-slate-200 shadow-none">
          <CardHeader>
            <CardTitle className="font-medium tracking-tighter">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {project.documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  <File className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{doc.title || "Document"}</span>
                  <Badge variant="outline">{doc.type}</Badge>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Project</DialogTitle>
            <DialogDescription>
              Add optional notes for the project owner about the approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="approve-notes">Notes (Optional)</Label>
              <Textarea
                id="approve-notes"
                placeholder="Great work! The project meets all requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
              disabled={isLoading}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6"
            >
              {isLoading ? "Approving..." : "Approve Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Project</DialogTitle>
            <DialogDescription>
              Please provide feedback for the project owner about why the project was rejected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reject-notes">Notes</Label>
              <Textarea
                id="reject-notes"
                placeholder="The project needs improvements in..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={isLoading}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={isLoading}
              variant="destructive"
              className="rounded-full px-6"
            >
              {isLoading ? "Rejecting..." : "Reject Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {project.status === "REJECTED" ? "Resubmit Project for Review" : "Submit Project for Review"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {project.status === "REJECTED"
                ? "Are you sure you want to resubmit this project for review? Make sure you've addressed all feedback from the previous review."
                : "Are you sure you want to submit this project for review? Once submitted, you won't be able to edit it until it's been reviewed."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-black text-white hover:bg-black/90 rounded-full px-6"
            >
              {isLoading ? (project.status === "REJECTED" ? "Resubmitting..." : "Submitting...") : (project.status === "REJECTED" ? "Resubmit" : "Submit")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

"use client"

import { useState } from "react"
import { Project, Department, User } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, CheckCircle, XCircle, Trash2, Pencil } from "lucide-react"
import { approveProject, rejectProject, deleteProject } from "@/app/actions/projects"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { format } from "date-fns"

type ProjectWithRelations = Project & {
  departments: {
    department: Department
  }[]
  submittedBy: Pick<User, "id" | "name" | "email"> | null
  _count: {
    media: number
    documents: number
  }
}

interface ProjectsTableProps {
  projects: ProjectWithRelations[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [approveDialog, setApproveDialog] = useState(false)
  const [rejectDialog, setRejectDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectWithRelations | null>(null)
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [confirmName, setConfirmName] = useState("")

  const handleApprove = async () => {
    if (!selectedProject) return

    setIsLoading(true)
    const result = await approveProject(selectedProject.id, notes)

    if (result.success) {
      toast.success(result.message)
      setApproveDialog(false)
      setNotes("")
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const handleReject = async () => {
    if (!selectedProject) return

    setIsLoading(true)
    const result = await rejectProject(selectedProject.id, notes)

    if (result.success) {
      toast.success(result.message)
      setRejectDialog(false)
      setNotes("")
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!selectedProject) return

    setIsLoading(true)
    const result = await deleteProject(selectedProject.id, confirmName)

    if (result.success) {
      toast.success(result.message)
      setDeleteDialog(false)
      setConfirmName("")
    } else {
      toast.error(result.message)
    }

    setIsLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      DRAFT: { variant: "secondary", className: "" },
      UNDER_REVIEW: { variant: "default", className: "bg-slate-600 hover:bg-slate-700" },
      APPROVED: { variant: "default", className: "bg-green-600 hover:bg-green-700" },
      REJECTED: { variant: "destructive", className: "" },
    }

    const config = variants[status] || variants.DRAFT

    return (
      <Badge variant={config.variant} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-none shadow-none ${config.className}`}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-black/5 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.departments.map((pd) => (
                        <Badge key={pd.department.id} variant="outline" className="text-xs rounded-full shadow-none">
                          {pd.department.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{project.submittedBy?.name || "N/A"}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>
                    {project.submittedAt
                      ? format(new Date(project.submittedAt), "MMM d, yyyy")
                      : "Not submitted"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/${project.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {project.status === "UNDER_REVIEW" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProject(project)
                                setApproveDialog(true)
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProject(project)
                                setRejectDialog(true)
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedProject(project)
                            setConfirmName("")
                            setDeleteDialog(true)
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialog} onOpenChange={setApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">Approve Project</DialogTitle>
            <DialogDescription className="font-medium">
              Show "{selectedProject?.name}" on the public website?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                placeholder="Add any notes or feedback..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialog(false)} disabled={isLoading} className="rounded-full px-6">
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 rounded-full px-6"
            >
              {isLoading ? "Approving..." : "Approve Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">Reject Project</DialogTitle>
            <DialogDescription className="font-medium">
              Are you sure you want to reject "{selectedProject?.name}"?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Reason for Rejection
              </label>
              <Textarea
                placeholder="Please provide a reason for rejection..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)} disabled={isLoading} className="rounded-full px-6">
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

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold text-xl">Delete Project</DialogTitle>
            <DialogDescription className="font-medium">
              Delete "{selectedProject?.name}"? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-semibold">Warning: This action is permanent!</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-xs">
                <li>All project media and documents will be deleted.</li>
                <li>Project history will be permanently lost.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-delete-admin" className="text-sm font-medium">
                To confirm, type <span className="font-bold select-none">"{selectedProject?.name}"</span> below:
              </Label>
              <Input
                id="confirm-delete-admin"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder="Type project name here"
                className="rounded-xl border-slate-200"
                autoComplete="off"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialog(false)
                setConfirmName("")
              }}
              disabled={isLoading}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading || confirmName !== selectedProject?.name}
              variant="destructive"
              className="rounded-full px-6"
            >
              {isLoading ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

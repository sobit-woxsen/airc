"use client"

import { useState } from "react"
import { Project, Department } from "@prisma/client"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Pencil, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { deleteProject } from "@/app/actions/projects"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ProjectWithRelations = Project & {
  departments: {
    department: Department
  }[]
  submittedBy: {
    name: string | null
    email: string
  } | null
  _count: {
    media: number
    documents: number
  }
}

interface MyProjectsTableProps {
  projects: ProjectWithRelations[]
}

export function MyProjectsTable({ projects }: MyProjectsTableProps) {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmName, setConfirmName] = useState("")

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
      <Badge variant={config.variant} className={config.className}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Media</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No projects yet. Click "Submit New Project" to get started!
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.departments.map((pd) => (
                      <Badge key={pd.department.id} variant="outline" className="text-xs">
                        {pd.department.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {project.submittedBy?.name || "Unknown"}
                </TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>
                  {project.submittedAt
                    ? format(new Date(project.submittedAt), "MMM d, yyyy")
                    : "Not submitted"}
                </TableCell>
                <TableCell>{project._count.media}</TableCell>
                <TableCell>{project._count.documents}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/engineer/projects/${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/engineer/projects/${project.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
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

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProject?.name}"? This action cannot be undone and will permanently remove the project and all its associated data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-semibold">Warning: This action is permanent!</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-xs">
                <li>All project media and documents will be deleted.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-name">
                To confirm, type <span className="font-bold select-none">"{selectedProject?.name}"</span> below:
              </Label>
              <Input
                id="confirm-name"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder="Type project name here"
                className="rounded-sm h-11 border-slate-200"
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
              className="rounded-full px-6 py-6 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading || confirmName !== selectedProject?.name}
              variant="destructive"
              className="rounded-full px-6 py-6 cursor-pointer"
            >
              {isLoading ? "Deleting..." : "Permanently Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

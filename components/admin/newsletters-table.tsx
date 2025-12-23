"use client"
import { useState } from "react"
import { Newsletter } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, FileText, Eye, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { deleteNewsletter } from "@/app/actions/newsletters"
import { toast } from "sonner"

interface NewslettersTableProps {
  newsletters: (Newsletter & {
    createdBy: {
      id: string
      name: string
      email: string
    } | null
  })[]
}

export function NewslettersTable({ newsletters }: NewslettersTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!selectedNewsletter) return

    setIsDeleting(true)
    const result = await deleteNewsletter(selectedNewsletter.id)

    if (result.success) {
      toast.success(result.message)
      setDeleteDialogOpen(false)
    } else {
      toast.error(result.message)
    }

    setIsDeleting(false)
  }

  if (newsletters.length === 0) {
    return (
      <Card className="p-12 text-center rounded-2xl border-slate-200 shadow-none">
        <p className="text-muted-foreground">No newsletters found</p>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Issue</th>
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Title</th>
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Date</th>
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Topics</th>
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Status</th>
            <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Created</th>
            <th className="text-right p-4 font-semibold uppercase tracking-wider text-xs">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsletters.map((newsletter) => (
            <tr key={newsletter.id} className="border-b hover:bg-muted/30">
              <td className="p-4">
                <Badge variant="outline" className="rounded-full shadow-none">#{newsletter.issue}</Badge>
              </td>
              <td className="p-4 py-5 font-medium">{newsletter.title}</td>
              <td className="p-4 text-muted-foreground">{newsletter.date}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {newsletter.topics.slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs rounded-full shadow-none">
                      {topic}
                    </Badge>
                  ))}
                  {newsletter.topics.length > 2 && (
                    <Badge variant="secondary" className="text-xs rounded-full shadow-none">
                      +{newsletter.topics.length - 2}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-1">
                  <Badge
                    variant={newsletter.published ? "default" : "secondary"}
                    className="rounded-full shadow-none"
                  >
                    {newsletter.published ? "Published" : "Draft"}
                  </Badge>
                  {newsletter.featured && (
                    <Badge className="bg-black text-white rounded-full shadow-none">Featured</Badge>
                  )}
                </div>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {format(new Date(newsletter.createdAt), "MMM d, yyyy")}
              </td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/newsletters/${newsletter.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={newsletter.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Open PDF
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/newsletters/${newsletter.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => {
                          setSelectedNewsletter(newsletter)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the newsletter issue {selectedNewsletter?.issue} and all its
              associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-full px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 rounded-full px-6"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

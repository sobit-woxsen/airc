import { requireAdmin } from "@/lib/auth-helpers"
import { getProjectById } from "@/app/actions/projects"
import { getAllDepartments } from "@/app/actions/departments"
import { ProjectForm } from "@/components/engineer/project-form"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"

interface AdminEditProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminEditProjectPage({ params }: AdminEditProjectPageProps) {
  await requireAdmin()

  const { id } = await params

  const [project, departments] = await Promise.all([
    getProjectById(id),
    getAllDepartments(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
      <div>
        <Link href={`/admin/projects/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project Details
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Edit Project</h1>
        <p className="text-muted-foreground mt-1">
          Update project information and manage its status
        </p>
      </div>

      {/* Show rejection feedback if project was rejected */}
      {project.status === "REJECTED" && project.reviewNotes && (
        <Card className="rounded-2xl border-red-200 bg-red-50 shadow-none">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Rejection Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 whitespace-pre-wrap">{project.reviewNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Show approval notes if project was approved */}
      {project.status === "APPROVED" && project.reviewNotes && (
        <Card className="rounded-2xl border-green-200 bg-green-50 shadow-none">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Approval Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 whitespace-pre-wrap">{project.reviewNotes}</p>
          </CardContent>
        </Card>
      )}

      <ProjectForm project={project} departments={departments} />
    </div>
  )
}

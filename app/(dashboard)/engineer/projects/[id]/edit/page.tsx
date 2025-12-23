import { getCurrentUser } from "@/lib/auth-helpers"
import { getProjectById } from "@/app/actions/projects"
import { getAllDepartments } from "@/app/actions/departments"
import { ProjectForm } from "@/components/engineer/project-form"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound, redirect } from "next/navigation"
import { ProjectDepartment } from "@prisma/client"

interface EditProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login")

  const { id } = await params

  const [project, departments] = await Promise.all([
    getProjectById(id),
    getAllDepartments(),
  ])

  if (!project) {
    notFound()
  }

  // Check if user has edit access:
  // 1. The project owner
  // 2. Users from the same department as the project owner
  // 3. Users whose department is involved in collaborative projects
  const canEdit =
    project.submittedById === user.id ||
    (user.departmentId &&
      (project.submittedBy?.departmentId === user.departmentId ||
        project.departments.some((pd: ProjectDepartment) => pd.departmentId === user.departmentId)))

  if (!canEdit) {
    redirect(`/engineer/projects/${id}`)
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
      <div>
        <Link href="/engineer/projects">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Projects
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Edit Project</h1>
        <p className="text-muted-foreground mt-1">
          {project.status === "REJECTED"
            ? "Address the feedback and update your project to resubmit for review"
            : "Update your project information"}
        </p>
      </div>

      {/* Show rejection feedback if project was rejected */}
      {project.status === "REJECTED" && project.reviewNotes && (
        <Card className="rounded-2xl border-red-200 bg-red-50 shadow-none">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Admin Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 whitespace-pre-wrap">{project.reviewNotes}</p>
          </CardContent>
        </Card>
      )}

      <ProjectForm project={project} departments={departments} />
    </div>
  )
}

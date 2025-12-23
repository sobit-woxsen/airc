import { getCurrentUser } from "@/lib/auth-helpers"
import { getProjectById } from "@/app/actions/projects"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound, redirect } from "next/navigation"
import { ProjectDetail } from "@/components/shared/project-detail"
import { ProjectDepartment } from "@prisma/client"

interface EngineerProjectDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EngineerProjectDetailPage({ params }: EngineerProjectDetailPageProps) {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login")

  const { id } = await params

  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  // Engineers can view:
  // 1. Their own projects
  // 2. Projects from teammates in the same department
  // 3. Collaborative projects involving their department
  const hasAccess =
    project.submittedById === user.id ||
    (user.departmentId &&
      (project.submittedBy?.departmentId === user.departmentId ||
        project.departments.some((pd: ProjectDepartment) => pd.departmentId === user.departmentId)))

  if (!hasAccess) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-5xl mx-auto">
      <div>
        <Link href="/engineer/projects">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Projects
          </Button>
        </Link>
      </div>

      <ProjectDetail project={project} isAdmin={false} />
    </div>
  )
}

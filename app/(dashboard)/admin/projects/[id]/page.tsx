import { requireAdmin } from "@/lib/auth-helpers"
import { getProjectById } from "@/app/actions/projects"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/shared/project-detail"

interface AdminProjectDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminProjectDetailPage({ params }: AdminProjectDetailPageProps) {
  await requireAdmin()
  const { id } = await params

  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8 p-10 max-w-5xl mx-auto">
      <div>
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <ProjectDetail project={project} isAdmin={true} />
    </div>
  )
}

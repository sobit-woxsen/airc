import { requireEngineer } from "@/lib/auth-helpers"
import { getMyProjects } from "@/app/actions/projects"
import { MyProjectsTable } from "@/components/engineer/my-projects-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function EngineerProjectsPage() {
  const user = await requireEngineer()
  const projects = await getMyProjects()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium tracking-tighter">Projects</h1>
          <p className="text-muted-foreground mt-1">
            {user.departmentId
              ? "Your projects and collaborative projects from your department"
              : "Manage and track your submitted projects"}
          </p>
        </div>
        <Link href="/engineer/projects/new">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-6 transition-all hover:scale-105 active:scale-95">
            <Plus className="mr-2 h-4 w-4" />
            Submit New Project
          </Button>
        </Link>
      </div>

      <MyProjectsTable projects={projects} />
    </div>
  )
}

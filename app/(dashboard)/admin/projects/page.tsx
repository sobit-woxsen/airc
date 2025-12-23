import { requireAdmin } from "@/lib/auth-helpers"
import { getAllProjects } from "@/app/actions/projects"
import { ProjectsTable } from "@/components/admin/projects-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminProjectsPage() {
  await requireAdmin()
  const allProjects = await getAllProjects()

  // Filter out DRAFT projects from admin view
  const projects = allProjects.filter((p) => p.status !== "DRAFT")

  const underReview = projects.filter((p) => p.status === "UNDER_REVIEW")
  const approved = projects.filter((p) => p.status === "APPROVED")
  const rejected = projects.filter((p) => p.status === "REJECTED")

  return (
    <div className="flex flex-col gap-8 p-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Projects</h1>
        <p className="text-muted-foreground font-medium">
          Manage and review all project submissions
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="under-review">
            Under Review ({underReview.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ProjectsTable projects={projects} />
        </TabsContent>

        <TabsContent value="under-review" className="mt-6">
          <ProjectsTable projects={underReview} />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <ProjectsTable projects={approved} />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <ProjectsTable projects={rejected} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

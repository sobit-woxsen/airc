import { getCurrentUser } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { StatsCard } from "@/components/dashboard/stats-card"
import { FolderKanban, Clock, CheckCircle, XCircle, ArrowRight, Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EngineerDashboardPage() {
  // Layout already handles auth check, just get user data
  const user = await getCurrentUser()

  // This should never happen as layout ensures user is authenticated
  if (!user) {
    return null
  }

  // Build where clause for projects visible to this engineer:
  // 1. Their own projects
  // 2. Projects from teammates in same department
  // 3. Collaborative projects involving their department
  const projectsWhereClause = user.departmentId
    ? {
      OR: [
        { submittedById: user.id }, // Own projects
        {
          submittedBy: {
            departmentId: user.departmentId, // Same department projects
          },
        },
        {
          departments: {
            some: {
              departmentId: user.departmentId, // Collaborative projects
            },
          },
        },
      ],
    }
    : { submittedById: user.id } // If no department, only show own projects

  // Fetch user's project statistics
  const [myProjects, draftProjects, underReviewProjects, approvedProjects, rejectedProjects] =
    await Promise.all([
      prisma.project.findMany({
        where: projectsWhereClause,
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: {
          departments: {
            include: {
              department: {
                select: { name: true },
              },
            },
          },
          submittedBy: {
            select: { name: true },
          },
        },
      }),
      prisma.project.count({
        where: { ...projectsWhereClause, status: "DRAFT" },
      }),
      prisma.project.count({
        where: { ...projectsWhereClause, status: "UNDER_REVIEW" },
      }),
      prisma.project.count({
        where: { ...projectsWhereClause, status: "APPROVED" },
      }),
      prisma.project.count({
        where: { ...projectsWhereClause, status: "REJECTED" },
      }),
    ])

  const totalProjects = draftProjects + underReviewProjects + approvedProjects + rejectedProjects

  return (
    <div className="space-y-6 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-muted-foreground font-medium">
            Welcome back, {user.name}! Here's your project overview.
          </p>
        </div>
        <Link href="/engineer/projects/new">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-6 transition-all hover:scale-105 active:scale-95 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          description="All your projects"
          icon={FolderKanban}
        />
        <StatsCard
          title="Pending Review"
          value={underReviewProjects}
          description="Waiting for approval"
          icon={Clock}
        />
        <StatsCard
          title="Approved"
          value={approvedProjects}
          description="Live projects"
          icon={CheckCircle}
        />
        <StatsCard
          title="Draft"
          value={draftProjects}
          description="Not submitted yet"
          icon={XCircle}
        />
      </div>

      {/* Recent Projects */}
      <Card className="rounded-lg border-black/5 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-semibold">Recent Projects</CardTitle>
              <CardDescription className="font-medium">
                {user.departmentId
                  ? "Your projects and team projects"
                  : "Your latest projects"}
              </CardDescription>
            </div>
            <Link href="/engineer/projects">
              <Button variant="outline" size="sm" className="rounded-full px-5 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 font-semibold">
                View All
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {myProjects.length === 0 ? (
            <div className="text-center py-16">
              <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6 font-medium">
                You haven't created any projects yet
              </p>
              <Link href="/engineer/projects/new">
                <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-6 transition-all hover:scale-105 active:scale-95 font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/engineer/projects/${project.id}`}
                  className="flex items-center justify-between p-4 border border-black/5 rounded-lg hover:bg-gray-50 transition-all hover:scale-[1.01] group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate group-hover:text-black transition-colors">{project.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {project.departments.map((pd) => pd.department.name).join(", ")} • {project.productStatus}
                      {project.submittedById !== user.id && project.submittedBy && (
                        <> • by {project.submittedBy.name}</>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === "DRAFT"
                        ? "bg-gray-100 text-gray-800"
                        : project.status === "UNDER_REVIEW"
                          ? "bg-yellow-100 text-yellow-800"
                          : project.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      {totalProjects === 0 && (
        <Card className="rounded-lg border-black/5 bg-neutral-50 shadow-sm">
          <CardHeader>
            <CardTitle className="font-semibold">Getting Started</CardTitle>
            <CardDescription className="font-medium">Tips for your first project</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">1</span>
                <span className="text-muted-foreground">
                  Write a clear description and tagline for your project
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">2</span>
                <span className="text-muted-foreground">
                  Add high-quality images and videos
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">3</span>
                <span className="text-muted-foreground">
                  Include documentation and research papers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">4</span>
                <span className="text-muted-foreground">Add links to demos and GitHub</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px]">5</span>
                <span className="text-muted-foreground">
                  Submit for review - admins will review within 2-3 days
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import { StatsCard } from "@/components/dashboard/stats-card"
import {
  FolderKanban,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
  // Fetch statistics
  const [
    totalProjects,
    underReviewProjects,
    approvedProjects,
    rejectedProjects,
    totalUsers,
    totalDepartments,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.project.count({ where: { status: "APPROVED" } }),
    prisma.project.count({ where: { status: "REJECTED" } }),
    prisma.user.count(),
    prisma.department.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        submittedBy: {
          select: { name: true, email: true },
        },
        departments: {
          include: {
            department: {
              select: { name: true },
            },
          },
        },
      },
    }),
  ])

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground font-medium">
          Manage projects, users, and departments
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          description="All projects"
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
          title="Rejected"
          value={rejectedProjects}
          description="Need changes"
          icon={XCircle}
        />
        <StatsCard
          title="Total Users"
          value={totalUsers}
          description="Team members"
          icon={Users}
        />
        <StatsCard
          title="Departments"
          value={totalDepartments}
          description="Active departments"
          icon={Building2}
        />
      </div>

      {/* Recent Projects */}
      <Card className="rounded-lg border-black/5 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-semibold">Recent Projects</CardTitle>
              <CardDescription className="font-medium">
                Latest submissions from all departments
              </CardDescription>
            </div>
            <Link href="/admin/projects">
              <Button variant="outline" size="sm" className="rounded-full px-5 hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 font-semibold">
                View All
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground font-medium">
              No projects yet
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between p-4 border border-black/5 rounded-lg hover:bg-gray-50 transition-all hover:scale-[1.01] group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate group-hover:text-black transition-colors">{project.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {project.departments.map((pd) => pd.department.name).join(", ")} • {project.submittedBy?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === "UNDER_REVIEW"
                        ? "bg-yellow-100 text-yellow-800"
                        : project.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : project.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
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

      {/* Quick Actions */}
      <Card className="rounded-lg border-black/5 shadow-sm">
        <CardHeader>
          <CardTitle className="font-semibold">Quick Actions</CardTitle>
          <CardDescription className="font-medium">Common tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/projects?status=UNDER_REVIEW">
            <Button variant="outline" className="w-full justify-start rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
              <Clock className="mr-2 h-4 w-4" />
              Review Projects
            </Button>
          </Link>
          <Link href="/admin/users/new">
            <Button variant="outline" className="w-full justify-start rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
              <Users className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
          <Link href="/admin/departments">
            <Button variant="outline" className="w-full justify-start rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
              <Building2 className="mr-2 h-4 w-4" />
              Departments
            </Button>
          </Link>
          <Link href="/admin/projects">
            <Button variant="outline" className="w-full justify-start rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
              <FolderKanban className="mr-2 h-4 w-4" />
              All Projects
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

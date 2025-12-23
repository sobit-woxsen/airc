import { requireEngineer } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { ProjectForm } from "@/components/engineer/project-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewProjectPage() {
  await requireEngineer()

  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <div>
        <Link href="/engineer/projects">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Projects
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Submit New Project</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details about your project. You can save as draft and submit for review later.
        </p>
      </div>

      <ProjectForm departments={departments} />
    </div>
  )
}

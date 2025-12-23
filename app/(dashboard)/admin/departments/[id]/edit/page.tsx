import { requireAdmin } from "@/lib/auth-helpers"
import { getDepartmentById } from "@/app/actions/departments"
import { DepartmentForm } from "@/components/admin/department-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface EditDepartmentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditDepartmentPage({ params }: EditDepartmentPageProps) {
  await requireAdmin()
  const { id } = await params

  const department = await getDepartmentById(id)

  if (!department) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">
      <div>
        <Link href="/admin/departments">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Departments
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Edit Department</h1>
        <p className="text-muted-foreground mt-1">
          Update department information
        </p>
      </div>

      <DepartmentForm department={department} />
    </div>
  )
}

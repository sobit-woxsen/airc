import { requireAdmin } from "@/lib/auth-helpers"
import { getAllDepartments } from "@/app/actions/departments"
import { DepartmentsTable } from "@/components/admin/departments-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminDepartmentsPage() {
  await requireAdmin()
  const departments = await getAllDepartments()

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Departments</h1>
          <p className="text-muted-foreground font-medium">
            Manage research areas and information
          </p>
        </div>
        <Link href="/admin/departments/new">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-8 transition-all hover:scale-105 active:scale-95 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add Area
          </Button>
        </Link>
      </div>

      <DepartmentsTable departments={departments} />
    </div>
  )
}

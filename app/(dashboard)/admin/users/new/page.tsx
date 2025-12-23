import { requireAdmin } from "@/lib/auth-helpers"
import { prisma } from "@/lib/prisma"
import { UserForm } from "@/components/admin/user-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewUserPage() {
  await requireAdmin()

  // Get all departments for the dropdown
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="flex flex-col gap-6 p-8 max-w-2xl">
      <div>
        <Link href="/admin/users">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Add New User</h1>
        <p className="text-muted-foreground mt-1">
          Create a new user account
        </p>
      </div>

      <UserForm departments={departments} />
    </div>
  )
}

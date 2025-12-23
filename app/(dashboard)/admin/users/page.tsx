import { requireAdmin } from "@/lib/auth-helpers"
import { getAllUsers } from "@/app/actions/users"
import { UsersTable } from "@/components/admin/users-table"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default async function AdminUsersPage() {
  await requireAdmin()
  const users = await getAllUsers()

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Users</h1>
          <p className="text-muted-foreground font-medium">
            Manage team members and permissions
          </p>
        </div>
        <Link href="/admin/users/new">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-8 transition-all hover:scale-105 active:scale-95 font-semibold">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </Link>
      </div>

      <UsersTable users={users} />
    </div>
  )
}

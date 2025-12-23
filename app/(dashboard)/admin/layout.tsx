import { requireAdmin } from "@/lib/auth-helpers"
import { Sidebar } from "@/components/dashboard/sidebar"
import { HeaderActionsProvider } from "@/components/dashboard/header-actions-context"
import { AdminHeader } from "@/components/dashboard/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAdmin()

  return (
    <HeaderActionsProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          userRoles={user.roles}
          activeRole={user.activeRole}
          userName={user.name || undefined}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            {children}
          </main>
        </div>
      </div>
    </HeaderActionsProvider>
  )
}

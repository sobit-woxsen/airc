import { requireEngineer } from "@/lib/auth-helpers"
import { Sidebar } from "@/components/dashboard/sidebar"
import { HeaderActionsProvider } from "@/components/dashboard/header-actions-context"
import { EngineerHeader } from "@/components/dashboard/engineer-header"

export default async function EngineerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireEngineer()

  return (
    <HeaderActionsProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          userRoles={user.roles}
          activeRole={user.activeRole}
          userName={user.name || undefined}
          departmentName={user.department?.name}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <EngineerHeader />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            {children}
          </main>
        </div>
      </div>
    </HeaderActionsProvider>
  )
}

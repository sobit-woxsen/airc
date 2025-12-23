"use client"

import { useHeaderActions } from "./header-actions-context"

export function EngineerHeader() {
  const { actions } = useHeaderActions()

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between shadow-sm shadow-black/[0.02]">
      <div>
        <h1 className="text-xl font-medium tracking-tighter">Engineer Portal</h1>
        <p className="text-xs text-muted-foreground font-medium">
          Submit and manage your projects
        </p>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}

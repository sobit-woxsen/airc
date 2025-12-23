"use client"

import { useHeaderActions } from "./header-actions-context"

export function AdminHeader() {
    const { actions } = useHeaderActions()

    return (
        <header className="h-16 border-b bg-white px-8 flex items-center justify-between shadow-sm shadow-black/[0.01]">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">Management</h1>
                <p className="text-xs text-muted-foreground font-medium">
                    Overview and control panel
                </p>
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
    )
}

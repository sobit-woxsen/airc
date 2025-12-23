"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Role } from "@prisma/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronsDown, ChevronsUp, } from "lucide-react"
import { toast } from "sonner"
import { switchRole } from "@/app/actions/role"

interface RoleSwitcherProps {
  userRoles: Role[]
  activeRole: Role
}

export function RoleSwitcher({ userRoles, activeRole }: RoleSwitcherProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (userRoles.length <= 1) {
    // Don't show switcher if user has only one role
    return null
  }

  const handleRoleSwitch = async (newRole: Role) => {
    if (newRole === activeRole) return

    setIsLoading(true)

    try {
      await switchRole(newRole)

      // Redirect to appropriate dashboard
      if (newRole === "ADMIN") {
        router.push("/admin")
      } else if (newRole === "ENGINEER") {
        router.push("/engineer")
      }

      toast.success(`Switched to ${newRole.toLowerCase()} view`)
      router.refresh()
    } catch (error) {
      toast.error("Failed to switch role")
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleLabel = (role: Role) => {
    return role.charAt(0) + role.slice(1).toLowerCase()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between gap-2 h-10 px-4 rounded-lg border-slate-200 shadow-none hover:bg-slate-50 hover:text-black transition-all font-medium"
          disabled={isLoading}
        >
          <span className="truncate">{getRoleLabel(activeRole)}</span>
          {isOpen ? (
            <ChevronsUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronsDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg">
        {userRoles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleSwitch(role)}
            disabled={role === activeRole || isLoading}
            className={role === activeRole ? "bg-muted" : ""}
          >
            {getRoleLabel(role)}
            {role === activeRole && (
              <span className="ml-auto text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

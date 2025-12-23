"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Building2,
  BookOpen,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Role } from "@prisma/client"
import { RoleSwitcher } from "./role-switcher"
import { UserNav } from "./user-nav"
import { signOut } from "@/lib/auth-client"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Projects", href: "/admin/projects", icon: FolderKanban },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Departments", href: "/admin/departments", icon: Building2 },
  { title: "Newsletters", href: "/admin/newsletters", icon: BookOpen },
]

const engineerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/engineer", icon: LayoutDashboard },
  { title: "My Projects", href: "/engineer/projects", icon: FolderKanban },
]

interface SidebarProps {
  userRoles: Role[]
  activeRole: Role
  userName?: string
  departmentName?: string
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    designation?: string | null
  }
}

export function Sidebar({ userRoles, activeRole, userName, departmentName, user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = activeRole === "ADMIN" ? adminNavItems : engineerNavItems
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-white transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo/Header */}
      <div className={cn(
        "border-b space-y-4 transition-all duration-300",
        isCollapsed ? "px-2 py-4" : "p-5"
      )}>
        <div className={cn(
          "flex items-center justify-between gap-2",
          isCollapsed && "flex-col"
        )}>
          <Link
            href={activeRole === "ADMIN" ? "/admin" : "/engineer"}
            className={cn(
              "flex items-center gap-2 flex-1 min-w-0",
              isCollapsed && "justify-center"
            )}
          >
            <div className={cn(
              "relative transition-all duration-500 flex-shrink-0",
              isCollapsed ? "h-8 w-8" : "h-10 w-10"
            )}>
              <img
                src="/airc-logo-3d-latest.PNG"
                alt="AIRC Logo"
                className="object-contain w-full h-full"
              />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold tracking-tight">AIRC Portal</h2>
                {activeRole === "ENGINEER" && departmentName ? (
                  <p className="text-xs text-muted-foreground font-medium truncate">
                    {departmentName}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground font-medium">
                    {activeRole === "ADMIN" ? "Admin" : "Engineer"}
                  </p>
                )}
              </div>
            )}
          </Link>

          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="flex-shrink-0 hover:bg-gray-100 rounded-full h-8 w-8 transition-transform active:scale-90"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Role Switcher */}
        {!isCollapsed && <RoleSwitcher userRoles={userRoles} activeRole={activeRole} />}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              // Fix: Make dashboard route (/admin or /engineer) only active when exactly matching
              // For other routes, check if pathname starts with the route
              const isActive =
                item.title === "Dashboard"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + "/")

              const navLink = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                    isCollapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-black text-white shadow-lg shadow-black/10 scale-[1.02]"
                      : "text-gray-500 hover:bg-gray-100/80 hover:text-black hover:translate-x-1"
                  )}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-white")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )

              if (isCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      {navLink}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return navLink
            })}
          </nav>
        </TooltipProvider>
      </ScrollArea>

      <Separator />

      {/* User Section */}
      <div className={cn("space-y-3", isCollapsed ? "p-2" : "p-4")}>
        {isCollapsed ? (
          <TooltipProvider delayDuration={0}>
            <div className="flex flex-col gap-2 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <UserNav user={user} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="font-medium">{user.name || "User"}</p>
                  {user.designation && (
                    <p className="text-xs text-muted-foreground">{user.designation}</p>
                  )}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sign Out
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <UserNav user={user} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name || "User"}</p>
                {user.designation && (
                  <p className="text-xs text-muted-foreground truncate">
                    {user.designation}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start rounded-full font-semibold  transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

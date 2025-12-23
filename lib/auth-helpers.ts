import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getActiveRole, setActiveRole } from "@/lib/role-manager"

/**
 * Get the current session from Better Auth
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

/**
 * Get the current user with their full data including department and active role
 */
export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { department: true },
  })

  if (!user) return null

  // Get active role from cookie (set by middleware)
  const activeRole = await getActiveRole()

  // Use the active role from cookie, or default to first role if not set
  const currentActiveRole = activeRole && user.roles.includes(activeRole)
    ? activeRole
    : user.roles[0]

  return {
    ...user,
    activeRole: currentActiveRole,
  }
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/auth/login")
  }

  return session
}

/**
 * Require admin role - redirect if not admin
 */
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/admin")
  }

  // Check if user has ADMIN role
  if (!user.roles.includes("ADMIN")) {
    // User doesn't have admin role at all, redirect to their first role's dashboard
    const firstRole = user.roles[0]
    if (firstRole === "ENGINEER") {
      redirect("/engineer")
    } else {
      redirect("/")
    }
  }

  // Note: Active role switching is handled by the role switcher component
  // The middleware will ensure the cookie is set correctly

  return user
}

/**
 * Require engineer role - redirect if not engineer
 */
export async function requireEngineer() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/engineer")
  }

  // Check if user has ENGINEER role
  if (!user.roles.includes("ENGINEER")) {
    // User doesn't have engineer role at all, redirect to their first role's dashboard
    const firstRole = user.roles[0]
    if (firstRole === "ADMIN") {
      redirect("/admin")
    } else {
      redirect("/")
    }
  }

  // Note: Active role switching is handled by the role switcher component
  // The middleware will ensure the cookie is set correctly

  return user
}

/**
 * Check if current user has admin role
 */
export async function hasAdminRole() {
  const user = await getCurrentUser()
  return user?.roles.includes("ADMIN") ?? false
}

/**
 * Check if current user has engineer role
 */
export async function hasEngineerRole() {
  const user = await getCurrentUser()
  return user?.roles.includes("ENGINEER") ?? false
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: Role) {
  const user = await getCurrentUser()
  return user?.roles.includes(role) ?? false
}

/**
 * Get user's active role
 */
export async function getUserActiveRole() {
  const user = await getCurrentUser()
  return user?.activeRole ?? null
}

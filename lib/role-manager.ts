"use server"

import { cookies } from "next/headers"
import { Role } from "@prisma/client"

const ACTIVE_ROLE_COOKIE = "active_role"

export async function setActiveRole(role: Role) {
  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_ROLE_COOKIE, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function getActiveRole(): Promise<Role | null> {
  const cookieStore = await cookies()
  const role = cookieStore.get(ACTIVE_ROLE_COOKIE)
  return role?.value as Role | null
}

export async function clearActiveRole() {
  const cookieStore = await cookies()
  cookieStore.delete(ACTIVE_ROLE_COOKIE)
}

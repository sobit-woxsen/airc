"use server"

import { Role } from "@prisma/client"
import { setActiveRole } from "@/lib/role-manager"
import { getCurrentUser } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"

export async function switchRole(newRole: Role) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  if (!user.roles.includes(newRole)) {
    throw new Error("You don't have access to this role")
  }

  await setActiveRole(newRole)
  revalidatePath("/", "layout")

  return { success: true, role: newRole }
}

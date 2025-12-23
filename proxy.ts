import { NextResponse, type NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  const isLoggedIn = !!session?.user

  // Get active role from cookie
  const activeRoleCookie = req.cookies.get("active_role")
  let activeRole = activeRoleCookie?.value as "ADMIN" | "ENGINEER" | undefined

  // If no active role but user is logged in, fetch from DB and set it
  if (isLoggedIn && !activeRole && session?.user?.id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { roles: true },
      })

      if (user && user.roles && user.roles.length > 0) {
        // Set the first role as active
        activeRole = user.roles[0] as "ADMIN" | "ENGINEER"

        // Create response and set cookie
        const response = NextResponse.next()
        response.cookies.set("active_role", activeRole, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })

        // Continue with the response that has the cookie set
        return response
      }
    } catch (error) {
      console.error("Error fetching user roles in middleware:", error)
    }
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/products",
    "/research",
    "/insights",
    "/bootcamps",
    "/careers",
    "/podcast",
    "/teams",
    "/gallery",
    "/contact",
    "/newsletter",
    "/services",
    "/conferences",
    "/centers",
    "/preview",
  ]

  // Check if current path is a public route
  const isPublicRoute =
    publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/fonts/") ||
    pathname.includes(".")

  // Auth routes
  const isAuthRoute = pathname.startsWith("/auth")

  // Protected routes
  const isAdminRoute = pathname.startsWith("/admin")
  const isEngineerRoute = pathname.startsWith("/engineer")

  // Redirect authenticated users from home page to their portal
  if (isLoggedIn && pathname === "/" && activeRole) {
    const redirectUrl = activeRole === "ADMIN" ? "/admin" : "/engineer"
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  // Allow access to public routes
  if (isPublicRoute && !isAuthRoute && !isAdminRoute && !isEngineerRoute) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && (isAdminRoute || isEngineerRoute)) {
    const loginUrl = new URL("/auth/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages to their portal
  if (isLoggedIn && isAuthRoute && !pathname.includes("/auth/error")) {
    const redirectUrl = activeRole === "ADMIN" ? "/admin" : "/engineer"
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  // Role-based access control
  if (isLoggedIn) {
    // Prevent users from accessing routes that don't match their active role
    if (isAdminRoute && activeRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/engineer", req.url))
    }

    if (isEngineerRoute && activeRole !== "ENGINEER") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }

  return NextResponse.next()
}

// Matcher configuration - specify which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}

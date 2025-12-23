import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getCloudinarySignature } from "@/lib/cloudinary"

/**
 * API endpoint to generate Cloudinary upload signature for authenticated users
 * This is needed for secure, signed uploads from the client
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { folder } = await request.json()

    // Generate signature
    const signatureData = await getCloudinarySignature(folder || "airc-portal")

    return NextResponse.json(signatureData)
  } catch (error) {
    console.error("Cloudinary signature generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate upload signature" },
      { status: 500 }
    )
  }
}

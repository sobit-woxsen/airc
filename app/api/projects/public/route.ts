import { NextResponse } from "next/server"
import { getPublicProducts, getPublicDepartments } from "@/app/actions/public-data"

export async function GET() {
    try {
        const [projects, departments] = await Promise.all([
            getPublicProducts(),
            getPublicDepartments(),
        ])

        return NextResponse.json({
            projects,
            departments,
        })
    } catch (error: unknown) {
        console.error("Error fetching projects:", error)
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        )
    }
}

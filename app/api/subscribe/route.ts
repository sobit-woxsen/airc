import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existing) {
            if (existing.active) {
                return NextResponse.json(
                    { message: "You're already subscribed!" },
                    { status: 200 }
                );
            } else {
                // Reactivate subscription
                await prisma.subscriber.update({
                    where: { email: email.toLowerCase() },
                    data: { active: true },
                });
                return NextResponse.json(
                    { message: "Welcome back! Your subscription has been reactivated." },
                    { status: 200 }
                );
            }
        }

        // Create new subscriber
        await prisma.subscriber.create({
            data: {
                email: email.toLowerCase(),
            },
        });

        return NextResponse.json(
            { message: "Successfully subscribed!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}

"use client"

export const dynamic = "force-dynamic"

import LoginClient from "@/app/(auth)/auth/login/client"

export default function LoginPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const callbackUrl = typeof searchParams?.callbackUrl === "string" ? searchParams.callbackUrl : "/"
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined
  return <LoginClient callbackUrl={callbackUrl} error={error} />
}

"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MailCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyRequestPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#52c2cb]/10">
          <MailCheck className="h-8 w-8 text-[#52c2cb]" />
        </div>
        <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
        <CardDescription>
          We've sent you a magic link to sign in
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert className="border-[#52c2cb]/20 bg-[#52c2cb]/5">
          <AlertDescription className="text-center">
            {email ? (
              <>
                A sign-in link has been sent to <strong>{email}</strong>
              </>
            ) : (
              "A sign-in link has been sent to your email address"
            )}
          </AlertDescription>
        </Alert>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-center">Click the link in the email to sign in to your account.</p>
          <p className="text-center">The link will expire in 24 hours.</p>
        </div>

        <div className="pt-4 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Didn't receive the email?</span>
            </div>
          </div>

          <ul className="text-xs text-muted-foreground space-y-1 pl-4">
            <li className="list-disc">Check your spam or junk folder</li>
            <li className="list-disc">Make sure the email address is correct</li>
            <li className="list-disc">Wait a few minutes for the email to arrive</li>
          </ul>
        </div>

        <div className="pt-4">
          <Link href="/auth/login" className="w-full block">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

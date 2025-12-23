

export const dynamic = "force-dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "Access denied. You do not have permission to sign in.",
  Verification: "The verification link is invalid or has expired.",
  OAuthSignin: "Error occurred during OAuth sign-in.",
  OAuthCallback: "Error occurred during OAuth callback.",
  OAuthCreateAccount: "Could not create OAuth account.",
  EmailCreateAccount: "Could not create email account.",
  Callback: "Error in callback handler.",
  OAuthAccountNotLinked: "Email already associated with another account.",
  EmailSignin: "Check your email for the sign-in link.",
  CredentialsSignin: "Invalid email or password.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An error occurred during authentication.",
}

export default function AuthErrorPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const error = typeof searchParams?.error === "string" ? searchParams.error : undefined
  const errorMessage = error && errorMessages[error] ? errorMessages[error] : errorMessages.Default

  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
        <CardDescription>
          We encountered an issue while signing you in
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        {error === "OAuthAccountNotLinked" && (
          <div className="text-sm text-muted-foreground bg-gray-50 p-4 rounded-md">
            <p className="font-medium mb-1">Why did this happen?</p>
            <p>
              This email address is already associated with an account using a different sign-in
              method. Please sign in using the original method you used to create your account.
            </p>
          </div>
        )}

        <div className="pt-4">
          <Link href="/auth/login" className="w-full block">
            <Button className="w-full bg-[#52c2cb] hover:bg-[#3fa9b3]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

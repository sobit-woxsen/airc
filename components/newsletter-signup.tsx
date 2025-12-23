"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Sparkles, BookOpen } from "lucide-react"
import Link from "next/link"

export function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="">
      <div className="mx-auto max-w-3xl">
        {isSubmitted ? (
          <Card className="text-center">
            <CardContent className="flex min-h-[400px] flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Mail className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">You're subscribed!</h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Check your inbox for a confirmation email. You'll receive your first newsletter next week.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Join 5,000+ subscribers</span>
              </div>
              <CardTitle className="text-3xl">Subscribe to our newsletter</CardTitle>
              <CardDescription className="text-base">
                Get weekly insights on cutting-edge research, product launches, and bootcamp opportunities. No spam,
                ever.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>

                <div className="space-y-4">
                  <Label>Interested in</Label>
                  <div className="space-y-3">
                    {[
                      "Research updates",
                      "Product launches",
                      "Bootcamp announcements",
                      "Podcast episodes",
                      "Events & workshops",
                    ].map((interest) => (
                      <div key={interest} className="flex items-center gap-2">
                        <Checkbox id={interest} />
                        <label htmlFor={interest} className="text-sm text-muted-foreground cursor-pointer">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                    I agree to receive emails from AI Research Center. I can unsubscribe at any time. View our{" "}
                    <a href="/privacy" className="underline hover:text-foreground">
                      privacy policy
                    </a>
                    .
                  </label>
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <div className="rounded-lg bg-muted/30 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-foreground">What to expect</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Weekly digest every Thursday</li>
                    <li>• 3-5 curated articles and updates</li>
                    <li>• Exclusive access to new research</li>
                    <li>• Early registration for bootcamps</li>
                  </ul>
                </div>

                <Link href="/newsletter/archive">
                  <Button variant="outline" className="w-full rounded-full" size="lg">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Newsletter Archive
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

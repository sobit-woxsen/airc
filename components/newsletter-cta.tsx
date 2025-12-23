"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Sparkles } from "lucide-react"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
// import { AnimatedBeams } from "@/components/ui/grid-background"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch {
      setError("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-lg border border-black/5 bg-white/50 px-6 py-16 sm:px-16 sm:py-24 backdrop-blur-xl shadow-2xl shadow-black/[0.02]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full"
            />

            <DottedGlowBackground
              className="absolute inset-0 opacity-20 pointer-events-none"
              backgroundOpacity={0.0}
              opacity={0.4}
              color="rgba(0,0,0,0.1)"
              glowColor="rgba(0,0,0,0.05)"
            />
          </div>

          <div className="relative mx-auto max-w-2xl text-center z-10">
            {/* Social Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-xs font-bold text-black shadow-sm backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="uppercase tracking-widest text-[10px]">Join 5,000+ researchers and builders</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-center text-balance mb-6 leading-[1.1]">
              Stay ahead of the curve
            </h2>
            <p className="text-neutral-500 text-center text-balance font-medium text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Get weekly insights on cutting-edge research, product launches, and bootcamp opportunities delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-md">
              <div className="relative flex flex-col sm:flex-row gap-3 p-1.5 rounded-[2rem] sm:bg-white sm:border sm:border-black/5 sm:shadow-lg sm:shadow-black/[0.01]">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-full bg-white text-black placeholder:text-gray-400 border-black/5 sm:border-none text-base px-6 h-14 sm:h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full sm:w-auto rounded-full bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-black hover:text-white transition-all duration-300 h-14 sm:h-12 flex-shrink-0"
                >
                  {isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Success
                    </span>
                  ) : isSubmitting ? (
                    "Sending..."
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-red-500 font-medium"
              >
                {error}
              </motion.p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-medium text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                No spam. Unsubscribe anytime.
              </span>
              <a href="/privacy" className="underline underline-offset-4 hover:text-black transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

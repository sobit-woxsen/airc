"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Mail, AlertCircle, CheckCircle, ArrowRight, Loader2, Home } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

const magicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const [isLoading, setIsLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const magicLinkForm = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onMagicLinkSubmit(values: z.infer<typeof magicLinkSchema>) {
    setIsLoading(true)
    try {
      const { error } = await authClient.signIn.magicLink({
        email: values.email,
        callbackURL: callbackUrl,
      })

      if (error) {
        toast.error(error.message || "Failed to send magic link. Please try again.")
      } else {
        setMagicLinkSent(true)
        toast.success("Magic link sent! Check your email.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden font-sans">
      {/* Left Column - Image (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 items-center justify-center">
        <Image
          src="/ai-research-lab-interior.jpg"
          alt="AI Research Lab"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-20 left-20 right-20 text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Image
                  src="/airc-logo-3d-latest.png"
                  alt="AIRC"
                  width={48}
                  height={48}
                />
              </div>
              <span className="text-3xl font-bold tracking-tight">AIRC Portal</span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">
              Empowering the next generation of <span className="text-[#52c2cb]">AI Research</span>.
            </h1>

            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Access the tools, data, and community you need to build groundbreaking autonomous systems.
            </p>

            <div className="pt-8 flex gap-8 items-center text-gray-400">
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">500+</span>
                <span className="text-sm">Researchers</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">100+</span>
                <span className="text-sm">Projects</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">24/7</span>
                <span className="text-sm">Innovation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-white">
        {/* Top Header */}
        <header className="p-8 flex justify-between items-center absolute top-0 left-0 right-0 z-20">
          <div className="lg:hidden flex items-center gap-3">
            <Image src="/airc-logo-3d-latest.png" alt="AIRC" width={32} height={32} />
            <span className="font-bold text-gray-900 text-xl">AIRC</span>
          </div>

          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-gray-900 transition-colors gap-2 ml-auto group rounded-full px-4"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="font-medium text-sm">Back to Home</span>
          </Button> */}
        </header>

        <main className="flex-1 flex items-center justify-center p-8 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[400px] space-y-10"
          >
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">Sign In</h2>
              <p className="text-gray-500 text-lg">
                Enter your details to access your dashboard.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium">
                      {error === "OAuthAccountNotLinked"
                        ? "Email already in use with different provider"
                        : "Authentication failed. Please try again."}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {magicLinkSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="p-10 rounded-[32px] bg-neutral-50 border border-neutral-100 text-center space-y-6">
                    <div className="mx-auto w-20 h-20 rounded-full bg-[#52c2cb]/10 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-[#52c2cb]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Check your email</h3>
                      <p className="text-gray-500 leading-relaxed px-4">
                        We've sent a magic login link to:
                        <span className="block text-gray-900 font-semibold mt-2 break-all">{magicLinkForm.getValues("email")}</span>
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setMagicLinkSent(false)
                      magicLinkForm.reset()
                    }}
                    className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 font-semibold py-7 rounded-2xl transition-all"
                  >
                    Try a different email
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Form {...magicLinkForm}>
                    <form onSubmit={magicLinkForm.handleSubmit(onMagicLinkSubmit)} className="space-y-8">
                      <FormField
                        control={magicLinkForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-semibold text-gray-700 uppercase tracking-wider ml-1">Work Email</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#52c2cb] transition-colors" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="name@company.com"
                                  className="pl-14 py-8 bg-neutral-50 border-neutral-200 text-gray-900 text-lg placeholder:text-gray-400 focus:ring-4 focus:ring-[#52c2cb]/10 focus:border-[#52c2cb] focus:bg-white transition-all rounded-[20px]"
                                  disabled={isLoading}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500 font-medium ml-1" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-8 text-xl rounded-[20px] transition-all shadow-xl shadow-gray-200 group relative overflow-hidden active:scale-[0.98]"
                        disabled={isLoading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#52c2cb]/0 via-white/10 to-[#52c2cb]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                        {isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            Send Magic Link
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>

                      <div className="pt-2">
                        <p className="text-sm text-center text-gray-400 leading-relaxed font-medium">
                          No password required. We'll send a secure link to your inbox.
                        </p>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="p-10 text-center border-t border-neutral-50 bg-neutral-50/50">
          <p className="text-xs text-gray-400 max-w-[280px] mx-auto leading-loose font-medium uppercase tracking-tight">
            Protected by AIRC Security. <br />
            <a href="/terms" className="text-gray-900 hover:text-[#52c2cb] transition-colors">Terms</a>
            <span className="mx-2">•</span>
            <a href="/privacy" className="text-gray-900 hover:text-[#52c2cb] transition-colors">Privacy</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

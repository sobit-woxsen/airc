"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createContact } from "@/app/actions/contact"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Send, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject as "bootcamp" | "collaboration" | "consulting" | "press" | "other",
        message: formData.message,
      })

      if (result.success) {
        setIsSubmitted(true)
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-black/5 rounded-2xl p-8 md:p-12 text-center"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/20"
          >
            <Check className="h-10 w-10" />
          </motion.div>
          <h3 className="text-3xl font-medium tracking-tighter text-black mb-4">Message Received</h3>
          <p className="max-w-xs mx-auto text-black/60 font-medium leading-relaxed">
            Our mission control has received your message. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-10 px-8 h-12 rounded-full border-black/10 hover:border-black/20 font-black uppercase tracking-widest text-[11px]"
          >
            Send another inquiry
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 md:p-10">
        <div className="mb-10">
          <h2 className="text-3xl font-medium tracking-tighter text-black">Send us a message</h2>
          <p className="mt-2 text-black/50 font-medium">Connect with our research and operations team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600"
              >
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="text-[11px] font-semibold uppercase text-black/40 ml-1">First name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="h-14 rounded-xl border-black/5 bg-black/[0.02] focus-visible:border-accent/40 focus-visible:ring-0 focus-visible:bg-white transition-all font-medium px-5"
                placeholder="John"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="lastName" className="text-[11px]  font-semibold uppercase text-black/40 ml-1">Last name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="h-14 rounded-xl border-black/5 bg-black/[0.02] focus-visible:border-accent/40 focus-visible:ring-0 focus-visible:bg-white transition-all font-medium px-5"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-[11px] font-semibold uppercase text-black/40 ml-1">Email address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-14 rounded-xl border-black/5 bg-black/[0.02] focus-visible:border-accent/40 focus-visible:ring-0 focus-visible:bg-white transition-all font-medium px-5"
              placeholder="john@research.io"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="subject" className="text-[11px] font-semibold uppercase text-black/40 ml-1">Inquiry category</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })} required>
              <SelectTrigger
                id="subject"
                className="min-h-14 w-full rounded-xl border-black/5 bg-black/[0.02] focus:border-accent/40 focus:ring-0 focus:bg-white transition-all font-medium px-5 text-left"
              >
                <SelectValue placeholder="What are you interested in?" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-black/10 bg-white/80 backdrop-blur-xl">
                <SelectItem value="bootcamp" className="focus:bg-accent focus:text-white rounded-lg cursor-pointer py-3 font-medium">Bootcamp inquiry</SelectItem>
                <SelectItem value="collaboration" className="focus:bg-accent focus:text-white rounded-lg cursor-pointer py-3 font-medium">Research collaboration</SelectItem>
                <SelectItem value="consulting" className="focus:bg-accent focus:text-white rounded-lg cursor-pointer py-3 font-medium">Consulting services</SelectItem>
                <SelectItem value="press" className="focus:bg-accent focus:text-white rounded-lg cursor-pointer py-3 font-medium">Press & media</SelectItem>
                <SelectItem value="other" className="focus:bg-accent focus:text-white rounded-lg cursor-pointer py-3 font-medium">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-[11px] font-semibold uppercase text-black/40 ml-1">Your message</Label>
            <Textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Tell us about your project, idea, or inquiry..."
              className="rounded-xl border-black/5 bg-black/[0.02] focus-visible:border-accent/40 focus-visible:ring-0 focus-visible:bg-white transition-all font-medium px-5 py-4 resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 rounded-full bg-black text-white hover:bg-black/90 font-semibold uppercase  text-[11px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">Initiating...</span>
            ) : (
              <span className="flex items-center gap-2">Send Message <Send className="h-3.5 w-3.5" /></span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

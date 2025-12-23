"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Twitter, Linkedin } from "lucide-react"
import { BlurImage } from "@/components/blur-image"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  email: string
  twitter?: string
  linkedin?: string
}

export function TeamMember({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full transition-all duration-300 shadow-none hover:scale-[1.02] hover:bg-gray-50/50 rounded-lg border-1 border-black/5 bg-white">
        <CardHeader className="">
          <div className="relative aspect-square w-full overflow-hidden rounded-sm mb-4 ">
            <BlurImage src={member.image} alt={member.name} fill className="object-cover" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>
          <CardDescription className="font-semibold text-primary">{member.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6 ">
          <p className="text-sm leading-relaxed text-foreground/60">{member.bio}</p>
          <div className="flex gap-3 pt-2">
            <a
              href={`mailto:${member.email}`}
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="h-5 w-5" />
            </a>
            {member.twitter && (
              <a
                href={`https://twitter.com/${member.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={`${member.name} on Twitter`}
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

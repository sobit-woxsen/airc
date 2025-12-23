"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamMember } from "@/components/team-member"
import { motion } from "framer-motion"

const teamCategories = [
  {
    category: "Leadership & Strategic Advisors",
    members: [
      {
        name: "Dr. Sarah Chen",
        role: "Director of Research",
        bio: "Leading research in explainable AI and neural architecture search. Former Google Brain.",
        image: "/professional-woman-researcher.png",
        email: "sarah.chen@researchlab.edu",
        twitter: "sarahchen",
        linkedin: "sarah-chen",
      },
      {
        name: "Prof. Michael Roberts",
        role: "Head of Quantum Computing",
        bio: "Pioneering quantum algorithms for optimization. PhD from MIT, 20+ years in quantum research.",
        image: "/professional-professor.png",
        email: "michael.roberts@researchlab.edu",
        twitter: "mroberts",
        linkedin: "michael-roberts",
      },
    ],
  },
  {
    category: "Research Scientists",
    members: [
      {
        name: "Dr. Emily Park",
        role: "Sustainability Lead",
        bio: "Expert in green AI and energy-efficient computing. Passionate about responsible technology.",
        image: "/professional-woman-scientist.png",
        email: "emily.park@researchlab.edu",
        twitter: "emilypark",
        linkedin: "emily-park",
      },
      {
        name: "Dr. James Kim",
        role: "Computer Vision Lead",
        bio: "Specializing in multi-modal learning and visual understanding. Stanford PhD.",
        image: "/professional-engineer.png",
        email: "james.kim@researchlab.edu",
        twitter: "jameskim",
        linkedin: "james-kim",
      },
    ],
  },
  {
    category: "Engineers",
    members: [
      {
        name: "Maria Garcia",
        role: "ML Engineering Manager",
        bio: "Building production ML systems. Previously led ML teams at Stripe and Airbnb.",
        image: "/professional-woman-manager.png",
        email: "maria.garcia@researchlab.edu",
        twitter: "mariagarcia",
        linkedin: "maria-garcia",
      },
    ],
  },
  {
    category: "Education & Training",
    members: [
      {
        name: "Alex Johnson",
        role: "Bootcamp Director",
        bio: "Designing transformative learning experiences. Educator and software engineer.",
        image: "/professional-person-educator.jpg",
        email: "alex.johnson@researchlab.edu",
        twitter: "alexjohnson",
        linkedin: "alex-johnson",
      },
    ],
  },
]

export default function TeamsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 text-balance">
              OUR{" "}
              <span
                style={{
                  WebkitTextStroke: "2px currentColor",
                  WebkitTextFillColor: "transparent",
                  color: "oklch(0.65 0.22 25)",
                }}
              >
                TEAM
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl font-medium">
              World-class researchers, engineers, and educators united by a mission to advance technology for the
              benefit of humanity.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
        >
          <div className="space-y-20">
            {teamCategories.map((group, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-8 sm:text-4xl">
                  {group.category}
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member, memberIdx) => (
                    <motion.div
                      key={member.email}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 + memberIdx * 0.05 }}
                    >
                      <TeamMember member={member} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

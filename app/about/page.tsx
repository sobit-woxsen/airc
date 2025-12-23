"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { motion } from "framer-motion"
import { Target, Users, Lightbulb, Globe, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const stats = [
  { label: "Research Papers Published", value: "150+" },
  { label: "Active Researchers", value: "50+" },
  { label: "Industry Partners", value: "30+" },
  { label: "Countries Reached", value: "25+" },
]

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Innovation",
    description: "We push the boundaries of AI research, exploring new ideas and challenging old ways of thinking.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaboration",
    description: "We believe in working together, building partnerships across universities, companies, and organizations.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Excellence",
    description: "We maintain high standards in research quality, ethics, and scientific methods in everything we do.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Impact",
    description: "We focus on research that creates real value and solves important problems facing society.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Integrity",
    description: "We conduct research with honesty, transparency, and a commitment to ethical AI development.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Education",
    description: "We're dedicated to training the next generation of AI researchers through our programs.",
  },
]

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "AI Research Center established with a mission to advance AI for the benefit of society.",
  },
  {
    year: "2019",
    title: "First Major Publication",
    description: "Published groundbreaking research in neural networks at a top AI conference.",
  },
  {
    year: "2020",
    title: "Industry Partnerships",
    description: "Started working with leading tech companies and healthcare organizations.",
  },
  {
    year: "2021",
    title: "Bootcamp Program",
    description: "Launched our AI training bootcamps, training over 500 professionals.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Opened research partnerships in 25+ countries worldwide.",
  },
  {
    year: "2023",
    title: "Quantum AI Lab",
    description: "Launched quantum computing research lab for AI and machine learning.",
  },
  {
    year: "2024",
    title: "Sustainable AI",
    description: "Started research in energy-efficient AI, reducing carbon footprint by 40%.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        title="About Us"
        description="We're advancing AI research and making it accessible to everyone."
      />

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-black/5 rounded-lg p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Our Mission</h2>
          <p className="text-muted-foreground font-medium leading-relaxed text-lg mb-4">
            The AI Research Center is a leading institution dedicated to advancing AI through research, innovative products, and education.
          </p>
          <p className="text-muted-foreground font-medium leading-relaxed text-lg">
            We bridge the gap between theory and practice, working on problems that matter—from healthcare and climate change to education and financial inclusion. Our team of researchers, engineers, and educators works with partners worldwide to create lasting impact.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-foreground py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-background mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-background/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Our Values</h2>
          <p className="text-muted-foreground font-medium text-lg max-w-3xl mx-auto">
            These principles guide everything we do, from research to education to partnerships.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-black/5 rounded-lg p-6 hover:border-black/10 transition-all hover:shadow-sm"
            >
              <div className="bg-foreground/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Our Journey</h2>
            <p className="text-muted-foreground font-medium text-lg max-w-3xl mx-auto">
              From our founding to today, we've been pushing the boundaries of AI research.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-sm flex-shrink-0">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-black/10 mt-2" />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground rounded-lg p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-background mb-6">
            Looking Forward
          </h2>
          <p className="text-background/70 font-medium leading-relaxed text-lg max-w-4xl mx-auto mb-8">
            Our commitment remains strong: to conduct cutting-edge research that solves humanity's biggest challenges, to educate the next generation of AI leaders, and to ensure AI benefits everyone equally.
          </p>
          <p className="text-background/70 font-medium leading-relaxed text-lg max-w-4xl mx-auto">
            Join us in shaping the future of AI—through research, our bootcamp programs, or partnerships. Together, we can build a future where AI serves as a force for good.
          </p>
        </motion.div>
      </section>
    </PageShell>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ChevronRight } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "What kind of projects does the lab work on?",
    answer:
      "We focus on cutting-edge research in AI, quantum computing, sustainability tech, and edge computing. Our projects range from fundamental research to product development, always pushing the boundaries of what's possible in computer science and engineering.",
  },
  {
    question: "How can I join the AI Research Center?",
    answer:
      "We welcome talented researchers, students, and professionals. You can apply through our bootcamp programs for structured learning, or reach out directly if you're interested in research collaborations. Check our Teams page for current openings and contact information.",
  },
  {
    question: "Do you offer industry partnerships?",
    answer:
      "Yes! We actively collaborate with industry partners on research projects, consultancy, and product development. Our services include custom AI solutions, technical consulting, and joint research initiatives. Visit our Services page or contact us to discuss partnership opportunities.",
  },
  {
    question: "What is the bootcamp program?",
    answer:
      "Our bootcamp programs provide intensive, hands-on training in AI, machine learning, and emerging technologies. Led by experienced researchers, bootcamps run for 12-16 weeks and include real-world projects, mentorship, and networking opportunities. The next cohort starts in June 2026.",
  },
  {
    question: "How can I access your research papers?",
    answer:
      "All our published research papers are available on the Research page. You can filter by domain, download PDFs, and access citations. We believe in open science and making our work accessible to the global research community.",
  },
  {
    question: "Can I use your products commercially?",
    answer:
      "Our products have varying licenses depending on the project. Some are open-source and free for commercial use, while others require licensing agreements. Check the specific product page for licensing details, or contact us for enterprise solutions and custom deployments.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 px-6 border-y border-black/5 relative overflow-hidden bg-white">
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-center text-balance mb-4 leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 text-center text-balance font-medium text-lg leading-relaxed max-w-lg mx-auto">
            Everything you need to know about our lab, research, and programs
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  className={`group relative overflow-hidden rounded-lg border transition-all duration-500 ${isOpen
                    ? "bg-gray-50/80 border-black/10 shadow-xl shadow-black/[0.02]"
                    : "bg-white border-black/5 hover:border-black/10 hover:bg-gray-50/30"
                    }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium tracking-tight pr-8">{faq.question}</span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-accent text-accent-foreground rotate-180" : "bg-black/5 text-black"
                      }`}>
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <div className="px-8 pb-8">
                          <div className="text-base text-neutral-500 leading-relaxed font-medium">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-medium tracking-tighter text-balance text-center mb-8">
              Still have questions? We're here to help.
            </h3>
            <Link href="/contact">
              <button className="group relative cursor-pointer inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-accent px-10 text-sm font-medium text-accent-foreground transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20">
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

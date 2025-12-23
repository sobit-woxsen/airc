"use client"

import { PageShell } from "@/components/page-shell"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"
import { MapPin, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: (
        <>
          Kamkole, Sadasivpet
          <br />
          Hyderabad, Telangana 502345
        </>
      ),
      href: "https://maps.google.com/?q=Kamkole+Sadasivpet+Hyderabad+Telangana+502345"
    },
    {
      icon: Mail,
      title: "Email",
      content: "airesearchcentre@woxsen.edu.in",
      href: "mailto:airesearchcentre@woxsen.edu.in"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "040 4444 8888",
      href: "tel:04044448888"
    },
  ]

  return (
    <PageShell mainClassName="px-2 md:px-16">
      <PageHeader
        title="Contact Us"
        description="Have a question, collaboration proposal, or want to learn more about our programs? We'd love to hear from you."
      />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-5 items-start">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Info Column */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-4xl font-medium tracking-tighter text-black mb-6">
                Direct Channels
              </h2>
              <p className="text-black/50 font-medium leading-relaxed">
                Reach out to our specific departments for rapid response regarding research, education, or media.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block group relative"
                  >
                    <div className="absolute inset-0 bg-accent/5 rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative p-6 flex gap-6 items-center border border-black/5 bg-white rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-accent/5 group-hover:border-accent/10">
                      <div className="flex-shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black text-white shadow-xl shadow-black/10 group-hover:bg-accent group-hover:shadow-accent/20 transition-all duration-500 overflow-hidden relative">
                          <div className="absolute inset-0 bg-noise opacity-20" />
                          <Icon className="h-6 w-6 relative z-10" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[10px] font-semibold uppercase  text-black/40 mb-1.5">{item.title}</h3>
                        <p className="text-base text-black font-semibold leading-relaxed group-hover:text-accent transition-colors">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Architectural Ornament */}
            <div className="pt-12 hidden lg:block">
              <div className="h-40 w-full rounded-2xl border border-black/5 bg-diagonal-hatch opacity-30 relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-black/20">Operational Sector 01-A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

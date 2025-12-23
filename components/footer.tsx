import Link from "next/link"
import { Linkedin, Mail, Phone, MapPin, Youtube, Instagram, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const footerLinks = {
    lab: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/teams" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Research", href: "/research" },
      { name: "Insights", href: "/insights" },
      { name: "Podcast", href: "/podcast" },
      { name: "Gallery", href: "/gallery" },
    ],
    programs: [
      { name: "Bootcamps", href: "/bootcamps" },
      { name: "Services", href: "/services" },
      { name: "Collaborations", href: "/services#collaborations" },
    ],
  }

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/airesearchcentre", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/airc.woxsen/", icon: Instagram },
    { name: "YouTube", href: "https://www.youtube.com/@woxsenailab", icon: Youtube },
    { name: "Email", href: "mailto:airesearchcentre@woxsen.edu.in", icon: Mail },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      text: "Kamkole, Sadasivpet, Hyderabad, Telangana 502345",
      href: "https://maps.google.com/?q=Kamkole+Sadasivpet+Hyderabad+Telangana+502345"
    },
    {
      icon: Phone,
      text: "040 4444 8888",
      href: "tel:04044448888"
    },
    {
      icon: Mail,
      text: "airesearchcentre@woxsen.edu.in",
      href: "mailto:airesearchcentre@woxsen.edu.in"
    },
  ]

  return (
    <footer className="relative border-t border-black/5 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />

        {/* Subtle Accent Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent shadow-[0_0_40px_rgba(0,0,0,0.03)]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full opacity-60" />

        {/* Legacy 45-degree lines preserved */}
        <div className="absolute left-0 top-0 bottom-0 w-[200px] opacity-80 border-l border-black/5 ml-6 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-[200px] opacity-80 border-r border-black/5 mr-6 hidden md:block" />
        <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-diagonal-hatch opacity-80 [mask-image:linear-gradient(to_right,black,transparent)] pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-diagonal-hatch opacity-80 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 relative">
                <img
                  src="/airc-logo-3d-latest.PNG"
                  alt="AIRC Logo"
                  className="object-contain w-full h-full filter brightness-110"
                />
              </div>
              <div className="flex flex-col font-medium tracking-tighter text-left leading-none text-xl">
                <span className="text-black/40 text-sm font-bold uppercase tracking-widest mb-1.5">Research Lab</span>
                <span className="text-2xl font-medium tracking-tighter">AI Research Center</span>
              </div>
            </div>
            <p className="text-neutral-500 text-left text-lg leading-relaxed font-medium max-w-xs">
              Pioneering the future through research, innovation, and education. Building products that matter.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-black/5 transition-all duration-300 hover:bg-black hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4.5 w-4.5 text-black group-hover:text-white transition-colors" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-full border border-black/5 group-hover:border-black/10 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:col-span-8 lg:pl-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase text-black/30 mb-8 px-0">Lab</h3>
              <ul className="space-y-4">
                {footerLinks.lab.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[15px] font-medium text-neutral-500 hover:text-black hover:translate-x-1 inline-flex items-center gap-0 hover:gap-1.5 transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase  text-black/30 mb-8">Resources</h3>
              <ul className="space-y-4">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[15px] font-medium text-neutral-500 hover:text-black hover:translate-x-1 inline-flex items-center gap-0 hover:gap-1.5 transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] font-bold uppercase  text-black/30 mb-8">Contact</h3>
              <ul className="space-y-5">
                {contactInfo.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-start gap-4 text-[14px] font-medium leading-relaxed text-neutral-500 hover:text-black transition-colors group"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0 mt-1 text-black/20 group-hover:text-accent transition-colors" />
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[13px] text-neutral-400 font-medium">
              &copy; {new Date().getFullYear()} AI Research Center.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Sitemap"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-[13px] font-medium text-neutral-400 hover:text-black transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-bold uppercase  text-black/40">Status: All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

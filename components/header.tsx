"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import * as React from "react"
import { usePathname } from "next/navigation"
import { GlobalSearch } from "@/components/global-search"

import { motion, AnimatePresence } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { ChevronRight } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Scroll spy logic - only on homepage
      if (pathname === "/") {
        const sections = document.querySelectorAll("section[id], main > div[id]")
        let currentSection = ""

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          const offset = 200 // Trigger point from top

          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section.id
          }
        })

        setActiveSection(currentSection)
      }
    }

    handleScroll() // Check on mount
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] px-4 pt-4 transition-all duration-300 rounded-xs">
        <nav
          className={`mx-auto flex items-center justify-between gap-8 bg-white/70 bg-noise backdrop-blur-md border transition-all duration-500 ease-out z-[999] ${isScrolled
            ? "border-border/50 max-w-5xl px-4 py-2.5 rounded-full shadow-lg shadow-black/[0.03]"
            : "border-transparent max-w-6xl px-6 py-4 rounded-full shadow-none"
            }`}
          aria-label="Global"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0 ">
            <span className="sr-only">AI Research Center</span>
            <div className={`relative transition-all duration-500 ${isScrolled ? "h-8 w-8" : "h-10 w-10"}`}>
              <img
                src="/airc-logo-3d-latest.PNG"
                alt="AIRC Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div className={`flex flex-col font-bold tracking-tight text-foreground  transition-all duration-500 leading-none ${isScrolled ? "text-[10px]" : "text-xs"
              }`}>
              <span>AI Research</span>
              <span className="text-[1.7em] leading-[0.7]">Center</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu delayDuration={80} viewport={false}>
              <NavigationMenuList className="gap-1" onMouseLeave={() => setHoveredIndex(null)}>
                <NavigationMenuItem onMouseEnter={() => setHoveredIndex(0)}>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-normal relative z-10">
                    Solutions
                    {hoveredIndex === 0 && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/10 -z-10"
                        layoutId="nav-pill"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-none border-none bg-white rounded-sm overflow-hidden">
                    <ul className="grid gap-0 md:w-[450px] lg:w-[600px] lg:grid-cols-[220px_1fr] rounded-sm border border-black/5 overflow-hidden">
                      <li className="bg-neutral-50 relative overflow-hidden group/sidebar border-r border-black/[0.03]">
                        {/* Ambient Glow */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-12 -left-12 w-48 h-48 bg-accent/15 blur-[60px] rounded-full pointer-events-none"
                        />

                        {/* Left Side: Gradient and Dots */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-black/[0.01]" />
                        <DottedGlowBackground
                          className="opacity-15"
                          gap={10}
                          radius={1.6}
                          opacity={0.8}
                          color="rgba(0,0,0,0.3)"
                          glowColor="rgba(0,0,0,0.1)"
                        />
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                          <NavigationMenuLink asChild>
                            <Link href="/products" className="no-underline outline-none space-y-3">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase opacity-70">Solutions</span>
                                <div className="text-2xl font-medium tracking-tight text-black border-l-2 border-accent/30 pl-3 -ml-0.5">
                                  Our Systems
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed text-black/60 font-medium max-w-[180px]">
                                Cutting-edge tools to accelerate your innovation.
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 translate-x-1 group-hover/sidebar:translate-x-0">
                                Explore <ChevronRight className="h-3 w-3" />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </li>
                      <div className="p-2 grid gap-1">
                        <ListItem href="/products" title="Products">
                          Open-source tools and platforms in AI, Quantum, and more.
                        </ListItem>
                        <ListItem href="/services" title="Services">
                          Strategic consulting, research collaborations, and development.
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem onMouseEnter={() => setHoveredIndex(1)}>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-normal relative z-10">
                    Programs
                    {hoveredIndex === 1 && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/10 -z-10"
                        layoutId="nav-pill"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-none border-none bg-white rounded-sm overflow-hidden">
                    <ul className="grid gap-0 md:w-[450px] lg:w-[600px] lg:grid-cols-[220px_1fr] rounded-sm border border-black/5 overflow-hidden">
                      <li className="bg-neutral-50 relative overflow-hidden group/sidebar border-r border-black/[0.03]">
                        {/* Ambient Glow */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute -top-12 -left-12 w-48 h-48 bg-accent/15 blur-[60px] rounded-full pointer-events-none"
                        />

                        {/* Left Side: Gradient and Dots */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-black/[0.01]" />
                        <DottedGlowBackground
                          className="opacity-15"
                          gap={10}
                          radius={1.6}
                          opacity={0.8}
                          color="rgba(0,0,0,0.3)"
                          glowColor="rgba(0,0,0,0.1)"
                        />
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                          <NavigationMenuLink asChild>
                            <Link href="/bootcamps" className="no-underline outline-none space-y-3">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase opacity-70">Training</span>
                                <div className="text-2xl font-medium tracking-tight text-black border-l-2 border-accent/30 pl-3 -ml-0.5">
                                  Our Programs
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed text-black/60 font-medium max-w-[180px]">
                                Empowering the next generation of researchers.
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 translate-x-1 group-hover/sidebar:translate-x-0">
                                View Programs <ChevronRight className="h-3 w-3" />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </li>
                      <div className="p-2 grid gap-1">
                        <ListItem href="/bootcamps" title="Bootcamps">
                          Intensive training programs in AI and emerging tech.
                        </ListItem>
                        <ListItem href="/conferences" title="Conferences">
                          Join leading experts at our upcoming global conferences.
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem onMouseEnter={() => setHoveredIndex(2)}>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-normal relative z-10">
                    Resources
                    {hoveredIndex === 2 && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/10 -z-10"
                        layoutId="nav-pill"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-none border-none bg-white rounded-sm overflow-hidden">
                    <ul className="grid gap-0 md:w-[500px] lg:w-[650px] lg:grid-cols-[220px_1fr] rounded-sm border border-black/5 overflow-hidden">
                      <li className="bg-neutral-50 relative overflow-hidden group/sidebar border-r border-black/[0.03]">
                        {/* Ambient Glow */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                          className="absolute -top-12 -left-12 w-48 h-48 bg-accent/15 blur-[60px] rounded-full pointer-events-none"
                        />

                        {/* Left Side: Gradient and Dots */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-black/[0.01]" />
                        <DottedGlowBackground
                          className="opacity-15"
                          gap={10}
                          radius={1.6}
                          opacity={0.8}
                          color="rgba(0,0,0,0.3)"
                          glowColor="rgba(0,0,0,0.1)"
                        />
                        <div className="relative h-full flex flex-col justify-end p-6 z-10">
                          <NavigationMenuLink asChild>
                            <Link href="/resources" className="no-underline outline-none space-y-3">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase opacity-70">Research</span>
                                <div className="text-2xl font-medium tracking-tight text-black border-l-2 border-accent/30 pl-3 -ml-0.5">
                                  AIRC Hub
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed text-black/60 font-medium max-w-[180px]">
                                Latest insights, news, and research material.
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 translate-x-1 group-hover/sidebar:translate-x-0">
                                Knowledge Base <ChevronRight className="h-3 w-3" />
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </li>
                      <div className="p-2 grid grid-cols-2 gap-1 content-start">
                        <ListItem href="/insights" title="Insights">
                          Latest articles and updates.
                        </ListItem>
                        <ListItem href="/podcast" title="Podcast">
                          In-depth AI conversations.
                        </ListItem>
                        <ListItem href="/newsletter" title="Newsletter">
                          Monthly research highlights.
                        </ListItem>
                        <ListItem href="/gallery" title="Gallery">
                          Our event visual highlights.
                        </ListItem>
                        <ListItem href="/research" title="Research" className="col-span-2">
                          Machine learning, quantum, and sustainability.
                        </ListItem>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem onMouseEnter={() => setHoveredIndex(3)}>
                  <Link href="/centers" legacyBehavior passHref className="flex items-center  ">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm font-normal relative flex items-center")}>
                      Centers
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-accent text-white text-[7px] leading-none px-1.5 py-0.5 rounded-full font-bold animate-pulse shadow-sm z-20">
                        NEW
                      </span>
                      {hoveredIndex === 3 && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-accent/10 -z-10"
                          layoutId="nav-pill"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Global Search & CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 flex-shrink-0">
            <GlobalSearch isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 text-foreground hover:bg-black/5 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/20 lg:hidden" onClick={() => setMobileMenuOpen(false)} />

          <div className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-background px-6 py-6 shadow-2xl lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 relative">
                  <img
                    src="/airc-logo-3d-latest.png"
                    alt="AIRC Logo"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col font-bold tracking-tight text-foreground leading-none text-sm">
                  <span>AI Research</span>
                  <span className="text-[1.85em] leading-[0.8]">Center</span>
                </div>
              </Link>
              <button
                type="button"
                className="rounded-lg p-2 text-foreground hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mb-6 w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setIsSearchOpen(true)
                }}
                className="flex w-full items-center gap-2 rounded-full border border-black/5 px-4 py-3 text-sm text-gray-600 hover:border-gray-300 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span>Search</span>
                <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded bg-gray-100 px-1.5 font-mono text-xs text-gray-600">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>

            <div className="space-y-1">
              {/* Solutions Dropdown for Mobile */}
              <div className="block">
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-black/5 transition-colors"
                >
                  Solutions
                  <svg className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 space-y-1">
                    <Link
                      href="/products"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      href="/services"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Services
                    </Link>
                  </div>
                )}
              </div>
              {/* Programs Dropdown for Mobile */}
              <div className="block">
                <button
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-black/5 transition-colors"
                >
                  Programs
                  <svg className={`h-4 w-4 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileProgramsOpen && (
                  <div className="pl-4 space-y-1">
                    <Link
                      href="/bootcamps"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Bootcamps
                    </Link>
                    <Link
                      href="/conferences"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Conferences
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources Dropdown for Mobile */}
              <div className="block">
                <button
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-black/5 transition-colors"
                >
                  Resources
                  <svg className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="pl-4 space-y-1">
                    <Link
                      href="/insights"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Insights
                    </Link>
                    <Link
                      href="/podcast"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Podcast
                    </Link>
                    <Link
                      href="/newsletter"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Newsletter
                    </Link>
                    <Link
                      href="/gallery"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                    <Link
                      href="/research"
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Research
                    </Link>
                  </div>
                )}
              </div>





              <Link
                href="/centers"
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Centers
                <span className="bg-accent text-white text-[9px] leading-none px-1.5 py-0.5 rounded-full font-bold animate-pulse shadow-sm">
                  NEW
                </span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}



const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href!}
          className={cn(
            "group/item block select-none space-y-1 p-3 leading-none no-underline outline-none transition-all duration-300 relative overflow-hidden",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-black flex items-center justify-between">
            {title}
            <ChevronRight className="h-3 w-3 text-accent opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
          </div>
          <p className="line-clamp-2 text-[13px] leading-snug text-neutral-500 font-normal pt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Header

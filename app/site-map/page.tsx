import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
    title: "Sitemap — AI Research Center",
    description: "Navigate all pages and sections of the AI Research Center website.",
}

const sitemapSections = [
    {
        title: "Main",
        links: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Team", href: "/teams" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Research & Insights",
        links: [
            { name: "Research", href: "/research" },
            { name: "Insights", href: "/insights" },
            { name: "Podcast", href: "/podcast" },
            { name: "Newsletter", href: "/newsletter" },
        ],
    },
    {
        title: "Products",
        links: [
            { name: "All Products", href: "/products" },
            { name: "AI & Machine Learning", href: "/products/ai-ml" },
            { name: "Blockchain", href: "/products/blockchain" },
            { name: "Metaverse", href: "/products/metaverse" },
            { name: "Robotics", href: "/products/robotics" },
        ],
    },
    {
        title: "Programs",
        links: [
            { name: "Bootcamps", href: "/bootcamps" },
            { name: "Events", href: "/events" },
            { name: "JLPT", href: "/jlpt" },
            { name: "Services", href: "/services" },
        ],
    },
    {
        title: "Initiatives",
        links: [
            { name: "CAGHI", href: "/caghi" },
            { name: "Gallery", href: "/gallery" },
            { name: "Careers", href: "/careers" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
        ],
    },
]

export default function SitemapPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-cream">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mt-20">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sitemap</h1>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                        Navigate through all sections of the AI Research Center website.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {sitemapSections.map((section) => (
                            <div key={section.title} className="bg-white rounded-2xl border border-black/5 p-6">
                                <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground hover:text-black transition-colors font-medium"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

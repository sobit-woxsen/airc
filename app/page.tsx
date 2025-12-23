import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { LatestInsights } from "@/components/latest-insights"
import { StatsSection } from "@/components/stats-section"
import { ServicesPreview } from "@/components/services-preview"
import { FAQSection } from "@/components/faq-section"
import { IndustryPartners } from "@/components/industry-partners"
import { getAllArticles } from "@/lib/mdx"

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
      <main className="flex-1 ">
        <HeroSection />
        <IndustryPartners />
        <StatsSection />
        <ServicesPreview />
        <FeaturedProjects />
        <LatestInsights articles={articles} />
        <FAQSection />
        <NewsletterCTA />
        <Footer />
      </main>
    </div>
  )
}

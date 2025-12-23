import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MDXComponents } from "@/components/mdx-components"
import { Calendar, Clock, User, ChevronLeft, ArrowRight, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { getAllArticles, getArticleBySlug } from "@/lib/mdx"
import { ArticleShareButton } from "@/components/article-share-button"
import { BlurImage } from "@/components/blur-image"
import { NewsletterCTA } from "@/components/newsletter-cta"
import Link from "next/link"
import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.title} — AI Research Center`,
    description: article.excerpt,
  }
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const allArticles = getAllArticles()
  const relatedArticles = allArticles
    .filter(a => a.slug !== slug && a.category === article?.category)
    .slice(0, 2)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream relative overflow-hidden">
      <Header />

      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-12">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              <div className="p-2 bg-white rounded-full border border-black/5 group-hover:border-black/10 group-hover:bg-neutral-50 transition-all">
                <ChevronLeft className="h-3.5 w-3.5" />
              </div>
              Back to Insights
            </Link>
          </div>

          <article className="mx-auto max-w-4xl">
            {/* Article Image */}
            <div className="relative mb-16 w-full overflow-hidden rounded-lg border border-black/5 bg-neutral-100 shadow-2xl shadow-black/5 aspect-[21/9]">
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-10" />
              <BlurImage
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-accent text-white text-[10px] font-semibold uppercase rounded-full shadow-lg shadow-accent/10">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-left text-balance mb-12 text-black leading-[1.1]">
              {article.title}
            </h1>

            {/* Info Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/50 backdrop-blur-sm rounded-sm border border-black/5 mb-16 shadow-xl shadow-black/[0.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-black/20 uppercase tracking-widest">Architect</span>
                <span className="text-sm font-semibold text-black flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-accent" />
                  {/* {article.author} */}
                  AI Research Centre
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-black/20 uppercase tracking-widest">Released</span>
                <span className="text-sm font-semibold text-black flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-black/20 uppercase tracking-widest">Duration</span>
                <span className="text-sm font-semibold text-black flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  {article.readTime}
                </span>
              </div>
              <div className="flex flex-col items-end justify-center">
                <ArticleShareButton article={article} />
              </div>
            </div>

            {/* Content Container */}
            <div className="relative">
              {/* Decorative Accent Line */}
              {/* <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-transparent to-transparent hidden xl:block" /> */}

              <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tighter prose-headings:text-black prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-8 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-p:text-black/70 prose-p:leading-relaxed prose-p:text-lg prose-li:text-black/70 prose-strong:text-black prose-code:text-accent prose-code:bg-accent/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-semibold prose-pre:bg-neutral-50 prose-pre:border prose-pre:border-black/5 prose-pre:rounded-3xl prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-img:shadow-black/5 prose-blockquote:border-l-accent prose-blockquote:bg-accent/[0.02] prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl">
                <MDXComponents content={article.content} />
              </div>
            </div>
          </article>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-40 pt-20 border-t border-black/5">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-accent  mb-2 block">Further Exploration</span>
                  <h2 className="text-3xl font-semibold tracking-tighter">Related Case Studies</h2>
                </div>
                <Link href="/insights" className="text-[10px] font-semibold uppercase  text-black/40 hover:text-black flex items-center gap-2 transition-colors">
                  See All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                {relatedArticles.map((item, i) => (
                  <Link key={i} href={`/insights/${item.slug}`}>
                    <SpotlightCard
                      className="group rounded-lg bg-white border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/10 hover:shadow-xl hover:shadow-black/5"
                      spotlightColor="rgba(0, 0, 0, 0.02)"
                    >
                      <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className="relative w-full sm:w-1/3 aspect-video sm:aspect-auto overflow-hidden bg-neutral-100">
                          <BlurImage src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-8 sm:w-2/3">
                          <span className="text-[9px] font-semibold uppercase text-accent mb-2 block tracking-widest">{item.category}</span>
                          <h4 className="text-xl font-semibold tracking-tighter mb-4 line-clamp-2 leading-tight">{item.title}</h4>
                          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase  text-black/40 group-hover:text-black transition-colors">
                            Explore <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-40">
          <NewsletterCTA />
        </div>
      </main>
      <Footer />
    </div>
  )
}

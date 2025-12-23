import { NextRequest, NextResponse } from "next/server"
import { getPublicProducts } from "@/app/actions/public-data"
import { getPublishedNewsletters } from "@/app/actions/newsletters"
import { getAllArticles } from "@/lib/mdx"
import { cache, CACHE_TTL } from "@/lib/cache"

export const dynamic = "force-dynamic"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  href: string
  metadata?: string
}

/**
 * Global search API endpoint
 * Searches across: Projects, Newsletters, Insights, Research Papers, and Static Pages
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""

    // If no query, return popular suggestions
    if (!query.trim()) {
      return NextResponse.json({ results: getPopularSuggestions(), query: "" })
    }

    const lowerQuery = query.toLowerCase()

    // Try to get from cache first
    const cacheKey = `search:${lowerQuery}`
    const cachedResults = cache.get<SearchResult[]>(cacheKey)

    if (cachedResults) {
      return NextResponse.json({
        results: cachedResults,
        query,
        cached: true,
      })
    }

    // Fetch all searchable content in parallel
    const [projects, newsletters, articles] = await Promise.all([
      getPublicProducts(),
      getPublishedNewsletters(),
      getAllArticles(),
    ])

    // Build searchable content array
    const searchableContent: SearchResult[] = []

    // 1. Add Projects from database
    projects.forEach((project) => {
      searchableContent.push({
        id: project.id,
        title: project.name,
        description: project.tagline,
        category: "Projects",
        href: `/products/${project.id}`,
        metadata: `${(project.tags || []).join(" ")} ${(project.technologies || []).join(" ")} ${project.departmentId}`,
      })
    })

    // 2. Add Newsletters from database
    newsletters.forEach((newsletter) => {
      searchableContent.push({
        id: newsletter.id,
        title: newsletter.title,
        description: newsletter.description,
        category: "Newsletter",
        href: `/newsletter#issue-${newsletter.issue}`,
        metadata: newsletter.topics.join(" "),
      })
    })

    // 3. Add Insights/Articles from MDX files
    articles.forEach((article) => {
      searchableContent.push({
        id: article.slug,
        title: article.title,
        description: article.excerpt,
        category: "Insights",
        href: `/insights/${article.slug}`,
        metadata: article.tags.join(" "),
      })
    })

    // 4. Add Static Research Papers (hardcoded for now - can be moved to DB later)
    searchableContent.push(
      {
        id: "neural-architecture",
        title: "Neural Architecture Search",
        description: "Automated deep learning model design with 95% accuracy",
        category: "Research",
        href: "/research/neural-architecture-search",
        metadata: "AI NAS Deep Learning",
      },
      {
        id: "quantum-framework",
        title: "Quantum Computing Framework",
        description: "Novel quantum error correction methods",
        category: "Research",
        href: "/research/quantum-framework",
        metadata: "Quantum Error Correction",
      },
      {
        id: "sustainable-ai",
        title: "Sustainable AI",
        description: "Energy-efficient machine learning algorithms",
        category: "Research",
        href: "/research/sustainable-ai",
        metadata: "Green AI Sustainability",
      },
      {
        id: "multimodal-learning",
        title: "Multimodal Learning",
        description: "Cross-modal learning techniques",
        category: "Research",
        href: "/research/multimodal-learning",
        metadata: "Multimodal Vision Language",
      }
    )

    // 5. Add Static Pages
    searchableContent.push(
      {
        id: "products",
        title: "Products",
        description: "Explore our cutting-edge tools and platforms",
        category: "Pages",
        href: "/products",
      },
      {
        id: "research",
        title: "Research",
        description: "Published papers and research work",
        category: "Pages",
        href: "/research",
      },
      {
        id: "bootcamps",
        title: "Bootcamps",
        description: "Intensive training programs",
        category: "Pages",
        href: "/bootcamps",
      },
      {
        id: "insights",
        title: "Insights",
        description: "Articles and technical blog posts",
        category: "Pages",
        href: "/insights",
      },
      {
        id: "podcast",
        title: "Podcast",
        description: "Listen to our research podcast",
        category: "Pages",
        href: "/podcast",
      },
      {
        id: "team",
        title: "Team",
        description: "Meet our researchers and staff",
        category: "Pages",
        href: "/teams",
      },
      {
        id: "gallery",
        title: "Gallery",
        description: "Photos from our lab and events",
        category: "Pages",
        href: "/gallery",
      },
      {
        id: "services",
        title: "Services",
        description: "Collaboration and consulting services",
        category: "Pages",
        href: "/services",
      },
      {
        id: "contact",
        title: "Contact",
        description: "Get in touch with us",
        category: "Pages",
        href: "/contact",
      },
      {
        id: "newsletter-page",
        title: "Newsletter",
        description: "Subscribe to our monthly newsletter",
        category: "Pages",
        href: "/newsletter",
      }
    )

    // Perform search
    const filtered = searchableContent.filter((item) => {
      const searchText = `${item.title} ${item.description} ${item.metadata || ""}`.toLowerCase()
      return searchText.includes(lowerQuery)
    })

    // Limit results to 12 items
    const results = filtered.slice(0, 12)

    // Cache the results for 5 minutes
    cache.set(cacheKey, results, CACHE_TTL.MEDIUM)

    return NextResponse.json({
      results,
      query,
      cached: false,
    })
  } catch (error: unknown) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        error: "Failed to perform search",
        results: [],
        query: "",
      },
      { status: 500 }
    )
  }
}

/**
 * Returns popular suggestions when no query is provided
 */
function getPopularSuggestions(): SearchResult[] {
  return [
    {
      id: "products",
      title: "Products",
      description: "Explore our cutting-edge tools and platforms",
      category: "Pages",
      href: "/products",
    },
    {
      id: "research",
      title: "Research",
      description: "Published papers and research work",
      category: "Pages",
      href: "/research",
    },
    {
      id: "bootcamps",
      title: "Bootcamps",
      description: "Intensive training programs",
      category: "Pages",
      href: "/bootcamps",
    },
    {
      id: "insights",
      title: "Insights",
      description: "Articles and technical blog posts",
      category: "Pages",
      href: "/insights",
    },
    {
      id: "podcast",
      title: "Podcast",
      description: "Listen to our research podcast",
      category: "Pages",
      href: "/podcast",
    },
    {
      id: "newsletter-page",
      title: "Newsletter",
      description: "Subscribe to our monthly newsletter",
      category: "Pages",
      href: "/newsletter",
    },
  ]
}

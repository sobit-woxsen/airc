export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "University Research & Innovation Lab",
    url: "https://your-university-lab.com",
    logo: "https://your-university-lab.com/logo.png",
    description:
      "Pioneering AI Research Center focused on AI, quantum computing, and sustainable technology. We produce cutting-edge research papers, innovative products, and transformative educational bootcamps.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Research Parkway",
      addressLocality: "Innovation City",
      addressRegion: "CA",
      postalCode: "94000",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-RESEARCH",
      contactType: "customer service",
      email: "contact@university-lab.edu",
    },
    sameAs: [
      "https://twitter.com/universitylab",
      "https://linkedin.com/company/university-lab",
      "https://github.com/university-lab",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

interface ResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  publishedDate: string
  tags: string[]
}

interface Article {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  image: string
}

interface Product {
  id: string
  title: string
  description: string
}

export function ResearchPaperStructuredData({ paper }: { paper: ResearchPaper }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    abstract: paper.abstract,
    author: paper.authors.map((author: string) => ({
      "@type": "Person",
      name: author,
    })),
    datePublished: paper.publishedDate,
    publisher: {
      "@type": "Organization",
      name: "University AI Research Center",
    },
    keywords: paper.tags,
    url: `https://your-university-lab.com/research/${paper.id}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ArticleStructuredData({ article }: { article: Article }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.date,
    publisher: {
      "@type": "Organization",
      name: "University AI Research Center",
      logo: {
        "@type": "ImageObject",
        url: "https://your-university-lab.com/logo.png",
      },
    },
    image: article.image,
    url: `https://your-university-lab.com/insights/${article.slug}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ProductStructuredData({ product }: { product: Product }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    description: product.description,
    applicationCategory: "ResearchTool",
    operatingSystem: "Web, Linux, MacOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://your-university-lab.com/products/${product.id}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function PodcastStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "AI Research Center Podcast",
    description: "Deep dives into cutting-edge research, technology trends, and conversations with leading experts",
    url: "https://your-university-lab.com/podcast",
    author: {
      "@type": "Organization",
      name: "University AI Research Center",
    },
    webFeed: "https://your-university-lab.com/api/podcast-rss",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

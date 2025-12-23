export async function GET() {
  const baseUrl = "https://your-university-lab.com" // Update with your actual domain

  const insights = [
    {
      title: "The Future of Explainable AI",
      slug: "future-explainable-ai",
      description:
        "Exploring new frontiers in making AI systems more transparent and interpretable for human understanding.",
      author: "Dr. Sarah Chen",
      date: "2024-03-15",
      category: "AI Research",
    },
    {
      title: "Quantum Computing Breakthroughs in 2024",
      slug: "quantum-computing-breakthroughs",
      description:
        "Recent advances in quantum error correction and their implications for practical quantum computing.",
      author: "Prof. Michael Torres",
      date: "2024-03-10",
      category: "Quantum Computing",
    },
    {
      title: "Building Sustainable AI Infrastructure",
      slug: "sustainable-ai-infrastructure",
      description:
        "How to reduce the carbon footprint of large-scale machine learning systems through efficient design.",
      author: "Dr. Emily Watson",
      date: "2024-03-05",
      category: "Sustainability",
    },
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Research Center Insights</title>
    <link>${baseUrl}/insights</link>
    <description>Latest research insights and articles from our university lab</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${insights
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/insights/${post.slug}</link>
      <description>${post.description}</description>
      <author>${post.author}</author>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/insights/${post.slug}</guid>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

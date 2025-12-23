import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://your-university-lab.com" // Update with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"], // Exclude API routes and Next.js internals
      },
      {
        userAgent: "GPTBot", // OpenAI's ChatGPT bot
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User", // ChatGPT user agent
        allow: "/",
      },
      {
        userAgent: "Google-Extended", // Google Gemini bot
        allow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl bot used by many AI models
        allow: "/",
      },
      {
        userAgent: "anthropic-ai", // Claude AI bot
        allow: "/",
      },
      {
        userAgent: "ClaudeBot", // Anthropic's Claude bot
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

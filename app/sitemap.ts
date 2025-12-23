import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-university-lab.com" // Update with your actual domain

  // Static pages
  const staticPages = [
    "",
    "/products",
    "/research",
    "/insights",
    "/bootcamps",
    "/services",
    "/podcast",
    "/teams",
    "/gallery",
    "/contact",
    "/newsletter",
    "/careers",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Dynamic product pages
  const products = [
    "neural-search",
    "quantum-simulator",
    "green-compute",
    "federated-learning",
    "edge-ai",
    "bio-compute",
  ].map((id) => ({
    url: `${baseUrl}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamic research pages
  const research = [
    "neural-architecture-search",
    "quantum-framework",
    "sustainable-ai",
    "multimodal-learning",
    "federated-privacy",
    "robotics-manipulation",
  ].map((id) => ({
    url: `${baseUrl}/research/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Dynamic insight pages
  const insights = [
    "future-explainable-ai",
    "quantum-computing-breakthroughs",
    "sustainable-ai-infrastructure",
    "multimodal-ai-systems",
    "privacy-preserving-ml",
  ].map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...products, ...research, ...insights]
}

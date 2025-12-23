import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content/insights")

export interface Article {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  content: string
}

export function getAllArticles(): Article[] {
  // Check if content directory exists
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(contentDirectory)
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        author: data.author,
        date: data.date,
        readTime: data.readTime,
        category: data.category,
        image: data.image,
        tags: data.tags || [],
        content,
      }
    })

  // Sort by date descending
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      author: data.author,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      image: data.image,
      tags: data.tags || [],
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories)
}

export function getAllTags(): string[] {
  const articles = getAllArticles()
  const tags = new Set(articles.flatMap((article) => article.tags))
  return Array.from(tags)
}

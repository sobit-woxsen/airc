import { NewsletterClient } from "./client"
import { getPublishedNewsletters } from "@/app/actions/newsletters"

export const metadata = {
  title: "Newsletter — AI Research Center",
  description: "Access our complete collection of AI research newsletters. Monthly insights, breakthrough discoveries, and expert analysis from leading researchers.",
}

export default async function NewsletterPage() {
  const newsletters = await getPublishedNewsletters()
  return <NewsletterClient newsletters={newsletters} />
}

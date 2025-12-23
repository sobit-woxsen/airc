import { PageShell } from "@/components/page-shell"
import { getAllArticles } from "@/lib/mdx"
import { InsightsPageContent } from "./insights-page-content"

export default function InsightsPage() {
  const articles = getAllArticles()

  return (
    <PageShell mainClassName="px-2 md:px-16">
      <InsightsPageContent articles={articles} />
    </PageShell>
  )
}

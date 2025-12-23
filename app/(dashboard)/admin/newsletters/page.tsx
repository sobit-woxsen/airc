import { requireAdmin } from "@/lib/auth-helpers"
import { getAllNewsletters } from "@/app/actions/newsletters"
import { NewslettersTable } from "@/components/admin/newsletters-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminNewslettersPage() {
  await requireAdmin()
  const newsletters = await getAllNewsletters()

  const published = newsletters.filter((n) => n.published)
  const drafts = newsletters.filter((n) => !n.published)
  const featured = newsletters.filter((n) => n.featured && n.published)

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Newsletters</h1>
          <p className="text-muted-foreground font-medium">
            Manage issues and PDF uploads
          </p>
        </div>
        <Link href="/admin/newsletters/new">
          <Button className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-8 transition-all hover:scale-105 active:scale-95 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add Issue
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({newsletters.length})</TabsTrigger>
          <TabsTrigger value="published">
            Published ({published.length})
          </TabsTrigger>
          <TabsTrigger value="featured">
            Featured ({featured.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({drafts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <NewslettersTable newsletters={newsletters} />
        </TabsContent>

        <TabsContent value="published" className="mt-6">
          <NewslettersTable newsletters={published} />
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <NewslettersTable newsletters={featured} />
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <NewslettersTable newsletters={drafts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

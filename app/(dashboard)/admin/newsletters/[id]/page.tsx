import { requireAdmin } from "@/lib/auth-helpers"
import { getNewsletterById } from "@/app/actions/newsletters"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DeleteNewsletterButton } from "@/components/admin/delete-newsletter-button"

interface NewsletterDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NewsletterDetailsPage({
  params,
}: NewsletterDetailsPageProps) {
  await requireAdmin()

  const { id } = await params
  const newsletter = await getNewsletterById(id)

  if (!newsletter) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/newsletters">
            <Button variant="ghost" size="sm" className="mb-4 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Newsletters
            </Button>
          </Link>
          <h1 className="text-3xl font-medium tracking-tighter">{newsletter.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/newsletters/${id}/edit`}>
            <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 transition-all hover:scale-105 active:scale-95">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <DeleteNewsletterButton newsletterId={id} />
        </div>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-none">
        <CardHeader>
          <CardTitle className="font-medium tracking-tighter">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Issue Number
            </label>
            <p className="text-lg">#{newsletter.issue}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <div className="flex items-center gap-2 text-lg">
              <Calendar className="h-4 w-4" />
              {newsletter.date}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <p className="text-base mt-1">{newsletter.description}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Topics
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {newsletter.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="rounded-full shadow-none">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="mt-1">
                <Badge
                  variant={newsletter.published ? "default" : "secondary"}
                  className="rounded-full shadow-none"
                >
                  {newsletter.published ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>

            {newsletter.featured && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Featured
                </label>
                <div className="mt-1">
                  <Badge className="bg-black text-white rounded-full shadow-none">Featured</Badge>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              PDF
            </label>
            <div className="mt-2">
              <a
                href={newsletter.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="rounded-full px-6 shadow-none hover:bg-slate-50 transition-all hover:scale-105 active:scale-95">
                  <FileText className="mr-2 h-4 w-4" />
                  View PDF
                </Button>
              </a>
            </div>
          </div>

          {newsletter.createdBy && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Created By
              </label>
              <p className="text-base mt-1">
                {newsletter.createdBy.name} ({newsletter.createdBy.email})
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

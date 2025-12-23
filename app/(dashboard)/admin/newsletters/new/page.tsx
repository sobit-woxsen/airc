import { requireAdmin } from "@/lib/auth-helpers"
import { NewsletterForm } from "@/components/admin/newsletter-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewNewsletterPage() {
  await requireAdmin()

  return (
    <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
      <div>
        <Link href="/admin/newsletters">
          <Button variant="ghost" size="sm" className="mb-4 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsletters
          </Button>
        </Link>
        <h1 className="text-3xl font-medium tracking-tighter">Create Newsletter</h1>
        <p className="text-muted-foreground mt-1">
          Upload a new newsletter issue
        </p>
      </div>

      <NewsletterForm />
    </div>
  )
}

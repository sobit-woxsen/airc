import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page not found</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
          <Link href="/research">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Browse research
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

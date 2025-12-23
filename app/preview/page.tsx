import { Suspense } from "react"
import PreviewClient from "./preview-client"

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading preview...</div>}>
      <PreviewClient />
    </Suspense>
  )
}

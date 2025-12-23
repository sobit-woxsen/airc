import ConferenceDetailPageClient from "./ConferenceDetailPageClient"
import { conferences } from "@/lib/conferences-data"

export function generateStaticParams() {
    return conferences.map((conference) => ({
        id: conference.id,
    }))
}

export default async function ConferenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const conference = conferences.find((c) => c.id === id)

    if (!conference) {
        return <div>Conference not found</div>
    }

    return <ConferenceDetailPageClient conference={conference} />
}

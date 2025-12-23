import { notFound } from "next/navigation"
import { getEpisodeBySlug, getAllEpisodes } from "@/lib/podcast-data"
import PodcastEpisodeClient from "./client"
import { Metadata } from "next"

export async function generateStaticParams() {
    const episodes = getAllEpisodes()
    return episodes.map((episode) => ({
        slug: episode.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const episode = getEpisodeBySlug(slug)

    if (!episode) {
        return {
            title: "Episode Not Found",
        }
    }

    return {
        title: episode.title,
        description: episode.description,
    }
}

export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const episode = getEpisodeBySlug(slug)

    if (!episode) {
        notFound()
    }

    return <PodcastEpisodeClient episode={episode} />
}

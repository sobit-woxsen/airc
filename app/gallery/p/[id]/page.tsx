import { getPhotoById } from "@/lib/gallery-data"
import { GalleryPhoto } from "@/components/gallery-photo"
import { notFound } from "next/navigation"

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const photo = getPhotoById(Number(id))

    if (!photo) {
        notFound()
    }

    return (
        <div className="container mx-auto my-10  px-4 h-[calc(100vh-100px)]">
            <GalleryPhoto photo={photo} />
        </div>
    )
}

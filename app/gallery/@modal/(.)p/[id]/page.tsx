import { getPhotoById } from "@/lib/gallery-data"
import { GalleryPhoto } from "@/components/gallery-photo"
import { Modal } from "@/components/modal"
import { notFound } from "next/navigation"

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const photo = getPhotoById(Number(id))

    if (!photo) {
        notFound()
    }

    return (
        <Modal>
            <GalleryPhoto photo={photo} />
        </Modal>
    )
}

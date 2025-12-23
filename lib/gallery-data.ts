
export interface GalleryItem {
    id: number
    src: string
    blurDataUrl?: string
    alt: string
    category: string
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: "/gallery/gallery1.jpg",
        alt: "AI Research Center Gallery Image 1",
        category: "Research",
    },
    {
        id: 2,
        src: "/gallery/gallery2.jpg",
        alt: "AI Research Center Gallery Image 2",
        category: "Lab",
    },
    {
        id: 3,
        src: "/gallery/gallery3.jpg",
        alt: "AI Research Center Gallery Image 3",
        category: "Events",
    },
    {
        id: 4,
        src: "/gallery/gallery4.jpg",
        alt: "AI Research Center Gallery Image 4",
        category: "Equipment",
    },
    {
        id: 5,
        src: "/gallery/gallery5.jpg",
        alt: "AI Research Center Gallery Image 5",
        category: "Research",
    },
    {
        id: 6,
        src: "/gallery/gallery6.jpg",
        alt: "AI Research Center Gallery Image 6",
        category: "Lab",
    },
    {
        id: 7,
        src: "/gallery/gallery7.jpg",
        alt: "AI Research Center Gallery Image 7",
        category: "Events",
    },
    {
        id: 8,
        src: "/gallery/gallery8.jpg",
        alt: "AI Research Center Gallery Image 8",
        category: "Equipment",
    },
    {
        id: 9,
        src: "/gallery/gallery9.jpg",
        alt: "AI Research Center Gallery Image 9",
        category: "Research",
    },
    {
        id: 10,
        src: "/gallery/gallery10.jpg",
        alt: "AI Research Center Gallery Image 10",
        category: "Lab",
    },
    {
        id: 11,
        src: "/gallery/gallery11.jpg",
        alt: "AI Research Center Gallery Image 11",
        category: "Events",
    },
    // gallery12.jpg was missing
    {
        id: 13,
        src: "/gallery/gallery13.jpg",
        alt: "AI Research Center Gallery Image 13",
        category: "Equipment",
    },
    {
        id: 14,
        src: "/gallery/gallery14.jpg",
        alt: "AI Research Center Gallery Image 14",
        category: "Research",
    },
    {
        id: 15,
        src: "/gallery/gallery15.jpg",
        alt: "AI Research Center Gallery Image 15",
        category: "Lab",
    },
]

export function getPhotoById(id: number) {
    return galleryItems.find((item) => item.id === id)
}

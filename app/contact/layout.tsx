import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with our team for collaborations, inquiries, or bootcamp applications.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

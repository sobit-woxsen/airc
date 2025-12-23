import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
    title: "Privacy Policy — AI Research Center",
    description: "Learn how AI Research Center collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-cream">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mt-20">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-12">Last updated: December 2024</p>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                AI Research Center (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li><strong>Personal Information:</strong> Name, email address, and other contact details you provide when subscribing to our newsletter or contacting us.</li>
                                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and navigation patterns.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">We use the collected information for:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Sending newsletters and research updates (with your consent)</li>
                                <li>Improving our website and services</li>
                                <li>Responding to your inquiries and requests</li>
                                <li>Analyzing usage patterns to enhance user experience</li>
                                <li>Complying with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">4. Data Sharing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, conducting our business, or serving our users, provided they agree to keep this information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Rectify inaccurate personal data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Withdraw consent for data processing</li>
                                <li>Unsubscribe from our newsletter at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{" "}
                                <a href="mailto:privacy@airc.edu" className="text-black underline hover:no-underline">
                                    privacy@airc.edu
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
    title: "Terms of Service — AI Research Center",
    description: "Read the terms and conditions for using AI Research Center's website and services.",
}

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-cream">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mt-20">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Terms of Service</h1>
                    <p className="text-muted-foreground mb-12">Last updated: December 2024</p>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using the AI Research Center website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Use the services in any way that violates applicable laws or regulations</li>
                                <li>Attempt to gain unauthorized access to any part of the services</li>
                                <li>Interfere with or disrupt the integrity or performance of the services</li>
                                <li>Transmit any malicious code or harmful content</li>
                                <li>Collect or harvest any information from the services without authorization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All content on this website, including text, graphics, logos, images, research papers, and software, is the property of AI Research Center or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">4. Research and Publications</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Research materials and publications shared on our website are for informational and educational purposes. While we strive for accuracy, we make no warranties about the completeness, reliability, or suitability of this information. Any reliance you place on such information is strictly at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">5. User Accounts</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you create an account with us, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">6. Newsletter Subscription</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By subscribing to our newsletter, you consent to receive periodic emails about research updates, events, and announcements. You may unsubscribe at any time by clicking the unsubscribe link in our emails or contacting us directly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                AI Research Center shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount you paid, if any, for accessing our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">8. External Links</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of these sites and assume no responsibility for them.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the services after any changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                For questions about these Terms of Service, please contact us at{" "}
                                <a href="mailto:legal@airc.edu" className="text-black underline hover:no-underline">
                                    legal@airc.edu
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

import Link from 'next/link'

export default function OGPreviewPage() {
    return (
        <div className="min-h-screen bg-neutral-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-4">Open Graph Image Preview</h1>
                    <p className="text-gray-600 mb-6">
                        This is how your link will appear when shared on social media platforms like Twitter, LinkedIn, Facebook, and WhatsApp.
                    </p>

                    <div className="space-y-6">
                        {/* Default OG Image */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-700">Default Homepage Preview</p>
                            </div>
                            <div className="p-4">
                                <img
                                    src="/api/og?title=AI Research Centre&subtitle=Woxsen University&description=Pioneering Machine Intelligence & Quantum Research"
                                    alt="OG Image Preview"
                                    className="w-full rounded border border-gray-200"
                                />
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-semibold">AI Research Centre - Woxsen University</p>
                                    <p className="text-xs text-gray-600">Pioneering research, cutting-edge products, and transformative bootcamps.</p>
                                    <p className="text-xs text-gray-400">airesearchcentre.aircwou.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Custom Examples */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-700">Custom Title Example</p>
                            </div>
                            <div className="p-4">
                                <img
                                    src="/api/og?title=Join Our Research Team&subtitle=Careers at AIRC&description=Explore cutting-edge opportunities in AI and quantum computing"
                                    alt="Custom OG Image"
                                    className="w-full rounded border border-gray-200"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="text-lg font-semibold mb-2 text-blue-900">How to Test Your Link Preview:</h2>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                            <li>
                                <strong>Twitter:</strong> Use{' '}
                                <a
                                    href="https://cards-dev.twitter.com/validator"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-600"
                                >
                                    Twitter Card Validator
                                </a>
                            </li>
                            <li>
                                <strong>Facebook/LinkedIn:</strong> Use{' '}
                                <a
                                    href="https://developers.facebook.com/tools/debug/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-600"
                                >
                                    Facebook Sharing Debugger
                                </a>
                            </li>
                            <li>
                                <strong>LinkedIn:</strong> Use{' '}
                                <a
                                    href="https://www.linkedin.com/post-inspector/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-600"
                                >
                                    LinkedIn Post Inspector
                                </a>
                            </li>
                            <li>
                                <strong>General:</strong> Use{' '}
                                <a
                                    href="https://www.opengraph.xyz/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-blue-600"
                                >
                                    OpenGraph.xyz
                                </a>
                            </li>
                        </ol>
                    </div>

                    <div className="mt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

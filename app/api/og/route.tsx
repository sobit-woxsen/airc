import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const title = searchParams.get('title') || 'AI Research Centre'
        const subtitle = searchParams.get('subtitle') || 'Woxsen University'
        const description = searchParams.get('description') || 'Pioneering Machine Intelligence & Quantum Research'

        // Fetch the logo image
        const logoUrl = new URL('/airc-logo-3d-latest.PNG', request.url).toString()
        const logoData = await fetch(logoUrl).then((res) => res.arrayBuffer())
        const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        backgroundColor: '#0a0a0a',
                        padding: '80px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background Pattern */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />

                    {/* Grid Pattern */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                            opacity: 0.3,
                        }}
                    />

                    {/* Logo in top-right corner */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '60px',
                            right: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            zIndex: 20,
                        }}
                    >
                        <img
                            src={logoBase64}
                            alt="AIRC Logo"
                            width="80"
                            height="80"
                            style={{
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 12px rgba(0, 255, 255, 0.3))',
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 10, maxWidth: '900px' }}>
                        {/* Logo/Badge */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 24px',
                                background: 'rgba(0, 255, 255, 0.1)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#00ffff',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                            }}
                        >
                            ◆ RESEARCH LABORATORY
                        </div>

                        {/* Main Title */}
                        <div
                            style={{
                                fontSize: '72px',
                                fontWeight: 'bold',
                                color: 'white',
                                lineHeight: 1.1,
                                maxWidth: '900px',
                                letterSpacing: '-2px',
                            }}
                        >
                            {title}
                        </div>

                        {/* Subtitle */}
                        <div
                            style={{
                                fontSize: '36px',
                                fontWeight: '600',
                                color: 'rgba(255, 255, 255, 0.7)',
                                letterSpacing: '-1px',
                            }}
                        >
                            {subtitle}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            zIndex: 10,
                            width: '100%',
                        }}
                    >
                        {/* Description */}
                        <div
                            style={{
                                fontSize: '24px',
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontWeight: '500',
                                maxWidth: '800px',
                            }}
                        >
                            {description}
                        </div>

                        {/* Divider */}
                        <div
                            style={{
                                width: '100%',
                                height: '1px',
                                background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.3) 0%, transparent 100%)',
                                marginTop: '8px',
                            }}
                        />

                        {/* Footer */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '18px',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                airesearchcentre.aircwou.com
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#00ffff',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: 'rgba(0, 255, 255, 0.5)',
                                    }}
                                />
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: 'rgba(0, 255, 255, 0.2)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}

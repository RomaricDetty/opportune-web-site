import Image from 'next/image'
import '@/assets/scss/style.scss'
import AppProviders from '../components/wrappers/AppProviders'
import type { Metadata } from 'next'

const SITE_NAME = 'Electro Store'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
const SITE_DESCRIPTION =
    'Electro Store — boutique électroménager et high-tech à Abidjan. Smartphones, TV, cuisine — prix en FCFA, livraison en Côte d\'Ivoire.'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} — Électroménager & high-tech`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [
        'Electro Store',
        'électroménager',
        'high-tech',
        'smartphone',
        'TV',
        'Abidjan',
        'Côte d\'Ivoire',
        'FCFA',
        'XOF',
        'electro store.ci',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_CI',
        url: SITE_URL,
        siteName: SITE_NAME,
        title: `${SITE_NAME} — Électroménager & high-tech`,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: '/brand/logo-electro.png',
                width: 388,
                height: 190,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} — Électroménager & high-tech`,
        description: SITE_DESCRIPTION,
        images: ['/brand/logo-electro.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico?v=4', sizes: 'any' },
            { url: '/brand/favicon-32.png?v=4', type: 'image/png', sizes: '32x32' },
            { url: '/brand/logo-sm.png?v=4', type: 'image/png', sizes: '128x128' },
            { url: '/brand/icon-192.png?v=4', type: 'image/png', sizes: '192x192' },
        ],
        apple: [{ url: '/brand/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' }],
        shortcut: '/favicon.ico?v=4',
    },
}

const splashScreenStyles = `
#splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    background: #0b0b0b;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease;
    overflow: hidden;
}
#splash-screen.remove {
    animation: fadeout 0.5s forwards;
    z-index: -1;
    pointer-events: none;
}
@keyframes fadeout {
    to { opacity: 0; visibility: hidden; }
}
#splash-screen img {
    animation: logoFadeIn 0.8s ease-in-out;
}
@keyframes logoFadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}
.splash-loader {
    width: 40px;
    height: 40px;
    border: 3px solid #333;
    border-top: 3px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-top: 16px;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/brand/logo-electro.png`,
    image: `${SITE_URL}/brand/logo-electro.png`,
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abidjan',
        addressCountry: 'CI',
    },
    currenciesAccepted: 'XOF',
    priceRange: '$$',
}

/**
 * Layout racine Electro Store avec métadonnées SEO.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                <style suppressHydrationWarning>{splashScreenStyles}</style>
            </head>
            <body className="antialiased font-dm" suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div id="splash-screen">
                    <Image
                        src="/brand/logo-electro.png"
                        alt={SITE_NAME}
                        width={220}
                        height={108}
                        priority
                    />
                    <div className="splash-loader" />
                </div>
                <div id="__next_splash">
                    <AppProviders>{children}</AppProviders>
                </div>
            </body>
        </html>
    )
}

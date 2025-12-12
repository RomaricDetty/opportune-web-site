import Image from 'next/image'
import logo from '@/assets/images/logo.png' // Changez ce chemin si besoin
import '@/assets/scss/style.scss'
import AppProviders from '../components/wrappers/AppProviders'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: 'Shop Electroménager',
        template: '%s | Shop Electroménager',
    },
    description: 'Shop Electroménager - Votre spécialiste en électroménager à Abidjan.',
}

const splashScreenStyles = `
#splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    background: white; /* Changez pour votre couleur préférée */
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
    animation: fadeout 0.7s forwards;
    z-index: 0;
}

@keyframes fadeout {
    to {
        opacity: 0;
        visibility: hidden;
    }
}

/* Animation pour le logo */
#splash-screen img {
    animation: logoFadeIn 0.8s ease-in-out;
}

@keyframes logoFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Loader optionnel */
.splash-loader {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-top: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <style suppressHydrationWarning>{splashScreenStyles}</style>
            </head>
            <title>Shop Electroménager</title>
            <body className={`antialiased`}>
                <div id="splash-screen">
                    <div className="splash-loader"></div>
                </div>
                <div id="__next_splash">
                    <AppProviders>{children}</AppProviders>
                </div>
            </body>
        </html>
    )
}

'use client'

import type { ChildrenType } from '@/types/other'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { CartProvider } from '@/context/useCartContext'
import { AuthProvider } from '@/context/useAuthContext'
import { WishlistProvider } from '@/context/useWishlistContext'
import { ToastProvider } from '@/context/useToastContext'
import { StoreSettingsProvider } from '@/context/useStoreSettingsContext'

/**
 * Réinitialise Preline après navigation.
 */
const safePrelineAutoInit = () => {
    try {
        window.HSStaticMethods?.autoInit?.()
    } catch {
        // no-op
    }
}

/**
 * Providers globaux de l'application boutique.
 */
const AppProviders = ({ children }: ChildrenType) => {
    const pathname = usePathname()

    useEffect(() => {
        const splashElement = document.querySelector<HTMLDivElement>('#__next_splash')
        const splashScreen = document.querySelector<HTMLElement>('#splash-screen')
        if (!splashElement || !splashScreen) return

        /**
         * Masque le splash screen une fois le contenu prêt.
         */
        const hideSplash = () => {
            splashScreen.classList.add('remove')
            splashScreen.style.pointerEvents = 'none'
        }

        const handleMutations = () => {
            if (splashElement.hasChildNodes()) hideSplash()
        }

        import('preline/preline')

        const observer = new MutationObserver(handleMutations)
        observer.observe(splashElement, { childList: true, subtree: true })
        if (splashElement.hasChildNodes()) hideSplash()

        // Filet de sécurité : ne jamais bloquer l'UI
        const fallback = window.setTimeout(hideSplash, 800)

        return () => {
            observer.disconnect()
            window.clearTimeout(fallback)
        }
    }, [])

    useEffect(() => {
        const splashScreen = document.querySelector<HTMLElement>('#splash-screen')
        if (splashScreen) {
            splashScreen.classList.add('remove')
            splashScreen.style.pointerEvents = 'none'
        }
    }, [pathname])

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            safePrelineAutoInit()
        }, 400)
        return () => window.clearTimeout(timerId)
    }, [pathname])

    return (
        <Fragment>
            <StoreSettingsProvider>
                <AuthProvider>
                    <WishlistProvider>
                        <ToastProvider>
                            <CartProvider>{children}</CartProvider>
                        </ToastProvider>
                    </WishlistProvider>
                </AuthProvider>
            </StoreSettingsProvider>
        </Fragment>
    )
}

export default AppProviders

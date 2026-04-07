'use client'

import type { ChildrenType } from '@/types/other'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { CartProvider } from '@/context/useCartContext'

/**
 * Reinitialise Preline apres navigation (dropdowns, etc.).
 * Les erreurs sont ignorees : autoInit peut echouer si le DOM n'est pas pret ou des refs sont obsoletes.
 */
const safePrelineAutoInit = () => {
    try {
        window.HSStaticMethods?.autoInit?.()
    } catch {
        // no-op
    }
}

const AppProviders = ({ children }: ChildrenType) => {
    const pathname = usePathname()

    useEffect(() => {
        const splashElement =
            document.querySelector<HTMLDivElement>('#__next_splash')
        const splashScreen = document.querySelector('#splash-screen')

        if (!splashElement || !splashScreen) return

        const handleMutations = (mutationsList: MutationRecord[]) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && splashElement.hasChildNodes()) {
                    splashScreen.classList.add('remove')
                }
            }
        }

        import('preline/preline')

        const observer = new MutationObserver(handleMutations)
        observer.observe(splashElement, { childList: true, subtree: true })
        if (splashElement.hasChildNodes()) {
            splashScreen.classList.add('remove')
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            safePrelineAutoInit()
        }, 400)
        return () => window.clearTimeout(timerId)
    }, [pathname])

    return (
        <Fragment>
            <CartProvider>
                {children}
            </CartProvider>
        </Fragment>
    )
}

export default AppProviders

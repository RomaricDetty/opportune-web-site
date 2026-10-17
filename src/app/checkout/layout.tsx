import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Commande',
    robots: { index: false, follow: false },
}

/**
 * Layout checkout (non indexé).
 */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return children
}

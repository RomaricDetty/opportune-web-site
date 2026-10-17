import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nos services',
    description:
        'Livraison, conseil, garantie et mise en service — les services Electro Store pour l’électroménager et le high-tech en Côte d’Ivoire.',
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'Nos services | Electro Store',
        description:
            'Découvrez la livraison à domicile, le conseil, la garantie constructeur et la mise en service.',
        url: '/services',
    },
}

/**
 * Layout SEO page services.
 */
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children
}

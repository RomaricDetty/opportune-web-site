import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Boutique',
    description:
        'Parcourir tous les produits électroménager et high-tech. Prix en FCFA, livraison en Côte d\'Ivoire.',
    alternates: { canonical: '/shop' },
}

/**
 * Layout SEO de la page boutique.
 */
export default function ShopLayoutSeo({ children }: { children: React.ReactNode }) {
    return children
}

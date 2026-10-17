import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contactez-nous',
    description:
        'Contactez Electro Store à Abidjan : téléphone, WhatsApp ou formulaire. Conseil électroménager et high-tech, devis rapide.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Contactez-nous | Electro Store',
        description:
            'Une question sur un produit ou une commande ? Contactez Electro Store — réponse rapide en Côte d’Ivoire.',
        url: '/contact',
    },
}

/**
 * Layout SEO page contact.
 */
export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}

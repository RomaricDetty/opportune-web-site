import type { Metadata } from 'next'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000/api'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

interface ProductLayoutProps {
    children: React.ReactNode
    params: Promise<{ id: string }>
}

/**
 * Charge un produit pour SEO / JSON-LD.
 * @param id - Identifiant produit
 */
async function fetchProduct(id: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 300 } })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data || null
}

/**
 * Métadonnées SEO de la fiche produit.
 */
export async function generateMetadata({ params }: ProductLayoutProps): Promise<Metadata> {
    const { id } = await params

    try {
        const product = await fetchProduct(id)
        if (!product) return { title: 'Produit introuvable' }

        const title = product.libelle
        const description =
            product.description?.slice(0, 160) ||
            `${product.libelle} — prix en FCFA, livraison en Côte d'Ivoire.`
        const image = product.imagePrincipale?.startsWith('http')
            ? product.imagePrincipale
            : undefined

        return {
            title,
            description,
            alternates: { canonical: `/product/${id}` },
            openGraph: {
                title,
                description,
                url: `${SITE_URL}/product/${id}`,
                type: 'website',
                images: image ? [{ url: image, alt: title }] : undefined,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: image ? [image] : undefined,
            },
        }
    } catch {
        return { title: 'Produit' }
    }
}

/**
 * Layout fiche produit (SEO serveur + JSON-LD Product).
 */
export default async function ProductLayout({ children, params }: ProductLayoutProps) {
    const { id } = await params
    let jsonLd: Record<string, unknown> | null = null

    try {
        const product = await fetchProduct(id)
        if (product) {
            const price = Number(product.prix) || 0
            const remise = Number(product.remise || product.discount || 0)
            const finalPrice = remise > 0 ? Math.round(price * (1 - remise / 100)) : price
            jsonLd = {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: product.libelle,
                description: product.description || product.libelle,
                image: product.imagePrincipale || undefined,
                sku: product.reference || product.id,
                brand: product.marque?.libelle
                    ? { '@type': 'Brand', name: product.marque.libelle }
                    : undefined,
                offers: {
                    '@type': 'Offer',
                    url: `${SITE_URL}/product/${id}`,
                    priceCurrency: 'XOF',
                    price: finalPrice,
                    availability: product.isAvailable
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                },
            }
        }
    } catch {
        jsonLd = null
    }

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            {children}
        </>
    )
}

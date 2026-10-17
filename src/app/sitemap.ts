import type { MetadataRoute } from 'next'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000/api'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

/**
 * Sitemap dynamique (pages + produits).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${SITE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ]

    try {
        const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 3600 } })
        if (!res.ok) return staticRoutes
        const json = await res.json()
        const products = Array.isArray(json?.data) ? json.data : []

        const productRoutes: MetadataRoute.Sitemap = products.map((product: { id: string; updatedAt?: string }) => ({
            url: `${SITE_URL}/product/${product.id}`,
            lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        return [...staticRoutes, ...productRoutes]
    } catch {
        return staticRoutes
    }
}

import type { MetadataRoute } from 'next'

/**
 * Fichier robots.txt pour le SEO.
 */
export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/account/', '/checkout', '/cart', '/auth/', '/wishlist', '/others'],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    }
}

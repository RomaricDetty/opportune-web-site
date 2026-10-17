/** Placeholder SVG léger (produit indisponible / erreur de chargement). */
export const PRODUCT_IMAGE_PLACEHOLDER =
    'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
          <rect fill="#f3f4f6" width="400" height="400"/>
          <g fill="none" stroke="#d1d5db" stroke-width="8" stroke-linecap="round">
            <rect x="110" y="120" width="180" height="140" rx="16"/>
            <circle cx="160" cy="170" r="18"/>
            <path d="M120 240l48-40 36 28 56-52 40 44"/>
          </g>
        </svg>`,
    )

/**
 * Optimise une URL image (Unsplash) pour une largeur cible.
 * @param src URL source
 * @param width Largeur souhaitée en px
 */
export function optimizeProductImage(
    src?: string | null,
    width = 480,
): string | null {
    const value = src?.trim()
    if (!value) return null

    try {
        if (value.startsWith('data:') || value.startsWith('blob:')) return value

        const url = new URL(value)
        if (url.hostname === 'images.unsplash.com') {
            url.searchParams.set('auto', 'format')
            url.searchParams.set('fit', 'crop')
            url.searchParams.set('w', String(width))
            url.searchParams.set('q', width <= 200 ? '55' : '65')
            if (!url.searchParams.has('h')) {
                url.searchParams.set('h', String(width))
            } else if (Number(url.searchParams.get('h')) > width) {
                url.searchParams.set('h', String(width))
            }
            return url.toString()
        }
        return value
    } catch {
        return value
    }
}

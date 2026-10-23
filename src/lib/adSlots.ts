export type AdSlotKey = 'hero' | 'home_mid' | 'home_bottom'

export interface ShopPublicite {
    id: string
    libelle: string
    description: string | null
    images: string | null
    idCategory: string | null
    idProduit: string | null
    emplacement?: AdSlotKey | string
    isActive?: boolean
    dateExpiration?: string | null
}

/**
 * Extrait la première image d'une publicité.
 * @param images
 */
export function getAdImage(images: string | null | undefined): string | null {
    if (!images) return null
    try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images
        return Array.isArray(parsed) && parsed[0] ? parsed[0] : null
    } catch {
        return null
    }
}

/**
 * Lien cible d'une publicité (produit, catégorie ou boutique).
 * @param ad
 */
export function adHref(ad: Pick<ShopPublicite, 'idProduit' | 'idCategory'>): string {
    if (ad.idProduit) return `/product/${ad.idProduit}`
    if (ad.idCategory) return `/shop?category=${ad.idCategory}`
    return '/shop'
}

/**
 * Publicité encore visible (active et non expirée).
 * @param ad
 */
export function isAdVisible(ad: ShopPublicite): boolean {
    if (ad.isActive === false) return false
    if (!ad.dateExpiration) return true
    return new Date(ad.dateExpiration) > new Date()
}

/**
 * Filtre les pubs d'un emplacement.
 * @param ads
 * @param slot
 */
export function adsForSlot(ads: ShopPublicite[], slot: AdSlotKey): ShopPublicite[] {
    return ads.filter((ad) => {
        const emplacement = (ad.emplacement || 'hero') as AdSlotKey
        return emplacement === slot && isAdVisible(ad) && Boolean(getAdImage(ad.images))
    })
}

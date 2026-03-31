"use client"
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

/**
 * Retourne la categorie cible selon le slug de marque.
 */
const getOthersCategoryByBrandSlug = (brandSlug: string): string => {
    const telephonesBrands = ['samsung', 'apple', 'xiaomi', 'huawei', 'oppo', 'tecno', 'infinix']
    const mobiliersBrands = ['homestyle', 'woodcraft', 'officepro', 'ikea', 'maisons-du-monde']

    if (telephonesBrands.includes(brandSlug)) return 'telephones'
    if (mobiliersBrands.includes(brandSlug)) return 'mobiliers'
    return 'accessoires'
}

/**
 * Redirige les anciennes pages marques vers Others.
 */
const BrandProductsPage = () => {
    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        const brandSlug = String(params.name || '').toLowerCase()
        const category = getOthersCategoryByBrandSlug(brandSlug)
        router.replace(`/others?category=${category}`)
    }, [params.name, router])

    return null
}

export default BrandProductsPage

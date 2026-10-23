'use client'

import { useEffect, useMemo, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ShopLayout from '@/components/shop/ShopLayout'
import HeroBanner from '@/components/shop/HeroBanner'
import AdSlot from '@/components/shop/AdSlot'
import FeaturesBar from '@/components/shop/FeaturesBar'
import { adsForSlot, type ShopPublicite } from '@/lib/adSlots'
import { fetchPublicites } from '@/services/publiciteService'
import ProductSection from '@/components/shop/ProductSection'
import ProductGridSkeleton from '@/components/shop/ProductGridSkeleton'
import Button from '@/components/ui/Button'
import { articleService } from '@/services/articleService'
import type { Article } from '@/types/articles'
import { priceAfterDiscount } from '@/lib/formatPrice'
import Reveal from '@/components/ui/Reveal'

interface HomeGroup {
    category?: { id?: string; libelle?: string }
    categoryId?: string
    produits?: Article[]
}

/**
 * Sélectionne les coups de cœur (promo ou featured).
 * @param groups
 */
function pickFeatured(groups: HomeGroup[]): Article[] {
    const all = groups.flatMap((g) => g.produits || [])
    const seen = new Set<string>()
    const unique = all.filter((p) => {
        const id = String(p.id)
        if (seen.has(id)) return false
        seen.add(id)
        return true
    })

    const withPromo = unique.filter((p) => Number(p.discount ?? p.remise ?? 0) > 0)
    const withFeatured = unique.filter((p) => Boolean((p as Article & { featured?: boolean }).featured))
    const pool = withPromo.length >= 2 ? withPromo : withFeatured.length ? withFeatured : unique

    return [...pool]
        .sort((a, b) => {
            const ra = Number(a.discount ?? a.remise ?? 0)
            const rb = Number(b.discount ?? b.remise ?? 0)
            if (rb !== ra) return rb - ra
            return priceAfterDiscount(a.prix, ra) - priceAfterDiscount(b.prix, rb)
        })
        .slice(0, 4)
}

/**
 * Page d'accueil boutique (structure type aobishop).
 */
export default function HomePage() {
    const [groups, setGroups] = useState<HomeGroup[]>([])
    const [ads, setAds] = useState<ShopPublicite[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            articleService.getAllHome().catch(() => []),
            fetchPublicites().catch(() => [] as ShopPublicite[]),
        ])
            .then(([response, publicites]) => {
                const list = Array.isArray(response) ? response : [response]
                setGroups(list as HomeGroup[])
                setAds(publicites)
            })
            .finally(() => setLoading(false))
    }, [])

    const featured = useMemo(() => pickFeatured(groups), [groups])

    return (
        <ShopLayout
            top={
                <>
                    <HeroBanner ads={adsForSlot(ads, 'hero')} isLoading={loading} />
                    <FeaturesBar />
                </>
            }
        >
            {loading && (
                <div className="container py-8 font-dm">
                    <div className="h-7 w-48 bg-gray-200/80 rounded animate-pulse mb-5" />
                    <ProductGridSkeleton count={4} />
                </div>
            )}

            {!loading && featured.length > 0 && (
                <ProductSection
                    title="Coups de cœur"
                    products={featured}
                    href="/shop?sort=newest"
                />
            )}

            {!loading && <AdSlot ads={adsForSlot(ads, 'home_mid')} />}

            {!loading &&
                groups.map((group, index) => {
                    const categoryLabel =
                        typeof group.category === 'string'
                            ? group.category
                            : group.category?.libelle || 'Nos produits'
                    const categoryId = group.categoryId || group.category?.id
                    return (
                        <ProductSection
                            key={categoryId || index}
                            title={categoryLabel}
                            products={group.produits || []}
                            href={categoryId ? `/shop?category=${categoryId}` : '/shop'}
                        />
                    )
                })}

            {!loading && <AdSlot ads={adsForSlot(ads, 'home_bottom')} />}

            {!loading && groups.length > 0 && (
                <Reveal>
                    <div className="flex justify-center pb-12 pt-2">
                        <Button href="/shop" size="lg" className="rounded-xl">
                            Voir tous les articles
                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                        </Button>
                    </div>
                </Reveal>
            )}
        </ShopLayout>
    )
}

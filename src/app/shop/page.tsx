'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import ShopProductCard from '@/components/shop/ShopProductCard'
import ProductGridSkeleton from '@/components/shop/ProductGridSkeleton'
import ShopPagination from '@/components/shop/ShopPagination'
import ShopFilters from '@/components/shop/ShopFilters'
import Breadcrumb from '@/components/shop/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/lib/cn'
import { useShopCategory } from '@/hooks/useShopCategory'
import { articleService } from '@/services/articleService'
import { siteCategoryService, type SiteCategory } from '@/services/siteCategoryService'
import type { Article } from '@/types/articles'

const PAGE_SIZE = 12

type ShopView = 'grid' | 'list'

/**
 * Contenu catalogue (dépend de useSearchParams).
 */
function ShopContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const q = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''
    const siteCategory = searchParams.get('siteCategory') || ''
    const marque = searchParams.get('marque') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const inStock = searchParams.get('inStock') === '1'
    const sort = searchParams.get('sort') || 'newest'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)

    const [products, setProducts] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [loadedRayon, setLoadedRayon] = useState<SiteCategory | null>(null)
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [view, setView] = useState<ShopView>('grid')

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        const fetch = async () => {
            try {
                const result = await articleService.list({
                    page,
                    limit: PAGE_SIZE,
                    sort,
                    ...(siteCategory ? { idSiteCategory: siteCategory } : {}),
                    ...(category ? { idCategory: category } : {}),
                    ...(marque ? { idMarque: marque } : {}),
                    ...(q ? { libelle: q } : {}),
                    ...(minPrice ? { minPrice } : {}),
                    ...(maxPrice ? { maxPrice } : {}),
                    ...(inStock ? { isAvailable: true } : {}),
                })
                if (cancelled) return
                setProducts(result.data)
                setTotal(result.pagination?.total ?? result.data.length)
                setTotalPages(result.pagination?.totalPages ?? 1)

                if (
                    result.pagination &&
                    page > result.pagination.totalPages &&
                    result.pagination.totalPages > 0
                ) {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('page', String(result.pagination.totalPages))
                    router.replace(`/shop?${params.toString()}`)
                }
            } catch {
                if (!cancelled) {
                    setProducts([])
                    setTotal(0)
                    setTotalPages(1)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        fetch()
        return () => {
            cancelled = true
        }
    }, [q, category, siteCategory, marque, minPrice, maxPrice, inStock, sort, page, router])

    // Position dans le catalogue : l'URL donne le rayon, ou la catégorie dont on déduit le rayon.
    const currentCategory = useShopCategory(category)
    const rayonId = siteCategory || currentCategory?.siteCategory?.id || ''

    useEffect(() => {
        if (!rayonId) return
        let cancelled = false
        siteCategoryService
            .getById(rayonId)
            .then((rayon) => {
                if (!cancelled) setLoadedRayon(rayon)
            })
            .catch(() => {
                if (!cancelled) setLoadedRayon(null)
            })
        return () => {
            cancelled = true
        }
    }, [rayonId])

    const rayon = loadedRayon?.id === rayonId ? loadedRayon : null
    const rayonCategories = rayon?.categories ?? []
    const locationLoading = currentCategory === undefined || (!category && !!rayonId && !rayon)

    let titleLabel = currentCategory?.libelle || rayon?.libelle || 'Boutique'
    if (q) titleLabel = `Recherche : ${q}`

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page, q, category, siteCategory, marque, sort])

    /**
     * Construit l’URL d’une page en conservant les filtres.
     * @param nextPage
     */
    const buildHref = (nextPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        if (nextPage > 1) params.set('page', String(nextPage))
        else params.delete('page')
        const qs = params.toString()
        return qs ? `/shop?${qs}` : '/shop'
    }

    const crumbs = [
        { label: 'Accueil', href: '/' },
        { label: 'Boutique', href: '/shop' },
        ...(q
            ? [{ label: titleLabel }]
            : [
                  ...(rayon ? [{ label: rayon.libelle, href: `/shop?siteCategory=${rayon.id}` }] : []),
                  ...(currentCategory ? [{ label: currentCategory.libelle }] : []),
              ]),
    ]

    const chipClass = (active: boolean) =>
        cn(
            'shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
            active
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 bg-white text-secondary hover:border-primary hover:text-primary',
        )

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 font-dm max-w-[1400px]">
            <Breadcrumb items={crumbs} />
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                {locationLoading && !q ? (
                    <div className="h-9 w-56 rounded bg-gray-100 animate-pulse" aria-hidden />
                ) : (
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary">{titleLabel}</h1>
                )}
                <div className="flex items-center gap-3">
                    {!loading && total > 0 && (
                        <p className="text-sm text-muted">{total} produit{total > 1 ? 's' : ''}</p>
                    )}
                    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-0.5">
                        <button
                            type="button"
                            onClick={() => setView('grid')}
                            aria-label="Vue grille"
                            aria-pressed={view === 'grid'}
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                                view === 'grid'
                                    ? 'bg-primary text-white'
                                    : 'text-muted hover:text-primary',
                            )}
                        >
                            <IconifyIcon icon="lucide:layout-grid" className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            aria-label="Vue liste"
                            aria-pressed={view === 'list'}
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                                view === 'list'
                                    ? 'bg-primary text-white'
                                    : 'text-muted hover:text-primary',
                            )}
                        >
                            <IconifyIcon icon="lucide:layout-list" className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {!q && rayon && rayonCategories.length > 0 && (
                <nav
                    aria-label={`Catégories du rayon ${rayon.libelle}`}
                    className="mb-4 flex gap-2 overflow-x-auto pb-1"
                >
                    <Link href={`/shop?siteCategory=${rayon.id}`} className={chipClass(!category)}>
                        Tout voir
                    </Link>
                    {rayonCategories.map((item) => (
                        <Link
                            key={item.id}
                            href={`/shop?category=${item.id}`}
                            aria-current={item.id === category ? 'page' : undefined}
                            className={chipClass(item.id === category)}
                        >
                            {item.libelle}
                        </Link>
                    ))}
                </nav>
            )}

            <ShopFilters />

            {loading && <ProductGridSkeleton count={PAGE_SIZE} />}

            {!loading && products.length === 0 && (
                <EmptyState
                    icon="lucide:search-x"
                    title="Aucun produit trouvé"
                    description={
                        q
                            ? `Aucun résultat pour « ${q} »`
                            : 'Essayez d’autres filtres ou parcourez tout le catalogue.'
                    }
                    actionHref="/shop"
                    actionLabel="Voir tous les produits"
                    className="py-16 md:py-20"
                />
            )}

            {!loading && products.length > 0 && (
                <>
                    <div
                        className={
                            view === 'list'
                                ? 'flex flex-col gap-3'
                                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4'
                        }
                    >
                        {products.map((product) => (
                            <ShopProductCard
                                key={product.id}
                                product={product}
                                variant={view}
                            />
                        ))}
                    </div>
                    <ShopPagination
                        page={page}
                        totalPages={totalPages}
                        total={total}
                        buildHref={buildHref}
                    />
                </>
            )}
        </div>
    )
}

/**
 * Page catalogue / recherche.
 */
export default function ShopPage() {
    return (
        <ShopLayout>
            <Suspense
                fallback={
                    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-[1400px]">
                        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-6" />
                        <ProductGridSkeleton />
                    </div>
                }
            >
                <ShopContent />
            </Suspense>
        </ShopLayout>
    )
}

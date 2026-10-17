'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import ShopProductCard from '@/components/shop/ShopProductCard'
import Breadcrumb from '@/components/shop/Breadcrumb'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import { articleService } from '@/services/articleService'
import { useCartContext } from '@/context/useCartContext'
import { useWishlistContext } from '@/context/useWishlistContext'
import { useAuthContext } from '@/context/useAuthContext'
import { useToast } from '@/context/useToastContext'
import { formatXof, priceAfterDiscount } from '@/lib/formatPrice'
import { STORE_PHONE_TEL, whatsappUrl } from '@/lib/storeContact'
import type { Article } from '@/types/articles'
import ProductGallery from '@/components/shop/ProductGallery'
import ProductGridSkeleton from '@/components/shop/ProductGridSkeleton'
import Reveal from '@/components/ui/Reveal'
import EmptyState from '@/components/ui/EmptyState'
import { setShopBottomUi } from '@/lib/shopBottomUi'

/**
 * Construit la galerie (principale + secondaires).
 * @param product
 */
function getProductGallery(product: Article): string[] {
    const secondaryRaw = product.images
    let secondary: string[] = []
    if (Array.isArray(secondaryRaw)) {
        secondary = secondaryRaw.map((img) => (typeof img === 'string' ? img : '')).filter(Boolean)
    } else if (typeof secondaryRaw === 'string' && secondaryRaw.trim()) {
        try {
            const parsed = JSON.parse(secondaryRaw)
            if (Array.isArray(parsed)) {
                secondary = parsed.map((img) => (typeof img === 'string' ? img : '')).filter(Boolean)
            }
        } catch {
            secondary = []
        }
    }
    const all = [product.imagePrincipale, ...secondary].filter(Boolean) as string[]
    return [...new Set(all)]
}

/**
 * Page fiche produit.
 */
export default function ProductDetailPage() {
    const params = useParams()
    const id = String(params.id)
    const router = useRouter()
    const [product, setProduct] = useState<Article | null>(null)
    const [similar, setSimilar] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [qty, setQty] = useState(1)
    const [mounted, setMounted] = useState(false)
    const stickyCtaRef = useRef<HTMLDivElement>(null)
    const { addToCart } = useCartContext()
    const { isFavorite, toggleFavorite } = useWishlistContext()
    const { isAuthenticated } = useAuthContext()
    const { showToast } = useToast()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setLoading(true)
        articleService
            .getById(id)
            .then(async (data) => {
                setProduct(data)
                setQty(data?.quantite_minimale || 1)
                articleService.updateViews(id).catch(() => undefined)

                if (data?.category?.id) {
                    const related = await articleService.list({
                        idCategory: data.category.id,
                        page: 1,
                        limit: 8,
                    })
                    setSimilar(
                        related.data.filter((p) => String(p.id) !== String(data.id)).slice(0, 4)
                    )
                } else {
                    setSimilar([])
                }
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false))
    }, [id])

    /**
     * Ajoute au panier avec feedback.
     */
    const handleAdd = () => {
        if (!product) return
        addToCart(product, qty)
        showToast('Ajouté au panier', { href: '/cart', hrefLabel: 'Voir le panier' })
    }

    useEffect(() => {
        if (loading || !product || !mounted) {
            setShopBottomUi('cta', 0)
            return
        }
        const el = stickyCtaRef.current
        if (!el) return

        /**
         * Réserve l’espace du CTA mobile (hauteur + marge basse).
         */
        const sync = () => {
            const mobile = window.matchMedia('(max-width: 767px)').matches
            if (!mobile) {
                setShopBottomUi('cta', 0)
                return
            }
            setShopBottomUi('cta', el.getBoundingClientRect().height + 36)
        }
        sync()
        const observer = new ResizeObserver(sync)
        observer.observe(el)
        window.addEventListener('resize', sync)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', sync)
            setShopBottomUi('cta', 0)
        }
    }, [loading, product, mounted])

    if (loading) {
        return (
            <ShopLayout>
                <div className="container py-8 md:py-10 font-dm">
                    <div className="h-4 w-48 rounded shop-shimmer mb-6" />
                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 aspect-square rounded-2xl shop-shimmer" />
                        <div className="lg:col-span-5 space-y-3">
                            <div className="h-4 w-24 rounded shop-shimmer" />
                            <div className="h-8 w-4/5 rounded shop-shimmer" />
                            <div className="h-10 w-40 rounded shop-shimmer" />
                            <div className="h-24 w-full rounded shop-shimmer" />
                            <div className="h-11 w-full rounded-xl shop-shimmer" />
                        </div>
                    </div>
                    <div className="mt-10">
                        <ProductGridSkeleton count={4} />
                    </div>
                </div>
            </ShopLayout>
        )
    }

    if (!product) {
        return (
            <ShopLayout>
                <div className="container py-10 font-dm">
                    <EmptyState
                        icon="lucide:search-x"
                        title="Produit introuvable"
                        description="Cet article n’existe plus ou le lien est incorrect."
                        actionHref="/shop"
                        actionLabel="Retour boutique"
                    />
                </div>
            </ShopLayout>
        )
    }

    const remise = Number(product.discount ?? product.remise ?? 0)
    const finalPrice = priceAfterDiscount(product.prix, remise)
    const favorite = isFavorite(String(product.id))
    const specs = product.caracteristiques
    const gallery = getProductGallery(product)
    const waMessage = `Bonjour Electro Store, je suis intéressé(e) par : ${product.libelle}`
    const hasSpecs = specs && !Array.isArray(specs) && typeof specs === 'object'

    return (
        <ShopLayout>
            <div className="container py-6 md:py-10 font-dm pb-8 md:pb-10">
                <Breadcrumb
                    items={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Boutique', href: '/shop' },
                        ...(product.category?.libelle
                            ? [
                                  {
                                      label: product.category.libelle,
                                      href: `/shop?category=${product.category.id}`,
                                  },
                              ]
                            : []),
                        { label: product.libelle },
                    ]}
                />

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-2">
                    <div className="lg:col-span-7">
                        <ProductGallery images={gallery} alt={product.libelle} />
                    </div>

                    <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--shop-header-h,5rem)+1rem)] self-start">
                        {product.marque?.libelle && (
                            <p className="text-xs uppercase tracking-wide text-muted mb-2">
                                {product.marque.libelle}
                            </p>
                        )}
                        <h1 className="text-2xl md:text-3xl font-bold text-secondary leading-tight">
                            {product.libelle}
                        </h1>
                        {product.reference && (
                            <p className="text-sm text-muted mt-1.5">Réf. {product.reference}</p>
                        )}

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-bold text-primary tracking-tight">
                                {formatXof(finalPrice)}
                            </span>
                            {remise > 0 && (
                                <>
                                    <span className="text-sm text-muted line-through">
                                        {formatXof(product.prix)}
                                    </span>
                                    <Badge variant="promo">-{remise}%</Badge>
                                </>
                            )}
                        </div>

                        <div className="mt-3">
                            <Badge variant={product.isAvailable ? 'success' : 'danger'}>
                                {product.isAvailable ? 'En stock' : 'Rupture de stock'}
                            </Badge>
                        </div>

                        {product.description && (
                            <p className="mt-5 text-sm text-muted leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        )}

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                <button
                                    type="button"
                                    className="px-3.5 py-2.5 hover:bg-gray-50"
                                    onClick={() =>
                                        setQty((q) =>
                                            Math.max(product.quantite_minimale || 1, q - 1)
                                        )
                                    }
                                >
                                    −
                                </button>
                                <span className="px-4 py-2.5 text-sm font-semibold min-w-10 text-center">
                                    {qty}
                                </span>
                                <button
                                    type="button"
                                    className="px-3.5 py-2.5 hover:bg-gray-50"
                                    onClick={() => setQty((q) => q + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <Button
                                type="button"
                                disabled={!product.isAvailable}
                                onClick={handleAdd}
                                className="flex-1 min-w-[160px] rounded-xl"
                            >
                                <IconifyIcon icon="lucide:shopping-cart" className="h-4 w-4" />
                                Ajouter au panier
                            </Button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className={favorite ? 'border-primary text-primary' : undefined}
                                onClick={async () => {
                                    if (!isAuthenticated) {
                                        router.push('/auth/login?next=/product/' + id)
                                        return
                                    }
                                    await toggleFavorite(String(product.id))
                                }}
                            >
                                <IconifyIcon icon="lucide:heart" className="h-4 w-4" />
                                Favoris
                            </Button>
                            <Button
                                href={whatsappUrl(waMessage)}
                                variant="whatsapp"
                                size="sm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl"
                            >
                                <IconifyIcon icon="lucide:message-circle" className="h-4 w-4" />
                                WhatsApp
                            </Button>
                            <Button href={`tel:${STORE_PHONE_TEL}`} variant="secondary" size="sm">
                                <IconifyIcon icon="lucide:phone" className="h-4 w-4" />
                                Appeler
                            </Button>
                        </div>

                        <p className="mt-5 text-xs text-muted leading-relaxed">
                            Livraison Abidjan sous 24–72 h · Retrait magasin possible
                        </p>
                    </div>
                </div>

                {hasSpecs && (
                    <section className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-lg font-bold text-secondary mb-4">Caractéristiques</h2>
                        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-0 divide-y divide-gray-100 sm:divide-y-0">
                            {Object.entries(specs as Record<string, unknown>).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between gap-4 py-3 sm:py-2.5 border-b border-gray-100"
                                >
                                    <dt className="text-sm text-muted">{key}</dt>
                                    <dd className="text-sm font-semibold text-secondary text-right">
                                        {String(value)}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                )}

                {similar.length > 0 && (
                    <Reveal>
                        <section className="mt-12">
                            <SectionHeader title="Produits similaires" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                {similar.map((item) => (
                                    <ShopProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </section>
                    </Reveal>
                )}

            </div>

            {mounted &&
                createPortal(
                    <div
                        ref={stickyCtaRef}
                        className="md:hidden fixed inset-x-0 z-[80] px-3 font-dm"
                        style={{
                            bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
                        }}
                    >
                        <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-lg">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-bold text-primary tabular-nums leading-none">
                                    {formatXof(finalPrice)}
                                </p>
                                <p className="mt-0.5 text-[11px] text-muted truncate leading-tight">
                                    {product.libelle}
                                </p>
                            </div>
                            <Button
                                type="button"
                                disabled={!product.isAvailable}
                                onClick={handleAdd}
                                className="shrink-0 rounded-xl"
                            >
                                <IconifyIcon icon="lucide:shopping-cart" className="h-4 w-4" />
                                Ajouter
                            </Button>
                        </div>
                    </div>,
                    document.body,
                )}
        </ShopLayout>
    )
}

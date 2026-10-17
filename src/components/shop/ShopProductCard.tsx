'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import Badge from '@/components/ui/Badge'
import type { Article } from '@/types/articles'
import { useCartContext } from '@/context/useCartContext'
import { useWishlistContext } from '@/context/useWishlistContext'
import { useAuthContext } from '@/context/useAuthContext'
import { useToast } from '@/context/useToastContext'
import { formatXof, priceAfterDiscount } from '@/lib/formatPrice'
import { cn } from '@/lib/cn'
import ProductImage from '@/components/shop/ProductImage'

interface ShopProductCardProps {
    product: Article
}

/**
 * Carte produit style marketplace (prix XOF, favoris, panier).
 * @param props
 */
export default function ShopProductCard({ product }: ShopProductCardProps) {
    const router = useRouter()
    const { addToCart, isInCart } = useCartContext()
    const { isFavorite, toggleFavorite } = useWishlistContext()
    const { isAuthenticated } = useAuthContext()
    const { showToast } = useToast()

    const remise = Number(product.discount ?? product.remise ?? 0)
    const finalPrice = priceAfterDiscount(product.prix, remise)
    const favorite = isFavorite(String(product.id))
    const inCart = isInCart(String(product.id))
    const image = product.imagePrincipale?.trim() || null
    const [heartPulse, setHeartPulse] = useState(false)

    /**
     * Prefetch de la fiche produit au survol.
     */
    const prefetchProduct = () => {
        router.prefetch(`/product/${product.id}`)
    }

    /**
     * Ajoute le produit au panier.
     * @param e
     */
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
        showToast('Ajouté au panier', {
            href: '/cart',
            hrefLabel: 'Voir le panier',
        })
    }

    /**
     * Bascule le favori (redirige vers login si besoin).
     * @param e
     */
    const handleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isAuthenticated) {
            router.push('/auth/login?next=/wishlist')
            return
        }
        try {
            await toggleFavorite(String(product.id))
            setHeartPulse(true)
            window.setTimeout(() => setHeartPulse(false), 450)
        } catch {
            // silencieux
        }
    }

    return (
        <article
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-primary/25 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300 font-dm"
            onMouseEnter={prefetchProduct}
        >
            <div className="relative aspect-[4/3] sm:aspect-square bg-[#fafafa]">
                {remise > 0 && (
                    <Badge variant="promo" className="absolute top-2.5 left-2.5 z-10">
                        -{remise}%
                    </Badge>
                )}
                <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <IconButton label="Ajouter aux favoris" onClick={handleFavorite}>
                        <IconifyIcon
                            icon="lucide:heart"
                            className={cn(
                                'h-4 w-4 transition-colors',
                                favorite && 'text-primary',
                                heartPulse && 'animate-heart-pulse',
                            )}
                        />
                    </IconButton>
                </div>
                <Link href={`/product/${product.id}`} prefetch className="block h-full w-full p-5">
                    <ProductImage
                        src={image}
                        alt={product.libelle}
                        width={400}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                </Link>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col">
                {product.marque?.libelle && (
                    <p className="text-[11px] uppercase tracking-wide text-muted mb-1">
                        {product.marque.libelle}
                    </p>
                )}
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-secondary line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
                        {product.libelle}
                    </h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-bold text-primary">{formatXof(finalPrice)}</span>
                    {remise > 0 && (
                        <span className="text-xs text-muted line-through">{formatXof(product.prix)}</span>
                    )}
                </div>

                <p className="mt-1.5">
                    <Badge variant={product.isAvailable ? 'success' : 'danger'}>
                        {product.isAvailable ? 'En stock' : 'Rupture'}
                    </Badge>
                </p>

                <div className="mt-3.5 flex flex-col gap-1">
                    <Button
                        size="sm"
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={!product.isAvailable}
                        className={
                            inCart
                                ? 'rounded-xl bg-primary/10 text-primary border border-primary/30 shadow-none hover:bg-primary/15'
                                : 'rounded-xl'
                        }
                        variant={inCart ? 'secondary' : 'primary'}
                    >
                        <IconifyIcon
                            icon={inCart ? 'lucide:check' : 'lucide:shopping-cart'}
                            className="h-3.5 w-3.5 shrink-0"
                        />
                        {inCart ? 'Dans le panier' : 'Ajouter au panier'}
                    </Button>
                    <Button href={`/product/${product.id}`} variant="ghost" size="sm" fullWidth>
                        Voir détails
                    </Button>
                </div>
            </div>
        </article>
    )
}

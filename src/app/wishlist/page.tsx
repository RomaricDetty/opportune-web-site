'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import ShopProductCard from '@/components/shop/ShopProductCard'
import EmptyState from '@/components/ui/EmptyState'
import { useAuthContext } from '@/context/useAuthContext'
import { useWishlistContext } from '@/context/useWishlistContext'

/**
 * Page favoris.
 */
export default function WishlistPage() {
    const router = useRouter()
    const { isAuthenticated, loading: authLoading } = useAuthContext()
    const { items, loading } = useWishlistContext()

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace('/auth/login?next=/wishlist')
        }
    }, [authLoading, isAuthenticated, router])

    return (
        <ShopLayout>
            <div className="container py-8 font-dm">
                <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Mes favoris</h1>

                {(authLoading || loading) && <p className="text-muted">Chargement...</p>}

                {!loading && isAuthenticated && items.length === 0 && (
                    <EmptyState
                        icon="lucide:heart"
                        title="Aucun favori pour le moment"
                        description="Ajoutez des produits depuis la boutique pour les retrouver ici."
                        actionHref="/shop"
                        actionLabel="Parcourir la boutique"
                    />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {items.map((item) =>
                        item.produit ? (
                            <ShopProductCard key={item.id} product={item.produit} />
                        ) : null
                    )}
                </div>
            </div>
        </ShopLayout>
    )
}

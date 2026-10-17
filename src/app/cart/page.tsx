'use client'

import Link from 'next/link'
import ShopLayout from '@/components/shop/ShopLayout'
import Button from '@/components/ui/Button'
import Surface from '@/components/ui/Surface'
import EmptyState from '@/components/ui/EmptyState'
import { useCartContext } from '@/context/useCartContext'
import { formatXof, priceAfterDiscount } from '@/lib/formatPrice'
import ProductImage from '@/components/shop/ProductImage'

/**
 * Page panier.
 */
export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartContext()

    return (
        <ShopLayout>
            <div className="container py-8 font-dm">
                <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Panier</h1>

                {cartItems.length === 0 ? (
                    <EmptyState
                        icon="lucide:shopping-cart"
                        title="Votre panier est vide"
                        description="Parcourez la boutique et ajoutez vos articles."
                        actionHref="/shop"
                        actionLabel="Continuer vos achats"
                    />
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-3">
                            {cartItems.map((item) => {
                                const remise = Number(
                                    item.product.discount ?? item.product.remise ?? 0
                                )
                                const unit = priceAfterDiscount(item.product.prix, remise)
                                return (
                                    <Surface
                                        key={item.product.id}
                                        padding="sm"
                                        className="flex gap-4"
                                    >
                                        <div className="h-20 w-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                                            <ProductImage
                                                src={item.product.imagePrincipale}
                                                alt=""
                                                width={160}
                                                className="h-full w-full object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/product/${item.product.id}`}
                                                className="font-semibold text-secondary hover:text-primary line-clamp-2"
                                            >
                                                {item.product.libelle}
                                            </Link>
                                            <p className="text-sm text-primary font-bold mt-1">
                                                {formatXof(unit)}
                                            </p>
                                            <div className="mt-2 flex items-center gap-3">
                                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                    <button
                                                        type="button"
                                                        className="px-2 py-1"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-3 text-sm font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="px-2 py-1"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-xs text-red-500 font-medium"
                                                >
                                                    Retirer
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-secondary shrink-0">
                                            {formatXof(unit * item.quantity)}
                                        </p>
                                    </Surface>
                                )
                            })}
                        </div>

                        <Surface className="h-fit">
                            <h2 className="font-bold text-secondary mb-4">Récapitulatif</h2>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted">Sous-total</span>
                                <span className="font-semibold">{formatXof(getTotalPrice())}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-3 mt-3">
                                <span>Total</span>
                                <span className="text-primary">{formatXof(getTotalPrice())}</span>
                            </div>
                            <Button href="/checkout" fullWidth className="mt-5 rounded-xl">
                                Passer commande
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                fullWidth
                                size="sm"
                                onClick={clearCart}
                                className="mt-2"
                            >
                                Vider le panier
                            </Button>
                        </Surface>
                    </div>
                )}
            </div>
        </ShopLayout>
    )
}

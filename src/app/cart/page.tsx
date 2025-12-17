"use client"
import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useCartContext } from '@/context/useCartContext'
import { formatPrice } from '@/data/products'

/**
 * Page Panier
 */
const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartContext()
    const totalPrice = getTotalPrice()

    // Obtenir la quantité minimale d'un produit
    const getMinQuantity = (product: any): number => {
        return product.minQuantity || 1
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Navigation />
                <section className="pt-24 pb-20 min-h-screen bg-white">
                    <div className="container pt-8">
                        <div className="text-center py-12">
                            <IconifyIcon 
                                icon="lucide:shopping-cart" 
                                className="h-24 w-24 text-gray-300 mx-auto mb-6"
                            />
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Votre panier est vide
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Ajoutez des produits à votre panier pour commencer vos achats.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff6b35] text-white font-semibold rounded-lg transition-colors"
                            >
                                <IconifyIcon icon="lucide:arrow-left" className="h-5 w-5" />
                                Voir les produits
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-20 min-h-screen bg-white">
                <div className="container pt-8 px-4 sm:px-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
                        Mon panier ({cartItems.length} {cartItems.length > 1 ? 'articles' : 'article'})
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Liste des articles */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => {
                                const minQuantity = getMinQuantity(item.product)
                                const isMinQuantity = item.quantity === minQuantity

                                return (
                                    <div
                                        key={item.product.id}
                                        className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                                    >
                                        {/* Image */}
                                        <Link href={`/products/${item.product.id}`} className="flex-shrink-0 self-center sm:self-start">
                                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden">
                                                {item.product.discount > 0 && (
                                                    <div className="absolute top-2 left-2 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded">
                                                        -{item.product.discount}%
                                                    </div>
                                                )}
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-contain p-2"
                                                />
                                            </div>
                                        </Link>

                                        {/* Informations */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div className="flex-1">
                                                <Link href={`/products/${item.product.id}`}>
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 hover:text-[#ff6b35] transition-colors line-clamp-2">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                                    {item.product.brand} • {item.product.category}
                                                </p>
                                                {/* Prix retiré */}
                                                {minQuantity > 1 && (
                                                    <p className="text-xs text-[#ff6b35] font-medium mt-1">
                                                        Quantité minimale : {minQuantity}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Contrôles de quantité */}
                                            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        disabled={isMinQuantity}
                                                        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded transition-colors ${
                                                            isMinQuantity 
                                                                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                                                                : 'hover:bg-gray-100'
                                                        }`}
                                                        title={isMinQuantity ? `Quantité minimale : ${minQuantity}` : 'Diminuer'}
                                                    >
                                                        <IconifyIcon icon="lucide:minus" className="h-4 w-4" />
                                                    </button>
                                                    <div className="text-base sm:text-lg font-semibold text-gray-900 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                                        title="Augmenter"
                                                    >
                                                        <IconifyIcon icon="lucide:plus" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 sm:gap-2"
                                                >
                                                    <IconifyIcon icon="lucide:trash-2" className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    <span className="text-xs sm:text-sm font-medium hidden xs:inline">Supprimer</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Bouton vider le panier */}
                            <div className="flex justify-end">
                                <button
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 font-medium text-sm sm:text-base"
                                >
                                    <IconifyIcon icon="lucide:trash-2" className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Vider le panier
                                </button>
                            </div>
                        </div>

                        {/* Résumé de commande */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-24">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Résumé de commande
                                </h2>

                                <div className="space-y-4 mb-4 sm:mb-6">
                                    {/* Résumé de commande - Prix retirés */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-sm sm:text-base text-gray-600 text-center">
                                            Demandez un devis personnalisé pour vos articles
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full bg-[#ff6b35] hover:bg-[#ff6b35] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors font-semibold text-base sm:text-lg flex items-center justify-center gap-2 mb-4">
                                    <IconifyIcon icon="lucide:file-text" className="h-4 w-4 sm:h-5 sm:w-5" />
                                    Demander un devis
                                </button>

                                <Link
                                    href="/products"
                                    className="block text-center text-sm sm:text-base text-gray-600 hover:text-[#ff6b35] transition-colors font-medium"
                                >
                                    Continuer les achats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CartPage

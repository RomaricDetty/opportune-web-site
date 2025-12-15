"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ProductData, formatPrice } from '@/data/products'
import { useCartContext } from '@/context/useCartContext'
import { otherProductsData } from '@/data/others'

/**
 * Page de détails d'un produit non-électroménager
 */
const OtherProductDetailPage = () => {
    const params = useParams()
    const productId = parseInt(params.id as string)
    const { addToCart, isInCart } = useCartContext()
    const inCart = isInCart(productId)

    // Trouver le produit
    const product = otherProductsData.find(p => p.id === productId)

    // Si le produit n'existe pas
    if (!product) {
        return (
            <>
                <Navigation />
                <section className="pt-24 pb-20 min-h-screen bg-white">
                    <div className="container">
                        <div className="text-center py-12">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Produit introuvable
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Le produit que vous recherchez n'existe pas.
                            </p>
                            <Link
                                href="/others"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff6b35] text-white font-semibold rounded-lg transition-colors"
                            >
                                <IconifyIcon icon="lucide:arrow-left" className="h-5 w-5" />
                                Retour aux autres produits
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

    /**
     * Gère l'ajout au panier
     */
    const handleAddToCart = () => {
        addToCart(product)
    }

    // Trouver des produits similaires (même catégorie ou même marque)
    const similarProducts = otherProductsData
        .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
        .slice(0, 4)

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-20 min-h-screen bg-white">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="pt-8 mb-8 text-sm">
                        <ol className="flex items-center gap-2 text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-[#ff6b35] transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                            <li>
                                <Link href="/others" className="hover:text-[#ff6b35] transition-colors">
                                    Autres produits
                                </Link>
                            </li>
                            <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                            <li className="text-gray-900 font-medium">{product.name}</li>
                        </ol>
                    </nav>

                    {/* Détails du produit */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {/* Image du produit */}
                        <div className="relative">
                            <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                {product.discount > 0 && (
                                    <div className="absolute top-4 left-4 z-10 bg-[#ff6b35] text-white text-sm font-bold px-3 py-1.5 rounded">
                                        -{product.discount}%
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8"
                                />
                            </div>
                        </div>

                        {/* Informations du produit */}
                        <div className="flex flex-col">
                            {/* Nom et marque */}
                            <div className="mb-4">
                                <span className="text-sm text-[#ff6b35] font-semibold uppercase tracking-wide">
                                    {product.brand}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Prix */}
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-baseline gap-4 flex-wrap">
                                    <div className="text-4xl font-bold text-gray-900">
                                        {formatPrice(product.currentPrice)}
                                    </div>
                                    {product.oldPrice > product.currentPrice && (
                                        <>
                                            <div className="text-xl text-gray-500 line-through">
                                                {formatPrice(product.oldPrice)}
                                            </div>
                                            <div className="text-lg font-semibold text-[#ff6b35]">
                                                Économisez {formatPrice(product.oldPrice - product.currentPrice)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                        Description
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Informations supplémentaires */}
                            <div className="mb-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium min-w-[120px]">Catégorie :</span>
                                    <span className="text-gray-900">{product.category}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium min-w-[120px]">Marque :</span>
                                    <span className="text-gray-900">{product.brand}</span>
                                </div>
                                {product.minQuantity && product.minQuantity > 1 && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-600 font-medium min-w-[120px]">Quantité minimale :</span>
                                        <span className="text-[#ff6b35] font-semibold">{product.minQuantity}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium min-w-[120px]">Disponibilité :</span>
                                    {product.inStock ? (
                                        <span className="flex items-center gap-2 text-green-600 font-semibold">
                                            <IconifyIcon icon="lucide:check-circle" className="h-5 w-5" />
                                            En stock
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-red-600 font-semibold">
                                            <IconifyIcon icon="lucide:x-circle" className="h-5 w-5" />
                                            Rupture de stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 ${
                                        inCart 
                                            ? 'bg-green-600 hover:bg-green-700' 
                                            : 'bg-[#ff6b35] hover:bg-[#ff6b35]'
                                    } text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg flex items-center justify-center gap-2`}
                                >
                                    {inCart ? (
                                        <>
                                            <IconifyIcon icon="lucide:check" className="h-5 w-5" />
                                            Ajouté au panier
                                        </>
                                    ) : (
                                        <>
                                            <IconifyIcon icon="lucide:shopping-cart" className="h-5 w-5" />
                                            Ajouter au panier
                                        </>
                                    )}
                                </button>
                                {/* <button
                                    className="px-6 py-4 border-2 border-gray-300 hover:border-[#ff6b35] text-gray-700 hover:text-[#ff6b35] rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                                >
                                    <IconifyIcon icon="lucide:heart" className="h-5 w-5" />
                                    Favoris
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* Produits similaires */}
                    {similarProducts.length > 0 && (
                        <div className="border-t border-gray-200 pt-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                Produits similaires
                            </h2>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                                {similarProducts.map((similarProduct) => (
                                    <Link
                                        key={similarProduct.id}
                                        href={`/others/${similarProduct.id}`}
                                        className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                                    >
                                        {similarProduct.discount > 0 && (
                                            <div className="absolute top-3 left-3 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded">
                                                -{similarProduct.discount}%
                                            </div>
                                        )}
                                        <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 overflow-hidden">
                                            <img
                                                src={similarProduct.image}
                                                alt={similarProduct.name}
                                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
                                                {similarProduct.name}
                                            </h3>
                                            <div className="text-lg font-bold text-gray-900">
                                                {formatPrice(similarProduct.currentPrice)}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OtherProductDetailPage

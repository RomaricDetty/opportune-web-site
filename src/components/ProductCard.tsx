"use client"
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import type { Article } from '@/types/articles'
import { useCartContext } from '@/context/useCartContext'

/**
 * Props du composant ProductCard
 */
interface ProductCardProps {
    product: Article
    viewMode?: 'grid' | 'list'
    productType?: 'other' // Nouveau prop pour différencier les types
}

/**
 * Composant ProductCard - Affiche une carte de produit
 */
const ProductCard = ({ product, viewMode = 'grid', productType = 'other' }: ProductCardProps) => {
    const { addToCart, isInCart } = useCartContext()
    const inCart = isInCart(String(product.id))

    /**
     * Retourne une URL d'image valide ou null.
     */
    const getSafeImageSrc = (value?: string | null): string | null => {
        if (!value || !value.trim()) return null
        return value
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
    }

    // Générer les étoiles pour le rating
    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <IconifyIcon
                    key={i}
                    icon="lucide:star"
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
            )
        }

        if (hasHalfStar) {
            stars.push(
                <IconifyIcon
                    key="half"
                    icon="lucide:star-half"
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
            )
        }

        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <IconifyIcon
                    key={`empty-${i}`}
                    icon="lucide:star"
                    className="h-4 w-4 text-gray-300"
                />
            )
        }

        return stars
    }

    // Déterminer le chemin selon le type de produit
    const productPath =
        productType === 'other'
            ? `/others/${product.id}`
            : `/others/${product.id}`
    
    if (viewMode === 'list') {
        return (
            <div className="flex gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <Link href={productPath} className="flex gap-4 flex-1">
                    {/* Image */}
                    <div className="relative w-48 h-48 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        {product.discount > 0 && (
                            <div className="absolute top-2 left-2 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded">
                                -{product.discount}%
                            </div>
                        )}
                        {getSafeImageSrc(product.imagePrincipale) ? (
                            <img
                                src={getSafeImageSrc(product.imagePrincipale) as string}
                                alt={product.libelle}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <IconifyIcon icon="lucide:image-off" className="h-8 w-8 text-gray-300" />
                            </div>
                        )}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {product.libelle}
                            </h3>
                            {product.description && (
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            {/* Prix retiré */}
                        </div>
                    </div>
                </Link>
                <div className="flex items-end">
                    <button 
                        onClick={handleAddToCart}
                        className={`${
                            inCart 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-[#ff6b35] hover:bg-[#ff6b35]'
                        } text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2`}
                    >
                        {inCart ? (
                            <>
                                <IconifyIcon icon="lucide:check" className="h-4 w-4" />
                                Ajouté
                            </>
                        ) : (
                            <>
                                <IconifyIcon icon="lucide:shopping-cart" className="h-4 w-4" />
                                Ajouter
                            </>
                        )}
                    </button>
                </div>
            </div>
        )
    }

    // Mode grille (par défaut)
    return (
        <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
            <Link href={productPath} className="block">
                {/* Badge de réduction orange */}
                {product.discount > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                    </div>
                )}

                {/* Image du produit */}
                <div className="relative w-full h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {getSafeImageSrc(product.imagePrincipale) ? (
                        <img
                            src={getSafeImageSrc(product.imagePrincipale) as string}
                            alt={product.libelle}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <IconifyIcon icon="lucide:image-off" className="h-10 w-10 text-gray-300" />
                    )}
                </div>

                {/* Contenu de la carte */}
                <div className="p-4">
                    {/* Nom du produit */}
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.libelle}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    {/* Prix retiré */}
                    <div className="mb-3">
                        {/* Section prix supprimée */}
                    </div>
                </div>
            </Link>

            {/* Bouton orange */}
            <div className="px-4 pb-4">
                <button 
                    onClick={handleAddToCart}
                    className={`w-full ${
                        inCart 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-[#ff6b35] hover:bg-[#ff6b35]'
                    } text-white py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 group relative overflow-hidden`}
                >
                    {inCart ? (
                        <>
                            <IconifyIcon icon="lucide:check" className="h-4 w-4" />
                            Ajouté au panier
                        </>
                    ) : (
                        <>
                            {/* Texte par défaut */}
                            <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                                {/* <IconifyIcon icon="lucide:shopping-cart" className="h-4 w-4" /> */}
                                Ajouter au panier
                            </span>
                            {/* Icône panier au survol */}
                            <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                <IconifyIcon icon="lucide:shopping-cart" className="h-5 w-5" />
                            </span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ProductCard

"use client"
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ProductData, formatPrice } from '@/data/products'
import { useCartContext } from '@/context/useCartContext'

/**
 * Props du composant ProductCard
 */
interface ProductCardProps {
    product: ProductData
    viewMode?: 'grid' | 'list'
    productType?: 'electromenager' | 'other' // Nouveau prop pour différencier les types
}

/**
 * Composant ProductCard - Affiche une carte de produit
 */
const ProductCard = ({ product, viewMode = 'grid', productType = 'electromenager' }: ProductCardProps) => {
    const { addToCart, isInCart } = useCartContext()
    const inCart = isInCart(product.id)

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
    const productPath = productType === 'other' ? `/others/${product.id}` : `/products/${product.id}`

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
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                        />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {product.name}
                            </h3>
                            {product.description && (
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            {/* Prix */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-[#ff6b35]">
                                        {formatPrice(product.currentPrice)}
                                    </span>
                                    {product.oldPrice > product.currentPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatPrice(product.oldPrice)}
                                        </span>
                                    )}
                                </div>
                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-1">
                                    {renderStars(product.rating)}
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({product.rating})
                                    </span>
                                </div>
                            </div>
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
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Contenu de la carte */}
                <div className="p-4">
                    {/* Nom du produit */}
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    {/* Prix */}
                    <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold text-[#ff6b35]">
                                {formatPrice(product.currentPrice)}
                            </span>
                            {product.oldPrice > product.currentPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.oldPrice)}
                                </span>
                            )}
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="text-xs text-gray-500 ml-1">
                                ({product.rating})
                            </span>
                        </div>
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
                    } text-white py-2 rounded-lg transition-colors font-medium flex items-center justify-center gap-2`}
                >
                    {inCart ? (
                        <>
                            <IconifyIcon icon="lucide:check" className="h-4 w-4" />
                            Ajouté au panier
                        </>
                    ) : (
                        <>
                            <IconifyIcon icon="lucide:shopping-cart" className="h-4 w-4" />
                            Ajouter au panier
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ProductCard

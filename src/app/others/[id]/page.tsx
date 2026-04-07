"use client"
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useCartContext } from '@/context/useCartContext'
import { articleService } from '@/services/articleService'
import type { Article } from '@/types/articles'
import TestNavbar from '@/components/TestNavbar'
import SideBar from '@/components/SideBar'

/**
 * Genere un slug a partir du nom d'une categorie.
 */
const generateCategorySlug = (categoryName: string): string => {
    return categoryName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Composant interne qui utilise useSearchParams.
 */
const OtherProductDetailPageContent = () => {
    const params = useParams()
    const searchParams = useSearchParams()
    const productId = params.id as string
    const categorySlug = searchParams.get('category') || ''
    const { addToCart, isInCart } = useCartContext()

    const [product, setProduct] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [similarProducts, setSimilarProducts] = useState<Article[]>([])

    const inCart = product ? isInCart(product.id) : false

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await articleService.getById(productId)
                setProduct(data)
            } catch (err) {
                console.error(err)
                setError('Article introuvable')
            } finally {
                setLoading(false)
            }
        }

        if (productId) fetchArticle()
    }, [productId])

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            if (!product) return
            try {
                const data = await articleService.getByParams('idCategory', product.category.id)
                const filtered = Array.isArray(data) ? data : [data]
                setSimilarProducts(filtered.filter((p: Article) => p.id !== product.id).slice(0, 4))
            } catch (err) {
                console.error('Erreur chargement produits similaires:', err)
            }
        }

        fetchSimilarProducts()
    }, [product])

    /**
     * Gere l'ajout au panier.
     */
    const handleAddToCart = () => {
        if (product) addToCart(product)
    }

    const categoryBackUrl = useMemo(() => {
        if (!product) return '/others'
        return categorySlug
            ? `/others?category=${categorySlug}&uid=${product.category.id}`
            : `/others?category=${generateCategorySlug(product.category.libelle)}&uid=${product.category.id}`
    }, [product, categorySlug])

    if (loading) {
        return (
            <section className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <IconifyIcon icon="lucide:loader" className="h-10 w-10 animate-spin text-[#ff6b35] mx-auto mb-4" />
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </section>
        )
    }

    if (error || !product) {
        return (
            <section className="pt-24 pb-20 min-h-screen bg-white">
                <div className="container">
                    <div className="text-center py-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
                        <p className="text-gray-600 mb-8">Le produit que vous recherchez n&apos;existe pas.</p>
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
        )
    }

    return (
        <section className="pt-24 pb-20 min-h-screen bg-white">
            <div className="container">
                <nav className="pt-8 mb-8 text-sm">
                    <ol className="flex items-center gap-2 text-gray-600">
                        <li>
                            <Link href="/" className="hover:text-[#ff6b35] transition-colors">Accueil</Link>
                        </li>
                        <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                        <li>
                            <Link href={categoryBackUrl} className="hover:text-[#ff6b35] transition-colors">
                                {product.category?.libelle}
                            </Link>
                        </li>
                        <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                        <li className="text-gray-900 font-medium">{product.libelle}</li>
                    </ol>
                </nav>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    <div className="relative">
                        <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 z-10 bg-[#ff6b35] text-white text-sm font-bold px-3 py-1.5 rounded">
                                    -{product.discount}%
                                </div>
                            )}
                            <img src={product.imagePrincipale} alt={product.libelle} className="w-full h-full object-contain p-8" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-4">
                            <div className="text-sm text-[#ff6b35] font-semibold uppercase tracking-wide">{product.marque?.libelle}</div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">{product.libelle}</h1>
                        </div>

                        {product.description && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        <div className="mb-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium min-w-[120px]">Catégorie :</span>
                                <span className="text-gray-900">{product.category?.libelle}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium min-w-[120px]">Marque :</span>
                                <div className="text-gray-900 font-semibold">{product.marque?.libelle}</div>
                            </div>
                            {product.quantite_minimale && product.quantite_minimale > 1 && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-600 font-medium min-w-[120px]">Quantité minimale :</span>
                                    <span className="text-[#ff6b35] font-semibold">{product.quantite_minimale}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium min-w-[120px]">Disponibilité :</span>
                                {product.isAvailable ? (
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

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 ${inCart ? 'bg-green-600 hover:bg-green-700' : 'bg-[#ff6b35] hover:bg-[#ff6b35]'} text-white py-4 px-6 rounded-lg transition-colors font-semibold text-lg flex items-center justify-center gap-2`}
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
                        </div>
                    </div>
                </div>

                {similarProducts.length > 0 && (
                    <div className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Produits similaires</h2>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                            {similarProducts.map((similarProduct) => (
                                <Link
                                    key={similarProduct.id}
                                    href={`/others/${similarProduct.id}?category=${categorySlug}`}
                                    className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                                >
                                    {similarProduct.discount > 0 && (
                                        <div className="absolute top-3 left-3 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded">
                                            -{similarProduct.discount}%
                                        </div>
                                    )}
                                    <div className="relative w-full h-48 flex items-center justify-center bg-gray-50 overflow-hidden">
                                        <img
                                            src={similarProduct.imagePrincipale}
                                            alt={similarProduct.libelle}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">{similarProduct.libelle}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

/**
 * Page de détails d'un produit non-electromenager.
 */
const OtherProductDetailPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <TestNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Suspense fallback={
                <section className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
                    <div className="container">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Chargement...</p>
                        </div>
                    </div>
                </section>
            }>
                <OtherProductDetailPageContent />
            </Suspense>
            <Footer />
        </>
    )
}

export default OtherProductDetailPage

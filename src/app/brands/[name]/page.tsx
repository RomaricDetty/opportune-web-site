"use client"
import React, { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { productsData, formatPrice } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { brandsData } from '@/components/Brands'

/**
 * Convertit un slug en nom de marque
 */
const slugToBrandName = (slug: string): string | null => {
    // Trouver la marque correspondante en comparant les slugs
    const brand = brandsData.find(b => {
        const brandSlug = b.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        return brandSlug === slug
    })
    return brand ? brand.name : null
}

/**
 * Page des produits d'une marque
 */
const BrandProductsPage = () => {
    const params = useParams()
    const router = useRouter()
    const brandSlug = params.name as string
    const brandName = slugToBrandName(brandSlug)

    // Si la marque n'existe pas
    if (!brandName) {
        return (
            <>
                <Navigation />
                <section className="pt-24 pb-20 min-h-screen bg-white">
                    <div className="container">
                        <div className="text-center py-12">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Marque introuvable
                            </h1>
                            <p className="text-gray-600 mb-8">
                                La marque que vous recherchez n'existe pas.
                            </p>
                            <Link
                                href="/#brands"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff6b35] text-white font-semibold rounded-lg transition-colors"
                            >
                                <IconifyIcon icon="lucide:arrow-left" className="h-5 w-5" />
                                Retour aux marques
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

    // Trouver les informations de la marque
    const brandInfo = brandsData.find(b => b.name === brandName)

    // Filtrer les produits par marque
    const brandProducts = useMemo(() => {
        return productsData.filter(p => p.brand === brandName)
    }, [brandName])

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-20 min-h-screen bg-white">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm">
                        <ol className="flex items-center gap-2 text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-[#ff6b35] transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                            <li>
                                <Link href="/#brands" className="hover:text-[#ff6b35] transition-colors">
                                    Marques
                                </Link>
                            </li>
                            <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                            <li className="text-gray-900 font-medium">{brandName}</li>
                        </ol>
                    </nav>

                    {/* En-tête de la marque */}
                    <div className="mb-12">
                        <div className={`${brandInfo?.imageBg || 'bg-gradient-to-br from-gray-100 to-gray-200'} rounded-2xl p-8 md:p-12 mb-8`}>
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                                    {brandName}
                                </h1>
                                {brandInfo?.description && (
                                    <p className="text-lg text-black/80 mb-6">
                                        {brandInfo.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Compteur de produits */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-900">{brandProducts.length}</span> produit{brandProducts.length > 1 ? 's' : ''} disponible{brandProducts.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    {/* Liste des produits */}
                    {brandProducts.length > 0 ? (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {brandProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode="grid"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <IconifyIcon 
                                icon="lucide:package-x" 
                                className="h-16 w-16 text-gray-400 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Aucun produit disponible
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Cette marque n'a pas encore de produits disponibles.
                            </p>
                            <Link
                                href="/#brands"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff6b35] text-white font-semibold rounded-lg transition-colors"
                            >
                                <IconifyIcon icon="lucide:arrow-left" className="h-5 w-5" />
                                Retour aux marques
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default BrandProductsPage

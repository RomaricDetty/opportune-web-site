"use client"
import React from 'react'
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import ProductCard from './ProductCard'
import type { Article } from '@/types/articles'
/**
 * Composant Product - Affiche une sélection de produits (max 10)
 */
const Product = ({category, products, idCategory}: {category?: string; products: Article[]; idCategory:any}) => {
    return (
        <section id="products" className="py-10">
            <div className="container">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 uppercase leading-tight">
                        {category}
                    </h2>
                    <Link
                        href={`/others?category=${category}&uid=${idCategory}`}
                        className="flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-3 bg-orange-50 hover:bg-orange-100 text-orange-500 font-semibold text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap"
                    >
                        Plus D'articles
                        <IconifyIcon icon="lucide:chevron-right" className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                </div>

                {/* Grille de produits */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 mt-12 md:mt-12">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bouton "Voir tous les produits" */}
                {/* <div className="flex justify-center mt-12">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        Voir tous les produits électroménager
                        <IconifyIcon
                            icon="lucide:arrow-right"
                            className="h-5 w-5"
                        />
                    </Link>
                </div> */}
            </div>
        </section>
    )
}

export default Product
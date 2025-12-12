"use client"
import React, { useMemo } from 'react'
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { productsData } from '@/data/products'
import ProductCard from './ProductCard'

/**
 * Composant Product - Affiche une sélection de produits (max 10)
 */
const Product = () => {
    // Prendre les 10 premiers produits
    const products = useMemo(() => {
        return productsData.slice(0, 10)
    }, [])

    return (
        <section id="products" className="py-20">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl/tight font-semibold text-black mt-4">
                        Découvrez nos produits
                    </h2>
                </div>

                {/* Grille de produits */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 mt-12 md:mt-16">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bouton "Voir tous les produits" */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        Voir tous les produits
                        <IconifyIcon
                            icon="lucide:arrow-right"
                            className="h-5 w-5"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Product
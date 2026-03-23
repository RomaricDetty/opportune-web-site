"use client"
import React, { useMemo } from 'react'
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { productsData } from '@/data/products'
import ProductCard from './ProductCard'
import Product from './Products'

/**
 * Composant Nouveaute - Affiche une sélection de produits (max 10)
 */
const Nouveaute = () => {
    // Prendre les 10 premiers produits
    const products = useMemo(() => {
        return productsData.slice(0, 6)
    }, [])

    return (
        <section id="products" className="py-20">
            <div className="container">
                <div className="max-w-2xl  text-start">
                    <h2 className="text-3xl  font-extrabold text-gray-900 mt-4">
                        Article récemment ajouté
                    </h2>
                    
                </div>
                {/* Grille de produits */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 mt-12 md:mt-16">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bouton "Voir tous les produits" */}
            </div>
        </section>
    )
}

export default Nouveaute
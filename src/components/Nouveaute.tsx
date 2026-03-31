"use client"
import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { articleService } from '@/services/articleService'
import type { Article } from '@/types/articles'

/**
 * Charge et affiche les dernieres nouveautes depuis l'API.
 */
const Nouveaute = () => {
    const [products, setProducts] = React.useState<Article[]>([])

    /**
     * Recupere les nouveautes produit.
     */
    const fetchLatestProducts = async () => {
        try {
            const response = await articleService.getAllHome()
            const groups = Array.isArray(response) ? response : [response]
            const flattenedProducts = groups.flatMap((item: any) => item?.produits || [])
            setProducts(flattenedProducts.slice(0, 6))
        } catch (error) {
            console.error('Error fetching latest products:', error)
            setProducts([])
        }
    }

    useEffect(() => {
        fetchLatestProducts()
    }, [])

    return (
        <section id="products" className="py-20">
            <div className="container">
                <div className="max-w-2xl text-start">
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-4">Article recemment ajoute</h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 mt-12 md:mt-16">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Nouveaute

"use client"
import React, { useState, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { productsData } from '@/data/products'
import ProductCard from '@/components/ProductCard'

type SortOption = 'popular' | 'cheapest'
type ViewMode = 'grid' | 'list'

/**
 * Page Products - Affiche tous les produits avec filtres avancés
 */
const ProductsPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [sortOption, setSortOption] = useState<SortOption>('popular')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')

    // Extraire toutes les catégories uniques
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(productsData.map(p => p.category)))
        return uniqueCategories.sort().map(cat => ({
            name: cat,
            count: productsData.filter(p => p.category === cat).length
        }))
    }, [])

    // Extraire toutes les marques uniques
    const brands = useMemo(() => {
        const uniqueBrands = Array.from(new Set(productsData.map(p => p.brand)))
        return uniqueBrands.sort().map(brand => ({
            name: brand,
            count: productsData.filter(p => p.brand === brand).length
        }))
    }, [])

    // Filtrer les produits
    const filteredProducts = useMemo(() => {
        let filtered = productsData

        // Filtre par catégories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category))
        }

        // Filtre par marques
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand))
        }

        // Filtre par ratings
        if (selectedRatings.length > 0) {
            filtered = filtered.filter(p => {
                return selectedRatings.some(rating => Math.floor(p.rating) === rating)
            })
        }

        // Tri
        if (sortOption === 'cheapest') {
            filtered = [...filtered].sort((a, b) => a.currentPrice - b.currentPrice)
        } else {
            // Popular (par défaut, tri par rating décroissant)
            filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        }

        return filtered
    }, [selectedCategories, selectedBrands, selectedRatings, sortOption])

    // Gérer les filtres appliqués
    const appliedFilters = useMemo(() => {
        const filters: Array<{ type: string; value: string; onRemove: () => void }> = []
        
        selectedCategories.forEach(cat => {
            filters.push({
                type: 'Catégorie',
                value: cat,
                onRemove: () => setSelectedCategories(prev => prev.filter(c => c !== cat))
            })
        })

        selectedBrands.forEach(brand => {
            filters.push({
                type: 'Marque',
                value: brand,
                onRemove: () => setSelectedBrands(prev => prev.filter(b => b !== brand))
            })
        })

        selectedRatings.forEach(rating => {
            filters.push({
                type: 'Note',
                value: `${rating} étoiles`,
                onRemove: () => setSelectedRatings(prev => prev.filter(r => r !== rating))
            })
        })

        return filters
    }, [selectedCategories, selectedBrands, selectedRatings])

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        )
    }

    const toggleRating = (rating: number) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        )
    }

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-8 min-h-screen bg-white">
                <div className="container">
                    {/* En-tête avec titre et options de vue */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Produits d'électroménager
                        </h1>
                        <div className="flex items-center gap-4">
                            {/* Options de vue */}
                            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1 bg-white">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                                        viewMode === 'grid'
                                            ? 'bg-[#ff6b35] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    aria-label="Vue grille"
                                >
                                    <IconifyIcon icon="lucide:grid" className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
                                        viewMode === 'list'
                                            ? 'bg-[#ff6b35] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    aria-label="Vue liste"
                                >
                                    <IconifyIcon icon="lucide:list" className="h-4 w-4" />
                                </button>
                            </div>
                            <span className="text-gray-700 font-medium text-sm">
                                {filteredProducts.length} Produit{filteredProducts.length > 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>

                    {/* Options de tri horizontales */}
                    <div className="mb-4 flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Trier par :</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sort"
                                value="popular"
                                checked={sortOption === 'popular'}
                                onChange={() => setSortOption('popular')}
                                className="w-4 h-4 text-[#ff6b35] focus:ring-[#ff6b35]"
                            />
                            <span className="text-sm text-gray-700">Plus populaires</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sort"
                                value="cheapest"
                                checked={sortOption === 'cheapest'}
                                onChange={() => setSortOption('cheapest')}
                                className="w-4 h-4 text-[#ff6b35] focus:ring-[#ff6b35]"
                            />
                            <span className="text-sm text-gray-700">Moins cher</span>
                        </label>
                    </div>

                    {/* Filtres appliqués */}
                    {appliedFilters.length > 0 && (
                        <div className="mb-6 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Filtres appliqués :</span>
                            {appliedFilters.map((filter, index) => (
                                <button
                                    key={index}
                                    onClick={filter.onRemove}
                                    className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors font-medium"
                                >
                                    {filter.value}
                                    <IconifyIcon icon="lucide:x" className="h-3 w-3" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-6">
                        {/* Sidebar de filtres */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                                {/* Catégories */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h3>
                                    <div className="space-y-3">
                                        {categories.map((cat) => (
                                            <label
                                                key={cat.name}
                                                className="flex items-center justify-between cursor-pointer hover:text-[#ff6b35] transition-colors group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat.name)}
                                                        onChange={() => toggleCategory(cat.name)}
                                                        className="w-4 h-4 text-[#ff6b35] rounded border-gray-300 focus:ring-[#ff6b35]"
                                                    />
                                                    <span className="text-sm text-gray-700 group-hover:text-[#ff6b35]">{cat.name}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">({cat.count})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Marques */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Marques</h3>
                                    <div className="space-y-3">
                                        {brands.map((brand) => (
                                            <label
                                                key={brand.name}
                                                className="flex items-center justify-between cursor-pointer hover:text-[#ff6b35] transition-colors group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrands.includes(brand.name)}
                                                        onChange={() => toggleBrand(brand.name)}
                                                        className="w-4 h-4 text-[#ff6b35] rounded border-gray-300 focus:ring-[#ff6b35]"
                                                    />
                                                    <span className="text-sm text-gray-700 group-hover:text-[#ff6b35]">{brand.name}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">({brand.count})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>

                        {/* Zone principale des produits */}
                        <main className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'
                                            : 'space-y-4'
                                    }
                                >
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            viewMode={viewMode}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                    <p className="text-gray-600 text-lg">
                                        Aucun produit trouvé avec ces filtres.
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ProductsPage

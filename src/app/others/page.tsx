"use client"
import React, { useState, useMemo, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ProductData, formatPrice } from '@/data/products'
import { otherProductsData } from '@/data/others'
import ProductCard from '@/components/ProductCard'

type SortOption = 'popular' | 'cheapest'
type ViewMode = 'grid' | 'list'

// Nombre de produits par page
const PRODUCTS_PER_PAGE = 12

/**
 * Page Others - Affiche tous les produits non-électroménagers avec filtres avancés
 */
const OthersPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])
    const [sortOption, setSortOption] = useState<SortOption>('popular')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
    
    // Référence pour le scroll vers le haut lors du changement de page
    const productsSectionRef = useRef<HTMLElement>(null)

    // Extraire toutes les catégories uniques
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(otherProductsData.map(p => p.category)))
        return uniqueCategories.sort().map(cat => ({
            name: cat,
            count: otherProductsData.filter(p => p.category === cat).length
        }))
    }, [])

    // Extraire toutes les marques uniques
    const brands = useMemo(() => {
        const uniqueBrands = Array.from(new Set(otherProductsData.map(p => p.brand)))
        return uniqueBrands.sort().map(brand => ({
            name: brand,
            count: otherProductsData.filter(p => p.brand === brand).length
        }))
    }, [])

    // Filtrer les produits
    const filteredProducts = useMemo(() => {
        let filtered = otherProductsData

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

    // Calculer la pagination
    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    }, [filteredProducts.length])

    // Produits de la page actuelle
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
        const endIndex = startIndex + PRODUCTS_PER_PAGE
        return filteredProducts.slice(startIndex, endIndex)
    }, [filteredProducts, currentPage])

    // Réinitialiser à la page 1 quand les filtres changent
    useEffect(() => {
        setCurrentPage(1)
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

    // Empêcher le scroll du body quand le drawer est ouvert
    useEffect(() => {
        if (isFiltersOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isFiltersOpen])

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

    /**
     * Génère les numéros de page à afficher
     */
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5 // Nombre maximum de pages visibles

        if (totalPages <= maxVisible) {
            // Afficher toutes les pages si le total est faible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Logique pour afficher les pages avec ellipses
            if (currentPage <= 3) {
                // Début : 1, 2, 3, 4, ..., dernière
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Fin : 1, ..., avant-dernière, dernière-1, dernière
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                // Milieu : 1, ..., page-1, page, page+1, ..., dernière
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    /**
     * Gère le changement de page avec scroll smooth vers le haut
     */
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
        
        // Scroll smooth vers le haut de la section des produits
        setTimeout(() => {
            if (productsSectionRef.current) {
                productsSectionRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                })
            } else {
                // Fallback : scroll vers le haut de la page
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                })
            }
        }, 100) // Petit délai pour laisser le temps au DOM de se mettre à jour
    }

    /**
     * Composant réutilisable pour afficher les filtres (catégories et marques)
     */
    const renderFilters = () => (
        <>
            {/* Catégories */}
            {categories.length > 0 && (
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
            )}

            {/* Marques */}
            {brands.length > 0 && (
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
            )}
        </>
    )

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-8 min-h-screen bg-white" ref={productsSectionRef}>
                <div className="container">
                    {/* En-tête avec titre et options de vue */}
                    <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Autres produits
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

                    {/* Options de tri horizontales avec bouton filtres mobile */}
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
                        {/* Bouton filtres mobile */}
                        {(categories.length > 0 || brands.length > 0) && (
                            <button
                                onClick={() => setIsFiltersOpen(true)}
                                className="lg:hidden ml-auto flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff6b35] transition-colors font-medium text-sm"
                                aria-label="Ouvrir les filtres"
                            >
                                <IconifyIcon icon="lucide:filter" className="h-4 w-4" />
                                Filtres
                                {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                                    <span className="bg-white text-[#ff6b35] rounded-full px-2 py-0.5 text-xs font-bold">
                                        {selectedCategories.length + selectedBrands.length}
                                    </span>
                                )}
                            </button>
                        )}
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
                        {/* Sidebar de filtres desktop */}
                        {categories.length > 0 || brands.length > 0 ? (
                            <aside className="hidden lg:block w-64 flex-shrink-0">
                                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                                    {renderFilters()}
                                </div>
                            </aside>
                        ) : null}

                        {/* Zone principale des produits */}
                        <main className="flex-1">
                            {filteredProducts.length > 0 ? (
                                <>
                                    <div
                                        className={
                                            viewMode === 'grid'
                                                ? 'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-8'
                                                : 'space-y-4 mb-8'
                                        }
                                    >
                                        {paginatedProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                viewMode={viewMode}
                                                productType="other"
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                                            {/* Info pagination */}
                                            <div className="text-sm text-gray-600">
                                                Affichage de {(currentPage - 1) * PRODUCTS_PER_PAGE + 1} à {Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} sur {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                                            </div>

                                            {/* Contrôles de pagination */}
                                            <div className="flex items-center gap-2">
                                                {/* Bouton Précédent */}
                                                <button
                                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                                                        currentPage === 1
                                                            ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50'
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#ff6b35] hover:text-[#ff6b35]'
                                                    }`}
                                                    aria-label="Page précédente"
                                                >
                                                    <IconifyIcon icon="lucide:chevron-left" className="h-4 w-4" />
                                                </button>

                                                {/* Numéros de page */}
                                                <div className="flex items-center gap-1">
                                                    {getPageNumbers().map((page, index) => (
                                                        page === '...' ? (
                                                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                                                ...
                                                            </span>
                                                        ) : (
                                                            <button
                                                                key={page}
                                                                onClick={() => handlePageChange(page as number)}
                                                                className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium min-w-[40px] ${
                                                                    currentPage === page
                                                                        ? 'bg-[#ff6b35] text-white border-[#ff6b35]'
                                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#ff6b35] hover:text-[#ff6b35]'
                                                                }`}
                                                                aria-label={`Page ${page}`}
                                                                aria-current={currentPage === page ? 'page' : undefined}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    ))}
                                                </div>

                                                {/* Bouton Suivant */}
                                                <button
                                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                                                        currentPage === totalPages
                                                            ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50'
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#ff6b35] hover:text-[#ff6b35]'
                                                    }`}
                                                    aria-label="Page suivante"
                                                >
                                                    <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                    <IconifyIcon icon="lucide:package" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg mb-2">
                                        Aucun produit disponible pour le moment
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Les produits non-électroménagers seront bientôt disponibles
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* Drawer de filtres mobile */}
            {isFiltersOpen && (categories.length > 0 || brands.length > 0) && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsFiltersOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="pt-24 fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden shadow-xl overflow-y-auto">
                        <div className="p-6">
                            {/* En-tête du drawer */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
                                <button
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Fermer les filtres"
                                >
                                    <IconifyIcon icon="lucide:x" className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                            {/* Contenu des filtres */}
                            <div className="bg-white">
                                {renderFilters()}
                            </div>
                            {/* Bouton appliquer */}
                            <div className="sticky bottom-0 bg-white pt-4 pb-6 border-t border-gray-200 mt-6">
                                <button
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="w-full bg-[#ff6b35] text-white py-3 px-6 rounded-lg hover:bg-[#ff6b35] transition-colors font-semibold"
                                >
                                    Appliquer les filtres
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </>
    )
}

export default OthersPage

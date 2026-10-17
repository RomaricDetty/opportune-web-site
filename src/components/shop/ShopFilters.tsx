'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { marqueService, type MarqueItem } from '@/services/marqueService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Surface from '@/components/ui/Surface'

/**
 * Filtres catalogue (marque, prix, stock, tri).
 */
export default function ShopFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [marques, setMarques] = useState<MarqueItem[]>([])
    const [idMarque, setIdMarque] = useState(searchParams.get('marque') || '')
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [inStock, setInStock] = useState(searchParams.get('inStock') === '1')
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

    useEffect(() => {
        marqueService.getAll().then(setMarques).catch(() => setMarques([]))
    }, [])

    useEffect(() => {
        setIdMarque(searchParams.get('marque') || '')
        setMinPrice(searchParams.get('minPrice') || '')
        setMaxPrice(searchParams.get('maxPrice') || '')
        setInStock(searchParams.get('inStock') === '1')
        setSort(searchParams.get('sort') || 'newest')
    }, [searchParams])

    /**
     * Applique les filtres dans l’URL (page remise à 1).
     * @param e
     */
    const apply = (e?: FormEvent) => {
        e?.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        params.delete('page')
        if (idMarque) params.set('marque', idMarque)
        else params.delete('marque')
        if (minPrice) params.set('minPrice', minPrice)
        else params.delete('minPrice')
        if (maxPrice) params.set('maxPrice', maxPrice)
        else params.delete('maxPrice')
        if (inStock) params.set('inStock', '1')
        else params.delete('inStock')
        if (sort && sort !== 'newest') params.set('sort', sort)
        else params.delete('sort')
        const qs = params.toString()
        router.push(qs ? `/shop?${qs}` : '/shop')
    }

    /**
     * Réinitialise les filtres (garde catégorie / recherche).
     */
    const reset = () => {
        const params = new URLSearchParams()
        const q = searchParams.get('q')
        const siteCategory = searchParams.get('siteCategory')
        const category = searchParams.get('category')
        if (q) params.set('q', q)
        if (siteCategory) params.set('siteCategory', siteCategory)
        if (category) params.set('category', category)
        const qs = params.toString()
        router.push(qs ? `/shop?${qs}` : '/shop')
    }

    return (
        <Surface padding="sm" className="mb-5">
            <form onSubmit={apply}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <Select
                        label="Marque"
                        value={idMarque}
                        onChange={(e) => setIdMarque(e.target.value)}
                    >
                        <option value="">Toutes</option>
                        {marques.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.libelle}
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Prix min (FCFA)"
                        type="number"
                        min={0}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                    />

                    <Input
                        label="Prix max (FCFA)"
                        type="number"
                        min={0}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="—"
                    />

                    <Select
                        label="Trier par"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="newest">Nouveautés</option>
                        <option value="price_asc">Prix croissant</option>
                        <option value="price_desc">Prix décroissant</option>
                        <option value="name_asc">Nom A → Z</option>
                    </Select>

                    <div className="flex flex-col justify-end gap-2">
                        <label className="inline-flex items-center gap-2 text-sm text-secondary cursor-pointer font-dm">
                            <input
                                type="checkbox"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            En stock uniquement
                        </label>
                        <div className="flex gap-2">
                            <Button type="submit" size="sm" className="flex-1 rounded-xl">
                                Appliquer
                            </Button>
                            <Button type="button" variant="secondary" size="sm" onClick={reset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Surface>
    )
}

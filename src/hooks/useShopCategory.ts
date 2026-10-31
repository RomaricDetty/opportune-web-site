'use client'

import { useEffect, useState } from 'react'
import { CartegoryService } from '@/services/categoryService'
import type { Category } from '@/types/articles'

/**
 * Charge une catégorie et son rayon à partir de son id.
 * @param categoryId Id de la catégorie, vide s'il n'y en a pas
 * @returns La catégorie, `undefined` pendant le chargement, `null` si absente ou introuvable
 */
export function useShopCategory(categoryId: string): Category | null | undefined {
    const [loaded, setLoaded] = useState<{ id: string; category: Category | null } | null>(null)

    useEffect(() => {
        if (!categoryId) return
        let cancelled = false
        CartegoryService.getById(categoryId)
            .then((category) => {
                if (!cancelled) setLoaded({ id: categoryId, category })
            })
            .catch(() => {
                if (!cancelled) setLoaded({ id: categoryId, category: null })
            })
        return () => {
            cancelled = true
        }
    }, [categoryId])

    if (!categoryId) return null
    return loaded?.id === categoryId ? loaded.category : undefined
}

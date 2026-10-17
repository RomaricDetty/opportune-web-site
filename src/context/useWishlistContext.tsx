'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import { wishlistService, type WishlistItem } from '@/services/wishlistService'
import { useAuthContext } from './useAuthContext'

interface WishlistContextType {
    items: WishlistItem[]
    loading: boolean
    count: number
    isFavorite: (productId: string) => boolean
    toggleFavorite: (productId: string) => Promise<void>
    refresh: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

/**
 * Hook d'accès aux favoris.
 */
export function useWishlistContext() {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlistContext must be used within WishlistProvider')
    }
    return context
}

/**
 * Provider favoris (nécessite un compte client).
 */
export function WishlistProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuthContext()
    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(false)

    const refresh = useCallback(async () => {
        if (!isAuthenticated) {
            setItems([])
            return
        }
        setLoading(true)
        try {
            const data = await wishlistService.getAll()
            setItems(Array.isArray(data) ? data : [])
        } catch {
            setItems([])
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    useEffect(() => {
        refresh()
    }, [refresh])

    const isFavorite = (productId: string) =>
        items.some((item) => item.idProduit === productId || item.produit?.id === productId)

    /**
     * Ajoute ou retire un produit des favoris.
     */
    const toggleFavorite = async (productId: string) => {
        if (!isAuthenticated) {
            throw new Error('AUTH_REQUIRED')
        }
        if (isFavorite(productId)) {
            await wishlistService.remove(productId)
        } else {
            await wishlistService.add(productId)
        }
        await refresh()
    }

    const value = useMemo(
        () => ({
            items,
            loading,
            count: items.length,
            isFavorite,
            toggleFavorite,
            refresh,
        }),
        [items, loading, refresh]
    )

    return (
        <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
    )
}

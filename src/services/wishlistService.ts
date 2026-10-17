import axiosInstance from '../lib/axios'
import type { Article } from '../types/articles'

export interface WishlistItem {
    id: string
    idProduit: string
    produit: Article
}

/**
 * Service favoris client
 */
export const wishlistService = {
    /**
     * Liste les favoris du client.
     */
    getAll: async (): Promise<WishlistItem[]> => {
        const { data } = await axiosInstance.get<{ success: boolean; data: WishlistItem[] }>('/wishlist')
        return data.data
    },

    /**
     * Ajoute un produit aux favoris.
     */
    add: async (idProduit: string) => {
        const { data } = await axiosInstance.post('/wishlist', { idProduit })
        return data
    },

    /**
     * Retire un produit des favoris.
     */
    remove: async (idProduit: string) => {
        const { data } = await axiosInstance.delete(`/wishlist/${idProduit}`)
        return data
    },
}

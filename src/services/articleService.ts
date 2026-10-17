import axiosInstance from '../lib/axios'
import { Article } from '../types/articles'

const ARTICLES = '/products'

export interface ProductsPagination {
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ProductsListResult {
    data: Article[]
    pagination: ProductsPagination | null
}

export type ProductListParams = {
    page?: number
    limit?: number
    idCategory?: string
    idSiteCategory?: string
    idMarque?: string
    libelle?: string
    minPrice?: string | number
    maxPrice?: string | number
    isAvailable?: boolean | string
    sort?: string
}

/**
 * Service catalogue produits.
 */
export const articleService = {
    /**
     * Produits page d’accueil (groupés).
     */
    getAllHome: async (): Promise<Article> => {
        const { data } = await axiosInstance.get<any>(`${ARTICLES}/home`)
        return data.data
    },

    /**
     * Liste complète (sans pagination forcée).
     */
    getAll: async (): Promise<Article[]> => {
        const { data } = await axiosInstance.get<any>(ARTICLES)
        return Array.isArray(data.data) ? data.data : []
    },

    /**
     * Liste filtrée / paginée.
     * @param params
     */
    list: async (params: ProductListParams = {}): Promise<ProductsListResult> => {
        const { data } = await axiosInstance.get<any>(ARTICLES, { params })
        return {
            data: Array.isArray(data?.data) ? data.data : [],
            pagination: data?.pagination || null,
        }
    },

    /**
     * Détail produit.
     * @param id
     */
    getById: async (id: string): Promise<Article> => {
        const { data } = await axiosInstance.get<any>(`${ARTICLES}/${id}`)
        return data.data
    },

    /**
     * Filtre simple (rétrocompat).
     * @param params
     * @param value
     */
    getByParams: async (params: string, value: string): Promise<Article[]> => {
        const { data } = await axiosInstance.get<any>(`${ARTICLES}?${params}=${value}`)
        return Array.isArray(data.data) ? data.data : []
    },

    /**
     * Incrémente les vues.
     * @param id
     */
    updateViews: async (id: string): Promise<void> => {
        await axiosInstance.patch(`${ARTICLES}/${id}/views`)
    },
}

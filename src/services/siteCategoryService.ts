import axiosInstance from '../lib/axios'

export interface SiteCategory {
    id: string
    libelle: string
    description?: string | null
    isActive?: boolean
}

/**
 * Service des catégories principales (site-categories).
 */
export const siteCategoryService = {
    /**
     * Liste les catégories principales actives.
     */
    getAll: async (): Promise<SiteCategory[]> => {
        const { data } = await axiosInstance.get('/site-categories', {
            params: { isActive: true, limit: 50, page: 1 },
        })
        return Array.isArray(data?.data) ? data.data : []
    },

    /**
     * Détail d’une catégorie principale.
     * @param id
     */
    getById: async (id: string): Promise<SiteCategory | null> => {
        const { data } = await axiosInstance.get(`/site-categories/${id}`)
        return data?.data ?? null
    },
}

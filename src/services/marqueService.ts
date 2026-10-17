import axiosInstance from '../lib/axios'

export interface MarqueItem {
    id: string
    libelle: string
}

/**
 * Service marques (filtre boutique).
 */
export const marqueService = {
    /**
     * Liste les marques actives.
     */
    getAll: async (): Promise<MarqueItem[]> => {
        const { data } = await axiosInstance.get('/brands', {
            params: { isActive: true, limit: 100 },
        })
        return Array.isArray(data?.data) ? data.data : []
    },
}

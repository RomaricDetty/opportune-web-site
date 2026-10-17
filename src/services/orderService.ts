import axiosInstance from '../lib/axios'

export interface OrderPayload {
    items: { idProduit: string; quantite: number }[]
    adresseLivraison: string
    villeLivraison: string
    telephoneLivraison: string
    modePaiement?: 'cash_on_delivery' | 'mobile_money' | 'bank_transfer'
    notes?: string
}

/**
 * Service commandes client
 */
export const orderService = {
    /**
     * Crée une commande.
     */
    create: async (payload: OrderPayload) => {
        const { data } = await axiosInstance.post('/orders', payload)
        return data
    },

    /**
     * Liste les commandes du client.
     */
    getMine: async () => {
        const { data } = await axiosInstance.get('/orders/me')
        return data.data
    },

    /**
     * Détail d'une commande.
     */
    getById: async (id: string) => {
        const { data } = await axiosInstance.get(`/orders/${id}`)
        return data.data
    },
}

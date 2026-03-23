// services/demandeDevisService.ts
import axiosInstance from '../lib/axios'

const DEMANDE_DEVIS = '/demande-devis'

export const demandeDevisService = {
    create: async (payload: {
        nomClient: string
        prenomClient?: string
        telephone: string
        email?: string | null
        adresse?: string | null
        message?: string | null
        items: { idProduit: string; quantite: number }[]
    }) => {
        const { data } = await axiosInstance.post(`${DEMANDE_DEVIS}`, payload)
        return data
    }
}
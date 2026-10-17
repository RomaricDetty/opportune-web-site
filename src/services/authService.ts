import axiosInstance from '../lib/axios'

export interface ClientProfile {
    id: string
    email: string
    nom: string
    prenom: string
    telephone: string
    adresse?: string | null
    ville?: string | null
    isActive: boolean
}

interface AuthResponse {
    success: boolean
    message?: string
    data: {
        token: string
        client: ClientProfile
    }
}

/**
 * Service d'authentification client
 */
export const authService = {
    /**
     * Inscrit un nouveau client.
     */
    register: async (payload: {
        email: string
        password: string
        nom: string
        prenom: string
        telephone: string
        adresse?: string
        ville?: string
    }) => {
        const { data } = await axiosInstance.post<AuthResponse>('/clients/register', payload)
        return data
    },

    /**
     * Connecte un client.
     */
    login: async (payload: { email: string; password: string }) => {
        const { data } = await axiosInstance.post<AuthResponse>('/clients/login', payload)
        return data
    },

    /**
     * Récupère le profil du client connecté.
     */
    me: async () => {
        const { data } = await axiosInstance.get<{ success: boolean; data: ClientProfile }>('/clients/me')
        return data.data
    },

    /**
     * Met à jour le profil client.
     */
    updateProfile: async (payload: Partial<ClientProfile> & { password?: string }) => {
        const { data } = await axiosInstance.put<{ success: boolean; data: ClientProfile }>('/clients/me', payload)
        return data.data
    },
}

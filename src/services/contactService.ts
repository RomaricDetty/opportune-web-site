import axiosInstance from '../lib/axios'

const CONTACT = '/contact'

/**
 * Service formulaire de contact.
 */
export const contactService = {
    /**
     * Enregistre un message de contact en base.
     * @param payload
     */
    create: async (payload: {
        nom: string
        email: string
        telephone: string
        message: string
    }) => {
        const { data } = await axiosInstance.post(CONTACT, payload)
        return data
    },
}

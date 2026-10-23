/** Coordonnées boutique (CTA WhatsApp / appel). */
export const STORE_PHONE_DISPLAY = '(+225) 05 03 033 689'
export const STORE_PHONE_TEL = '+2250503033689'
export const STORE_WHATSAPP = '2250503033689'

/**
 * Lien WhatsApp prérempli.
 * @param message
 */
export function whatsappUrl(message: string): string {
    return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`
}

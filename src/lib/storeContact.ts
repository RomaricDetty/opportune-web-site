/** Coordonnées boutique (CTA WhatsApp / appel). */
export const STORE_PHONE_DISPLAY = '(+225) 07 58 08 58 54'
export const STORE_PHONE_TEL = '+2250758085854'
export const STORE_WHATSAPP = '2250758085854'

/**
 * Lien WhatsApp prérempli.
 * @param message
 */
export function whatsappUrl(message: string): string {
    return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`
}

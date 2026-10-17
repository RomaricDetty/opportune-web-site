/**
 * Formate un montant en XOF (FCFA).
 * @param amount - Montant en FCFA
 * @returns Exemple : "1 259 900 FCFA"
 */
export function formatXof(amount?: number | string | null): string {
    const value = Math.round(Number(amount) || 0)
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`
}

/**
 * Calcule le prix après remise.
 * @param prix - Prix de base
 * @param remise - Remise en %
 * @returns Prix final arrondi
 */
export function priceAfterDiscount(prix?: number | null, remise?: number | null): number {
    const base = Number(prix) || 0
    const discount = Math.min(Math.max(Number(remise) || 0, 0), 100)
    return Math.round(base * (1 - discount / 100))
}

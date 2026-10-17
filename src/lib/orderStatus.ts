/** Statuts commande (affichage client). */
export const ORDER_STATUS: Record<string, { label: string; step: number }> = {
    pending: { label: 'En attente', step: 1 },
    confirmed: { label: 'Confirmée', step: 2 },
    processing: { label: 'En préparation', step: 3 },
    shipped: { label: 'Expédiée', step: 4 },
    delivered: { label: 'Livrée', step: 5 },
    cancelled: { label: 'Annulée', step: 0 },
}

export const ORDER_STEPS = [
    'En attente',
    'Confirmée',
    'En préparation',
    'Expédiée',
    'Livrée',
]

/**
 * Libellé français d’un statut.
 * @param statut
 */
export function orderStatusLabel(statut?: string): string {
    if (!statut) return '—'
    return ORDER_STATUS[statut]?.label || statut
}

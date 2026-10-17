/**
 * Met à jour un slot de hauteur UI bas de page (barre fixe).
 * @param slot Identifiant (cta)
 * @param px Hauteur en pixels (0 pour libérer)
 */
export function setShopBottomUi(slot: 'cta', px: number) {
    if (typeof document === 'undefined') return
    document.documentElement.style.setProperty(
        `--shop-bottom-${slot}`,
        `${Math.max(0, Math.round(px))}px`,
    )
}

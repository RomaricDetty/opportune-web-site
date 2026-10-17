/**
 * Mapping Lucide (outline) → Solar Bold (plein) pour un rendu uniforme.
 */
const LUCIDE_TO_SOLAR_BOLD: Record<string, string> = {
    'alert-circle': 'danger-circle-bold',
    'arrow-left': 'arrow-left-bold',
    'arrow-right': 'arrow-right-bold',
    check: 'check-read-bold',
    'check-circle': 'check-circle-bold',
    'check-circle-2': 'check-circle-bold',
    'chevron-down': 'alt-arrow-down-bold',
    'chevron-left': 'alt-arrow-left-bold',
    'chevron-right': 'alt-arrow-right-bold',
    'chevron-up': 'alt-arrow-up-bold',
    'circle-alert': 'danger-circle-bold',
    clock: 'clock-circle-bold',
    'download-cloud': 'cloud-download-bold',
    'file-text': 'document-text-bold',
    filter: 'filter-bold',
    grid: 'widget-4-bold',
    headphones: 'headphones-round-bold',
    headset: 'headphones-round-sound-bold',
    heart: 'heart-bold',
    image: 'gallery-bold',
    'image-off': 'gallery-remove-bold',
    info: 'info-circle-bold',
    laptop: 'laptop-bold',
    'layers-2': 'layers-bold',
    'layout-grid': 'widget-4-bold',
    'layout-list': 'list-bold',
    list: 'list-bold',
    loader: 'refresh-bold',
    'loader-2': 'refresh-bold',
    lock: 'lock-bold',
    'log-out': 'logout-2-bold',
    mail: 'letter-bold',
    'map-pin': 'map-point-bold',
    menu: 'hamburger-menu-bold',
    'message-circle': 'chat-round-bold',
    minus: 'minus-circle-bold',
    'move-right': 'arrow-right-bold',
    package: 'box-bold',
    'package-open': 'box-bold',
    phone: 'phone-bold',
    'phone-call': 'phone-calling-bold',
    plus: 'add-circle-bold',
    refrigerator: 'fridge-bold',
    rocket: 'rocket-bold',
    search: 'magnifer-bold',
    'search-x': 'magnifer-zoom-out-bold',
    send: 'plain-bold',
    'shield-check': 'shield-check-bold',
    'shopping-cart': 'cart-large-2-bold',
    smartphone: 'smartphone-bold',
    star: 'star-bold',
    'star-half': 'star-bold',
    tag: 'tag-bold',
    'trash-2': 'trash-bin-trash-bold',
    truck: 'delivery-bold',
    tv: 'tv-bold',
    user: 'user-bold',
    wallet: 'wallet-bold',
    wrench: 'settings-bold',
    settings: 'settings-bold',
    plug: 'plug-circle-bold',
    x: 'close-circle-bold',
    'x-circle': 'close-circle-bold',
}

/**
 * Résout une icône vers Solar Bold (fond plein) si Lucide est fourni.
 * @param icon Nom Iconify (ex. lucide:heart)
 */
export function resolveShopIcon(icon: string): string {
    if (!icon) return 'solar:box-bold'

    if (icon.startsWith('solar:')) return icon

    if (icon.startsWith('lucide:')) {
        const name = icon.slice('lucide:'.length)
        const mapped = LUCIDE_TO_SOLAR_BOLD[name]
        if (mapped) return `solar:${mapped}`
        return `solar:${name}-bold`
    }

    return icon
}

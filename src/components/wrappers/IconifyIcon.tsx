import { Icon, type IconProps } from '@iconify/react'
import { resolveShopIcon } from '@/lib/shopIcons'

/**
 * Icône boutique unifiée (Solar Bold / fond plein).
 * Les `lucide:*` sont automatiquement convertis.
 */
const IconifyIcon = ({ icon, ...props }: IconProps) => {
    const resolved = typeof icon === 'string' ? resolveShopIcon(icon) : icon
    return <Icon icon={resolved} {...props} />
}

export default IconifyIcon

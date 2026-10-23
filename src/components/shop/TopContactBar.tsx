import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SocialLinks from '@/components/shop/SocialLinks'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL, whatsappUrl } from '@/lib/storeContact'

/**
 * Bandeau contact discret au-dessus du header.
 */
export default function TopContactBar() {
    return (
        <div className="bg-secondary text-white/80 text-xs font-dm">
            <div className="container flex items-center justify-between gap-3 py-2">
                <p className="hidden sm:block truncate">
                    Électroménager & high-tech · Prix en FCFA
                </p>
                <p className="sm:hidden truncate">Electro Store.ci</p>
                <div className="flex items-center gap-3 shrink-0">
                    <a
                        href={`tel:${STORE_PHONE_TEL}`}
                        className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                        <IconifyIcon icon="lucide:phone" className="h-3.5 w-3.5 text-primary" />
                        <span>{STORE_PHONE_DISPLAY}</span>
                    </a>
                    <a
                        href={whatsappUrl('Bonjour Electro Store')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                        <IconifyIcon icon="lucide:message-circle" className="h-3.5 w-3.5 text-primary" />
                        <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                    <SocialLinks variant="dark" className="hidden sm:flex" />
                </div>
            </div>
        </div>
    )
}

'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useStoreSettings } from '@/context/useStoreSettingsContext'
import { getSocialNetworks } from '@/lib/socialNetworks'

type SocialLinksProps = {
    /** Variante visuelle : barre sombre (header) ou fond clair (footer). */
    variant?: 'light' | 'dark'
    className?: string
}

/**
 * Logos des réseaux sociaux — toujours visibles.
 * La redirection n’est active que si un lien valide est configuré.
 */
export default function SocialLinks({ variant = 'light', className = '' }: SocialLinksProps) {
    const { socials } = useStoreSettings()
    const networks = getSocialNetworks(socials)

    const baseClass =
        variant === 'dark'
            ? 'inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors'
            : 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-secondary/70 transition-colors'

    const activeClass =
        variant === 'dark'
            ? `${baseClass} hover:bg-primary hover:text-white`
            : `${baseClass} hover:border-primary hover:text-primary hover:bg-primary/5`

    const idleClass = `${baseClass} opacity-50 cursor-default`

    return (
        <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
            {networks.map((network) => (
                <li key={network.key}>
                    {network.href ? (
                        <a
                            href={network.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={network.label}
                            title={network.label}
                            className={activeClass}
                        >
                            <IconifyIcon icon={network.icon} className="h-3.5 w-3.5" />
                        </a>
                    ) : (
                        <span
                            aria-label={network.label}
                            title={`${network.label} — lien non configuré`}
                            className={idleClass}
                        >
                            <IconifyIcon icon={network.icon} className="h-3.5 w-3.5" />
                        </span>
                    )}
                </li>
            ))}
        </ul>
    )
}

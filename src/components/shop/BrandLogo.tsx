'use client'

import Link from 'next/link'
import { useStoreSettings } from '@/context/useStoreSettingsContext'

interface BrandLogoProps {
    /** Hauteur du logo en pixels */
    height?: number
    className?: string
}

/**
 * Logo boutique (paramétrable depuis le back-office, sinon logo thème).
 */
export default function BrandLogo({ height = 48, className = '' }: BrandLogoProps) {
    const { logoUrl, siteName } = useStoreSettings()
    const width = Math.round(height * (388 / 190))

    return (
        <Link
            href="/"
            className={`inline-flex items-center shrink-0 ${className}`}
            aria-label={`Accueil ${siteName}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={logoUrl}
                alt={siteName}
                width={width}
                height={height}
                className="h-auto w-auto object-contain"
                style={{ maxHeight: height }}
                decoding="async"
            />
        </Link>
    )
}

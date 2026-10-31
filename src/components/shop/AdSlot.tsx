'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { adHref, getAdImage, type ShopPublicite } from '@/lib/adSlots'
import { optimizeProductImage, PRODUCT_IMAGE_PLACEHOLDER } from '@/lib/productImage'
import AdPlaceholder from './AdPlaceholder'

/** Durée d'affichage de chaque pub quand plusieurs partagent un emplacement. */
const ROTATION_MS = 6000

interface AdSlotProps {
    ads: ShopPublicite[]
    /** Encart intégré à une colonne, sans la marge de section pleine largeur. */
    embedded?: boolean
}

/**
 * Encart pub (accueil, fiche produit) : visuel ou placeholder si aucune pub.
 */
export default function AdSlot({ ads, embedded = false }: AdSlotProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(0)
        if (ads.length <= 1) return
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % ads.length), ROTATION_MS)
        return () => clearInterval(timer)
    }, [ads.length])

    const ad = ads[index] ?? ads[0]
    const sectionClass = embedded ? 'mt-6' : 'container py-6 md:py-8'
    const image = ad ? getAdImage(ad.images) : null

    if (!ad || !image) {
        return (
            <section className={sectionClass}>
                <AdPlaceholder variant="banner" compact={embedded} />
            </section>
        )
    }

    const href = adHref(ad)
    const src = optimizeProductImage(image, 1100) || PRODUCT_IMAGE_PLACEHOLDER

    return (
        <section className={sectionClass}>
            <Link
                href={href}
                className="group relative block overflow-hidden rounded-2xl min-h-[160px] md:min-h-[200px]"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={ad.libelle}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={(e) => {
                        e.currentTarget.src = PRODUCT_IMAGE_PLACEHOLDER
                    }}
                />
                <div className="absolute inset-0 bg-secondary/55" />
                <div className="relative z-10 flex min-h-[160px] md:min-h-[200px] items-end p-5 md:p-7">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Publicité
                        </p>
                        <p className="mt-1 text-xl font-bold text-white md:text-2xl">{ad.libelle}</p>
                        {ad.description && (
                            <p className="mt-1 max-w-xl text-sm text-white/75 line-clamp-2">
                                {ad.description}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </section>
    )
}

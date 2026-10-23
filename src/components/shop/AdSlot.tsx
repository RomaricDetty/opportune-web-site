'use client'

import Link from 'next/link'
import { adHref, getAdImage, type ShopPublicite } from '@/lib/adSlots'
import { optimizeProductImage, PRODUCT_IMAGE_PLACEHOLDER } from '@/lib/productImage'
import AdPlaceholder from './AdPlaceholder'

interface AdSlotProps {
    ads: ShopPublicite[]
}

/**
 * Encart pub milieu / bas : visuel ou placeholder si aucune pub.
 */
export default function AdSlot({ ads }: AdSlotProps) {
    const ad = ads[0]
    const image = ad ? getAdImage(ad.images) : null

    if (!ad || !image) {
        return (
            <section className="container py-6 md:py-8">
                <AdPlaceholder variant="banner" />
            </section>
        )
    }

    const href = adHref(ad)
    const src = optimizeProductImage(image, 1100) || PRODUCT_IMAGE_PLACEHOLDER

    return (
        <section className="container py-6 md:py-8">
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

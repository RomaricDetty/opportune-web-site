'use client'

import { useState } from 'react'
import {
    optimizeProductImage,
    PRODUCT_IMAGE_PLACEHOLDER,
} from '@/lib/productImage'
import { cn } from '@/lib/cn'

type ProductImageProps = {
    src?: string | null
    alt: string
    /** Largeur cible pour Unsplash (px). */
    width?: number
    className?: string
    /** Chargement prioritaire (au-dessus de la ligne de flottaison). */
    priority?: boolean
}

/**
 * Image produit avec optimisation Unsplash, lazy-load et fallback.
 */
export default function ProductImage({
    src,
    alt,
    width = 480,
    className,
    priority = false,
}: ProductImageProps) {
    const [failed, setFailed] = useState(false)
    const optimized = optimizeProductImage(src, width)
    const showPlaceholder = !optimized || failed

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={showPlaceholder ? PRODUCT_IMAGE_PLACEHOLDER : optimized}
            alt={alt}
            width={width}
            height={width}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className={cn(
                'bg-[#f3f4f6]',
                showPlaceholder && 'object-contain p-6 opacity-70',
                className,
            )}
            onError={() => setFailed(true)}
        />
    )
}

'use client'

import { useCallback, useRef, useState, type TouchEvent } from 'react'
import ProductImage from '@/components/shop/ProductImage'
import { cn } from '@/lib/cn'

type ProductGalleryProps = {
    images: string[]
    alt: string
}

/**
 * Galerie produit : crossfade + swipe mobile.
 */
export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const list = images.length ? images : ['']
    const [index, setIndex] = useState(0)
    const touchX = useRef<number | null>(null)

    const go = useCallback(
        (next: number) => {
            const len = list.length
            setIndex(((next % len) + len) % len)
        },
        [list.length],
    )

    /**
     * Début du geste swipe.
     */
    const onTouchStart = (e: TouchEvent) => {
        touchX.current = e.touches[0]?.clientX ?? null
    }

    /**
     * Fin du geste swipe (seuil 40px).
     */
    const onTouchEnd = (e: TouchEvent) => {
        if (touchX.current == null || list.length < 2) return
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
        touchX.current = null
        if (Math.abs(dx) < 40) return
        go(index + (dx < 0 ? 1 : -1))
    }

    return (
        <div>
            <div
                className="relative aspect-square bg-white border border-gray-100 rounded-2xl overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {list.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className={cn(
                            'absolute inset-0 flex items-center justify-center p-6 md:p-10 transition-opacity duration-300 ease-out',
                            i === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none',
                        )}
                    >
                        <ProductImage
                            src={src}
                            alt={alt}
                            width={720}
                            priority={i === 0}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                ))}
                {list.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] flex gap-1.5 md:hidden">
                        {list.map((_, i) => (
                            <span
                                key={i}
                                className={cn(
                                    'h-1.5 rounded-full transition-all',
                                    i === index ? 'w-5 bg-primary' : 'w-1.5 bg-gray-300',
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            {list.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {list.map((src, i) => (
                        <button
                            key={`${src}-thumb-${i}`}
                            type="button"
                            onClick={() => setIndex(i)}
                            className={cn(
                                'h-16 w-16 shrink-0 rounded-xl border overflow-hidden bg-white p-1.5 transition-all',
                                i === index
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-gray-200 hover:border-gray-300',
                            )}
                        >
                            <ProductImage
                                src={src}
                                alt=""
                                width={128}
                                className="h-full w-full object-contain"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

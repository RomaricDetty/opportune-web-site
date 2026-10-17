'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import axiosInstance from '@/lib/axios'
import {
    optimizeProductImage,
    PRODUCT_IMAGE_PLACEHOLDER,
} from '@/lib/productImage'

interface Publicite {
    id: string
    libelle: string
    description: string | null
    images: string | null
    idCategory: string | null
    idProduit: string | null
}

/**
 * Extrait la première image d'une publicité.
 * @param images
 */
function getFirstImage(images: string | null): string | null {
    if (!images) return null
    try {
        const parsed = typeof images === 'string' ? JSON.parse(images) : images
        return Array.isArray(parsed) && parsed[0] ? parsed[0] : null
    } catch {
        return null
    }
}

/**
 * Carousel hero des publicités — plein cadre, marque visible.
 */
export default function HeroBanner() {
    const [slides, setSlides] = useState<Publicite[]>([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        axiosInstance
            .get('/publicites')
            .then((res) => {
                const data = res.data?.data
                const list = Array.isArray(data)
                    ? data
                    : [
                          ...(data?.publicites_articles || []),
                          ...(data?.publicites_categories || []),
                      ]
                setSlides(list.filter((p: Publicite) => getFirstImage(p.images)))
            })
            .catch(() => setSlides([]))
    }, [])

    useEffect(() => {
        if (slides.length <= 1) return
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length)
        }, 5500)
        return () => clearInterval(timer)
    }, [slides.length])

    if (slides.length === 0) {
        return (
            <section className="relative overflow-hidden font-dm bg-secondary text-white">
                <div className="absolute inset-0">
                    <Image
                        src="/brand/hero-electro.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover opacity-35"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-secondary/70" />
                </div>
                <div className="container relative flex min-h-[300px] md:min-h-[420px] items-center py-12">
                    <div className="max-w-xl">
                        <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                            Electro Store.ci
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold leading-[1.1]">
                            L’électroménager et le high-tech, au juste prix
                        </h1>
                        <p className="mt-4 text-white/75 text-sm md:text-base max-w-md leading-relaxed">
                            Prix en FCFA. Livraison en Côte d&apos;Ivoire.
                        </p>
                        <Button href="/shop" size="lg" className="mt-7">
                            Voir la boutique
                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    const current = slides[index]
    const href = current.idProduit
        ? `/product/${current.idProduit}`
        : current.idCategory
          ? `/shop?category=${current.idCategory}`
          : '/shop'
    const image =
        optimizeProductImage(getFirstImage(current.images), 1100) ||
        PRODUCT_IMAGE_PLACEHOLDER

    return (
        <section className="relative overflow-hidden font-dm bg-secondary">
            <div className="relative min-h-[280px] md:min-h-[420px]">
                <Link href={href} className="absolute inset-0 block overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        key={image}
                        src={image}
                        alt={current.libelle}
                        width={1100}
                        height={620}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="absolute inset-0 h-full w-full object-cover animate-ken-burns motion-reduce:animate-none"
                        onError={(e) => {
                            e.currentTarget.src = PRODUCT_IMAGE_PLACEHOLDER
                        }}
                    />
                    <div className="absolute inset-0 bg-secondary/75" />
                </Link>

                <div className="container relative z-10 flex min-h-[280px] md:min-h-[420px] items-end md:items-center py-8 md:py-12 pointer-events-none">
                    <div className="max-w-lg pointer-events-auto">
                        <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.18em] uppercase mb-2">
                            Electro Store.ci
                        </p>
                        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                            {current.libelle}
                        </h1>
                        {current.description && (
                            <p className="mt-2 text-sm text-white/75 line-clamp-2 max-w-md">
                                {current.description}
                            </p>
                        )}
                        <Button href={href} size="md" className="mt-5">
                            Découvrir
                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {slides.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() =>
                                setIndex((prev) => (prev - 1 + slides.length) % slides.length)
                            }
                            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/35 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                            aria-label="Précédent"
                        >
                            <IconifyIcon icon="lucide:chevron-left" className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
                            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/35 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                            aria-label="Suivant"
                        >
                            <IconifyIcon icon="lucide:chevron-right" className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    className={`relative h-1.5 rounded-full overflow-hidden transition-all ${
                                        i === index ? 'w-8 bg-white/30' : 'w-1.5 bg-white/45'
                                    }`}
                                    aria-label={`Slide ${i + 1}`}
                                >
                                    {i === index && (
                                        <span
                                            key={`progress-${index}`}
                                            className="absolute inset-y-0 left-0 bg-primary animate-toast-progress motion-reduce:animate-none"
                                            style={{ animationDuration: '5.5s' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

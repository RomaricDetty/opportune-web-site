import type { ReactNode } from 'react'
import BrandLogo from '@/components/shop/BrandLogo'
import { cn } from '@/lib/cn'

interface PageHeroProps {
    title: string
    description?: string
    children?: ReactNode
    showLogo?: boolean
    className?: string
}

/**
 * Bandeau hero des pages secondaires (Contact, Services…) — fond uni, sans dégradé.
 * @param props
 */
export default function PageHero({
    title,
    description,
    children,
    showLogo = true,
    className,
}: PageHeroProps) {
    return (
        <section className={cn('bg-secondary text-white font-dm', className)}>
            <div className="container py-10 md:py-14">
                {showLogo && (
                    <div className="inline-flex rounded-xl bg-white px-3 py-2">
                        <BrandLogo height={40} />
                    </div>
                )}
                <h1
                    className={cn(
                        'text-3xl md:text-4xl font-bold max-w-xl leading-tight',
                        showLogo ? 'mt-6' : ''
                    )}
                >
                    {title}
                </h1>
                {description && (
                    <p className="mt-3 text-white/70 max-w-lg text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                )}
                {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
            </div>
        </section>
    )
}

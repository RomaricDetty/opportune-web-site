import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'primary' | 'success' | 'danger' | 'muted' | 'promo'

interface BadgeProps {
    children: ReactNode
    variant?: BadgeVariant
    className?: string
}

const variantClass: Record<BadgeVariant, string> = {
    primary: 'bg-primary text-white',
    success: 'bg-emerald-50 text-emerald-700',
    danger: 'bg-red-50 text-red-600',
    muted: 'bg-gray-100 text-muted',
    promo: 'bg-primary text-white font-bold',
}

/**
 * Pastille / badge (promo, stock, compteur).
 * @param props
 */
export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold font-dm',
                variantClass[variant],
                className
            )}
        >
            {children}
        </span>
    )
}

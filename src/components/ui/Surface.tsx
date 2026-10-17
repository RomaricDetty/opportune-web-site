import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    padding?: SurfacePadding
    hover?: boolean
}

const paddingClass: Record<SurfacePadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-5 md:p-8',
}

/**
 * Cadre blanc bordé réutilisable.
 * @param props
 */
export default function Surface({
    children,
    className,
    padding = 'md',
    hover = false,
    ...rest
}: SurfaceProps) {
    return (
        <div
            className={cn(
                'bg-white border border-gray-100 rounded-2xl font-dm',
                paddingClass[padding],
                hover && 'hover:border-primary/30 transition-colors',
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

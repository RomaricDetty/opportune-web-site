import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type IconButtonVariant = 'default' | 'primary' | 'ghost'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant
    children: ReactNode
    label: string
}

const variantClass: Record<IconButtonVariant, string> = {
    default:
        'bg-white border border-gray-100 text-muted hover:text-primary shadow-sm',
    primary: 'bg-primary text-white hover:bg-primaryDark border border-transparent',
    ghost: 'bg-transparent text-muted hover:text-primary border border-transparent',
}

/**
 * Bouton icône carré / rond (favoris, menu).
 * @param props
 */
export default function IconButton({
    variant = 'default',
    className,
    children,
    label,
    ...rest
}: IconButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors font-dm',
                variantClass[variant],
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

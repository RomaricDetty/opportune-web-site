import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
    variant?: ButtonVariant
    size?: ButtonSize
    className?: string
    children: ReactNode
    fullWidth?: boolean
}

type ButtonAsButton = ButtonBaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
        href?: undefined
    }

type ButtonAsLink = ButtonBaseProps & {
    href: string
    target?: string
    rel?: string
    type?: undefined
    disabled?: boolean
    onClick?: never
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClass: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-white hover:bg-primaryDark disabled:opacity-50 shadow-sm shadow-primary/20',
    secondary:
        'border border-gray-200 bg-white text-secondary hover:border-primary hover:text-primary disabled:opacity-50',
    ghost: 'text-muted hover:text-primary bg-transparent disabled:opacity-50',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1ebe57] disabled:opacity-50',
}

const sizeClass: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-sm gap-2',
}

const radiusClass: Record<ButtonVariant, string> = {
    primary: 'rounded-full',
    secondary: 'rounded-xl',
    ghost: 'rounded-xl',
    whatsapp: 'rounded-full',
}

/**
 * Bouton CTA unifié (lien ou button).
 * @param props
 */
export default function Button(props: ButtonProps) {
    const {
        variant = 'primary',
        size = 'md',
        className,
        children,
        fullWidth,
        ...rest
    } = props

    const classes = cn(
        'inline-flex items-center justify-center font-semibold font-dm transition-colors',
        variantClass[variant],
        sizeClass[size],
        radiusClass[variant],
        fullWidth && 'w-full',
        className
    )

    if ('href' in props && props.href) {
        const { href, target, rel, disabled } = props
        return (
            <Link
                href={href}
                target={target}
                rel={rel}
                className={cn(classes, disabled && 'pointer-events-none opacity-50')}
                aria-disabled={disabled || undefined}
            >
                {children}
            </Link>
        )
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
    return (
        <button type={buttonProps.type || 'button'} className={classes} {...buttonProps}>
            {children}
        </button>
    )
}

import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: ReactNode
    hint?: string
    error?: string
    children: ReactNode
}

/**
 * Liste déroulante unifiée.
 * @param props
 */
export default function Select({
    label,
    hint,
    error,
    className,
    id,
    children,
    ...rest
}: SelectProps) {
    const inputId =
        id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
        <label className="block font-dm">
            {label && (
                <span className="text-xs font-semibold text-secondary">{label}</span>
            )}
            <select
                id={inputId}
                className={cn(
                    'mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-secondary',
                    'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
                    'disabled:bg-gray-50 disabled:text-muted',
                    error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
                    !label && 'mt-0',
                    className
                )}
                {...rest}
            >
                {children}
            </select>
            {error ? (
                <span className="mt-1 block text-xs text-red-500">{error}</span>
            ) : hint ? (
                <span className="mt-1 block text-xs text-muted">{hint}</span>
            ) : null}
        </label>
    )
}

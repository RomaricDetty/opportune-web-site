import type { ReactNode } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import Surface from '@/components/ui/Surface'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
    icon?: string
    title: string
    description?: string
    actionHref?: string
    actionLabel?: string
    children?: ReactNode
    className?: string
}

/**
 * État vide unifié (panier, favoris, recherche).
 */
export default function EmptyState({
    icon = 'lucide:package-open',
    title,
    description,
    actionHref,
    actionLabel,
    children,
    className,
}: EmptyStateProps) {
    return (
        <Surface
            padding="lg"
            className={cn(
                'text-center relative overflow-hidden animate-page-fade motion-reduce:animate-none',
                className,
            )}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 30% 20%, #ff6b35 0, transparent 45%), radial-gradient(circle at 80% 80%, #191a15 0, transparent 40%)',
                }}
            />
            <span className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4ef] text-primary shadow-soft">
                <IconifyIcon icon={icon} className="h-8 w-8" />
            </span>
            <h3 className="relative text-lg font-bold text-secondary">{title}</h3>
            {description && (
                <p className="relative mt-2 text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    {description}
                </p>
            )}
            {children}
            {actionHref && actionLabel && (
                <div className="relative mt-6">
                    <Button href={actionHref} size="md" className="rounded-xl min-w-[180px]">
                        {actionLabel}
                        <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </Surface>
    )
}

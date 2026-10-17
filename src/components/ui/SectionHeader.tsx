import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/lib/cn'

interface SectionHeaderProps {
    title: string
    href?: string
    hrefLabel?: string
    className?: string
}

/**
 * En-tête de section (titre + lien Voir tout).
 * @param props
 */
export default function SectionHeader({
    title,
    href,
    hrefLabel = 'Voir tout',
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                'flex items-end justify-between mb-6 gap-3 border-b border-gray-200/80 pb-3 font-dm',
                className
            )}
        >
            <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">{title}</h2>
            {href && (
                <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primaryDark shrink-0"
                >
                    {hrefLabel}
                    <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                </Link>
            )}
        </div>
    )
}

import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

export interface BreadcrumbItem {
    label: string
    href?: string
}

/**
 * Fil d’Ariane sobre.
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Fil d'Ariane" className="mb-4 font-dm">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                {items.map((item, index) => {
                    const last = index === items.length - 1
                    return (
                        <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                            {index > 0 && (
                                <IconifyIcon icon="lucide:chevron-right" className="h-3.5 w-3.5 text-gray-300" />
                            )}
                            {item.href && !last ? (
                                <Link href={item.href} className="hover:text-primary transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={last ? 'text-secondary font-medium' : ''}>{item.label}</span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

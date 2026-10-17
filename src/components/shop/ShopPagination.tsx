'use client'

import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

interface ShopPaginationProps {
    page: number
    totalPages: number
    total: number
    /** Construit l’URL d’une page */
    buildHref: (page: number) => string
}

/**
 * Pagination catalogue sobre.
 */
export default function ShopPagination({ page, totalPages, total, buildHref }: ShopPaginationProps) {
    if (totalPages <= 1) return null

    const pages = getVisiblePages(page, totalPages)

    return (
        <nav
            className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-dm"
            aria-label="Pagination"
        >
            <p className="text-sm text-muted">
                Page {page} sur {totalPages}
                <span className="hidden sm:inline"> · {total} produit{total > 1 ? 's' : ''}</span>
            </p>
            <div className="flex items-center gap-1.5">
                <Link
                    href={buildHref(Math.max(1, page - 1))}
                    aria-disabled={page <= 1}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm ${
                        page <= 1
                            ? 'pointer-events-none border-gray-100 text-gray-300'
                            : 'border-gray-200 text-secondary hover:border-primary hover:text-primary'
                    }`}
                >
                    <IconifyIcon icon="lucide:chevron-left" className="h-4 w-4" />
                </Link>

                {pages.map((p, idx) =>
                    p === '…' ? (
                        <span key={`e-${idx}`} className="px-1 text-muted text-sm">
                            …
                        </span>
                    ) : (
                        <Link
                            key={p}
                            href={buildHref(p)}
                            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-2 text-sm font-medium ${
                                p === page
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-200 text-secondary hover:border-primary hover:text-primary'
                            }`}
                        >
                            {p}
                        </Link>
                    )
                )}

                <Link
                    href={buildHref(Math.min(totalPages, page + 1))}
                    aria-disabled={page >= totalPages}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm ${
                        page >= totalPages
                            ? 'pointer-events-none border-gray-100 text-gray-300'
                            : 'border-gray-200 text-secondary hover:border-primary hover:text-primary'
                    }`}
                >
                    <IconifyIcon icon="lucide:chevron-right" className="h-4 w-4" />
                </Link>
            </div>
        </nav>
    )
}

/**
 * Pages visibles avec ellipses.
 * @param current
 * @param total
 */
function getVisiblePages(current: number, total: number): Array<number | '…'> {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: Array<number | '…'> = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    if (start > 2) pages.push('…')
    for (let i = start; i <= end; i += 1) pages.push(i)
    if (end < total - 1) pages.push('…')
    pages.push(total)
    return pages
}

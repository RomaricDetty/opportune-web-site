'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { siteCategoryService, type SiteCategory } from '@/services/siteCategoryService'

/**
 * Icône pour une catégorie principale.
 * @param libelle
 */
function iconForSiteCategory(libelle: string): string {
    const l = libelle.toLowerCase()
    if (l.includes('smart') || l.includes('phone') || l.includes('téléphone') || l.includes('telephone')) {
        return 'lucide:smartphone'
    }
    if (l.includes('tv') || l.includes('audio') || l.includes('son')) {
        return 'lucide:tv'
    }
    if (l.includes('electro') || l.includes('ménager') || l.includes('menager') || l.includes('froid') || l.includes('cuisine')) {
        return 'lucide:refrigerator'
    }
    if (l.includes('access')) return 'lucide:headphones'
    if (l.includes('ordi') || l.includes('informatique') || l.includes('pc')) return 'lucide:laptop'
    return 'lucide:package'
}

/**
 * Indique si le volet catégories est pertinent sur la page courante.
 * @param pathname
 */
function shouldShowOnPath(pathname: string): boolean {
    return (
        pathname === '/' ||
        pathname.startsWith('/shop') ||
        pathname.startsWith('/product') ||
        pathname.startsWith('/wishlist') ||
        pathname.startsWith('/cart')
    )
}

interface CategoryListProps {
    categories: SiteCategory[]
    loading: boolean
    activeId: string
    isAllActive: boolean
    onNavigate?: () => void
}

/**
 * Liste des catégories (réutilisée desktop + drawer).
 */
function CategoryList({ categories, loading, activeId, isAllActive, onNavigate }: CategoryListProps) {
    const linkClass = (active: boolean) =>
        `flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
            active
                ? 'bg-primary text-white shadow-sm'
                : 'text-secondary hover:bg-[#fff4ef] hover:text-primary'
        }`

    return (
        <ul className="flex flex-col gap-1.5 p-3">
            <li>
                <Link href="/shop" onClick={onNavigate} className={linkClass(isAllActive)}>
                    <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isAllActive ? 'bg-white/20' : 'bg-primary/10 text-primary'
                        }`}
                    >
                        <IconifyIcon icon="lucide:layout-grid" className="h-5 w-5" />
                    </span>
                    <span className="leading-snug">Tous les produits</span>
                </Link>
            </li>

            {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
                ))}

            {!loading &&
                categories.map((cat) => {
                    const active = activeId === cat.id
                    return (
                        <li key={cat.id}>
                            <Link
                                href={`/shop?siteCategory=${cat.id}`}
                                onClick={onNavigate}
                                className={linkClass(active)}
                            >
                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                        active ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                    }`}
                                >
                                    <IconifyIcon
                                        icon={iconForSiteCategory(cat.libelle)}
                                        className="h-5 w-5"
                                    />
                                </span>
                                <span className="leading-snug break-words">{cat.libelle}</span>
                            </Link>
                        </li>
                    )
                })}

            {!loading && categories.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                    Aucune catégorie disponible
                </li>
            )}
        </ul>
    )
}

/**
 * Volet gauche des catégories principales (API `/site-categories`).
 * Desktop : panneau sticky — Mobile : bouton + tiroir.
 */
export default function CategoryRail() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [categories, setCategories] = useState<SiteCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const activeId = searchParams.get('siteCategory') || ''

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        siteCategoryService
            .getAll()
            .then((list) => {
                if (!cancelled) setCategories(list)
            })
            .catch(() => {
                if (!cancelled) setCategories([])
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        setDrawerOpen(false)
    }, [pathname, activeId])

    useEffect(() => {
        if (!drawerOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [drawerOpen])

    if (!shouldShowOnPath(pathname)) return null

    const isAllActive = pathname === '/shop' && !activeId && !searchParams.get('q')
    const activeLabel =
        categories.find((c) => c.id === activeId)?.libelle ||
        (isAllActive ? 'Tous les produits' : 'Catégories')

    return (
        <>
            {/* Mobile : barre sticky juste sous le header (hauteur sync via --shop-header-h) */}
            <div
                className="lg:hidden sticky z-40 bg-white border-b border-gray-100 px-3 py-1.5 font-dm"
                style={{ top: 'var(--shop-header-h, 7.5rem)' }}
            >
                <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="w-full flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-[#f7f7f8] px-2.5 py-1.5 text-left"
                    aria-expanded={drawerOpen}
                    aria-controls="category-drawer"
                >
                    <span className="flex items-center gap-2 min-w-0">
                        <IconifyIcon
                            icon="lucide:layout-list"
                            className="h-4 w-4 text-primary shrink-0"
                        />
                        <span className="text-sm font-semibold text-secondary truncate">
                            {activeLabel}
                        </span>
                    </span>
                    <IconifyIcon icon="lucide:chevron-down" className="h-4 w-4 text-muted shrink-0" />
                </button>
            </div>

            {mounted &&
                createPortal(
                    <div
                        className={`lg:hidden fixed inset-0 z-[190] ${
                            drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
                        }`}
                        aria-hidden={!drawerOpen}
                    >
                        <button
                            type="button"
                            aria-label="Fermer"
                            onClick={() => setDrawerOpen(false)}
                            className={`absolute inset-0 bg-black/45 transition-opacity ${
                                drawerOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <aside
                            id="category-drawer"
                            className={`absolute left-0 top-0 h-full w-[min(100%,320px)] bg-white shadow-xl flex flex-col transition-transform duration-300 font-dm ${
                                drawerOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                        >
                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                                <div>
                                    <p className="text-[11px] uppercase tracking-wide text-muted font-semibold">
                                        Navigation
                                    </p>
                                    <h2 className="text-lg font-bold text-secondary">Catégories</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(false)}
                                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-secondary"
                                    aria-label="Fermer le menu"
                                >
                                    <IconifyIcon icon="lucide:x" className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <CategoryList
                                    categories={categories}
                                    loading={loading}
                                    activeId={activeId}
                                    isAllActive={isAllActive}
                                    onNavigate={() => setDrawerOpen(false)}
                                />
                            </div>
                        </aside>
                    </div>,
                    document.body,
                )}

            {/* Desktop : volet compact (hauteur contenu, pas de colonne vide) */}
            <aside
                className="hidden lg:flex sticky self-start w-[260px] shrink-0 flex-col rounded-none font-dm z-20 m-4 mr-0 overflow-y-auto"
                style={{
                    top: 'calc(var(--shop-header-h, 5rem) + 1rem)',
                    maxHeight: 'calc(100vh - var(--shop-header-h, 5rem) - 2rem)',
                }}
            >
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                        <h2 className="text-base font-bold text-secondary">Catégories</h2>
                        <p className="text-xs text-muted mt-1">Filtrez par rayon</p>
                    </div>
                    <CategoryList
                        categories={categories}
                        loading={loading}
                        activeId={activeId}
                        isAllActive={isAllActive}
                    />
                    <div className="mx-3 mb-3 rounded-xl bg-secondary text-white p-3.5">
                        <p className="text-sm font-semibold">Besoin d’aide ?</p>
                        <p className="text-xs text-white/65 mt-1 leading-relaxed">
                            Un conseiller vous oriente vers le bon produit.
                        </p>
                        <div className="mt-3 flex flex-col gap-1.5">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
                            >
                                Contactez-nous
                                <IconifyIcon icon="lucide:arrow-right" className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white"
                            >
                                Nos services
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

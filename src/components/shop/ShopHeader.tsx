'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import BrandLogo from '@/components/shop/BrandLogo'
import SearchField from '@/components/shop/SearchField'
import { useCartContext } from '@/context/useCartContext'
import { useAuthContext } from '@/context/useAuthContext'
import { useWishlistContext } from '@/context/useWishlistContext'

const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Nos Services' },
    { href: '/contact', label: 'Contactez-nous' },
]

/**
 * Header boutique — desktop + menu mobile (Services / Contact).
 */
export default function ShopHeader() {
    const pathname = usePathname()
    const headerRef = useRef<HTMLElement>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [compact, setCompact] = useState(false)
    const [cartBounce, setCartBounce] = useState(false)
    const { getTotalItems } = useCartContext()
    const { isAuthenticated, client, logout } = useAuthContext()
    const { count: wishlistCount } = useWishlistContext()
    const cartCount = getTotalItems()

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        /**
         * Compacte le header au scroll.
         */
        const onScroll = () => setCompact(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        /**
         * Anime l’icône panier après un ajout.
         */
        const onBounce = () => {
            setCartBounce(true)
            window.setTimeout(() => setCartBounce(false), 600)
        }
        window.addEventListener('shop:cart-bounce', onBounce)
        return () => window.removeEventListener('shop:cart-bounce', onBounce)
    }, [])

    useEffect(() => {
        if (!menuOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [menuOpen])

    /**
     * Expose la hauteur du header sticky pour le rail catégories mobile.
     */
    useEffect(() => {
        const el = headerRef.current
        if (!el) return

        const syncHeight = () => {
            document.documentElement.style.setProperty('--shop-header-h', `${el.offsetHeight}px`)
        }

        syncHeight()
        const observer = new ResizeObserver(syncHeight)
        observer.observe(el)
        window.addEventListener('resize', syncHeight)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', syncHeight)
        }
    }, [])

    return (
        <>
        <header
            ref={headerRef}
            className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 font-dm transition-[box-shadow,padding] duration-300 ${
                compact ? 'shadow-md' : 'shadow-sm'
            }`}
        >
            <div
                className={`container transition-[padding] duration-300 ${
                    compact ? 'py-1.5 md:py-2' : 'py-2 md:py-3.5'
                }`}
            >
                {/* Ligne 1 : menu + logo + actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        type="button"
                        className="lg:hidden h-9 w-9 shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-secondary"
                        aria-label="Ouvrir le menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(true)}
                    >
                        <IconifyIcon icon="lucide:menu" className="h-5 w-5" />
                    </button>

                    <BrandLogo height={34} className="md:hidden" />
                    <span className="hidden md:inline-flex">
                        <BrandLogo height={44} />
                    </span>

                    <div className="hidden md:block flex-1 max-w-xl">
                        <SearchField />
                    </div>

                    <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-secondary shrink-0">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-primary transition-colors ${
                                    pathname === link.href ? 'text-primary' : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-0.5 sm:gap-1 ml-auto">
                        <Link
                            href={isAuthenticated ? '/account' : '/auth/login'}
                            className="flex flex-col items-center px-1.5 sm:px-2 py-1 text-secondary hover:text-primary transition-colors"
                            aria-label="Compte"
                        >
                            <IconifyIcon icon="lucide:user" className="h-[18px] w-[18px] md:h-5 md:w-5" />
                            <span className="hidden md:block text-[11px] mt-0.5 max-w-[72px] truncate">
                                {isAuthenticated ? client?.prenom || 'Compte' : 'Compte'}
                            </span>
                        </Link>

                        <Link
                            href="/wishlist"
                            className="relative flex flex-col items-center px-1.5 sm:px-2 py-1 text-secondary hover:text-primary transition-colors"
                            aria-label="Favoris"
                        >
                            <IconifyIcon icon="lucide:heart" className="h-[18px] w-[18px] md:h-5 md:w-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 right-0 h-3.5 min-w-3.5 px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="hidden md:block text-[11px] mt-0.5">Favoris</span>
                        </Link>

                        <Link
                            href="/cart"
                            className={`relative flex flex-col items-center px-1.5 sm:px-2 py-1 text-secondary hover:text-primary transition-colors ${
                                cartBounce ? 'animate-cart-bounce' : ''
                            }`}
                            aria-label="Panier"
                        >
                            <IconifyIcon icon="lucide:shopping-cart" className="h-[18px] w-[18px] md:h-5 md:w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 right-0 h-3.5 min-w-3.5 px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                            <span className="hidden md:block text-[11px] mt-0.5">Panier</span>
                        </Link>

                        {isAuthenticated && (
                            <button
                                type="button"
                                onClick={logout}
                                className="hidden sm:flex flex-col items-center px-2 py-1 text-muted hover:text-primary transition-colors"
                                title="Déconnexion"
                            >
                                <IconifyIcon icon="lucide:log-out" className="h-5 w-5" />
                                <span className="text-[11px] mt-0.5">Quitter</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Ligne 2 mobile : recherche pleine largeur */}
                <div className="md:hidden mt-1.5">
                    <SearchField compact />
                </div>
            </div>

        </header>

            {/* Drawer hors du header sticky (sinon fixed se cale sur le header) */}
            {mounted &&
                createPortal(
                    <div
                        className={`lg:hidden fixed inset-0 z-[200] ${
                            menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
                        }`}
                        aria-hidden={!menuOpen}
                    >
                        <button
                            type="button"
                            aria-label="Fermer le menu"
                            onClick={() => setMenuOpen(false)}
                            className={`absolute inset-0 bg-black/45 transition-opacity ${
                                menuOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <aside
                            className={`absolute left-0 top-0 h-full w-[min(100%,300px)] bg-white shadow-xl flex flex-col transition-transform duration-300 ${
                                menuOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                        >
                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                                <BrandLogo height={36} />
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
                                    aria-label="Fermer"
                                >
                                    <IconifyIcon icon="lucide:x" className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto p-3">
                                <p className="px-3 pt-2 pb-2 text-[11px] uppercase tracking-wider text-muted font-semibold">
                                    Navigation
                                </p>
                                <ul className="space-y-1">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                                                    pathname === link.href
                                                        ? 'bg-primary text-white'
                                                        : 'text-secondary hover:bg-[#fff4ef] hover:text-primary'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            href="/shop"
                                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                                                pathname.startsWith('/shop')
                                                    ? 'bg-primary text-white'
                                                    : 'text-secondary hover:bg-[#fff4ef] hover:text-primary'
                                            }`}
                                        >
                                            Boutique
                                        </Link>
                                    </li>
                                </ul>

                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                                    <Link
                                        href={isAuthenticated ? '/account' : '/auth/login'}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-[#fff4ef]"
                                    >
                                        <IconifyIcon icon="lucide:user" className="h-4 w-4 text-primary" />
                                        {isAuthenticated ? 'Mon compte' : 'Connexion'}
                                    </Link>
                                    {isAuthenticated && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                logout()
                                                setMenuOpen(false)
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-[#fff4ef]"
                                        >
                                            <IconifyIcon
                                                icon="lucide:log-out"
                                                className="h-4 w-4 text-primary"
                                            />
                                            Déconnexion
                                        </button>
                                    )}
                                </div>
                            </nav>
                        </aside>
                    </div>,
                    document.body,
                )}
        </>
    )
}

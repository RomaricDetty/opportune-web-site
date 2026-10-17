'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Surface from '@/components/ui/Surface'
import { articleService } from '@/services/articleService'
import { formatXof, priceAfterDiscount } from '@/lib/formatPrice'
import type { Article } from '@/types/articles'
import { cn } from '@/lib/cn'
import ProductImage from '@/components/shop/ProductImage'

interface SearchFieldProps {
    /** Variante compacte mobile */
    compact?: boolean
}

/**
 * Champ recherche avec suggestions en direct.
 */
export default function SearchField({ compact }: SearchFieldProps) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Article[]>([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        /**
         * Ferme les suggestions au clic extérieur.
         */
        const onDocClick = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [])

    useEffect(() => {
        const q = query.trim()
        if (q.length < 2) {
            setSuggestions([])
            setLoading(false)
            return
        }
        setLoading(true)
        const timer = window.setTimeout(() => {
            articleService
                .list({ libelle: q, limit: 6, page: 1 })
                .then((res) => {
                    setSuggestions(res.data)
                    setOpen(true)
                })
                .catch(() => setSuggestions([]))
                .finally(() => setLoading(false))
        }, 280)
        return () => window.clearTimeout(timer)
    }, [query])

    /**
     * Soumet la recherche.
     */
    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        const q = query.trim()
        if (!q) return
        setOpen(false)
        router.push(`/shop?q=${encodeURIComponent(q)}`)
    }

    return (
        <div ref={wrapRef} className="relative w-full">
            <form onSubmit={handleSearch}>
                <div className="flex items-stretch border border-gray-200 rounded-full overflow-hidden bg-gray-50 focus-within:border-primary focus-within:bg-white transition-colors font-dm">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setOpen(true)}
                        placeholder="Rechercher un article"
                        className={cn(
                            'w-full min-w-0 bg-transparent border-0 pl-4 pr-2 text-sm focus:ring-0 focus:outline-none py-2.5'
                        )}
                        required
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className={cn(
                            'shrink-0 self-stretch bg-primary text-white flex items-center justify-center hover:bg-primaryDark transition-colors',
                            compact ? 'px-4' : 'px-5'
                        )}
                        aria-label="Rechercher"
                    >
                        <IconifyIcon icon="lucide:search" className="h-4 w-4" />
                    </button>
                </div>
            </form>

            {open && query.trim().length >= 2 && (
                <Surface
                    padding="none"
                    className="absolute left-0 right-0 top-full mt-2 z-50 shadow-soft overflow-hidden"
                >
                    {loading && (
                        <p className="px-4 py-3 text-sm text-muted">Recherche…</p>
                    )}
                    {!loading && suggestions.length === 0 && (
                        <p className="px-4 py-3 text-sm text-muted">Aucun résultat</p>
                    )}
                    {!loading &&
                        suggestions.map((item) => {
                            const remise = Number(item.discount ?? item.remise ?? 0)
                            return (
                                <Link
                                    key={item.id}
                                    href={`/product/${item.id}`}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#fff4ef] transition-colors border-b border-gray-50 last:border-0"
                                >
                                    <div className="h-11 w-11 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                                        <ProductImage
                                            src={item.imagePrincipale}
                                            alt=""
                                            width={88}
                                            className="h-full w-full object-contain p-1"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-secondary truncate">
                                            {item.libelle}
                                        </p>
                                        <p className="text-xs text-primary font-semibold">
                                            {formatXof(priceAfterDiscount(item.prix, remise))}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    {!loading && suggestions.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false)
                                router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
                            }}
                            className="w-full px-4 py-2.5 text-sm font-semibold text-primary hover:bg-gray-50 text-left font-dm"
                        >
                            Voir tous les résultats
                        </button>
                    )}
                </Surface>
            )}
        </div>
    )
}

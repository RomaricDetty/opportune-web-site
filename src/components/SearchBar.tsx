// components/SearchBar.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { articleService } from '@/services/articleService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<NodeJS.Timeout>()

    // ✅ Fermer le dropdown en cliquant ailleurs
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // ✅ Debounce pour éviter trop de requêtes
    const handleSearch = (value: string) => {
        setQuery(value)
        clearTimeout(debounceRef.current)

        if (!value.trim()) {
            setResults([])
            setIsOpen(false)
            return
        }

        debounceRef.current = setTimeout(async () => {
            try {
                setLoading(true)
                const data = await articleService.getByParams('libelle', value)
                const items = Array.isArray(data) ? data : [data]
                setResults(items.slice(0, 8)) // ✅ max 8 résultats
                setIsOpen(true)
            } catch {
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 350)
    }

    const handleClear = () => {
        setQuery('')
        setResults([])
        setIsOpen(false)
    }

    // ✅ Surligner le texte trouvé
    const highlight = (text: string, search: string) => {
        if (!search) return text
        const regex = new RegExp(`(${search})`, 'gi')
        const parts = text.split(regex)
        return parts.map((part, i) =>
            regex.test(part)
                ? <mark key={i} className="bg-transparent text-primary font-bold not-italic">{part}</mark>
                : part
        )
    }

    return (
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-4 hidden lg:flex">
            {/* Input */}
            <div className="flex w-full border-2 border-gray-200 hover:border-primary/40 focus-within:border-primary rounded-full transition-colors overflow-hidden shadow-sm">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    placeholder="Que recherchez-vous ?"
                    className="flex-1 px-5 py-2.5 text-sm text-gray-700 outline-none bg-transparent border-none"
                />
                {/* Bouton clear */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="flex items-center justify-center w-8 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <IconifyIcon icon="lucide:x" className="h-4 w-4" />
                    </button>
                )}
                {/* Bouton search */}
                <button className="bg-primary hover:bg-primaryDark text-white rounded-full w-10 h-10 flex items-center justify-center m-1 transition-colors shrink-0">
                    {loading
                        ? <IconifyIcon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                        : <IconifyIcon icon="lucide:search" className="h-4 w-4" />
                    }
                </button>
            </div>

            {/* ✅ Dropdown résultats */}
            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-[9999] overflow-hidden">

                    {/* Résultats trouvés */}
                    {results.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                                {results.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/products/${article.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Image */}
                                        <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                            {article.imagePrincipale ? (
                                                <img
                                                    src={article.imagePrincipale}
                                                    alt={article.libelle}
                                                    className="w-full h-full object-contain p-1"
                                                />
                                            ) : (
                                                <IconifyIcon icon="lucide:package" className="h-6 w-6 text-gray-300" />
                                            )}
                                        </div>

                                        {/* Infos */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                                                {highlight(article.libelle, query)}
                                            </p>
                                            {article.marque?.libelle && (
                                                <p className="text-[10px] text-gray-400 mt-0.5">
                                                    {article.marque.libelle}
                                                </p>
                                            )}
                                            {article.prix && (
                                                <p className="text-xs font-bold text-primary mt-1">
                                                    {Number(article.prix).toLocaleString('fr-FR')} F CFA
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* ✅ Footer - voir tous les résultats */}
                            <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50">
                                <button
                                    onClick={() => {
                                        router.push(`/products?search=${query}`)
                                        setIsOpen(false)
                                    }}
                                    className="w-full text-center text-xs font-semibold text-primary hover:text-primaryDark transition-colors flex items-center justify-center gap-1"
                                >
                                    Voir tous les résultats pour "{query}"
                                    <IconifyIcon icon="lucide:arrow-right" className="h-3 w-3" />
                                </button>
                            </div>
                        </>
                    ) : (
                        // ✅ Aucun résultat
                        !loading && (
                            <div className="flex flex-col items-center justify-center py-8 gap-2 text-gray-400">
                                <IconifyIcon icon="lucide:search-x" className="h-8 w-8" />
                                <p className="text-sm font-medium">Aucun résultat pour "{query}"</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
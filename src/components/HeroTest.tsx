'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../lib/axios'
// ─── Types API ────────────────────────────────────────────────────────────────

interface PubliciteCategory {
    id: string
    libelle: string
}

interface PubliciteProduit {
    id: string
    libelle: string
}

interface Publicite {
    id: string
    libelle: string
    description: string | null
    images: string | null       // JSON stringifié : ["data:image/..."]
    dateExpiration: string | null
    isActive: boolean
    idCategory: string | null
    idProduit: string | null
    category: PubliciteCategory | null
    produit: PubliciteProduit | null
}

interface PublicitesGrouped {
    publicites_categories: Publicite[]
    publicites_articles: Publicite[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getFirstImage = (images: string | null): string | null => {
    if (!images) return null
    try {
        const parsed: string[] = typeof images === 'string' ? JSON.parse(images) : images
        return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : null
    } catch {
        return null
    }
}

const getLinkForPublicite = (pub: Publicite): string => {
    if (pub.idCategory && pub.category) return `/categories/${pub.idCategory}`
    if (pub.idProduit && pub.produit) return `/others/${pub.idProduit}`
    return '/'
}

// ─── Textes du carousel d'annonces ───────────────────────────────────────────

const announcementTexts: string[] = [
    "JUSQU'À 50% DE REDUCTION",
    "ELECTROMÉNAGER MEILLEUR PRIX",
    "DEMANDER UN DEVIS DÈS MAINTENANT",
    "LIVRAISON GRATUITE",
    "DES PRODUITS A PETIT PRIX"
]

// ─── Composant Hero ───────────────────────────────────────────────────────────

const HeroTest = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [announcementIndex, setAnnouncementIndex] = useState(0)
    const [categoryIndex, setCategoryIndex] = useState(0)

    const [publicites, setPublicites] = useState<PublicitesGrouped>({
        publicites_categories: [],
        publicites_articles: []
    })
    const [loading, setLoading] = useState(true)

    // ── Chargement des publicités ─────────────────────────────────────────────
    useEffect(() => {
        const fetchPublicites = async () => {
            try {
                const res = await axiosInstance.get<any>('/publicites?grouped=true&isActive=true')
                const data = await res.data
                if (data.success) setPublicites({
                    publicites_categories: data.data.publicites_categories ?? [],
                    publicites_articles: data.data.publicites_articles ?? []
                })
            } catch (error) {
                console.error('Erreur chargement publicités :', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPublicites()
    }, [])

    // ── Carousel articles (gauche) ────────────────────────────────────────────
    useEffect(() => {
        if (!publicites.publicites_articles?.length || publicites.publicites_articles.length <= 1) return
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % publicites.publicites_articles.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [publicites.publicites_articles])

    // ── Carousel catégories (droite) ──────────────────────────────────────────
    useEffect(() => {
        if (!publicites.publicites_categories?.length || publicites.publicites_categories.length <= 1) return
        const interval = setInterval(() => {
            setCategoryIndex(prev => (prev + 1) % publicites.publicites_categories.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [publicites.publicites_categories])

    // ── Carousel annonces (bandeau) ───────────────────────────────────────────
    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex(prev => (prev + 1) % announcementTexts.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const currentArticlePub = publicites.publicites_articles?.[currentIndex] ?? null
    const currentCategoryPub = publicites.publicites_categories?.[categoryIndex] ?? null

    return (
        <>
            <section
                className="relative pb-8 md:pb-12 bg-gray-100 min-h-[500px] md:min-h-[600px]"
                id="home"
            >
                <div className="container relative z-10 px-4 md:px-0">

                    {/* ── Bandeau d'annonces ── */}
                    <div className="bg-[#17243A] py-1 md:py-2 mt-5">
                        <div className="container px-4 md:px-0">
                            <div className="flex items-center justify-center">
                                <div className="relative w-full max-w-4xl overflow-hidden h-8 md:h-10">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out h-full"
                                        style={{ transform: `translateX(-${announcementIndex * 100}%)` }}
                                    >
                                        {announcementTexts.map((text, index) => (
                                            <div
                                                key={index}
                                                className="min-w-full flex-shrink-0 flex items-center justify-center h-full"
                                            >
                                                <p className="text-white text-lg md:text-base font-medium">{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-1.5 justify-center mt-2">
                                        {announcementTexts.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setAnnouncementIndex(index)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${announcementIndex === index
                                                        ? 'bg-white w-6'
                                                        : 'bg-[#ff6b35] w-1.5 hover:bg-[#ff6b35]'
                                                    }`}
                                                aria-label={`Annonce ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-5">

                        {/* ── Grande carte Hero principale à gauche (publicités articles) ── */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-2 md:p-4 lg:p-6 h-full flex flex-col relative overflow-hidden shadow-lg">

                                {loading ? (
                                    // Skeleton loader
                                    <div className="flex-1 flex flex-col gap-4 animate-pulse">
                                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="flex-1 bg-gray-100 rounded-2xl min-h-[18rem]" />
                                        <div className="h-10 bg-gray-200 rounded-full w-40" />
                                    </div>

                                ) : currentArticlePub ? (
                                    // Publicité liée à un produit
                                    <div className="flex-1 flex flex-col gap-4 md:gap-6 mt-12 md:mt-0">
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                                {currentArticlePub.libelle}
                                            </h1>
                                            {currentArticlePub.description && (
                                                <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">
                                                    {currentArticlePub.description}
                                                </p>
                                            )}

                                            {/* Image de la publicité */}
                                            <div
                                                className="w-full mb-4 flex items-center justify-center border-2 border-gray-200 p-2 rounded-2xl bg-gray-50 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                                                style={{
                                                    backgroundImage: getFirstImage(currentArticlePub.images)
                                                        ? `url(${getFirstImage(currentArticlePub.images)})`
                                                        : undefined,
                                                    minHeight: '18rem',
                                                    backgroundColor: !getFirstImage(currentArticlePub.images) ? '#f3f4f6' : undefined
                                                }}
                                                role="img"
                                                aria-label={currentArticlePub.libelle}
                                            />

                                            <Link
                                                href={getLinkForPublicite(currentArticlePub)}
                                                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 md:px-6 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-fit"
                                            >
                                                Voir le produit
                                                <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>

                                ) : (
                                    // Fallback si aucune publicité article
                                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                                        Aucune publicité disponible
                                    </div>
                                )}

                                {/* Indicateurs de navigation */}
                                {publicites.publicites_articles?.length > 1 && (
                                    <div className="flex gap-2 mt-4 md:mt-6">
                                        {publicites.publicites_articles.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                                        ? 'bg-primary w-8'
                                                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                                                    }`}
                                                aria-label={`Publicité ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Carte publicitaire à droite (publicités catégories) ── */}
                        <div className="lg:col-span-1 hidden md:block">
                            <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg h-full flex flex-col">

                                {loading ? (
                                    // Skeleton loader
                                    <div className="flex-1 flex flex-col gap-4 animate-pulse">
                                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                                        <div className="flex-1 bg-gray-100 rounded-lg" />
                                    </div>

                                ) : currentCategoryPub ? (
                                    // Publicité liée à une catégorie
                                    <Link
                                        href={getLinkForPublicite(currentCategoryPub)}
                                        className="flex-1 flex flex-col group"
                                    >
                                        {/* Image */}
                                        <div
                                            className="flex-1 rounded-xl bg-gray-100 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-[1.01] overflow-hidden"
                                            style={{
                                                backgroundImage: getFirstImage(currentCategoryPub.images)
                                                    ? `url(${getFirstImage(currentCategoryPub.images)})`
                                                    : undefined,
                                                minHeight: '16rem'
                                            }}
                                            role="img"
                                            aria-label={currentCategoryPub.libelle}
                                        >
                                            {!getFirstImage(currentCategoryPub.images) && (
                                                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
                                                    <span className="text-gray-400 text-xs">Image non disponible</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Texte */}
                                        <div className="mt-4">
                                            <p className="text-xs text-[#ff6b35] font-semibold uppercase tracking-wide mb-1">
                                                {currentCategoryPub.category?.libelle}
                                            </p>
                                            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#ff6b35] transition-colors">
                                                {currentCategoryPub.libelle}
                                            </h3>
                                            {currentCategoryPub.description && (
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {currentCategoryPub.description}
                                                </p>
                                            )}
                                            <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
                                                Voir la catégorie
                                                <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                                            </span>
                                        </div>

                                        {/* Indicateurs */}
                                        {publicites.publicites_categories?.length > 1 && (
                                            <div className="flex gap-2 mt-4">
                                                {publicites.publicites_categories.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={(e) => { e.preventDefault(); setCategoryIndex(index) }}
                                                        className={`h-2 rounded-full transition-all duration-300 ${categoryIndex === index
                                                                ? 'bg-[#ff6b35] w-8'
                                                                : 'bg-gray-300 w-2 hover:bg-gray-400'
                                                            }`}
                                                        aria-label={`Catégorie ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </Link>

                                ) : (
                                    // Fallback si aucune publicité catégorie
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        <div className="text-sm text-gray-500 mb-2">Espace publicitaire</div>
                                        <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <span className="text-gray-400 text-xs">Publicité</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroTest

"use client"
import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

/**
 * Page "Qui sommes-nous" - Présente IvoirePhone et ses valeurs
 * Design mobile-friendly avec une mise en page responsive
 */
const AboutPage = () => {
    return (
        <>
            <Navigation />
            <section id="about" className="pt-24 pb-16 min-h-screen bg-white">
                <div className="container px-4">
                    {/* En-tête de la page */}
                    <div className="text-center pt-10 mb-12 md:mb-16">
                        <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950 mb-4 block">
                            À propos de nous
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Qui sommes-nous ?
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    {/* Contenu principal */}
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <div className="mb-10 md:mb-12">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                                Bienvenue sur <span className="font-semibold text-primary">IvoirePhone</span>, votre plateforme en ligne dédiée à la vente de téléphones mobiles et d'accessoires de qualité.
                            </p>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Nous sommes une équipe jeune et passionnée par la technologie, avec un objectif simple : rendre l'achat de téléphones facile, rapide et fiable pour tous. Sur notre site, nous proposons une large gamme de smartphones adaptés à tous les besoins et à tous les budgets.
                            </p>
                        </div>

                        {/* Nos valeurs */}
                        <div className="mb-10 md:mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                                Chez IvoirePhone, nous mettons un point d'honneur à offrir :
                            </h2>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="flex items-start gap-4 p-4 md:p-6 bg-gray-50 rounded-[2rem] border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <IconifyIcon
                                                icon="lucide:shield-check"
                                                className="h-6 w-6 text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Des produits authentiques et vérifiés
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Tous nos produits sont authentiques et vérifiés pour garantir votre satisfaction.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 md:p-6 bg-gray-50 rounded-[2rem] border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <IconifyIcon
                                                icon="lucide:tag"
                                                className="h-6 w-6 text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Des prix accessibles
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Nous proposons des prix compétitifs pour rendre la technologie accessible à tous.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 md:p-6 bg-gray-50 rounded-[2rem] border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <IconifyIcon
                                                icon="lucide:headphones"
                                                className="h-6 w-6 text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Un service client à l'écoute
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 md:p-6 bg-gray-50 rounded-[2rem] border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <IconifyIcon
                                                icon="lucide:lock"
                                                className="h-6 w-6 text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Une expérience d'achat sécurisée
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Vos transactions sont sécurisées pour une expérience d'achat en toute confiance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="mb-10 md:mb-12 p-6 md:p-8 bg-primary/5 rounded-lg">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                                <IconifyIcon
                                    icon="lucide:target"
                                    className="h-6 w-6 text-primary"
                                />
                                <span className="text-primary">Notre mission</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Notre mission est de permettre à chacun de trouver le téléphone qui lui correspond, sans stress et en toute confiance, depuis chez lui.
                            </p>
                        </div>

                        {/* Remerciement */}
                        <div className="text-center p-6 md:p-8">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
                                " Merci de nous faire confiance et de choisir <span className="font-semibold text-primary">IvoirePhone</span> pour vos achats technologiques. "
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default AboutPage

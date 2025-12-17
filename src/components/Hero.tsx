'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { formatPrice } from '@/data/products'

/**
 * Interface pour les données d'un slide du carousel Hero
 */
interface HeroSlide {
    discount: number;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    productImage: string;
}

/**
 * Interface pour les produits promotionnels affichés à droite
 */
interface PromoProduct {
    name: string;
    offerText?: string;
    currentPrice: number;
    oldPrice?: number;
    specs?: string;
    saveText?: string;
    code?: string;
    productImage: string;
    link: string;
    productId: number;
    productType: 'electromenager' | 'other';
}

/**
 * Données des slides du carousel Hero (carte principale)
 */
const heroSlides: HeroSlide[] = [
    {
        discount: 30,
        title: "Casque sans fil avec annulation de bruit",
        description: "Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum nec suscipit.",
        buttonText: "Acheter maintenant",
        buttonLink: "/products",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },
    {
        discount: 25,
        title: "Casque sans fil avec annulation de bruit",
        description: "Découvrez nos écouteurs sans fil dernière génération avec annulation de bruit active.",
        buttonText: "Acheter maintenant",
        buttonLink: "/products",
        productImage: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600"
    },
    {
        discount: 35,
        title: "Casque sans fil avec annulation de bruit",
        description: "Qualité sonore exceptionnelle pour une expérience audio immersive.",
        buttonText: "Acheter maintenant",
        buttonLink: "/products",
        productImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600"
    }
];

/**
 * Produits promotionnels affichés à droite
 * Sélection de produits avec de bonnes réductions du catalogue
 */
const promoProducts: PromoProduct[] = [
    {
        name: "Climatiseur Hitachi 2.5kW",
        offerText: "OFFRE LIMITÉE",
        currentPrice: 1200000,
        oldPrice: 1500000,
        specs: "Climatiseur réversible avec fonction chauffage",
        saveText: "Économisez jusqu'à 300 000 F CFA",
        productImage: "https://images.unsplash.com/photo-1631540578001-0c0e7a0a4a0a?w=400",
        link: "/products/5",
        productId: 5,
        productType: 'electromenager'
    },
    {
        name: "Sèche-linge Miele 9kg",
        specs: "Sèche-linge à condensation avec programme délicat",
        currentPrice: 1100000,
        oldPrice: 1300000,
        saveText: "Économisez jusqu'à 200 000 F CFA",
        code: "Code: PROMO15",
        productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        link: "/products/10",
        productId: 10,
        productType: 'electromenager'
    }
];

/**
 * Textes du carousel d'annonces
 */
const announcementTexts: string[] = [
    "JUSQU’À 50% DE REDUCTION",
    "ELECTROMÉNAGER MEILLEUR PRIX",
    "DEMANDER UN DEVIS DÈS MAINTENANT",
    "LIVRAISON GRATUITE",
    "DES PRODUITS A PETIT PRIX"
];

/**
 * Composant Hero - Section principale avec carte promotionnelle principale et produits secondaires
 * Affiche une grande carte Hero à gauche avec carousel et deux cartes produits à droite
 */
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const currentSlide = heroSlides[currentIndex];

    /**
     * Change automatiquement le slide toutes les 5 secondes
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    /**
     * Change automatiquement le texte d'annonce toutes les 4 secondes
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex((prevIndex) => (prevIndex + 1) % announcementTexts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    /**
     * Change le slide du carousel en fonction de l'index sélectionné
     * @param index - Index du slide à afficher
     */
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <>


            <section
                className="relative pt-20 pb-8 md:pt-24 md:pb-12 bg-gray-100 min-h-[500px] md:min-h-[600px]"
                id="home"
            >
                <div className="container relative z-10 px-4 md:px-0">

                    {/* Carousel de textes avec fond bleu */}
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
                                                <p className="text-white text-lg md:text-base font-medium">
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Indicateurs de navigation */}
                                    <div className="flex gap-1.5 justify-center mt-2">
                                        {announcementTexts.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setAnnouncementIndex(index)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${announcementIndex === index
                                                        ? 'bg-white w-6'
                                                        : 'bg-[#ff6b35] w-1.5 hover:bg-[#ff6b35]'
                                                    }`}
                                                aria-label={`Aller à l'annonce ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-5">
                        {/* Grande carte Hero principale à gauche */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-2 md:p-4 lg:p-6 h-full flex flex-col relative overflow-hidden shadow-lg">


                                {/* Contenu principal */}
                                <div className="flex-1 flex flex-col gap-4 md:gap-6 mt-12 md:mt-0">
                                    {/* Texte et contenu */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                            {currentSlide.title}
                                        </h1>
                                        <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">
                                            {currentSlide.description}
                                        </p>

                                        {/* Image du produit */}
                                        <div
                                            className="w-full mb-4 flex items-center justify-center border-2 border-gray-200 p-2 rounded-2xl bg-gray-50 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                                            style={{
                                                backgroundImage: `url(${currentSlide.productImage})`,
                                                minHeight: '18rem',
                                                // minWidth: '10em',
                                            }}
                                            role="img"
                                            aria-label={currentSlide.title}
                                        >
                                        </div>

                                        <Link
                                            href={currentSlide.buttonLink}
                                            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 md:px-6 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-fit"
                                        >
                                            {currentSlide.buttonText}
                                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Indicateurs de navigation du carousel */}
                                <div className="flex gap-2 mt-4 md:mt-6">
                                    {heroSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                                    ? 'bg-primary w-8'
                                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Aller au slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Carte publicitaire à droite - masquée sur mobile */}
                        <div className="lg:col-span-1 hidden md:block">
                            <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg h-full flex items-center justify-center">
                                {/* Zone publicitaire - à personnaliser selon vos besoins */}
                                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                                    <div className="text-sm text-gray-500 mb-2">
                                        Espace publicitaire
                                    </div>
                                    <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <span className="text-gray-400 text-xs">
                                            Publicité
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import bgElectro from "@/assets/images/bg-electro.jpg";
import bgDelivery from "@/assets/images/bg-delivery.jpg";
import bgOther from "@/assets/images/bg-other.jpg";
import bgHeroElectro from "@/assets/images/bg-hero-electro.jpg";
import bgDemo from "@/assets/images/bg-demo.jpg";

/**
 * Interface pour les données d'un slide du carousel
 */
interface HeroSlide {
    image: any;
    badge: string;
    badgeIcon: string;
    title: string;
    titleHighlight: string;
    description: string;
    buttonText: string;
    buttonIcon: string;
    buttonLink: string;
}

/**
 * Données des 3 slides du carousel Hero
 */
const heroSlides: HeroSlide[] = [
    {
        image: bgElectro,
        badge: "Votre Spécialiste en Électroménager",
        badgeIcon: "lucide:minus",
        title: "Équipez Votre Maison avec",
        titleHighlight: "les Meilleurs Électroménagers",
        description: "Découvrez notre sélection premium d'électroménagers dernière génération. Qualité, innovation et prix imbattables pour transformer votre quotidien.",
        buttonText: "Découvrir nos produits",
        buttonIcon: "lucide:shopping-bag",
        buttonLink: "/products"
    },
    {
        image: bgDelivery,
        badge: "Livraison Rapide à Abidjan",
        badgeIcon: "lucide:minus",
        title: "Des Produits de Qualité à Moindre Coût",
        titleHighlight: "Livrés Chez Vous",
        description: "Profitez de nos produits d'électroménager de qualité à des prix imbattables. Un processus simple et rapide pour recevoir vos commandes dans les meilleurs délais.",
        buttonText: "Découvrir nos produits",
        buttonIcon: "lucide:shopping-bag",
        buttonLink: "/products"
    },
    {
        image: bgOther,
        badge: "Autres Produits",
        badgeIcon: "lucide:minus",
        title: "Découvrez nos autres produits",
        titleHighlight: "pour tous vos besoins",
        description: "Explorez notre gamme complète de produits non électroménager. Des articles de qualité pour tous vos besoins.",
        buttonText: "Découvrir nos produits",
        buttonIcon: "lucide:shopping-bag",
        buttonLink: "/others"
    }
];

/**
 * Composant Hero - Section principale avec carousel d'images de fond et texte accrocheur
 * Affiche un carousel de 3 images avec un overlay pour améliorer la lisibilité du texte
 * Le contenu (badge, titre, description, bouton) change selon le slide actif
 */
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSlide = heroSlides[currentIndex];

    /**
     * Change automatiquement l'image toutes les 5 secondes
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    /**
     * Change l'image du carousel en fonction de l'index sélectionné
     * @param index - Index de l'image à afficher
     */
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section
            className="relative pt-32 pb-32 overflow-x-hidden from-slate-500/10 bg-no-repeat bg-cover transition-all duration-1000 ease-in-out"
            id="home"
            style={{
                backgroundImage: `url(${currentSlide.image.src})`,
            }}
        >
            {/* Overlay avec dégradé pour améliorer la lisibilité et créer de la profondeur */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
                    <div className="text-sm py-10 px-4 md:py-20 md:px-10">
                        <span className="inline-flex py-1.5 px-3 md:py-2.5 md:px-4 text-sm md:text-lg text-white font-semibold items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm shadow-lg transition-all duration-500">
                            <IconifyIcon icon={currentSlide.badgeIcon} /> {currentSlide.badge}
                        </span>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl/tight text-white tracking-normal leading-tight md:leading-normal font-bold mb-4 mt-4 md:mt-6 drop-shadow-2xl transition-all duration-500">
                            {currentSlide.title}{" "}
                            <span className="text-primary drop-shadow-lg">{currentSlide.titleHighlight}</span>
                        </h1>
                        <p className="text-sm md:text-base font-semibold text-white leading-6 md:leading-7 mt-4 md:mt-5 drop-shadow-lg max-w-xl transition-all duration-500">
                            {currentSlide.description}
                        </p>
                        
                        {/* Bouton d'action principal */}
                        <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
                            <Link 
                                href={currentSlide.buttonLink}
                                className="inline-flex items-center justify-center gap-2 py-2.5 px-6 md:py-3 md:px-8 rounded-[100px] text-white bg-primary hover:bg-primaryDark transition-all duration-500 font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <IconifyIcon icon={currentSlide.buttonIcon} className="h-4 w-4 md:h-5 md:w-5" />
                                {currentSlide.buttonText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicateurs de navigation du carousel */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            currentIndex === index 
                                ? 'bg-primary w-8' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}

export default Hero


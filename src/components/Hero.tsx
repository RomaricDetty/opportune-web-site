import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import React from 'react'
import store from "@/assets/images/store.png";
import google from "@/assets/images/google.png";
import furniture from "@/assets/images/furniture.png";


/**
 * Composant Hero - Section principale avec image de fond et texte accrocheur
 * Affiche une section hero avec un overlay pour améliorer la lisibilité du texte
 */
const Hero = () => {
    return (
        <section
            className="relative pt-32 pb-32 overflow-x-hidden from-slate-500/10 bg-[url(../images/bg-electro.jpg)]  bg-no-repeat bg-cover"
            id="home"
        >
            {/* Overlay avec dégradé pour améliorer la lisibilité et créer de la profondeur */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
                    <div className="text-sm py-20 px-10">
                        <span className="inline-flex py-2.5 px-4 text-lg text-white font-semibold items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm shadow-lg">
                            <IconifyIcon icon="lucide:minus" /> Votre Spécialiste en Électroménager
                        </span>
                        <h1 className="md:text-6xl/tight text-4xl text-white tracking-normal leading-normal font-bold mb-4 mt-6 drop-shadow-2xl">
                            Équipez Votre Maison avec{" "}
                            <span className="text-primary drop-shadow-lg"> les Meilleurs Électroménagers </span>
                        </h1>
                        <p className="text-base font-semibold text-white leading-7 mt-5 drop-shadow-lg max-w-xl">
                            Découvrez notre sélection premium d'électroménagers dernière génération. 
                            Qualité, innovation et prix imbattables pour transformer votre quotidien.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero


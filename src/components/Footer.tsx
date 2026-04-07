"use client"
import Image from 'next/image'
import React from 'react'
import logoElectroShopBlanc from "@/assets/images/logo-electro-shop-blanc.png";

/**
 * Composant Footer minimaliste
 * Affiche le logo, les informations de contact et le copyright
 */
function Footer() {
    return (
        <footer className="bg-[#17243A]">
            <div className="container py-12 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Image
                            src={logoElectroShopBlanc}
                            alt="logo"
                            width={118}
                            className="mb-2"
                        />
                        <p className="text-gray-300 text-sm max-w-xs">
                            Votre boutique tech et maison, avec un service de proximite et une livraison rapide.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white text-base font-semibold mb-3">Navigation</h4>
                        <div className="flex flex-col gap-2 text-sm text-gray-300">
                            <a href="/" className="hover:text-white transition-colors">Accueil</a>
                            <a href="/others?category=telephones" className="hover:text-white transition-colors">Telephones</a>
                            <a href="/others?category=mobiliers" className="hover:text-white transition-colors">Mobiliers</a>
                            <a href="/others?category=accessoires" className="hover:text-white transition-colors">Accessoires</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-base font-semibold mb-3">Contact</h4>
                        <div className="flex flex-col gap-2 text-sm text-gray-300">
                            <a
                                href="mailto:contact@electrostoreci.com"
                                className="hover:text-white transition-colors"
                            >
                                contact@electrostoreci.com
                            </a>
                            <a
                                href="tel:+2250707070707"
                                className="hover:text-white transition-colors"
                            >
                                (+225) 07 07 07 07 07
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-[#1C2940] py-4">
                <div className="container">
                    <p className="text-center text-gray-400 text-sm">
                        {new Date().getFullYear()} © Electro Store - Tous droits réservés
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
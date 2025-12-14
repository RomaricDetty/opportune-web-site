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
            <div className="container py-12">
                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Logo */}
                    <Image 
                        src={logoElectroShopBlanc} 
                        alt="logo" 
                        width={118} 
                        className="mb-2"
                    />
                    
                    {/* Contact */}
                    <div className="flex flex-col sm:flex-row gap-4 text-gray-300 text-sm">
                        <a 
                            href="mailto:contact@electrostoreci.com" 
                            className="hover:text-white transition-colors"
                        >
                            contact@electrostoreci.com
                        </a>
                        <span className="hidden sm:inline">•</span>
                        <a 
                            href="tel:+2250707070707" 
                            className="hover:text-white transition-colors"
                        >
                            (+225) 07 07 07 07 07
                        </a>
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
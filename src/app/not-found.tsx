"use client"
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TestNavbar from '@/components/TestNavbar'
import SideBar from '@/components/SideBar'
import Footer from '@/components/Footer'
import { useState } from 'react'

/**
 * Affiche une page 404 personnalisee pour les routes inexistantes.
 */
export default function NotFound() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <TestNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <section className="pt-24 pb-20 min-h-screen bg-white flex items-center">
                <div className="container px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-[#ff6b35] font-semibold tracking-wide mb-3">ERREUR 404</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Page introuvable
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg mb-8">
                            La page que vous cherchez n&apos;existe pas ou a ete deplacee.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors"
                        >
                            <IconifyIcon icon="lucide:arrow-left" className="h-5 w-5" />
                            Retour a l&apos;accueil
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

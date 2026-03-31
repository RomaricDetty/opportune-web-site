"use client"
import React from 'react'
import Footer from '@/components/Footer'
import Checkout from '@/components/Checkout'
import TestNavbar from '@/components/TestNavbar'
import SideBar from '@/components/SideBar'

/**
 * Affiche la page checkout avec header harmonise.
 */
const CheckoutPage = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
        <>
            <TestNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <section className="mt-20">
                <Checkout />
            </section>
            <Footer />
        </>
    )
}

export default CheckoutPage

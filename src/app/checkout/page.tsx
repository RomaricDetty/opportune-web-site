"use client"
import React from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useCartContext } from '@/context/useCartContext'
import { formatPrice } from '@/data/products'
import Checkout from '@/components/Checkout'
/**
 * Page Panier
 */
const CheckoutPage = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartContext()
    const totalPrice = getTotalPrice()
    // Obtenir la quantité minimale d'un produit
    const getMinQuantity = (product: any): number => {
        return product.minQuantity || 1
    }

    return (
            <>
            <Navigation />
                <section className='mt-20'>
                    <Checkout />
                </section>
            <Footer />
            </>
        )

    if (cartItems.length === 0) {
        return (
            <>
            <Navigation />
                <Checkout />
            <Footer />
            </>
        )
    }

   
}

export default CheckoutPage

"use client"
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import Topbar from "@/components/TopBar";
import Swiperslider from "@/components/Swiperslider";
import Brands from "@/components/Brands";
import Product from "@/components/Products";
import Features from "@/components/Features";
// import Nouveaute from "@/components/Nouveaute";
import About from "@/components/About";
// import Pricing from "@/components/Pricing";
// import Faqs from "@/components/Faqs";
// import Testimonials from "@/components/Testimonials";
// import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
// import Newsletter from "@/components/Newsletter";
import Hero from "@/components/Hero";
import Delivery from "@/components/Delivery";

import "swiper/css";
import Pricing from "@/components/Pricing";
import TestNavbar from "@/components/TestNavbar";
import { articleService } from "@/services/articleService";
import Link from "next/link";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import HeroTest from "@/components/HeroTest";

function page() {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [articles, setArticles] = React.useState<any[]>([])

    const fetchArticles = async () => {
        try {
            const response = await articleService.getAllHome()
            setArticles(Array.isArray(response) ? response : [response])
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])
    return (
        <>
            {/* <Topbar /> */}
            <TestNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            {/* <Navigation onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
            <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <HeroTest />
            {/* <Brands /> */}
            {/* <Delivery /> */}
            {articles.slice(0, 5).map((article: any, index) => {
                return (
                    <Product key={index} category={article?.category} products={article.produits} idCategory={article.categoryId} />
                )
            })}
            {articles.length > 5 && (
                <div className="flex justify-center mb-4">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primaryDark text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
                    >
                        Voir tous les articles
                        <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                    </Link>
                </div>
            )}
            {/* <Product />
            <Product /> */}
            <Contact />
            <Footer />
        </>
    );
}

export default page;


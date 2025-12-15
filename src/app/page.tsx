"use client"
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Swiperslider from "@/components/Swiperslider";
import Brands from "@/components/Brands";
import Product from "@/components/Products";
// import Features from "@/components/Features";
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


function page() {
    return (
        <>
            <Navigation />
            <Hero />
            {/* <Brands /> */}
            {/* <Delivery /> */}
            <Product />
            {/* <Features /> */}
            {/* <Newsletter /> */}
            {/* <About /> */}
            {/* <Pricing />
            <Faqs />
            <Swiperslider />
            <Testimonials />
            <Blog /> */}
            <Contact />
            <Footer />
        </>
    );
}

export default page;


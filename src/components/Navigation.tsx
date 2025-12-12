'use client'
import logo from "@/assets/images/logo.png";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import useScrollEvent from "@/hooks/useScrollEvent";
import Gumshoe from 'gumshoejs'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCartContext } from "@/context/useCartContext";

/**
 * Composant Navigation - Barre de navigation avec changement de couleur au scroll
 * Les éléments sont blancs par défaut sur la page d'accueil et noirs sur les autres pages
 */
const Navigation = () => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const { getTotalItems } = useCartContext();
    const totalItems = getTotalItems();

    useEffect(() => {
        if (navRef.current) new Gumshoe('.navbar-nav a', { offset: 80 })
    }, []);

    const { scrollY } = useScrollEvent()
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Déterminer si la navigation doit être en mode sombre (blanc) ou clair (noir)
    // Sur la page d'accueil : blanc par défaut, noir après scroll
    // Sur les autres pages : noir dès le début
    const isSticky = scrollY >= 50;
    const shouldUseDarkText = !isHomePage || isSticky;

    return (
        <>
            <nav
                ref={navRef}
                className={`navbar ${isSticky && " is-sticky"
                    } fixed top-0 start-0 end-0 z-999 transition-all duration-500 py-5 items-center shadow-md lg:shadow-none [&.is-sticky]:bg-white group [&.is-sticky]:shadow-md ${
                        isHomePage ? 'bg-white lg:bg-transparent' : 'bg-white'
                    }`}
                id="navbar"
            >
                <div className="container">
                    <div className="flex lg:flex-nowrap flex-wrap items-center">
                        <Link 
                            href="/" 
                            className={`flex items-center transition-colors duration-300 ${
                                shouldUseDarkText 
                                    ? 'text-dark' 
                                    : 'text-dark lg:text-white'
                            }`}
                        >
                            {/* <Image
                                src={logo}
                                className="h-9 flex"
                                alt="logo"
                                width={118}
                                height={36}
                            /> */}
                            Logo Shop Electroménager
                        </Link>
                        <div className="lg:hidden flex items-center ms-auto px-2.5">
                            <button onClick={toggleMenu}
                                className="hs-collapse-toggle"
                                type="button"
                                id="hs-unstyled-collapse"
                                data-hs-collapse="#navbarCollapse"
                            >
                                <IconifyIcon
                                    icon="lucide:menu"
                                    className="h-8 w-8 text-black"
                                />
                            </button>
                        </div>
                        <div
                            className="navigation hs-collapse transition-all duration-300 lg:basis-auto basis-full grow hidden items-center justify-center lg:flex mx-auto overflow-hidden mt-6 lg:mt-0 nav-light"
                            id="navbarCollapse"
                        >
                            <ul
                                className="navbar-nav flex-col lg:flex-row gap-y-2 flex lg:items-center justify-center"
                                id="navbar-navlist"
                            >
                                <li className={`nav-item mx-1.5 transition-all duration-300 hover:text-primary [&.active]:!text-primary ${
                                    shouldUseDarkText 
                                        ? 'text-dark [&.active]:text-primary' 
                                        : 'text-dark lg:text-white [&.active]:!text-primary'
                                }`}>
                                    <a
                                        className="nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize"
                                        href={isHomePage ? "#home" : "/#home"}
                                    >
                                        Accueil
                                    </a>
                                </li>
                                <li className={`nav-item mx-1.5 transition-all duration-300 hover:text-primary [&.active]:!text-primary ${
                                    shouldUseDarkText 
                                        ? 'text-dark [&.active]:text-primary' 
                                        : 'text-dark lg:text-white [&.active]:!text-primary'
                                }`}>
                                    <a
                                        className="nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize"
                                        href={isHomePage ? "#products" : "/#products"}
                                    >
                                        Les produits
                                    </a>
                                </li>
                                <li className={`nav-item mx-1.5 transition-all duration-300 hover:text-primary [&.active]:!text-primary ${
                                    shouldUseDarkText 
                                        ? 'text-dark [&.active]:text-primary' 
                                        : 'text-dark lg:text-white [&.active]:!text-primary'
                                }`}>
                                    <a
                                        className="nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize"
                                        href={isHomePage ? "#brands" : "/#brands"}
                                    >
                                        Les marques
                                    </a>
                                </li>
                                
                                <li className={`nav-item mx-1.5 transition-all duration-300 hover:text-primary [&.active]:!text-primary ${
                                    shouldUseDarkText 
                                        ? 'text-dark [&.active]:text-primary' 
                                        : 'text-dark lg:text-white [&.active]:!text-primary'
                                }`}>
                                    <a
                                        className="nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2 capitalize"
                                        href={isHomePage ? "#contact" : "/#contact"}
                                    >
                                        Contactez-nous
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ms-auto shrink hidden lg:inline-flex gap-2">
                            <Link
                                href="/cart"
                                className="relative py-2 px-6 inline-flex items-center gap-2 rounded-md text-base text-white bg-primary hover:bg-primaryDark transition-all duration-500 font-medium"
                            >
                                <IconifyIcon
                                    icon="lucide:shopping-cart"
                                    className="h-4 w-4 fill-white/40"
                                />
                                <span className="hidden sm:block">Panier</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#ff6b35] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;

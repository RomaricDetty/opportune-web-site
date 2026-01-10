'use client'
import logo from "@/assets/images/logo.png";
import logoElectroShop from "@/assets/images/logo-electro-shop.png";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import useScrollEvent from "@/hooks/useScrollEvent";
import Gumshoe from 'gumshoejs'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { useCartContext } from "@/context/useCartContext";

/**
 * Composant interne qui utilise useSearchParams
 */
const NavigationContent = () => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
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
    // Toujours utiliser du texte noir pour une meilleure visibilité
    const isSticky = scrollY >= 50;
    const shouldUseDarkText = true; // Toujours utiliser du texte noir pour une meilleure visibilité

    // Vérifier si on est sur la page others avec une catégorie spécifique
    const isOthersPage = pathname === '/others';
    const isTelephonesActive = isOthersPage && category === 'telephones';
    const isMobiliersActive = isOthersPage && category === 'mobiliers';
    const isAccessoiresActive = isOthersPage && category === 'accessoires';
    const isAboutPage = pathname === '/about';
    const isAccountPage = pathname === '/account';

    return (
        <>
            <nav
                ref={navRef}
                className={`navbar ${isSticky && " is-sticky"
                    } fixed top-0 start-0 end-0 z-999 transition-all duration-500 py-3 md:py-4 items-center shadow-md group ${
                        isHomePage && !isSticky 
                            ? 'bg-white/95 backdrop-blur-sm lg:bg-white/95' 
                            : 'bg-white'
                    }`}
                id="navbar"
            >
                <div className="container">
                    <div className="flex lg:flex-nowrap flex-wrap items-center">
                        <Link 
                            href="/" 
                            className="flex items-center transition-colors duration-300"
                        >
                            {/* <Image
                                src={logo}
                                className="h-9 flex"
                                alt="logo"
                                width={118}
                                height={36}
                            /> */}
                            <Image
                                src={logoElectroShop}
                                className="flex"
                                alt="logo"
                                width={118}
                                // height={36}
                            />
                        </Link>
                        <div className="lg:hidden flex items-center ms-auto gap-2 px-2.5">
                            <Link
                                href="/cart"
                                className="relative inline-flex items-center justify-center p-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-all duration-500"
                            >
                                <IconifyIcon
                                    icon="lucide:shopping-cart"
                                    className="h-6 w-6"
                                />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#ff6b35] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </Link>
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
                                {/* <li className={`nav-item mx-1.5 transition-all duration-300 hover:text-primary [&.active]:!text-primary ${
                                    shouldUseDarkText 
                                        ? 'text-dark [&.active]:text-primary' 
                                        : 'text-dark lg:text-white [&.active]:!text-primary'
                                }`}>
                                    <a
                                        className="nav-link inline-flex items-center text-sm lg:text-base font-medium py-0.5 px-2"
                                        href={isHomePage ? "#home" : "/#home"}
                                    >
                                        Electroménager
                                    </a>
                                </li> */}
                                <li className="nav-item mx-2 transition-all duration-300 hover:text-primary [&.active]:!text-primary text-gray-800 [&.active]:text-primary">
                                    <a
                                        className="nav-link inline-flex items-center text-base font-semibold py-1.5 px-3"
                                        href={isHomePage ? "#products" : "/#products"}
                                    >
                                        Nos produits
                                    </a>
                                </li>
                                <li className={`nav-item mx-2 transition-all duration-300 hover:text-primary [&.active]:!text-primary text-gray-800 [&.active]:text-primary ${isTelephonesActive ? 'active' : ''}`}>
                                    <Link
                                        href="/others?category=telephones"
                                        className="nav-link inline-flex items-center text-base font-semibold py-1.5 px-3"
                                    >
                                        Meilleurs ventes
                                    </Link>
                                </li>
                                
                                <li className={`nav-item mx-2 transition-all duration-300 hover:text-primary [&.active]:!text-primary text-gray-800 [&.active]:text-primary ${isAboutPage ? 'active' : ''}`}>
                                    <Link
                                        href="/about"
                                        className="nav-link inline-flex items-center text-base font-semibold py-1.5 px-3"
                                    >
                                        Qui sommes-nous ?
                                    </Link>
                                </li>

                                <li className={`nav-item mx-2 transition-all duration-300 hover:text-primary [&.active]:!text-primary text-gray-800 [&.active]:text-primary ${isAccountPage ? 'active' : ''}`}>
                                    <Link
                                        href="/account"
                                        className="nav-link inline-flex items-center text-base font-semibold py-1.5 px-3"
                                    >
                                        Mon compte
                                    </Link>
                                </li>
                                
                                <li className="nav-item mx-2 transition-all duration-300 hover:text-primary [&.active]:!text-primary text-gray-800 [&.active]:text-primary">
                                    <a
                                        className="nav-link inline-flex items-center text-base font-semibold py-1.5 px-3"
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
                                className="relative py-2.5 px-6 inline-flex items-center gap-2 rounded-md text-base text-white bg-primary hover:bg-primaryDark transition-all duration-500 font-semibold shadow-md hover:shadow-lg"
                            >
                                <IconifyIcon
                                    icon="lucide:shopping-cart"
                                    className="h-5 w-5"
                                />
                                <span>Panier</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
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

/**
 * Composant Navigation - Barre de navigation avec changement de couleur au scroll
 * Les éléments sont blancs par défaut sur la page d'accueil et noirs sur les autres pages
 */
const Navigation = () => {
    return (
        <Suspense fallback={
            <nav className="navbar fixed top-0 start-0 end-0 z-999 bg-white shadow-md">
                <div className="container">
                    <div className="flex items-center justify-between py-3 md:py-4">
                        <div className="h-9 w-32 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                </div>
            </nav>
        }>
            <NavigationContent />
        </Suspense>
    );
};

export default Navigation;

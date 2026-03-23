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
import SearchBar from '@/components/SearchBar'
import axiosInstance from '../lib/axios'
/**
 * Composant interne qui utilise useSearchParams
 */
const NavigationContent = ({ onToggleSidebar }:{ onToggleSidebar: () => void }) => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const isHomePage = pathname === '/';
    const { getTotalItems } = useCartContext();
    const totalItems = getTotalItems();
    // ── Categories (isSiteCategory) ──
    const [siteCategories, setSiteCategories] = useState<any[]>([]);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const categoryRef = useRef<HTMLDivElement>(null);
    // ── Mobile menu ──
    const [mobileOpen, setMobileOpen] = useState(false);


    useEffect(() => {
        if (navRef.current) new Gumshoe('.navbar-nav a', { offset: 80 })
    }, []);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get<any>('/categories?isSiteCategory=true');
      setSiteCategories(data.data);
    } catch (error) {
      setSiteCategories([]);
    }
  };

    fetchCategories();

}, []);

  
    const [scrollY, setScrollY] = useState(0);
    // const { scrollY } = useScrollEvent()
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

     // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
            setCategoryOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
 


        // ── Scroll / sticky bottom nav ──
        //   const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);




    // Déterminer si la navigation doit être en mode sombre (blanc) ou clair (noir)
    // Toujours utiliser du texte noir pour une meilleure visibilité
    const isSticky = scrollY >= 50;
    const shouldUseDarkText = true; // Toujours utiliser du texte noir pour une meilleure visibilité
    // Vérifier si on est sur la page others avec une catégorie spécifique
    const isOthersPage = pathname === '/others';
    const isTelephonesActive = isOthersPage && category === 'telephones';
    const isMobiliersActive = isOthersPage && category === 'mobiliers';
    const isAccessoiresActive = isOthersPage && category === 'accessoires';
    

    return (
        <>
        {/* ══════════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-3">
 
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={logoElectroShop}
                alt="EAS - Electronic Abidjan Shop"
                width={130}
                className="object-contain"
              />
            </Link>
 
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto">
              <SearchBar />
            </div>
        

            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <IconifyIcon icon="lucide:phone-call" className="h-5 w-5 text-orange-500" />
                </div>
                <div className="leading-tight">
                  <p className="text-[15px] text-gray-500 font-medium">Commandez au</p>
                  <a
                    href="tel:0788008600"
                    className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    07 88 00 86 00
                  </a>
                </div>
              </div>
            </div>


            {/* Mobile: cart + burger */}
            <div className="lg:hidden flex items-center gap-2 ms-auto">
              <Link
                href="/cart"
                className="relative p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              >
                <IconifyIcon icon="lucide:shopping-cart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-orange-500 transition-colors"
              >
                <IconifyIcon icon={mobileOpen ? 'lucide:x' : 'lucide:menu'} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
 

      {/* ══════════════════════════════════════════
          BOTTOM NAV BAR
          — always rendered, sticky on scroll
      ══════════════════════════════════════════ */}
      <nav
        className={`
          hidden lg:block bg-orange-50 border-b border-orange-100 py-2
          transition-all duration-300
          ${isSticky
            ? 'fixed top-0 left-0 right-0 z-[999] shadow-md bg-white border-gray-200 animate-slideDown'
            : 'relative z-10'}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 h-12">

            {/* ── Catégories → ouvre le sidebar ── */}
            <button
                onClick={onToggleSidebar}
                className="group relative flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold pl-1.5 pr-5 py-1.5 rounded-full  hover:shadow-orange-300/60 hover:shadow-lg transition-all duration-300"
                >
                {/* Cercle rouge avec icône */}
                <span className="flex items-center justify-center bg-white text-orange-500 rounded-full w-8 h-8 shadow-sm transition-transform duration-300">
                    <IconifyIcon icon="lucide:menu" className="w-6 h-6" />
                </span>
                {/* Texte */}
                <span className="tracking-wide">Toutes Les Catégories</span>
            </button>
            {/* ── Site Categories as nav links ── */}
            <ul className="flex items-center gap-0 overflow-x-auto">
              {siteCategories.map(cat => (
                <li key={cat.id} className="shrink-0">
                  <Link
                    href={`/others?category=${cat.libelle}`}
                    className="block px-3 text-base font-medium  hover:text-orange-500 transition-colors whitespace-nowrap leading-[3rem]"
                  >
                    {cat.libelle}
                  </Link>
                </li>
              ))}
            </ul>
              
            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 ml-auto">
              <Link
                    href={isHomePage ? "#contact" : "/#contact"}
                    className="block px-3 text-base font-semibold  hover:text-orange-600 transition-colors whitespace-nowrap leading-[3rem]"
                  >
                    Demander un devis
             </Link>
              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 ml-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 h-9 rounded-full transition-colors"
              >
                <IconifyIcon icon="lucide:shopping-cart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="whitespace-nowrap">
                    Panier
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
 

      {/*══════════════════════════════════════════
          MOBILE MENU COLLAPSE
      ══════════════════════════════════════════*/}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md z-50">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile search */}
            <div className="mb-3">
              <SearchBar />
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <button
                  onClick={() => { onToggleSidebar(); setMobileOpen(false); }}
                  className="w-full text-left flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
                >
                  <IconifyIcon icon="lucide:layout-grid" className="h-4 w-4" />
                  Toutes les catégories
                </button>
              </li>
              {siteCategories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              {/* Mobile contact */}
              <li className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1">
                <a href="tel:0788008600" className="flex items-center gap-2 text-sm text-orange-500 font-semibold px-3 py-1">
                  <IconifyIcon icon="lucide:phone-call" className="h-4 w-4" />
                  07 88 00 86 00
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
 
      {/* ── slideDown animation ── */}
      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out forwards;
        }
      `}</style>
    </>
    );
};

/**
 * Composant Navigation - Barre de navigation avec changement de couleur au scroll
 * Les éléments sont blancs par défaut sur la page d'accueil et noirs sur les autres pages
 */
const TestNavbar = ({ onToggleSidebar }:{ onToggleSidebar: () => void }) => {
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
            <NavigationContent onToggleSidebar={onToggleSidebar} />
        </Suspense>
    );
};

export default TestNavbar;

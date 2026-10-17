import { Suspense, type ReactNode } from 'react'
import ShopHeader from './ShopHeader'
import ShopFooter from './ShopFooter'
import CategoryRail from './CategoryRail'
import TopContactBar from './TopContactBar'
import PageTransition from './PageTransition'

interface ShopLayoutProps {
    children: ReactNode
    /** Contenu pleine largeur sous le header (ex. hero accueil). */
    top?: ReactNode
    /** Barres fixes hors transition de page (ex. CTA mobile fiche produit). */
    bottom?: ReactNode
}

/**
 * Layout commun des pages boutique.
 * @param props
 */
export default function ShopLayout({ children, top, bottom }: ShopLayoutProps) {
    return (
        <div className="shop-page-shell min-h-screen bg-[#f5f5f6] font-dm flex flex-col">
            <TopContactBar />
            <ShopHeader />
            {top}
            <div className="flex flex-col lg:flex-row lg:items-start flex-1 min-h-0 w-full">
                <Suspense fallback={null}>
                    <CategoryRail />
                </Suspense>
                <main className="flex-1 min-w-0 overflow-x-clip">
                    <PageTransition>{children}</PageTransition>
                </main>
            </div>
            <ShopFooter />
            {bottom}
        </div>
    )
}

import type { Article } from '@/types/articles'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import ShopProductCard from './ShopProductCard'

interface ProductSectionProps {
    title: string
    products: Article[]
    href?: string
}

/**
 * Section grille produits par catégorie.
 */
export default function ProductSection({ title, products, href }: ProductSectionProps) {
    if (!products?.length) return null

    return (
        <Reveal>
            <section className="container py-9 md:py-11 font-dm">
                <SectionHeader title={title} href={href} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {products.slice(0, 8).map((product, i) => (
                        <Reveal key={product.id} delay={Math.min(i * 40, 200)}>
                            <ShopProductCard product={product} />
                        </Reveal>
                    ))}
                </div>
            </section>
        </Reveal>
    )
}

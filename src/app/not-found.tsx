import ShopLayout from '@/components/shop/ShopLayout'
import Button from '@/components/ui/Button'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

/**
 * Page 404 alignée sur le layout boutique.
 */
export default function NotFound() {
    return (
        <ShopLayout>
            <section className="container py-16 md:py-24 font-dm">
                <div className="mx-auto max-w-lg text-center">
                    <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
                        ERREUR 404
                    </p>
                    <h1 className="text-3xl font-bold text-secondary md:text-4xl">
                        Page introuvable
                    </h1>
                    <p className="mt-3 text-gray-500">
                        La page que vous cherchez n&apos;existe pas ou a été déplacée.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Button href="/" size="lg">
                            <IconifyIcon icon="lucide:arrow-left" className="h-4 w-4" />
                            Retour à l&apos;accueil
                        </Button>
                    </div>
                </div>
            </section>
        </ShopLayout>
    )
}

import ShopLayout from '@/components/shop/ShopLayout'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import PageHero from '@/components/ui/PageHero'
import Surface from '@/components/ui/Surface'

const services = [
    {
        icon: 'lucide:truck',
        title: 'Livraison à domicile',
        lead: 'Recevez vos appareils où vous êtes, en toute sérénité.',
        points: [
            'Livraison dans Abidjan et les principales villes de Côte d’Ivoire',
            'Suivi de commande depuis votre espace client',
            'Prise de rendez-vous pour les gros volumes',
        ],
    },
    {
        icon: 'lucide:headset',
        title: 'Conseil & support',
        lead: 'Un expert vous aide à choisir le bon produit selon votre besoin.',
        points: [
            'Accompagnement avant et après l’achat',
            'Conseils sur les marques et les caractéristiques',
            'Assistance téléphonique pendant les heures d’ouverture',
        ],
    },
    {
        icon: 'lucide:shield-check',
        title: 'Garantie constructeur',
        lead: 'Achetez en confiance avec une couverture claire.',
        points: [
            'Produits garantis selon les conditions du fabricant',
            'Aide pour ouvrir un dossier SAV si besoin',
            'Pièces et échanges selon les modalités en vigueur',
        ],
    },
    {
        icon: 'solar:plug-circle-bold',
        title: 'Mise en service',
        lead: 'On facilite l’installation des appareils concernés.',
        points: [
            'Conseils de branchement et de première utilisation',
            'Orientation vers un technicien partenaire si nécessaire',
            'Conditions précisées au moment de la commande',
        ],
    },
]

const steps = [
    { n: '01', title: 'Choisissez', text: 'Parcourez la boutique et ajoutez vos articles au panier.' },
    { n: '02', title: 'Commandez', text: 'Validez vos coordonnées et le mode de livraison.' },
    { n: '03', title: 'Recevez', text: 'Nous préparons puis livrons votre commande rapidement.' },
]

/**
 * Page Nos services — parcours client et offres d’accompagnement.
 */
export default function ServicesPage() {
    return (
        <ShopLayout>
            <div className="font-dm">
                <PageHero
                    title="Nos services"
                    description="De l’achat à la livraison, Electro Store vous accompagne avec des services concrets pour l’électroménager et le high-tech."
                >
                    <Button href="/shop">
                        Voir la boutique
                        <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                    </Button>
                    <Button
                        href="/contact"
                        variant="secondary"
                        className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40 rounded-full"
                    >
                        Parler à un conseiller
                    </Button>
                </PageHero>

                <section className="container py-10 md:py-14">
                    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-2">Ce que nous proposons</h2>
                    <p className="text-muted text-sm md:text-base mb-8 max-w-2xl">
                        Quatre services essentiels pour acheter sereinement, sans mauvaise surprise.
                    </p>

                    <div className="space-y-4 md:space-y-5">
                        {services.map((service, index) => (
                            <Surface
                                key={service.title}
                                padding="lg"
                                className={`flex flex-col md:flex-row gap-5 md:gap-8 ${
                                    index % 2 === 0 ? '' : 'bg-[#fff4ef] border-primary/10'
                                }`}
                            >
                                <div className="flex md:flex-col items-center md:items-start gap-3 md:w-48 shrink-0">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                                        <IconifyIcon icon={service.icon} className="h-6 w-6" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-secondary">
                                        {service.title}
                                    </h3>
                                </div>
                                <div className="flex-1">
                                    <p className="text-secondary/80 mb-3">{service.lead}</p>
                                    <ul className="space-y-2">
                                        {service.points.map((point) => (
                                            <li key={point} className="flex gap-2 text-sm text-muted">
                                                <IconifyIcon
                                                    icon="lucide:check"
                                                    className="h-4 w-4 text-primary shrink-0 mt-0.5"
                                                />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Surface>
                        ))}
                    </div>
                </section>

                <section className="bg-white border-y border-gray-100">
                    <div className="container py-10 md:py-12">
                        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-2">Comment ça marche</h2>
                        <p className="text-muted text-sm mb-8">Un parcours simple, du panier jusqu’à chez vous.</p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {steps.map((step) => (
                                <div key={step.n} className="relative">
                                    <span className="text-4xl font-bold text-primary/20">{step.n}</span>
                                    <h3 className="mt-1 text-lg font-semibold text-secondary">{step.title}</h3>
                                    <p className="mt-1 text-sm text-muted leading-relaxed">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container py-10 md:py-14">
                    <div className="rounded-2xl bg-secondary text-white px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold">Besoin d’un conseil personnalisé ?</h2>
                            <p className="mt-2 text-white/70 text-sm max-w-md">
                                Notre équipe vous oriente vers le bon appareil, au bon prix, en FCFA.
                            </p>
                        </div>
                        <Button href="/contact" size="lg" className="shrink-0">
                            Contactez-nous
                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </div>
        </ShopLayout>
    )
}

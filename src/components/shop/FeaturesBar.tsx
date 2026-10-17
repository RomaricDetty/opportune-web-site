import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Reveal from '@/components/ui/Reveal'

const features = [
    { icon: 'lucide:truck', title: 'Livraison', subtitle: "Partout en Côte d'Ivoire" },
    { icon: 'lucide:headset', title: 'Conseil', subtitle: 'Un expert à votre écoute' },
    { icon: 'lucide:shield-check', title: 'Garantie', subtitle: 'Produits certifiés' },
    { icon: 'lucide:wallet', title: 'Prix FCFA', subtitle: 'Transparents, sans surprise' },
]

/**
 * Bandeau avantages — ligne sobre, sans cartes empilées.
 */
export default function FeaturesBar() {
    return (
        <section className="border-y border-gray-200/80 bg-white font-dm">
            <div className="container py-5 md:py-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 md:gap-x-8">
                    {features.map((feature, index) => (
                        <Reveal key={feature.title} delay={index * 60}>
                            <div
                                className={`flex items-start gap-3 ${
                                    index < features.length - 1
                                        ? 'lg:border-r lg:border-gray-100 lg:pr-8'
                                        : ''
                                }`}
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff4ef] text-primary transition-transform duration-300 hover:scale-110">
                                    <IconifyIcon icon={feature.icon} className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-secondary">
                                        {feature.title}
                                    </p>
                                    <p className="text-xs text-muted mt-0.5 leading-snug">
                                        {feature.subtitle}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

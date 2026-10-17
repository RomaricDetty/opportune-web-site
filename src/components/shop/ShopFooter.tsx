import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import BrandLogo from '@/components/shop/BrandLogo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL, whatsappUrl } from '@/lib/storeContact'

const links = [
    { href: '/shop', label: 'Boutique' },
    { href: '/services', label: 'Nos Services' },
    { href: '/contact', label: 'Contactez-nous' },
    { href: '/account', label: 'Mon compte' },
]

/**
 * Pied de page boutique — marque mise en avant, contact actionnable.
 */
export default function ShopFooter() {
    return (
        <footer className="mt-16 font-dm border-t border-gray-200/80 bg-[#fafafa]">
            <Reveal>
            <div className="container pt-12 md:pt-14 pb-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-gray-200/90">
                    <div className="max-w-md">
                        <BrandLogo height={56} />
                        <p className="mt-4 text-sm text-muted leading-relaxed">
                            Électroménager & high-tech. Prix en FCFA, livraison en Côte d&apos;Ivoire.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <Button
                            href={whatsappUrl('Bonjour Electro Store')}
                            variant="whatsapp"
                            size="md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconifyIcon icon="lucide:message-circle" className="h-4 w-4" />
                            WhatsApp
                        </Button>
                        <Button href={`tel:${STORE_PHONE_TEL}`} size="md">
                            <IconifyIcon icon="lucide:phone" className="h-4 w-4" />
                            Appeler
                        </Button>
                    </div>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 pt-10">
                    <div className="lg:col-span-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                            Navigation
                        </p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                            Infos pratiques
                        </p>
                        <ul className="space-y-3 text-sm text-muted">
                            <li className="flex gap-2.5 items-start">
                                <IconifyIcon
                                    icon="lucide:map-pin"
                                    className="h-4 w-4 text-primary shrink-0 mt-0.5"
                                />
                                <span>Abidjan, Côte d&apos;Ivoire</span>
                            </li>
                            <li className="flex gap-2.5 items-start">
                                <IconifyIcon
                                    icon="lucide:clock"
                                    className="h-4 w-4 text-primary shrink-0 mt-0.5"
                                />
                                <span>Lun – Sam · 8h00 – 17h00</span>
                            </li>
                            <li className="flex gap-2.5 items-start">
                                <IconifyIcon
                                    icon="lucide:mail"
                                    className="h-4 w-4 text-primary shrink-0 mt-0.5"
                                />
                                <a
                                    href="mailto:contact@electrostoreci.com"
                                    className="hover:text-primary transition-colors"
                                >
                                    contact@electrostoreci.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                            Nous joindre
                        </p>
                        <a
                            href={`tel:${STORE_PHONE_TEL}`}
                            className="block text-lg md:text-xl font-bold text-secondary hover:text-primary transition-colors tracking-tight"
                        >
                            {STORE_PHONE_DISPLAY}
                        </a>
                        <p className="mt-2 text-sm text-muted leading-relaxed">
                            Un conseiller vous oriente vers le bon produit, au bon prix.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryDark"
                        >
                            Écrire un message
                            <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
            </Reveal>

            <div className="border-t border-gray-200/90 bg-white">
                <div className="container pt-4 pb-6 sm:pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
                    <p>© {new Date().getFullYear()} Electro Store.ci — Tous droits réservés.</p>
                    <p className="text-secondary/50 pb-1 sm:pb-0">Prix affichés en FCFA (XOF)</p>
                </div>
            </div>
        </footer>
    )
}

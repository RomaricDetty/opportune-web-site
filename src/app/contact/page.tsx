'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import ShopLayout from '@/components/shop/ShopLayout'
import Breadcrumb from '@/components/shop/Breadcrumb'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Surface from '@/components/ui/Surface'
import PageHero from '@/components/ui/PageHero'
import SocialLinks from '@/components/shop/SocialLinks'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL, whatsappUrl } from '@/lib/storeContact'
import { contactService } from '@/services/contactService'
import { useToast } from '@/context/useToastContext'

const contacts = [
    {
        icon: 'lucide:phone',
        label: 'Téléphone',
        value: STORE_PHONE_DISPLAY,
        href: `tel:${STORE_PHONE_TEL}`,
        hint: 'Lun – Sam, 8h – 17h',
    },
    {
        icon: 'lucide:mail',
        label: 'Email',
        value: 'contact@electrostoreci.com',
        href: 'mailto:contact@electrostoreci.com',
        hint: 'Réponse sous 24 h ouvrées',
    },
    {
        icon: 'lucide:map-pin',
        label: 'Adresse',
        value: 'Abidjan, Côte d’Ivoire',
        href: null,
        hint: 'Showroom & point retrait',
    },
]

const faqs = [
    {
        q: 'Quels sont les délais de livraison ?',
        a: 'À Abidjan, la plupart des commandes partent sous 24 à 72 h selon disponibilité. Hors Abidjan, le délai dépend de la destination.',
    },
    {
        q: 'Puis-je venir retirer ma commande ?',
        a: 'Oui, le retrait en magasin est possible après confirmation. Contactez-nous pour convenir d’un créneau.',
    },
    {
        q: 'Comment obtenir un devis ?',
        a: 'Indiquez le produit et la quantité via le formulaire ci-contre, ou appelez-nous directement pour un devis rapide.',
    },
]

/**
 * Page Contactez-nous — infos, formulaire et FAQ.
 */
export default function ContactPage() {
    const { showToast } = useToast()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [sent, setSent] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    /**
     * Enregistre le message de contact en base.
     * @param e
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        try {
            await contactService.create({
                nom: name.trim(),
                email: email.trim(),
                telephone: phone.trim(),
                message: message.trim(),
            })
            setSent(true)
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            showToast('Message envoyé — nous vous répondrons rapidement.')
        } catch {
            showToast("Impossible d'envoyer le message. Réessayez.", { tone: 'error' })
        } finally {
            setSubmitting(false)
        }
    }

    /**
     * Réinitialise le formulaire pour un nouvel envoi.
     */
    const resetForm = () => {
        setSent(false)
    }

    return (
        <ShopLayout>
            <div className="font-dm">
                <PageHero
                    title="Contactez-nous"
                    description="Une question sur un produit, une commande ou un devis ? Écrivez-nous ou passez un coup de fil — on vous répond rapidement."
                >
                    <Button
                        href={whatsappUrl(
                            'Bonjour Electro Store, j’aimerais avoir des informations.'
                        )}
                        variant="whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconifyIcon icon="lucide:message-circle" className="h-4 w-4" />
                        WhatsApp
                    </Button>
                    <Button
                        href={`tel:${STORE_PHONE_TEL}`}
                        variant="secondary"
                        className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/40 rounded-full"
                    >
                        <IconifyIcon icon="lucide:phone" className="h-4 w-4" />
                        Appeler
                    </Button>
                </PageHero>

                <section className="container py-8 md:py-12">
                    <Breadcrumb
                        items={[{ label: 'Accueil', href: '/' }, { label: 'Contactez-nous' }]}
                    />
                    <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-lg font-bold text-secondary">Nos coordonnées</h2>
                            {contacts.map((item) => {
                                const content = (
                                    <>
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <IconifyIcon icon={item.icon} className="h-5 w-5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                                                {item.label}
                                            </p>
                                            <p className="text-sm font-semibold text-secondary break-words">
                                                {item.value}
                                            </p>
                                            <p className="text-xs text-muted mt-0.5">{item.hint}</p>
                                        </div>
                                    </>
                                )
                                return item.href ? (
                                    <a key={item.label} href={item.href} className="block">
                                        <Surface padding="sm" hover className="flex gap-3">
                                            {content}
                                        </Surface>
                                    </a>
                                ) : (
                                    <Surface key={item.label} padding="sm" className="flex gap-3">
                                        {content}
                                    </Surface>
                                )
                            })}

                            <SocialLinks className="pt-1" />

                            <div className="rounded-2xl bg-[#fff4ef] border border-primary/10 p-5">
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <IconifyIcon icon="lucide:clock" className="h-5 w-5" />
                                    <h3 className="font-semibold text-secondary">Horaires</h3>
                                </div>
                                <ul className="text-sm text-muted space-y-1.5">
                                    <li className="flex justify-between gap-4">
                                        <span>Lundi – Vendredi</span>
                                        <span className="font-medium text-secondary">8h00 – 17h00</span>
                                    </li>
                                    <li className="flex justify-between gap-4">
                                        <span>Samedi</span>
                                        <span className="font-medium text-secondary">8h00 – 17h00</span>
                                    </li>
                                    <li className="flex justify-between gap-4">
                                        <span>Dimanche</span>
                                        <span className="font-medium text-secondary">Fermé</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <Surface padding="lg">
                                <h2 className="text-lg font-bold text-secondary mb-1">
                                    Envoyez-nous un message
                                </h2>
                                <p className="text-sm text-muted mb-6">
                                    Remplissez le formulaire : votre message est enregistré et notre
                                    équipe vous répond rapidement.
                                </p>

                                {sent ? (
                                    <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 text-center">
                                        <IconifyIcon
                                            icon="lucide:check-circle-2"
                                            className="h-10 w-10 text-primary mx-auto mb-2"
                                        />
                                        <p className="font-semibold text-secondary">Message envoyé</p>
                                        <p className="text-sm text-muted mt-1 mb-4">
                                            Merci. Nous avons bien reçu votre message et vous
                                            répondrons sous 24 h ouvrées.
                                        </p>
                                        <Button type="button" variant="ghost" onClick={resetForm}>
                                            Écrire un autre message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Nom complet"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Votre nom"
                                            />
                                            <Input
                                                label="Téléphone"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="+225 …"
                                            />
                                        </div>
                                        <Input
                                            label="Email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="vous@email.com"
                                        />
                                        <Textarea
                                            label="Message"
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Produit, quantité, question…"
                                        />
                                        <Button type="submit" size="lg" disabled={submitting}>
                                            {submitting ? 'Envoi…' : 'Envoyer le message'}
                                            <IconifyIcon
                                                icon={submitting ? 'lucide:loader-2' : 'lucide:send'}
                                                className={`h-4 w-4 ${submitting ? 'animate-spin' : ''}`}
                                            />
                                        </Button>
                                    </form>
                                )}
                            </Surface>
                        </div>
                    </div>
                </section>

                <section className="bg-white border-t border-gray-100">
                    <div className="container py-10 md:py-12">
                        <h2 className="text-xl font-bold text-secondary mb-6">Questions fréquentes</h2>
                        <div className="grid md:grid-cols-3 gap-5">
                            {faqs.map((faq) => (
                                <div key={faq.q}>
                                    <h3 className="font-semibold text-secondary text-sm mb-2">{faq.q}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/services"
                                className="text-sm font-semibold text-primary inline-flex items-center gap-1.5"
                            >
                                Découvrir nos services
                                <IconifyIcon icon="lucide:arrow-right" className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </ShopLayout>
    )
}

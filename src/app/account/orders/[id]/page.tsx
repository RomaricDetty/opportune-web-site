'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import Breadcrumb from '@/components/shop/Breadcrumb'
import Button from '@/components/ui/Button'
import Surface from '@/components/ui/Surface'
import { useAuthContext } from '@/context/useAuthContext'
import { orderService } from '@/services/orderService'
import { formatXof } from '@/lib/formatPrice'
import { ORDER_STEPS, ORDER_STATUS, orderStatusLabel } from '@/lib/orderStatus'
import { STORE_PHONE_TEL, whatsappUrl } from '@/lib/storeContact'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const PAYMENT_LABELS: Record<string, string> = {
    unpaid: 'Non payé',
    paid: 'Payé',
    refunded: 'Remboursé',
    cash_on_delivery: 'Paiement à la livraison',
}

/**
 * Détail / suivi d’une commande client.
 */
export default function OrderDetailPage() {
    const params = useParams()
    const id = String(params.id)
    const router = useRouter()
    const { isAuthenticated, loading: authLoading } = useAuthContext()
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace('/auth/login?next=/account/orders/' + id)
        }
    }, [authLoading, isAuthenticated, router, id])

    useEffect(() => {
        if (!isAuthenticated) return
        orderService
            .getById(id)
            .then(setOrder)
            .catch(() => setOrder(null))
            .finally(() => setLoading(false))
    }, [id, isAuthenticated])

    const meta = order ? ORDER_STATUS[order.statut] || { label: order.statut, step: 1 } : null
    const cancelled = order?.statut === 'cancelled'

    return (
        <ShopLayout>
            <div className="container py-8 font-dm max-w-3xl">
                <Breadcrumb
                    items={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Mon compte', href: '/account' },
                        { label: order?.reference || 'Commande' },
                    ]}
                />

                {loading && <p className="text-muted">Chargement...</p>}
                {!loading && !order && <p className="text-muted">Commande introuvable</p>}

                {order && meta && (
                    <Surface className="space-y-6">
                        <div className="flex justify-between gap-3 flex-wrap">
                            <div>
                                <h1 className="text-xl font-bold text-secondary">{order.reference}</h1>
                                <p
                                    className={`text-sm font-semibold mt-1 ${
                                        cancelled
                                            ? 'text-red-500'
                                            : meta.step >= 5
                                              ? 'text-green-600'
                                              : 'text-primary'
                                    }`}
                                >
                                    {orderStatusLabel(order.statut)}
                                </p>
                            </div>
                            <p className="text-lg font-bold text-primary">
                                {formatXof(order.montantTotal)}
                            </p>
                        </div>

                        {!cancelled && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-3">
                                    Suivi
                                </p>
                                <ol className="space-y-3">
                                    {ORDER_STEPS.map((label, idx) => {
                                        const stepNum = idx + 1
                                        const done = meta.step >= stepNum
                                        const current = meta.step === stepNum
                                        return (
                                            <li key={label} className="flex items-center gap-3">
                                                <span
                                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                        done
                                                            ? 'bg-primary text-white'
                                                            : 'bg-gray-100 text-muted'
                                                    }`}
                                                >
                                                    {done ? (
                                                        <IconifyIcon icon="lucide:check" className="h-3.5 w-3.5" />
                                                    ) : (
                                                        stepNum
                                                    )}
                                                </span>
                                                <span
                                                    className={`text-sm ${
                                                        current
                                                            ? 'font-semibold text-secondary'
                                                            : done
                                                              ? 'text-secondary'
                                                              : 'text-muted'
                                                    }`}
                                                >
                                                    {label}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )}

                        <div className="text-sm text-muted space-y-1 border-t border-gray-100 pt-4">
                            <p>
                                {order.adresseLivraison}, {order.villeLivraison}
                            </p>
                            <p>{order.telephoneLivraison}</p>
                            <p>
                                Paiement :{' '}
                                {PAYMENT_LABELS[order.modePaiement] || order.modePaiement} (
                                {PAYMENT_LABELS[order.statutPaiement] || order.statutPaiement})
                            </p>
                        </div>

                        <ul className="divide-y divide-gray-100 border-t border-gray-100">
                            {(order.items || []).map((item: any) => (
                                <li key={item.id} className="py-3 flex justify-between gap-3 text-sm">
                                    <span>
                                        {item.libelle} × {item.quantite}
                                    </span>
                                    <span className="font-semibold">{formatXof(item.sousTotal)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                href={whatsappUrl(
                                    `Bonjour, concernant ma commande ${order.reference}`
                                )}
                                variant="whatsapp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl"
                            >
                                WhatsApp
                            </Button>
                            <Button href={`tel:${STORE_PHONE_TEL}`} variant="secondary">
                                Appeler
                            </Button>
                            <Button href="/account" variant="ghost">
                                Retour au compte
                            </Button>
                        </div>
                    </Surface>
                )}
            </div>
        </ShopLayout>
    )
}

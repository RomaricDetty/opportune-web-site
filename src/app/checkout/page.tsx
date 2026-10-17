'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Surface from '@/components/ui/Surface'
import EmptyState from '@/components/ui/EmptyState'
import { useAuthContext } from '@/context/useAuthContext'
import { useCartContext } from '@/context/useCartContext'
import { orderService } from '@/services/orderService'
import { formatXof, priceAfterDiscount } from '@/lib/formatPrice'

/**
 * Page checkout / validation de commande.
 */
export default function CheckoutPage() {
    const router = useRouter()
    const { isAuthenticated, client, loading: authLoading } = useAuthContext()
    const { cartItems, getTotalPrice, clearCart } = useCartContext()
    const [form, setForm] = useState({
        adresseLivraison: '',
        villeLivraison: '',
        telephoneLivraison: '',
        modePaiement: 'cash_on_delivery' as
            | 'cash_on_delivery'
            | 'mobile_money'
            | 'bank_transfer',
        notes: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace('/auth/login?next=/checkout')
        }
    }, [authLoading, isAuthenticated, router])

    useEffect(() => {
        if (client) {
            setForm((prev) => ({
                ...prev,
                adresseLivraison: client.adresse || '',
                villeLivraison: client.ville || '',
                telephoneLivraison: client.telephone || '',
            }))
        }
    }, [client])

    /**
     * Soumet la commande.
     * @param e
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (cartItems.length === 0) return
        setError('')
        setLoading(true)
        try {
            const res = await orderService.create({
                items: cartItems.map((item) => ({
                    idProduit: item.product.id,
                    quantite: item.quantity,
                })),
                ...form,
            })
            clearCart()
            const orderId = res?.data?.id
            router.push(orderId ? `/account/orders/${orderId}` : '/account')
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Impossible de créer la commande')
        } finally {
            setLoading(false)
        }
    }

    if (authLoading || !isAuthenticated) {
        return (
            <ShopLayout>
                <div className="container py-16 text-center text-muted font-dm">Chargement...</div>
            </ShopLayout>
        )
    }

    if (cartItems.length === 0) {
        return (
            <ShopLayout>
                <div className="container py-8 font-dm">
                    <EmptyState
                        icon="lucide:shopping-cart"
                        title="Votre panier est vide"
                        description="Ajoutez des articles avant de valider une commande."
                        actionHref="/shop"
                        actionLabel="Retour boutique"
                    />
                </div>
            </ShopLayout>
        )
    }

    return (
        <ShopLayout>
            <div className="container py-8 font-dm">
                <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Checkout</h1>
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
                    <Surface className="lg:col-span-2 space-y-4">
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Input
                            label="Adresse de livraison"
                            required
                            value={form.adresseLivraison}
                            onChange={(e) =>
                                setForm({ ...form, adresseLivraison: e.target.value })
                            }
                        />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <Input
                                label="Ville"
                                required
                                value={form.villeLivraison}
                                onChange={(e) =>
                                    setForm({ ...form, villeLivraison: e.target.value })
                                }
                            />
                            <Input
                                label="Téléphone"
                                required
                                value={form.telephoneLivraison}
                                onChange={(e) =>
                                    setForm({ ...form, telephoneLivraison: e.target.value })
                                }
                            />
                        </div>
                        <Select
                            label="Mode de paiement"
                            value={form.modePaiement}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    modePaiement: e.target.value as typeof form.modePaiement,
                                })
                            }
                        >
                            <option value="cash_on_delivery">Paiement à la livraison</option>
                            <option value="mobile_money">Mobile Money</option>
                            <option value="bank_transfer">Virement bancaire</option>
                        </Select>
                        <Textarea
                            label="Notes (optionnel)"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            rows={3}
                            className="min-h-[96px]"
                        />
                    </Surface>

                    <Surface className="h-fit">
                        <h2 className="font-bold mb-4">Votre commande</h2>
                        <ul className="space-y-2 text-sm mb-4">
                            {cartItems.map((item) => {
                                const unit = priceAfterDiscount(
                                    item.product.prix,
                                    item.product.discount ?? item.product.remise
                                )
                                return (
                                    <li
                                        key={item.product.id}
                                        className="flex justify-between gap-2"
                                    >
                                        <span className="text-muted line-clamp-1">
                                            {item.product.libelle} × {item.quantity}
                                        </span>
                                        <span className="font-semibold shrink-0">
                                            {formatXof(unit * item.quantity)}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="flex justify-between font-bold border-t border-gray-100 pt-3">
                            <span>Total</span>
                            <span className="text-primary">{formatXof(getTotalPrice())}</span>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            fullWidth
                            className="mt-5 rounded-xl"
                        >
                            {loading ? 'Validation...' : 'Confirmer la commande'}
                        </Button>
                    </Surface>
                </form>
            </div>
        </ShopLayout>
    )
}

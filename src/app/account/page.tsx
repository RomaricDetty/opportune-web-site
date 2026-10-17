'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import Breadcrumb from '@/components/shop/Breadcrumb'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Surface from '@/components/ui/Surface'
import EmptyState from '@/components/ui/EmptyState'
import { useAuthContext } from '@/context/useAuthContext'
import { authService } from '@/services/authService'
import { orderService } from '@/services/orderService'
import { formatXof } from '@/lib/formatPrice'
import { ORDER_STEPS, ORDER_STATUS, orderStatusLabel } from '@/lib/orderStatus'

/**
 * Page mon compte (profil + commandes).
 */
export default function AccountPage() {
    const router = useRouter()
    const { isAuthenticated, client, loading: authLoading, refreshProfile, logout } =
        useAuthContext()
    const [orders, setOrders] = useState<any[]>([])
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        ville: '',
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.replace('/auth/login?next=/account')
        }
    }, [authLoading, isAuthenticated, router])

    useEffect(() => {
        if (client) {
            setForm({
                nom: client.nom || '',
                prenom: client.prenom || '',
                telephone: client.telephone || '',
                adresse: client.adresse || '',
                ville: client.ville || '',
            })
        }
    }, [client])

    useEffect(() => {
        if (!isAuthenticated) return
        orderService.getMine().then(setOrders).catch(() => setOrders([]))
    }, [isAuthenticated])

    /**
     * Enregistre le profil.
     * @param e
     */
    const handleSave = async (e: FormEvent) => {
        e.preventDefault()
        setMessage('')
        setError('')
        try {
            await authService.updateProfile(form)
            await refreshProfile()
            setMessage('Profil mis à jour')
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Erreur de mise à jour')
        }
    }

    if (authLoading || !isAuthenticated) {
        return (
            <ShopLayout>
                <div className="container py-16 text-center text-muted font-dm">Chargement...</div>
            </ShopLayout>
        )
    }

    return (
        <ShopLayout>
            <div className="container py-8 font-dm">
                <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Mon compte' }]} />
                <div className="flex items-center justify-between mb-6 gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary">Mon compte</h1>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            logout()
                            router.push('/')
                        }}
                    >
                        Déconnexion
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <Surface>
                        <form onSubmit={handleSave} className="space-y-3">
                            <h2 className="font-bold text-secondary mb-2">Mes informations</h2>
                            {message && <p className="text-sm text-emerald-600">{message}</p>}
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <p className="text-sm text-muted">{client?.email}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Nom"
                                    required
                                    value={form.nom}
                                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                    placeholder="Nom"
                                />
                                <Input
                                    label="Prénom"
                                    required
                                    value={form.prenom}
                                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                                    placeholder="Prénom"
                                />
                            </div>
                            <Input
                                label="Téléphone"
                                required
                                value={form.telephone}
                                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                                placeholder="Téléphone"
                            />
                            <Input
                                label="Adresse"
                                value={form.adresse}
                                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                                placeholder="Adresse"
                            />
                            <Input
                                label="Ville"
                                value={form.ville}
                                onChange={(e) => setForm({ ...form, ville: e.target.value })}
                                placeholder="Ville"
                            />
                            <Button type="submit" className="rounded-xl">
                                Enregistrer
                            </Button>
                        </form>
                    </Surface>

                    <Surface>
                        <h2 className="font-bold text-secondary mb-4">Mes commandes</h2>
                        {orders.length === 0 && (
                            <EmptyState
                                icon="lucide:package"
                                title="Aucune commande"
                                description="Vos commandes apparaîtront ici après validation."
                                actionHref="/shop"
                                actionLabel="Voir la boutique"
                                className="border-0 shadow-none p-4"
                            />
                        )}
                        <ul className="space-y-4">
                            {orders.map((order) => {
                                const meta = ORDER_STATUS[order.statut] || {
                                    label: order.statut,
                                    step: 1,
                                }
                                const cancelled = order.statut === 'cancelled'
                                return (
                                    <li
                                        key={order.id}
                                        className="border border-gray-100 rounded-xl p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <p className="font-semibold text-sm">{order.reference}</p>
                                                <p
                                                    className={`text-xs font-medium mt-0.5 ${
                                                        cancelled
                                                            ? 'text-red-500'
                                                            : meta.step >= 5
                                                              ? 'text-emerald-600'
                                                              : 'text-primary'
                                                    }`}
                                                >
                                                    {orderStatusLabel(order.statut)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-primary">
                                                    {formatXof(order.montantTotal)}
                                                </p>
                                                <Link
                                                    href={`/account/orders/${order.id}`}
                                                    className="text-xs text-secondary hover:text-primary"
                                                >
                                                    Suivre
                                                </Link>
                                            </div>
                                        </div>
                                        {!cancelled && (
                                            <div className="flex gap-1">
                                                {ORDER_STEPS.map((label, idx) => {
                                                    const stepNum = idx + 1
                                                    const done = meta.step >= stepNum
                                                    return (
                                                        <div
                                                            key={label}
                                                            className="flex-1"
                                                            title={label}
                                                        >
                                                            <div
                                                                className={`h-1.5 rounded-full ${
                                                                    done ? 'bg-primary' : 'bg-gray-100'
                                                                }`}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </Surface>
                </div>
            </div>
        </ShopLayout>
    )
}

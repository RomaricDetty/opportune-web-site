'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import { useAuthContext } from '@/context/useAuthContext'

const inputClass =
    'block w-full box-border rounded-xl border border-solid border-gray-200 bg-white px-4 py-3 text-sm text-secondary placeholder:text-gray-400 outline-none focus:border-primary'

/**
 * Page inscription client.
 */
export default function RegisterPage() {
    const { register } = useAuthContext()
    const router = useRouter()
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        adresse: '',
        ville: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    /**
     * Met à jour un champ du formulaire.
     */
    const setField = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    /**
     * Soumet l'inscription.
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await register(form)
            router.push('/account')
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Inscription impossible')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ShopLayout>
            <section className="font-dm px-4 py-10 sm:py-14">
                <div className="mx-auto w-full max-w-[520px]">
                    <h1 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
                        Créer un compte
                    </h1>
                    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <form onSubmit={handleSubmit} className="m-0 block w-full">
                            <div className="flex w-full flex-col gap-4 p-6 sm:p-8">
                                {error && (
                                    <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p>
                                )}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">Nom</label>
                                        <input required value={form.nom} onChange={(e) => setField('nom', e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">Prénom</label>
                                        <input required value={form.prenom} onChange={(e) => setField('prenom', e.target.value)} className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">Email</label>
                                    <input type="email" required value={form.email} onChange={(e) => setField('email', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">Téléphone</label>
                                    <input required value={form.telephone} onChange={(e) => setField('telephone', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">Mot de passe</label>
                                    <input type="password" required minLength={6} value={form.password} onChange={(e) => setField('password', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">Adresse</label>
                                    <input value={form.adresse} onChange={(e) => setField('adresse', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">Ville</label>
                                    <input value={form.ville} onChange={(e) => setField('ville', e.target.value)} className={inputClass} />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primaryDark disabled:opacity-60"
                                >
                                    {loading ? 'Création...' : 'Créer mon compte'}
                                </button>
                                <p className="text-center text-sm leading-relaxed text-muted">
                                    Déjà un compte ?{' '}
                                    <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                                        Se connecter
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </ShopLayout>
    )
}

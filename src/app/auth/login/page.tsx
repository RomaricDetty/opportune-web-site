'use client'

import Link from 'next/link'
import { FormEvent, Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ShopLayout from '@/components/shop/ShopLayout'
import { useAuthContext } from '@/context/useAuthContext'

const inputClass =
    'block w-full box-border rounded-xl border border-solid border-gray-200 bg-white px-4 py-3 text-sm text-secondary placeholder:text-gray-400 outline-none focus:border-primary'

/**
 * Formulaire de connexion.
 */
function LoginForm() {
    const { login } = useAuthContext()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    /**
     * Autorise uniquement les redirections internes (anti open-redirect).
     * @param value
     */
    const safeNextPath = (value: string | null) => {
        if (!value || !value.startsWith('/') || value.startsWith('//')) return '/account'
        return value
    }

    /**
     * Soumet le formulaire de connexion.
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            router.push(safeNextPath(searchParams.get('next')))
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Connexion impossible')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="m-0 block w-full">
                <div className="flex w-full flex-col gap-5 p-6 sm:p-8">
                    {error && (
                        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-500">{error}</p>
                    )}
                    <div className="w-full">
                        <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-secondary">
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ex: client@demo.ci"
                            className={inputClass}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-secondary">
                            Mot de passe
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={inputClass}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primaryDark disabled:opacity-60"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                    <p className="text-center text-sm leading-relaxed text-muted">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

/**
 * Page connexion client.
 */
export default function LoginPage() {
    return (
        <ShopLayout>
            <section className="font-dm px-4 py-10 sm:py-14">
                <div className="mx-auto w-full max-w-[440px]">
                    <h1 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
                        Connexion
                    </h1>
                    <Suspense fallback={<p className="text-center text-muted">Chargement...</p>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </section>
        </ShopLayout>
    )
}

"use client"
import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useAuthContext } from '@/context/useAuthContext'
import { useOrdersContext } from '@/context/useOrdersContext'
import { formatPrice } from '@/data/products'
import Link from 'next/link'

/**
 * Page Account - Gestion du compte utilisateur avec connexion/inscription et listing des commandes
 * Design mobile-friendly cohérent avec l'existant
 */
const AccountPage = () => {
    const { user, isAuthenticated, login, register, logout, isLoading } = useAuthContext()
    const { getUserOrders } = useOrdersContext()
    const [activeTab, setActiveTab] = useState<'login' | 'register' | 'orders'>('login')
    const [isLoginMode, setIsLoginMode] = useState(true)

    // États pour le formulaire de connexion
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    // États pour le formulaire d'inscription
    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPhone, setRegisterPhone] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
    const [registerError, setRegisterError] = useState('')
    const [registerSuccess, setRegisterSuccess] = useState(false)

    // Récupérer les commandes de l'utilisateur
    const userOrders = isAuthenticated ? getUserOrders() : []

    // Si l'utilisateur est connecté, afficher les commandes par défaut
    React.useEffect(() => {
        if (isAuthenticated) {
            setActiveTab('orders')
        }
    }, [isAuthenticated])

    /**
     * Gère la soumission du formulaire de connexion
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')

        if (!loginEmail || !loginPassword) {
            setLoginError('Veuillez remplir tous les champs')
            return
        }

        const success = await login(loginEmail, loginPassword)
        if (!success) {
            setLoginError('Email ou mot de passe incorrect')
        }
    }

    /**
     * Gère la soumission du formulaire d'inscription
     */
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setRegisterError('')
        setRegisterSuccess(false)

        if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
            setRegisterError('Veuillez remplir tous les champs obligatoires')
            return
        }

        if (registerPassword !== registerConfirmPassword) {
            setRegisterError('Les mots de passe ne correspondent pas')
            return
        }

        if (registerPassword.length < 6) {
            setRegisterError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        const success = await register(registerEmail, registerPassword, registerName, registerPhone || undefined)
        if (!success) {
            setRegisterError('Cet email est déjà utilisé')
        } else {
            setRegisterSuccess(true)
            // Réinitialiser le formulaire
            setRegisterName('')
            setRegisterEmail('')
            setRegisterPhone('')
            setRegisterPassword('')
            setRegisterConfirmPassword('')
        }
    }

    /**
     * Formate une date pour l'affichage
     */
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    /**
     * Retourne la couleur du badge selon le statut de la commande
     */
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'confirmed':
                return 'bg-blue-100 text-blue-800'
            case 'processing':
                return 'bg-purple-100 text-purple-800'
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800'
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    /**
     * Retourne le libellé du statut en français
     */
    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            pending: 'En attente',
            confirmed: 'Confirmée',
            processing: 'En traitement',
            shipped: 'Expédiée',
            delivered: 'Livrée',
            cancelled: 'Annulée',
        }
        return labels[status] || status
    }

    if (isLoading) {
        return (
            <>
                <Navigation />
                <section className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement...</p>
                    </div>
                </section>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navigation />
            <section className="pt-24 pb-16 min-h-screen bg-white">
                <div className="container px-4">
                    {/* En-tête de la page */}
                    <div className="text-center pt-10 mb-8 md:mb-12">
                        <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950 mb-4 block">
                            Mon compte
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {isAuthenticated ? `Bonjour, ${user?.name}` : 'Connexion / Inscription'}
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    {!isAuthenticated ? (
                        /* Formulaire de connexion/inscription */
                        <div className="max-w-md mx-auto">
                            {/* Onglets */}
                            <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => {
                                        setIsLoginMode(true)
                                        setLoginError('')
                                        setRegisterError('')
                                    }}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                        isLoginMode
                                            ? 'bg-white text-[#ff6b35] shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Connexion
                                </button>
                                <button
                                    onClick={() => {
                                        setIsLoginMode(false)
                                        setLoginError('')
                                        setRegisterError('')
                                    }}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                        !isLoginMode
                                            ? 'bg-white text-[#ff6b35] shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Inscription
                                </button>
                            </div>

                            {/* Formulaire de connexion */}
                            {isLoginMode ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Se connecter
                                    </h2>
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div>
                                            <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="loginEmail"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="votre@email.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                id="loginPassword"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        {loginError && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                                {loginError}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full bg-[#ff6b35] hover:bg-[#ff6b35] text-white py-3 px-6 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                                        >
                                            <IconifyIcon icon="lucide:log-in" className="h-5 w-5" />
                                            Se connecter
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                /* Formulaire d'inscription */
                                <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Créer un compte
                                    </h2>
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div>
                                            <label htmlFor="registerName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom complet <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="registerName"
                                                value={registerName}
                                                onChange={(e) => setRegisterName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="Jean Dupont"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="registerEmail"
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="votre@email.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                id="registerPhone"
                                                value={registerPhone}
                                                onChange={(e) => setRegisterPhone(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="+225 07 00 00 00 00"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Mot de passe <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="registerPassword"
                                                value={registerPassword}
                                                onChange={(e) => setRegisterPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="••••••••"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="registerConfirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirmer le mot de passe <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="registerConfirmPassword"
                                                value={registerConfirmPassword}
                                                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent outline-none"
                                                placeholder="••••••••"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                        {registerError && (
                                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                                {registerError}
                                            </div>
                                        )}
                                        {registerSuccess && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                                                Compte créé avec succès ! Vous êtes maintenant connecté.
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full bg-[#ff6b35] hover:bg-[#ff6b35] text-white py-3 px-6 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                                        >
                                            <IconifyIcon icon="lucide:user-plus" className="h-5 w-5" />
                                            Créer mon compte
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Section utilisateur connecté */
                        <div className="max-w-6xl mx-auto">
                            {/* Informations utilisateur */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                                            Informations du compte
                                        </h2>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p><span className="font-medium">Nom :</span> {user?.name}</p>
                                            <p><span className="font-medium">Email :</span> {user?.email}</p>
                                            {user?.phone && (
                                                <p><span className="font-medium">Téléphone :</span> {user.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
                                    >
                                        <IconifyIcon icon="lucide:log-out" className="h-4 w-4" />
                                        Déconnexion
                                    </button>
                                </div>
                            </div>

                            {/* Liste des commandes */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Mes commandes ({userOrders.length})
                                </h2>

                                {userOrders.length === 0 ? (
                                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                                        <IconifyIcon
                                            icon="lucide:package"
                                            className="h-16 w-16 text-gray-400 mx-auto mb-4"
                                        />
                                        <p className="text-gray-600 text-lg mb-4">
                                            Vous n'avez pas encore de commande
                                        </p>
                                        <Link
                                            href="/products"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff6b35] text-white font-semibold rounded-lg transition-colors"
                                        >
                                            <IconifyIcon icon="lucide:shopping-bag" className="h-5 w-5" />
                                            Voir les produits
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {userOrders
                                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                            .map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
                                                >
                                                    {/* En-tête de la commande */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    Commande #{order.id.split('-')[1]}
                                                                </h3>
                                                                <span
                                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                                        order.status
                                                                    )}`}
                                                                >
                                                                    {getStatusLabel(order.status)}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600">
                                                                Passée le {formatDate(order.createdAt)}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl font-bold text-[#ff6b35]">
                                                                {formatPrice(order.totalPrice)}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {order.items.reduce((sum, item) => sum + item.quantity, 0)} article{order.items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Articles de la commande */}
                                                    <div className="space-y-3">
                                                        {order.items.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                                                            >
                                                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                                                                    <img
                                                                        src={item.product.image}
                                                                        alt={item.product.name}
                                                                        className="w-full h-full object-contain p-1"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                                                                        {item.product.name}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-600 mb-2">
                                                                        {item.product.brand} • Qté: {item.quantity}
                                                                    </p>
                                                                    <p className="text-sm font-semibold text-[#ff6b35]">
                                                                        {formatPrice(item.price * item.quantity)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Informations de livraison */}
                                                    {order.deliveryAddress && (
                                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                                            <p className="text-sm text-gray-600">
                                                                <span className="font-medium">Adresse de livraison :</span>{' '}
                                                                {order.deliveryAddress}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default AccountPage

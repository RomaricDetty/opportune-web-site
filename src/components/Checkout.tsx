import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'
import { useCartContext } from '@/context/useCartContext'
import { useRouter } from 'next/navigation'
import { demandeDevisService } from '@/services/demandeDevisService' // ✅ à créer

const Checkout = () => {
    const router = useRouter()
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartContext()
    const totalPrice = getTotalPrice()

    const getMinQuantity = (product: any): number => product.quantite_minimale || 1

    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)

    const [donnees, setDonnees] = React.useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        message: ""
    })

    const clearForm = () => setDonnees({ nom: "", prenom: "", email: "", telephone: "", adresse: "", message: "" })

    // ✅ Validation basique
    const isFormValid = () => {
        if (!donnees.nom.trim()) { setError("Le nom est obligatoire"); return false }
        if (!donnees.telephone.trim()) { setError("Le téléphone est obligatoire"); return false }
        if (cartItems.length === 0) { setError("Votre panier est vide"); return false }
        return true
    }

    // ✅ Soumission de la demande de devis
    const handleCheckout = async () => {
        setError(null)
        if (!isFormValid()) return

        try {
            setIsLoading(true)

            // ✅ Construire le payload attendu par l'API
            const payload = {
                nomClient:    donnees.nom,
                prenomClient: donnees.prenom,
                telephone:    donnees.telephone,
                email:        donnees.email || null,
                adresse:      donnees.adresse || null,
                message:      donnees.message || null,
                items: cartItems.map(item => ({
                    idProduit: item.product.id,
                    quantite:  item.quantity
                }))
            }

            await demandeDevisService.create(payload)

            // ✅ Succès
            setSuccess(true)
            clearCart()
            clearForm()

            

        } catch (err: any) {
            console.error('Erreur demande de devis:', err)
            setError(err?.response?.data?.message ?? 'Une erreur est survenue. Veuillez réessayer.')
        } finally {
            setIsLoading(false)
        }
    }

    

    return (
        <>
            {success && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <IconifyIcon icon="lucide:check-circle" className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="font-sora font-bold text-2xl text-gray-900">
                            Demande envoyée !
                        </h2>
                        <p className="text-gray-600 text-md leading-relaxed">
                            Votre demande de devis a été enregistrée avec succès.
                            Nous vous contacterons très prochainement.
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-2 w-full py-3 px-6 bg-primary hover:bg-primaryDark text-white font-sora font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start mt-20">
                <div className="flex flex-col gap-5">
                    <div className="bg-white shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100 flex items-center gap-3 bg-gray-900">
                            <h2 className="font-sora font-bold text-lg text-white">Information personnelle</h2>
                        </div>
                        <div className="p-6">

                            {/* ✅ Message d'erreur */}
                            {error && (
                                <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    <IconifyIcon icon="lucide:alert-circle" className="h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={donnees.nom}
                                        onChange={(e) => setDonnees({ ...donnees, nom: e.target.value })}
                                        className="block w-full text-sm rounded-md py-3 px-4 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="Votre nom..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="block text-sm font-semibold text-black mb-2">Prénom</label>
                                    <input
                                        type="text"
                                        value={donnees.prenom}
                                        onChange={(e) => setDonnees({ ...donnees, prenom: e.target.value })}
                                        className="block w-full text-sm rounded-md py-3 px-4 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="Votre prénom..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="block text-sm font-semibold text-black mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={donnees.email}
                                        onChange={(e) => setDonnees({ ...donnees, email: e.target.value })}
                                        className="block w-full text-sm rounded-md py-3 px-4 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="Votre email..."
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Téléphone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={donnees.telephone}
                                        onChange={(e) => setDonnees({ ...donnees, telephone: e.target.value })}
                                        className="block w-full text-sm rounded-md py-3 px-4 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="Votre contact..."
                                    />
                                </div>

                                <div className="sm:col-span-2 flex flex-col gap-1.5">
                                    <label className="block text-sm font-semibold text-black mb-2">Adresse</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">📍</span>
                                        <input
                                            type="text"
                                            value={donnees.adresse}
                                            onChange={(e) => setDonnees({ ...donnees, adresse: e.target.value })}
                                            placeholder="Adresse..."
                                            className="block w-full text-sm rounded-md pl-8 pr-4 py-3 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Description de la demande
                                    </label>
                                    <textarea
                                        value={donnees.message}
                                        onChange={(e) => setDonnees({ ...donnees, message: e.target.value })}
                                        className="block w-full text-sm rounded-md py-3 px-4 border-[1.5px] border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
                                        rows={4}
                                        placeholder="Tapez la description de la demande..."
                                    />
                                </div>
                            </div>

                            {/* ✅ Bouton submit */}
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading || cartItems.length === 0}
                                className="mt-6 w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-sora font-bold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <>
                                        <IconifyIcon icon="lucide:loader-2" className="h-5 w-5 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <IconifyIcon icon="lucide:send" className="h-5 w-5" />
                                        Demander un devis
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Récapitulatif - inchangé */}
                <div className="bg-white rounded-2xl shadow-sm lg:sticky lg:top-24">
                    <div className="px-6 py-4 border-b border-stone-100 flex items-center gap-3 bg-gray-900">
                        <h2 className="font-sora font-bold text-lg text-white">Récapitulatif</h2>
                    </div>
                    <div className="p-6 pt-3">
                        <div className="flex flex-col divide-y divide-stone-100">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-400 text-sm py-8">Votre panier est vide</p>
                            ) : (
                                cartItems.map((item) => {
                                    const minQuantity = getMinQuantity(item.product)
                                    const isMinQuantity = item.quantity === minQuantity
                                    return (
                                        <div key={item.product.id} className="flex gap-3 py-4">
                                            <div className="w-24 h-24 rounded-xl bg-orange-light flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={item.product.imagePrincipale}
                                                    alt={item.product.libelle}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="font-sora font-bold text-sm text-dark">
                                                    {item.product.libelle}
                                                </div>
                                                <div className="flex items-center justify-between flex-wrap gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            disabled={isMinQuantity}
                                                            className={`w-7 h-7 flex items-center justify-center border border-gray-300 rounded transition-colors ${isMinQuantity ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-gray-100'}`}
                                                        >
                                                            <IconifyIcon icon="lucide:minus" className="h-4 w-4" />
                                                        </button>
                                                        <span className="text-base font-semibold text-gray-900 min-w-[2rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                                        >
                                                            <IconifyIcon icon="lucide:plus" className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-red-500 hover:text-red-600 transition-colors"
                                                    >
                                                        <IconifyIcon icon="lucide:trash-2" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout
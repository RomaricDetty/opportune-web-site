'use client'
import { Article } from '../types/articles'
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useRef,
} from 'react'

export interface CartItem {
    product: Article
    quantity: number
}

interface PersistedCartItem {
    product: Article
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (product: Article, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
    isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const CART_STORAGE_KEY = 'cart'
const CART_FALLBACK_KEY = 'cart_fallback'

const safeGetItem = (storage: Storage, key: string): string | null => {
    try {
        return storage.getItem(key)
    } catch {
        return null
    }
}

const safeSetItem = (storage: Storage, key: string, value: string): boolean => {
    try {
        storage.setItem(key, value)
        return true
    } catch {
        return false
    }
}

const safeRemoveItem = (storage: Storage, key: string) => {
    try {
        storage.removeItem(key)
    } catch {
        // no-op
    }
}

const sanitizeProductForCart = (product: Article): Article => {
    return {
        id: product.id,
        libelle: product.libelle,
        slug: product.slug ?? '',
        description: '',
        excerpt: '',
        imagePrincipale: product.imagePrincipale ?? '',
        category: {
            id: product.category?.id ?? '',
            libelle: product.category?.libelle ?? '',
        },
        isAvailable: Boolean(product.isAvailable),
        discount: Number(product.discount ?? 0),
        prix: Number(product.prix ?? 0),
        quantite_stock: 0,
        quantite_minimale: Number(product.quantite_minimale ?? 1),
        created_at: '',
        updated_at: '',
        marque: {
            id: product.marque?.id ?? '',
            libelle: product.marque?.libelle ?? '',
        },
    }
}

const persistCartSafely = (items: CartItem[]) => {
    const compactItems: PersistedCartItem[] = items.map((item) => ({
        product: sanitizeProductForCart(item.product),
        quantity: item.quantity,
    }))
    const payload = JSON.stringify(compactItems)

    const writtenInLocal = safeSetItem(localStorage, CART_STORAGE_KEY, payload)
    if (writtenInLocal) {
        safeRemoveItem(sessionStorage, CART_FALLBACK_KEY)
        return
    }

    safeSetItem(sessionStorage, CART_FALLBACK_KEY, payload)
}

const clearPersistedCart = () => {
    safeRemoveItem(localStorage, CART_STORAGE_KEY)
    safeRemoveItem(sessionStorage, CART_FALLBACK_KEY)
}

/**
 * Lit et désérialise le panier depuis le storage.
 * Appelé une seule fois comme lazy initializer de useState.
 * Retourne [] si on est côté serveur ou si le storage est vide/corrompu.
 */
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return []

    try {
        const savedCart =
            safeGetItem(localStorage, CART_STORAGE_KEY) ||
            safeGetItem(sessionStorage, CART_FALLBACK_KEY)

        if (!savedCart) return []

        const parsedCart = JSON.parse(savedCart) as PersistedCartItem[]
        return parsedCart
            .filter((item) => item?.product?.id)
            .map((item) => ({
                product: sanitizeProductForCart(item.product),
                quantity: Math.max(1, Number(item.quantity || 1)),
            }))
    } catch {
        return []
    }
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context
}

function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
    // Le lazy initializer est appelé une seule fois, de manière synchrone,
    // avant le premier render. Pas de useEffect, pas de timing à gérer.
    const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage)
    const isMounted = useRef(false)

    useEffect(() => {
        // On ignore le tout premier appel (montage initial) pour ne pas
        // persister [] si le localStorage était déjà peuplé avant le render.
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        persistCartSafely(cartItems)
    }, [cartItems])

    const getMinQuantity = (product: Article): number => {
        return product.quantite_minimale || 1
    }

    const addToCart = (product: Article, quantity: number = 1) => {
        const safeProduct = sanitizeProductForCart(product)
        const minQuantity = getMinQuantity(product)
        const quantityToAdd = Math.max(quantity, minQuantity)

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === safeProduct.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === safeProduct.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                )
            }
            return [...prevItems, { product: safeProduct, quantity: quantityToAdd }]
        })
    }

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.product.id !== productId)
        )
    }

    const updateQuantity = (productId: string, quantity: number) => {
        const item = cartItems.find((item) => item.product.id === productId)
        if (!item) return

        const minQuantity = getMinQuantity(item.product)

        if (quantity < minQuantity) {
            removeFromCart(productId)
            return
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
        clearPersistedCart()
    }

    const getTotalItems = () =>
        cartItems.reduce((total, item) => total + item.quantity, 0)

    const getTotalPrice = () =>
        cartItems.reduce(
            (total, item) => total + item.product.prix * item.quantity,
            0
        )

    const isInCart = (productId: string) =>
        cartItems.some((item) => item.product.id === productId)

    return (
        <CartContext.Provider
            value={useMemo(
                () => ({
                    cartItems,
                    addToCart,
                    removeFromCart,
                    updateQuantity,
                    clearCart,
                    getTotalItems,
                    getTotalPrice,
                    isInCart,
                }),
                [cartItems]
            )}
        >
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider }
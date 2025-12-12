'use client'
import { ProductData } from '@/data/products'
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from 'react'

export interface CartItem {
    product: ProductData
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (product: ProductData, quantity?: number) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
    isInCart: (productId: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCartContext() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context
}

function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    // Charger le panier depuis localStorage au montage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart))
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            }
        }
    }, [])

    // Sauvegarder le panier dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    // Obtenir la quantité minimale d'un produit (par défaut 1)
    const getMinQuantity = (product: ProductData): number => {
        return product.minQuantity || 1
    }

    const addToCart = (product: ProductData, quantity: number = 1) => {
        const minQuantity = getMinQuantity(product)
        const quantityToAdd = Math.max(quantity, minQuantity)

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)

            if (existingItem) {
                // Si le produit existe déjà, augmenter la quantité
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                )
            } else {
                // Sinon, ajouter un nouvel article avec la quantité minimale
                return [...prevItems, { product, quantity: quantityToAdd }]
            }
        })
    }

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.product.id !== productId)
        )
    }

    const updateQuantity = (productId: number, quantity: number) => {
        const item = cartItems.find((item) => item.product.id === productId)
        if (!item) return

        const minQuantity = getMinQuantity(item.product)

        // Si la quantité est inférieure à la quantité minimale, supprimer l'article
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
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.product.currentPrice * item.quantity,
            0
        )
    }

    const isInCart = (productId: number) => {
        return cartItems.some((item) => item.product.id === productId)
    }

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

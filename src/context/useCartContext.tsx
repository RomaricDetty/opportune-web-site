'use client'
import { Article } from '../types/articles' // ✅ Article depuis l'API au lieu de ProductData
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from 'react'

export interface CartItem {
    product: Article  // ✅ Article au lieu de ProductData
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (product: Article, quantity?: number) => void   // ✅
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
    isInCart: (productId: string) => boolean
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
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart))
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            }
        }
    }, [isClient])

    useEffect(() => {
        if (!isClient) return
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems, isClient])

    // ✅ minQuantity depuis Article (adapter selon la structure de ton type Article)
    const getMinQuantity = (product: Article): number => {
        return product.quantite_minimale || 1
    }

    const addToCart = (product: Article, quantity: number = 1) => {
        const minQuantity = getMinQuantity(product)
        const quantityToAdd = Math.max(quantity, minQuantity)

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                )
            }
            return [...prevItems, { product, quantity: quantityToAdd }]
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

    const clearCart = () => setCartItems([])

    const getTotalItems = () =>
        cartItems.reduce((total, item) => total + item.quantity, 0)

    // ✅ currentPrice → adapter selon ton type Article (ex: prix, price, currentPrice...)
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
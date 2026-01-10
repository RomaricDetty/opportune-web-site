'use client'
import { ProductData } from '@/data/products'
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react'
import { useAuthContext } from './useAuthContext'

/**
 * Interface pour un article de commande
 */
export interface OrderItem {
    product: ProductData
    quantity: number
    price: number
}

/**
 * Statut d'une commande
 */
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

/**
 * Interface pour une commande
 */
export interface Order {
    id: string
    userId: string
    items: OrderItem[]
    totalPrice: number
    status: OrderStatus
    createdAt: string
    updatedAt: string
    deliveryAddress?: string
    phone?: string
}

interface OrdersContextType {
    orders: Order[]
    createOrder: (items: OrderItem[], deliveryAddress?: string, phone?: string) => string | null
    getOrderById: (orderId: string) => Order | undefined
    getUserOrders: () => Order[]
    updateOrderStatus: (orderId: string, status: OrderStatus) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

/**
 * Hook personnalisé pour utiliser le contexte des commandes
 */
export const useOrdersContext = () => {
    const context = useContext(OrdersContext)
    if (!context) {
        throw new Error('useOrdersContext must be used within an OrdersProvider')
    }
    return context
}

/**
 * Provider de gestion des commandes - Gère les commandes des utilisateurs
 * Utilise localStorage pour la persistance (à remplacer par une API réelle en production)
 */
export function OrdersProvider({ children }: Readonly<{ children: ReactNode }>) {
    const { user } = useAuthContext()
    const [orders, setOrders] = useState<Order[]>([])
    const [isClient, setIsClient] = useState(false)

    // Vérifier si on est côté client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Charger les commandes depuis localStorage au montage
    useEffect(() => {
        if (!isClient) return

        const savedOrders = localStorage.getItem('orders')
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders))
            } catch (error) {
                console.error('Error loading orders from localStorage:', error)
            }
        }
    }, [isClient])

    // Sauvegarder les commandes dans localStorage à chaque changement
    useEffect(() => {
        if (!isClient) return

        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders, isClient])

    /**
     * Crée une nouvelle commande
     * @param items - Articles de la commande
     * @param deliveryAddress - Adresse de livraison (optionnel)
     * @param phone - Téléphone (optionnel)
     * @returns L'ID de la commande créée ou null si l'utilisateur n'est pas connecté
     */
    const createOrder = (
        items: OrderItem[],
        deliveryAddress?: string,
        phone?: string
    ): string | null => {
        if (!user || !isClient) return null

        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const totalPrice = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )

        const newOrder: Order = {
            id: orderId,
            userId: user.id,
            items,
            totalPrice,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deliveryAddress,
            phone: phone || user.phone,
        }

        setOrders((prev) => [...prev, newOrder])
        return orderId
    }

    /**
     * Récupère une commande par son ID
     * @param orderId - ID de la commande
     * @returns La commande ou undefined si non trouvée
     */
    const getOrderById = (orderId: string): Order | undefined => {
        return orders.find((order) => order.id === orderId)
    }

    /**
     * Récupère toutes les commandes de l'utilisateur connecté
     * @returns Liste des commandes de l'utilisateur
     */
    const getUserOrders = (): Order[] => {
        if (!user) return []
        return orders.filter((order) => order.userId === user.id)
    }

    /**
     * Met à jour le statut d'une commande
     * @param orderId - ID de la commande
     * @param status - Nouveau statut
     */
    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? { ...order, status, updatedAt: new Date().toISOString() }
                    : order
            )
        )
    }

    const value: OrdersContextType = {
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
        updateOrderStatus,
    }

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

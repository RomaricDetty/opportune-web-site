'use client'
import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react'

/**
 * Interface pour les données d'un utilisateur
 */
export interface User {
    id: string
    email: string
    name: string
    phone?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    register: (email: string, password: string, name: string, phone?: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

/**
 * Provider d'authentification - Gère la connexion et l'inscription des utilisateurs
 * Utilise localStorage pour la persistance (à remplacer par une API réelle en production)
 */
export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [user, setUser] = useState<User | null>(null)
    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Vérifier si on est côté client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Charger l'utilisateur depuis localStorage au montage
    useEffect(() => {
        if (!isClient) return

        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                console.error('Error loading user from localStorage:', error)
            }
        }
        setIsLoading(false)
    }, [isClient])

    /**
     * Fonction de connexion
     * @param email - Email de l'utilisateur
     * @param password - Mot de passe
     * @returns true si la connexion réussit, false sinon
     */
    const login = async (email: string, password: string): Promise<boolean> => {
        if (!isClient) return false

        try {
            // Récupérer les utilisateurs enregistrés
            const savedUsers = localStorage.getItem('users')
            const users: Array<{ email: string; password: string; user: User }> = savedUsers
                ? JSON.parse(savedUsers)
                : []

            // Vérifier les identifiants
            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            )

            if (foundUser) {
                setUser(foundUser.user)
                localStorage.setItem('user', JSON.stringify(foundUser.user))
                return true
            }

            return false
        } catch (error) {
            console.error('Error during login:', error)
            return false
        }
    }

    /**
     * Fonction d'inscription
     * @param email - Email de l'utilisateur
     * @param password - Mot de passe
     * @param name - Nom de l'utilisateur
     * @param phone - Téléphone (optionnel)
     * @returns true si l'inscription réussit, false sinon
     */
    const register = async (
        email: string,
        password: string,
        name: string,
        phone?: string
    ): Promise<boolean> => {
        if (!isClient) return false

        try {
            // Récupérer les utilisateurs enregistrés
            const savedUsers = localStorage.getItem('users')
            const users: Array<{ email: string; password: string; user: User }> = savedUsers
                ? JSON.parse(savedUsers)
                : []

            // Vérifier si l'email existe déjà
            if (users.some((u) => u.email === email)) {
                return false
            }

            // Créer le nouvel utilisateur
            const newUser: User = {
                id: Date.now().toString(),
                email,
                name,
                phone,
            }

            // Ajouter l'utilisateur à la liste
            users.push({
                email,
                password, // En production, hash le mot de passe
                user: newUser,
            })

            // Sauvegarder
            localStorage.setItem('users', JSON.stringify(users))
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))

            return true
        } catch (error) {
            console.error('Error during registration:', error)
            return false
        }
    }

    /**
     * Fonction de déconnexion
     */
    const logout = () => {
        setUser(null)
        if (isClient) {
            localStorage.removeItem('user')
        }
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

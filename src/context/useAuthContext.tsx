'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import { authService, type ClientProfile } from '@/services/authService'

const TOKEN_KEY = 'client_token'

interface AuthContextType {
    client: ClientProfile | null
    token: string | null
    loading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (payload: {
        email: string
        password: string
        nom: string
        prenom: string
        telephone: string
        adresse?: string
        ville?: string
    }) => Promise<void>
    logout: () => void
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook d'accès au contexte d'authentification client.
 */
export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider')
    }
    return context
}

/**
 * Provider d'authentification client (JWT localStorage).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<ClientProfile | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const saved = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
        if (!saved) {
            setLoading(false)
            return
        }

        setToken(saved)
        localStorage.setItem('access_token', saved)
        authService
            .me()
            .then(setClient)
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY)
                localStorage.removeItem('access_token')
                setToken(null)
            })
            .finally(() => setLoading(false))
    }, [])

    /**
     * Persiste le token et le profil après login/register.
     */
    const persistSession = (nextToken: string, nextClient: ClientProfile) => {
        localStorage.setItem(TOKEN_KEY, nextToken)
        localStorage.setItem('access_token', nextToken)
        setToken(nextToken)
        setClient(nextClient)
    }

    const login = async (email: string, password: string) => {
        const res = await authService.login({ email, password })
        persistSession(res.data.token, res.data.client)
    }

    const register = async (payload: {
        email: string
        password: string
        nom: string
        prenom: string
        telephone: string
        adresse?: string
        ville?: string
    }) => {
        const res = await authService.register(payload)
        persistSession(res.data.token, res.data.client)
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem('access_token')
        setToken(null)
        setClient(null)
    }

    const refreshProfile = async () => {
        const profile = await authService.me()
        setClient(profile)
    }

    const value = useMemo(
        () => ({
            client,
            token,
            loading,
            isAuthenticated: Boolean(token && client),
            login,
            register,
            logout,
            refreshProfile,
        }),
        [client, token, loading]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

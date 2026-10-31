'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import axiosInstance from '@/lib/axios'
import type { SocialLinksMap } from '@/lib/socialNetworks'

const DEFAULT_LOGO = '/brand/logo-electro.png'
const DEFAULT_NAME = 'Electro Store'
const DEFAULT_SOCIALS: SocialLinksMap = {}
const DEFAULT_TAGLINE = 'Électroménager & high-tech'

type StoreSettings = {
    logoUrl: string
    siteName: string
    tagline: string
    socials: SocialLinksMap
    loading: boolean
}

const StoreSettingsContext = createContext<StoreSettings | undefined>(undefined)

/**
 * Charge et expose le logo, le nom et les réseaux sociaux configurés en back-office.
 */
export function StoreSettingsProvider({ children }: { children: ReactNode }) {
    const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO)
    const [siteName, setSiteName] = useState(DEFAULT_NAME)
    const [tagline, setTagline] = useState(DEFAULT_TAGLINE)
    const [socials, setSocials] = useState<SocialLinksMap>(DEFAULT_SOCIALS)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        axiosInstance
            .get('/settings')
            .then((res) => {
                if (cancelled) return
                const data = res.data?.data
                setLogoUrl(data?.logo || DEFAULT_LOGO)
                setSiteName(data?.siteName || DEFAULT_NAME)
                setTagline(data?.tagline || DEFAULT_TAGLINE)
                setSocials(data?.socials || DEFAULT_SOCIALS)
            })
            .catch(() => {
                // fallback logo local
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => {
            cancelled = true
        }
    }, [])

    const value = useMemo(
        () => ({ logoUrl, siteName, tagline, socials, loading }),
        [logoUrl, siteName, tagline, socials, loading],
    )

    return (
        <StoreSettingsContext.Provider value={value}>
            {children}
        </StoreSettingsContext.Provider>
    )
}

/**
 * Accès aux paramètres boutique (logo, nom, réseaux sociaux).
 */
export function useStoreSettings() {
    const ctx = useContext(StoreSettingsContext)
    if (!ctx) {
        return {
            logoUrl: DEFAULT_LOGO,
            siteName: DEFAULT_NAME,
            tagline: DEFAULT_TAGLINE,
            socials: DEFAULT_SOCIALS,
            loading: false,
        }
    }
    return ctx
}

export type SocialKey =
    | 'facebook'
    | 'instagram'
    | 'tiktok'
    | 'youtube'
    | 'twitter'
    | 'linkedin'

export type SocialLinksMap = Partial<Record<SocialKey, string | null>>

export type SocialNetworkItem = {
    key: SocialKey
    label: string
    href: string | null
    icon: string
}

const SOCIAL_NETWORKS: {
    key: SocialKey
    label: string
    icon: string
}[] = [
    { key: 'facebook', label: 'Facebook', icon: 'simple-icons:facebook' },
    { key: 'instagram', label: 'Instagram', icon: 'simple-icons:instagram' },
    { key: 'tiktok', label: 'TikTok', icon: 'simple-icons:tiktok' },
    { key: 'youtube', label: 'YouTube', icon: 'simple-icons:youtube' },
    { key: 'twitter', label: 'X', icon: 'simple-icons:x' },
    { key: 'linkedin', label: 'LinkedIn', icon: 'simple-icons:linkedin' },
]

/**
 * Liste tous les réseaux, avec href seulement si le lien est renseigné.
 * @param socials Liens issus des paramètres du site
 */
export function getSocialNetworks(socials: SocialLinksMap = {}): SocialNetworkItem[] {
    return SOCIAL_NETWORKS.map((network) => {
        const href = String(socials[network.key] || '').trim()
        return { ...network, href: href || null }
    })
}

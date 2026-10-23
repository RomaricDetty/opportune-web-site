import axiosInstance from '@/lib/axios'
import type { ShopPublicite } from '@/lib/adSlots'

/**
 * Charge les publicités actives.
 */
export async function fetchPublicites(): Promise<ShopPublicite[]> {
    const res = await axiosInstance.get('/publicites', { params: { isActive: true } })
    const data = res.data?.data
    if (Array.isArray(data)) return data
    return [...(data?.publicites_articles || []), ...(data?.publicites_categories || [])]
}

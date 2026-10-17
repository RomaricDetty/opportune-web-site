import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000/api'

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60_000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

// ── Request interceptor ──────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Récupère le token depuis localStorage (côté client uniquement)
        if (typeof window !== 'undefined') {
            const token =
                localStorage.getItem('access_token') || localStorage.getItem('client_token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// ── Response interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (typeof window !== 'undefined' && error.response?.status === 401) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('client_token')
            const path = window.location.pathname
            if (path.startsWith('/account') || path.startsWith('/checkout')) {
                const next = encodeURIComponent(path)
                window.location.href = `/auth/login?next=${next}`
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance

'use client'

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react'
import Link from 'next/link'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

type ToastTone = 'success' | 'info' | 'error'

interface ToastItem {
    id: number
    message: string
    tone: ToastTone
    href?: string
    hrefLabel?: string
    duration: number
}

interface ToastOptions {
    tone?: ToastTone
    href?: string
    hrefLabel?: string
    duration?: number
}

interface ToastContextType {
    showToast: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

/**
 * Accès au système de notifications légères.
 */
export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within ToastProvider')
    return ctx
}

/**
 * Provider toast (slide + barre de progression).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])
    const idRef = useRef(0)

    /**
     * Affiche un toast temporaire.
     */
    const showToast = useCallback((message: string, options: ToastOptions = {}) => {
        const id = ++idRef.current
        const duration = options.duration ?? 3200
        const toast: ToastItem = {
            id,
            message,
            tone: options.tone || 'success',
            href: options.href,
            hrefLabel: options.hrefLabel,
            duration,
        }
        setToasts((prev) => [...prev.slice(-2), toast])
        window.setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
    }, [])

    /**
     * Ferme un toast manuellement.
     */
    const dismiss = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    const value = useMemo(() => ({ showToast }), [showToast])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px] font-dm"
                aria-live="polite"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg animate-toast-in motion-reduce:animate-none ${
                            toast.tone === 'error'
                                ? 'border-red-200'
                                : toast.tone === 'info'
                                  ? 'border-gray-200'
                                  : 'border-primary/20'
                        }`}
                    >
                        <span
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                toast.tone === 'error'
                                    ? 'bg-red-50 text-red-500'
                                    : toast.tone === 'info'
                                      ? 'bg-gray-100 text-secondary'
                                      : 'bg-primary/10 text-primary'
                            }`}
                        >
                            <IconifyIcon
                                icon={
                                    toast.tone === 'error'
                                        ? 'lucide:circle-alert'
                                        : toast.tone === 'info'
                                          ? 'lucide:info'
                                          : 'lucide:check'
                                }
                                className="h-4 w-4"
                            />
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary">{toast.message}</p>
                            {toast.href && (
                                <Link
                                    href={toast.href}
                                    className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-primary"
                                    onClick={() => dismiss(toast.id)}
                                >
                                    {toast.hrefLabel || 'Voir'}
                                    <IconifyIcon icon="lucide:arrow-right" className="h-3 w-3" />
                                </Link>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => dismiss(toast.id)}
                            className="text-muted hover:text-secondary p-0.5"
                            aria-label="Fermer"
                        >
                            <IconifyIcon icon="lucide:x" className="h-4 w-4" />
                        </button>
                        <span
                            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left animate-toast-progress motion-reduce:animate-none ${
                                toast.tone === 'error'
                                    ? 'bg-red-400'
                                    : toast.tone === 'info'
                                      ? 'bg-gray-300'
                                      : 'bg-primary'
                            }`}
                            style={{ animationDuration: `${toast.duration}ms` }}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

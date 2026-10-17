'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
    children: ReactNode
    className?: string
    /** Délai en ms */
    delay?: number
}

/**
 * Fait apparaître le contenu au scroll (fade + slide).
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={cn(
                'transition-[opacity,transform] duration-500 ease-out',
                visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
                className,
            )}
            style={visible && delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    )
}

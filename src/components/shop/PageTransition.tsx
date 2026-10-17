'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Fondu court à chaque changement de page boutique.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <div key={pathname} className="animate-page-fade motion-reduce:animate-none">
            {children}
        </div>
    )
}

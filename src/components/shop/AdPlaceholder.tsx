import IconifyIcon from '@/components/wrappers/IconifyIcon'

type PlaceholderVariant = 'hero' | 'banner'

interface AdPlaceholderProps {
    variant?: PlaceholderVariant
}

/**
 * Encart réservé quand aucune pub n'est assignée à l'emplacement.
 */
export default function AdPlaceholder({ variant = 'banner' }: AdPlaceholderProps) {
    const isHero = variant === 'hero'

    return (
        <div
            className={`relative overflow-hidden border-2 border-dashed border-primary/35 bg-gradient-to-br from-orange-50 via-white to-slate-100 ${
                isHero ? 'min-h-[280px] md:min-h-[420px]' : 'min-h-[160px] md:min-h-[200px]'
            }`}
            role="img"
            aria-label="Espace publicitaire disponible"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
                <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-primary" />
                <div className="absolute right-8 -bottom-10 h-48 w-48 rounded-full bg-secondary" />
            </div>
            <div
                className={`container relative flex ${isHero ? 'min-h-[280px] md:min-h-[420px]' : 'min-h-[160px] md:min-h-[200px]'} items-center justify-center py-8`}
            >
                <div className="flex max-w-md flex-col items-center text-center">
                    <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <IconifyIcon icon="lucide:megaphone" className="h-7 w-7" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                        Espace publicitaire
                    </p>
                    <p className="mt-2 text-lg font-bold text-secondary md:text-xl">
                        Votre campagne ici
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Emplacement réservé — aucune publicité n’est encore diffusée.
                    </p>
                </div>
            </div>
        </div>
    )
}

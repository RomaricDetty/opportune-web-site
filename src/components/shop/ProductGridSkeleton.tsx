import Surface from '@/components/ui/Surface'

/**
 * Skeleton de grille produits (shimmer orange/gris).
 * @param count
 */
export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
            aria-hidden
        >
            {Array.from({ length: count }).map((_, i) => (
                <Surface key={i} padding="none" className="overflow-hidden rounded-xl">
                    <div className="aspect-square shop-shimmer" />
                    <div className="p-3 space-y-2">
                        <div className="h-3 w-1/3 rounded shop-shimmer" />
                        <div className="h-4 w-4/5 rounded shop-shimmer" />
                        <div className="h-4 w-1/2 rounded shop-shimmer" />
                        <div className="h-9 w-full rounded-xl mt-3 shop-shimmer" />
                    </div>
                </Surface>
            ))}
        </div>
    )
}

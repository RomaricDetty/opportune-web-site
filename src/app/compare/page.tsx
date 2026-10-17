import { redirect } from 'next/navigation'

/**
 * Ancienne page comparateur — redirige vers la boutique.
 */
export default function ComparePage() {
    redirect('/shop')
}

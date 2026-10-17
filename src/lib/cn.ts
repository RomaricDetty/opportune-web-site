import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Fusionne des classes Tailwind en évitant les conflits.
 * @param inputs
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

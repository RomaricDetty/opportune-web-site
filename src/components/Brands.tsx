"use client"
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Interface pour les données d'une marque
 */
interface BrandData {
    id: number
    name: string
    description: string
    imageBg: string
    overlayText?: string
}

/**
 * Données des marques d'électroménager par défaut
 */
const brandsData: BrandData[] = [
    {
        id: 1,
        name: 'Whirlpool',
        description: 'Leader mondial en électroménager. Lave-linges, réfrigérateurs, lave-vaisselle et cuisinières de qualité supérieure.',
        imageBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
        overlayText: undefined
    },
    {
        id: 2,
        name: 'Frigidaire',
        description: 'Spécialiste du froid depuis plus de 100 ans. Réfrigérateurs, congélateurs et électroménager de cuisine innovants.',
        imageBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
        overlayText: undefined
    },
    {
        id: 3,
        name: 'Ninja',
        description: 'Petit électroménager innovant. Robots culinaires, friteuses sans huile, blenders et appareils de cuisine modernes.',
        imageBg: 'bg-gradient-to-br from-gray-800 to-gray-900',
        overlayText: undefined
    },
    {
        id: 4,
        name: 'Miele',
        description: 'Excellence allemande en électroménager haut de gamme. Lave-vaisselle, aspirateurs et appareils de cuisine premium.',
        imageBg: 'bg-gradient-to-br from-gray-200 to-gray-300',
        overlayText: undefined
    },
    {
        id: 5,
        name: 'Rowenta',
        description: 'Expert en soin du linge et entretien. Fers à repasser, aspirateurs et appareils de repassage professionnels.',
        imageBg: 'bg-gradient-to-br from-blue-200 to-blue-300',
        overlayText: undefined
    },
    {
        id: 6,
        name: 'Smeg',
        description: 'Design italien iconique. Réfrigérateurs rétro, lave-vaisselle et électroménager de cuisine au style unique.',
        imageBg: 'bg-gradient-to-br from-pink-100 to-pink-200',
        overlayText: undefined
    },
    {
        id: 7,
        name: 'Dualit',
        description: 'Grille-pain et machines à café artisanales. Fabrication britannique de qualité pour les amateurs de café.',
        imageBg: 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900',
        overlayText: undefined
    },
    {
        id: 8,
        name: 'Cuckoo',
        description: 'Riz cuiseurs et électroménager coréen de haute technologie. Innovation et qualité pour une cuisine authentique.',
        imageBg: 'bg-gradient-to-br from-red-100 to-red-200',
        overlayText: undefined
    },
    {
        id: 9,
        name: 'Coway',
        description: 'Purificateurs d\'air et purificateurs d\'eau coréens. Technologies avancées pour un air et une eau plus sains.',
        imageBg: 'bg-gradient-to-br from-cyan-100 to-cyan-200',
        overlayText: undefined
    },
    {
        id: 10,
        name: 'Hitachi Appliances',
        description: 'Électroménager japonais fiable. Réfrigérateurs, lave-linges et climatiseurs avec technologie innovante.',
        imageBg: 'bg-gradient-to-br from-gray-300 to-gray-400',
        overlayText: undefined
    },
    {
        id: 11,
        name: 'Joyoung',
        description: 'Électroménager chinois innovant. Machines à soja, blenders et appareils de cuisine pour une alimentation saine.',
        imageBg: 'bg-gradient-to-br from-green-100 to-green-200',
        overlayText: undefined
    },
    {
        id: 12,
        name: 'Godrej',
        description: 'Leader indien en électroménager. Réfrigérateurs, lave-linges et climatiseurs adaptés aux besoins locaux.',
        imageBg: 'bg-gradient-to-br from-orange-100 to-orange-200',
        overlayText: undefined
    },
    {
        id: 13,
        name: 'Bajaj',
        description: 'Électroménager indien de qualité. Ventilateurs, chauffe-eau et petits appareils électriques pour la maison.',
        imageBg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
        overlayText: undefined
    },
    {
        id: 14,
        name: 'Havells',
        description: 'Électroménager indien moderne. Ventilateurs, climatiseurs et appareils électriques pour un confort optimal.',
        imageBg: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
        overlayText: undefined
    },
    {
        id: 15,
        name: 'Philips',
        description: 'Multinationale innovante. Petit électroménager, machines à café, friteuses et appareils de cuisine connectés.',
        imageBg: 'bg-gradient-to-br from-blue-300 to-blue-400',
        overlayText: undefined
    },
    {
        id: 16,
        name: 'Magimix',
        description: 'Robots culinaires français d\'exception. Fabrication artisanale pour les passionnés de cuisine et de pâtisserie.',
        imageBg: 'bg-gradient-to-br from-purple-100 to-purple-200',
        overlayText: undefined
    },
    {
        id: 17,
        name: 'Krups',
        description: 'Petit électroménager allemand. Machines à café, robots culinaires et appareils de cuisine design et performants.',
        imageBg: 'bg-gradient-to-br from-gray-400 to-gray-500',
        overlayText: undefined
    },
    {
        id: 18,
        name: 'Kenwood',
        description: 'Robots culinaires et mixeurs britanniques. Qualité professionnelle pour transformer votre cuisine en atelier culinaire.',
        imageBg: 'bg-gradient-to-br from-red-200 to-red-300',
        overlayText: undefined
    }
]

/**
 * Récupère les marques depuis l'API
 * @returns Promise<BrandData[]> - Liste des marques
 */
const fetchBrands = async (): Promise<BrandData[]> => {
    try {
        // Remplacez cette URL par votre endpoint API réel
        const response = await fetch('/api/brands', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Erreur lors de la récupération des marques:', error)
        throw error
    }
}

/**
 * Génère un slug à partir du nom de la marque
 */
const generateBrandSlug = (name: string): string => {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères spéciaux par des tirets
        .replace(/^-+|-+$/g, '') // Supprime les tirets en début et fin
}

/**
 * Composant Shop - Affiche une grille de cartes de marques avec overlay interactif
 */
const Brands = () => {
    const router = useRouter()
    const [hoveredBrand, setHoveredBrand] = useState<number | null>(null)
    const [brands, setBrands] = useState<BrandData[]>(brandsData)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    /**
     * Charge les marques depuis l'API au montage du composant
     */
    useEffect(() => {
        const loadBrands = async () => {
            setIsLoading(true)
            
            try {
                // const brandsFromApi = await fetchBrands()
                // if (brandsFromApi && brandsFromApi.length > 0) {
                //     setBrands(brandsFromApi)
                // }
                console.log('brandsData', brandsData)
                setBrands(brandsData)
            } catch (err) {
                // En cas d'erreur, on garde les données par défaut
                console.warn('Utilisation des données par défaut:', err)
            } finally {
                setIsLoading(false)
            }
        }

        loadBrands()
    }, [])

    /**
     * Redirige vers la page de la marque
     */
    const handleBrandClick = (brand: BrandData) => {
        const slug = generateBrandSlug(brand.name)
        router.push(`/brands/${slug}`)
    }

    return (
        <section id="brands" className="py-20">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950">
                        Les marques
                    </span>
                    <h2 className="text-3xl md:text-4xl/tight font-semibold text-black mt-4">
                        Découvrez nos marques pour tous vos besoins en électroménager
                    </h2>
                    <p className="text-base font-medium mt-4 text-muted">
                        Cliquez sur une marque pour en savoir plus
                    </p>
                </div>
                
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <p className="text-muted">Chargement des marques...</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 pt-12 md:pt-20">
                        {brands.map((brand) => (
                            <div
                                key={brand.id}
                                className="group relative bg-white rounded-[20px] shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                                onMouseEnter={() => setHoveredBrand(brand.id)}
                                onMouseLeave={() => setHoveredBrand(null)}
                                onClick={() => handleBrandClick(brand)}
                            >
                                {/* Zone d'image de fond */}
                                <div className={`relative h-64 md:h-80 ${brand.imageBg} flex items-center justify-center`}>
                                    {/* Texte de fond pour certaines marques */}
                                    {brand.overlayText && (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <p className="text-white/30 text-lg md:text-xl font-bold text-center">
                                                {brand.overlayText}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Nom de la marque en grand */}
                                    <div className="text-center px-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-black">
                                            {brand.name}
                                        </h3>
                                    </div>

                                    {/* Overlay interactif au survol */}
                                    {hoveredBrand === brand.id && (
                                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 transition-all duration-300">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
                                                {brand.name}
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90 text-center mb-6 max-w-xs">
                                                {brand.description}
                                            </p>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleBrandClick(brand)
                                                }}
                                                className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                                Accéder
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Nom de la marque avec icône en bas */}
                                <div className="flex items-center justify-center gap-2 py-8 px-4">
                                    <IconifyIcon
                                        icon="lucide:tag"
                                        className="h-5 w-5 text-black"
                                    />
                                    <h4 className="text-base font-semibold text-black">
                                        {brand.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Brands
export { brandsData, type BrandData }
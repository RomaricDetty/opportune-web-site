/**
 * Interface pour les données d'un produit
 */
export interface ProductData {
    id: number
    name: string
    brand: string
    category: string  // Ajouter
    image: string
    currentPrice: number
    oldPrice: number
    discount: number
    inStock: boolean
    rating: number  // Ajouter (1-5)
    description?: string  // Ajouter optionnel
    minQuantity?: number  // Quantité minimale (par défaut 1)
}

/**
 * Données des produits d'électroménager
 */
export const productsData: ProductData[] = [
    {
        id: 1,
        name: 'Réfrigérateur Frigidaire 350L',
        brand: 'Frigidaire',
        category: 'Réfrigérateurs',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d1b5d685?w=400',
        currentPrice: 450000,
        oldPrice: 500000,
        discount: 10,
        inStock: true,
        rating: 4.5,
        description: 'Réfrigérateur combiné avec compartiment congélateur',
        minQuantity: 1
    },
    {
        id: 2,
        name: 'Lave-linge Whirlpool 8kg',
        brand: 'Whirlpool',
        category: 'Lave-linge',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        currentPrice: 270000,
        oldPrice: 300000,
        discount: 10,
        inStock: true,
        rating: 4.2,
        description: 'Machine à laver frontale avec technologie vapeur',
        minQuantity: 2
    },
    {
        id: 3,
        name: 'Four électrique Whirlpool',
        brand: 'Whirlpool',
        category: 'Fours',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
        currentPrice: 350000,
        oldPrice: 400000,
        discount: 12,
        inStock: true,
        rating: 4.0,
        description: 'Four encastrable avec chaleur tournante',
        minQuantity: 1
    },
    {
        id: 4,
        name: 'Lave-vaisselle Miele 14 couverts',
        brand: 'Miele',
        category: 'Lave-vaisselle',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400',
        currentPrice: 550000,
        oldPrice: 600000,
        discount: 8,
        inStock: true,
        rating: 4.8,
        description: 'Lave-vaisselle 14 couverts avec séchage automatique',
        minQuantity: 3
    },
    {
        id: 5,
        name: 'Climatiseur Hitachi 2.5kW',
        brand: 'Hitachi Appliances',
        category: 'Climatisation',
        image: 'https://images.unsplash.com/photo-1631540578001-0c0e7a0a4a0a?w=400',
        currentPrice: 1200000,
        oldPrice: 1500000,
        discount: 20,
        inStock: true,
        rating: 4.7,
        description: 'Climatiseur réversible avec fonction chauffage',
        minQuantity: 1
    },
    {
        id: 6,
        name: 'Micro-ondes Philips',
        brand: 'Philips',
        category: 'Micro-ondes',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
        currentPrice: 80000,
        oldPrice: 90000,
        discount: 11,
        inStock: true,
        rating: 4.3,
        description: 'Four à micro-ondes avec fonction grill',
        minQuantity: 2
    },
    {
        id: 7,
        name: 'Aspirateur Rowenta X-FORCE',
        brand: 'Rowenta',
        category: 'Aspirateurs',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400',
        currentPrice: 650000,
        oldPrice: 700000,
        discount: 7,
        inStock: true,
        rating: 4.9,
        description: 'Aspirateur sans fil avec autonomie longue durée',
        minQuantity: 1
    },
    {
        id: 8,
        name: 'Plaque de cuisson induction Smeg',
        brand: 'Smeg',
        category: 'Cuisine',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        currentPrice: 420000,
        oldPrice: 480000,
        discount: 12,
        inStock: true,
        rating: 4.4,
        description: 'Plaque induction 4 feux avec sécurité automatique',
        minQuantity: 3
    },
    {
        id: 9,
        name: 'Congélateur Frigidaire 200L',
        brand: 'Frigidaire',
        category: 'Congélateurs',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d1b5d685?w=400',
        currentPrice: 950000,
        oldPrice: 1000000,
        discount: 5,
        inStock: true,
        rating: 4.1,
        description: 'Congélateur armoire avec système de froid ventilé',
        minQuantity: 1
    },
    {
        id: 10,
        name: 'Sèche-linge Miele 9kg',
        brand: 'Miele',
        category: 'Sèche-linge',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        currentPrice: 1100000,
        oldPrice: 1300000,
        discount: 15,
        inStock: true,
        rating: 4.6,
        description: 'Sèche-linge à condensation avec programme délicat',
        minQuantity: 2
    },
    {
        id: 11,
        name: 'Robot mixeur Magimix',
        brand: 'Magimix',
        category: 'Petit électroménager',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
        currentPrice: 750000,
        oldPrice: 850000,
        discount: 11,
        inStock: true,
        rating: 4.5,
        description: 'Robot pâtissier avec accessoires inclus',
        minQuantity: 1
    },
    {
        id: 12,
        name: 'Machine à café Dualit',
        brand: 'Dualit',
        category: 'Petit électroménager',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
        currentPrice: 500000,
        oldPrice: 550000,
        discount: 9,
        inStock: true,
        rating: 4.7,
        description: 'Machine à café automatique avec mousseur à lait',
        minQuantity: 3
    },
    {
        id: 13,
        name: 'Chauffe-eau électrique Bajaj 150L',
        brand: 'Bajaj',
        category: 'Chauffe-eau',
        image: 'https://images.unsplash.com/photo-1631540578001-0c0e7a0a4a0a?w=400',
        currentPrice: 380000,
        oldPrice: 420000,
        discount: 9,
        inStock: true,
        rating: 4.0,
        description: 'Chauffe-eau vertical avec résistance stéatite',
        minQuantity: 1
    },
    {
        id: 14,
        name: 'Hotte aspirante Smeg',
        brand: 'Smeg',
        category: 'Cuisine',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        currentPrice: 280000,
        oldPrice: 320000,
        discount: 12,
        inStock: true,
        rating: 4.3,
        description: 'Hotte décorative avec extraction 600 m³/h',
        minQuantity: 2
    },
    {
        id: 15,
        name: 'Mixeur plongeant Ninja',
        brand: 'Ninja',
        category: 'Petit électroménager',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400',
        currentPrice: 45000,
        oldPrice: 55000,
        discount: 18,
        inStock: true,
        rating: 4.2,
        description: 'Mixeur plongeant avec accessoires de préparation',
        minQuantity: 1
    },
    {
        id: 16,
        name: 'Réfrigérateur Samsung 400L',
        brand: 'Samsung',
        category: 'Réfrigérateurs',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d1b5d685?w=400',
        currentPrice: 500000,
        oldPrice: 500000,
        discount: 0, // Produit sans réduction
        inStock: true,
        rating: 4.3,
        description: 'Réfrigérateur combiné avec technologie No Frost',
        minQuantity: 1
    },
    {
        id: 17,
        name: 'Lave-linge LG 10kg',
        brand: 'LG',
        category: 'Lave-linge',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        currentPrice: 320000,
        oldPrice: 320000,
        discount: 0, // Produit sans réduction
        inStock: true,
        rating: 4.5,
        description: 'Machine à laver hublot avec technologie vapeur',
        minQuantity: 1
    }
]

/**
 * Formate un nombre en format F CFA avec espaces
 */
export const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

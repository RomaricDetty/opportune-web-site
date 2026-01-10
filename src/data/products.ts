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
 * Données des produits (électroménager, téléphonie, accessoires, etc.)
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
    },
    // Téléphonie
    {
        id: 18,
        name: 'Samsung Galaxy A54 128GB',
        brand: 'Samsung',
        category: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        currentPrice: 180000,
        oldPrice: 200000,
        discount: 10,
        inStock: true,
        rating: 4.6,
        description: 'Smartphone Android avec écran AMOLED 6.4" et triple caméra',
        minQuantity: 1
    },
    {
        id: 19,
        name: 'iPhone 13 128GB',
        brand: 'Apple',
        category: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        currentPrice: 450000,
        oldPrice: 500000,
        discount: 10,
        inStock: true,
        rating: 4.8,
        description: 'iPhone avec puce A15 Bionic et système de caméra double',
        minQuantity: 1
    },
    {
        id: 20,
        name: 'Xiaomi Redmi Note 12 128GB',
        brand: 'Xiaomi',
        category: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        currentPrice: 120000,
        oldPrice: 140000,
        discount: 14,
        inStock: true,
        rating: 4.4,
        description: 'Smartphone avec écran AMOLED 6.67" et charge rapide 33W',
        minQuantity: 1
    },
    {
        id: 21,
        name: 'Téléphone fixe sans fil Panasonic',
        brand: 'Panasonic',
        category: 'Téléphones fixes',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
        currentPrice: 35000,
        oldPrice: 40000,
        discount: 12,
        inStock: true,
        rating: 4.2,
        description: 'Téléphone DECT avec écran LCD et répondeur intégré',
        minQuantity: 1
    },
    // Accessoires téléphone
    {
        id: 22,
        name: 'Étui de protection iPhone 13',
        brand: 'Spigen',
        category: 'Étuis et coques',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
        currentPrice: 15000,
        oldPrice: 20000,
        discount: 25,
        inStock: true,
        rating: 4.5,
        description: 'Coque de protection renforcée avec support kickstand',
        minQuantity: 1
    },
    {
        id: 23,
        name: 'Chargeur rapide USB-C 30W',
        brand: 'Anker',
        category: 'Chargeurs',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff56b?w=400',
        currentPrice: 12000,
        oldPrice: 15000,
        discount: 20,
        inStock: true,
        rating: 4.7,
        description: 'Chargeur rapide avec technologie Power Delivery',
        minQuantity: 1
    },
    {
        id: 24,
        name: 'Câble USB-C vers USB-C 2m',
        brand: 'Belkin',
        category: 'Câbles',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff56b?w=400',
        currentPrice: 8000,
        oldPrice: 10000,
        discount: 20,
        inStock: true,
        rating: 4.3,
        description: 'Câble de charge et transfert de données haute vitesse',
        minQuantity: 1
    },
    {
        id: 25,
        name: 'Power Bank 20000mAh',
        brand: 'Xiaomi',
        category: 'Power banks',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff56b?w=400',
        currentPrice: 25000,
        oldPrice: 30000,
        discount: 16,
        inStock: true,
        rating: 4.6,
        description: 'Batterie externe avec charge rapide et double port USB',
        minQuantity: 1
    },
    // Audio
    {
        id: 26,
        name: 'Écouteurs Bluetooth AirPods Pro',
        brand: 'Apple',
        category: 'Écouteurs',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        currentPrice: 180000,
        oldPrice: 200000,
        discount: 10,
        inStock: true,
        rating: 4.8,
        description: 'Écouteurs sans fil avec réduction de bruit active',
        minQuantity: 1
    },
    {
        id: 27,
        name: 'Casque audio Sony WH-1000XM4',
        brand: 'Sony',
        category: 'Casques audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        currentPrice: 220000,
        oldPrice: 250000,
        discount: 12,
        inStock: true,
        rating: 4.9,
        description: 'Casque sans fil avec réduction de bruit premium',
        minQuantity: 1
    },
    {
        id: 28,
        name: 'Haut-parleur Bluetooth JBL Flip 6',
        brand: 'JBL',
        category: 'Haut-parleurs',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        currentPrice: 65000,
        oldPrice: 75000,
        discount: 13,
        inStock: true,
        rating: 4.5,
        description: 'Enceinte portable étanche avec son stéréo puissant',
        minQuantity: 1
    },
    // Montres connectées
    {
        id: 29,
        name: 'Apple Watch Series 8',
        brand: 'Apple',
        category: 'Montres connectées',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        currentPrice: 280000,
        oldPrice: 320000,
        discount: 12,
        inStock: true,
        rating: 4.7,
        description: 'Montre connectée avec suivi santé et GPS intégré',
        minQuantity: 1
    },
    {
        id: 30,
        name: 'Samsung Galaxy Watch 5',
        brand: 'Samsung',
        category: 'Montres connectées',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        currentPrice: 150000,
        oldPrice: 180000,
        discount: 16,
        inStock: true,
        rating: 4.6,
        description: 'Montre intelligente avec suivi fitness et autonomie longue durée',
        minQuantity: 1
    },
    // Tablettes
    {
        id: 31,
        name: 'iPad Air 64GB',
        brand: 'Apple',
        category: 'Tablettes',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        currentPrice: 380000,
        oldPrice: 420000,
        discount: 9,
        inStock: true,
        rating: 4.8,
        description: 'Tablette avec écran Retina 10.9" et puce M1',
        minQuantity: 1
    },
    {
        id: 32,
        name: 'Samsung Galaxy Tab S8',
        brand: 'Samsung',
        category: 'Tablettes',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        currentPrice: 320000,
        oldPrice: 360000,
        discount: 11,
        inStock: true,
        rating: 4.6,
        description: 'Tablette Android avec stylet S Pen inclus',
        minQuantity: 1
    },
    // Ordinateurs portables
    {
        id: 33,
        name: 'MacBook Air M2 256GB',
        brand: 'Apple',
        category: 'Ordinateurs portables',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        currentPrice: 950000,
        oldPrice: 1100000,
        discount: 13,
        inStock: true,
        rating: 4.9,
        description: 'Ordinateur portable ultra-fin avec puce M2 et écran Retina 13.3"',
        minQuantity: 1
    },
    {
        id: 34,
        name: 'HP Pavilion 15.6"',
        brand: 'HP',
        category: 'Ordinateurs portables',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        currentPrice: 450000,
        oldPrice: 500000,
        discount: 10,
        inStock: true,
        rating: 4.4,
        description: 'Laptop avec processeur Intel Core i5 et 8GB RAM',
        minQuantity: 1
    },
    // Accessoires informatiques
    {
        id: 35,
        name: 'Souris sans fil Logitech MX Master 3',
        brand: 'Logitech',
        category: 'Accessoires informatiques',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
        currentPrice: 55000,
        oldPrice: 65000,
        discount: 15,
        inStock: true,
        rating: 4.7,
        description: 'Souris ergonomique avec défilement ultra-rapide',
        minQuantity: 1
    },
    {
        id: 36,
        name: 'Clavier mécanique RGB',
        brand: 'Corsair',
        category: 'Accessoires informatiques',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        currentPrice: 75000,
        oldPrice: 90000,
        discount: 16,
        inStock: true,
        rating: 4.5,
        description: 'Clavier gaming avec switches mécaniques et rétroéclairage RGB',
        minQuantity: 1
    }
]

/**
 * Formate un nombre en format F CFA avec espaces
 */
export const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

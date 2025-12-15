import { ProductData } from './products'

/**
 * Données des produits non-électroménagers
 */
export const otherProductsData: ProductData[] = [
    // Meubles
    {
        id: 100,
        name: 'Canapé 3 places en tissu gris',
        brand: 'HomeStyle',
        category: 'Meubles',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        currentPrice: 450000,
        oldPrice: 550000,
        discount: 18,
        inStock: true,
        rating: 4.5,
        description: 'Canapé confortable 3 places avec coussins amovibles',
        minQuantity: 1
    },
    {
        id: 101,
        name: 'Table à manger extensible en bois',
        brand: 'WoodCraft',
        category: 'Meubles',
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400',
        currentPrice: 320000,
        oldPrice: 380000,
        discount: 15,
        inStock: true,
        rating: 4.3,
        description: 'Table extensible pour 6 à 10 personnes',
        minQuantity: 1
    },
    {
        id: 102,
        name: 'Chaise de bureau ergonomique',
        brand: 'OfficePro',
        category: 'Meubles',
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        currentPrice: 85000,
        oldPrice: 100000,
        discount: 15,
        inStock: true,
        rating: 4.6,
        description: 'Chaise ergonomique avec support lombaire réglable',
        minQuantity: 1
    },
    {
        id: 103,
        name: 'Étagère bibliothèque 5 niveaux',
        brand: 'HomeStyle',
        category: 'Meubles',
        image: 'https://images.unsplash.com/photo-1594620302200-9a762244a94a?w=400',
        currentPrice: 180000,
        oldPrice: 220000,
        discount: 18,
        inStock: true,
        rating: 4.2,
        description: 'Étagère modulaire en métal et bois',
        minQuantity: 1
    },
    
    // Décoration
    {
        id: 104,
        name: 'Vase en céramique design',
        brand: 'ArtDecor',
        category: 'Décoration',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        currentPrice: 35000,
        oldPrice: 45000,
        discount: 22,
        inStock: true,
        rating: 4.4,
        description: 'Vase en céramique émaillée, hauteur 35cm',
        minQuantity: 1
    },
    {
        id: 105,
        name: 'Tableau abstrait moderne',
        brand: 'ArtDecor',
        category: 'Décoration',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
        currentPrice: 65000,
        oldPrice: 80000,
        discount: 18,
        inStock: true,
        rating: 4.7,
        description: 'Tableau imprimé sur toile, format 60x80cm',
        minQuantity: 1
    },
    {
        id: 106,
        name: 'Lampe de bureau LED',
        brand: 'LightStyle',
        category: 'Décoration',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
        currentPrice: 25000,
        oldPrice: 30000,
        discount: 16,
        inStock: true,
        rating: 4.5,
        description: 'Lampe LED avec variateur d\'intensité',
        minQuantity: 1
    },
    {
        id: 107,
        name: 'Miroir décoratif rectangulaire',
        brand: 'HomeStyle',
        category: 'Décoration',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        currentPrice: 55000,
        oldPrice: 70000,
        discount: 21,
        inStock: true,
        rating: 4.3,
        description: 'Miroir avec cadre en bois, 80x120cm',
        minQuantity: 1
    },
    
    // Accessoires de maison
    {
        id: 108,
        name: 'Tapis moderne gris clair',
        brand: 'HomeStyle',
        category: 'Accessoires',
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=400',
        currentPrice: 95000,
        oldPrice: 120000,
        discount: 20,
        inStock: true,
        rating: 4.6,
        description: 'Tapis en laine synthétique, 160x230cm',
        minQuantity: 1
    },
    {
        id: 109,
        name: 'Rideaux occultants beige',
        brand: 'TextileHome',
        category: 'Accessoires',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        currentPrice: 45000,
        oldPrice: 60000,
        discount: 25,
        inStock: true,
        rating: 4.4,
        description: 'Rideaux occultants, paire de 2 panneaux',
        minQuantity: 1
    },
    {
        id: 110,
        name: 'Coussins décoratifs assortis',
        brand: 'TextileHome',
        category: 'Accessoires',
        image: 'https://images.unsplash.com/photo-1584100936595-c0652b8e1eac?w=400',
        currentPrice: 15000,
        oldPrice: 20000,
        discount: 25,
        inStock: true,
        rating: 4.2,
        description: 'Lot de 4 coussins décoratifs 40x40cm',
        minQuantity: 1
    },
    
    // Literie
    {
        id: 111,
        name: 'Matelas mémoire de forme 140x190',
        brand: 'SleepWell',
        category: 'Literie',
        image: 'https://images.unsplash.com/photo-1631889993951-f6e0b0b3e0c4?w=400',
        currentPrice: 280000,
        oldPrice: 350000,
        discount: 20,
        inStock: true,
        rating: 4.8,
        description: 'Matelas à mémoire de forme, fermeté moyenne',
        minQuantity: 1
    },
    {
        id: 112,
        name: 'Oreiller ergonomique anti-allergique',
        brand: 'SleepWell',
        category: 'Literie',
        image: 'https://images.unsplash.com/photo-1616628188460-5c0e0c0c0c0c?w=400',
        currentPrice: 35000,
        oldPrice: 45000,
        discount: 22,
        inStock: true,
        rating: 4.5,
        description: 'Oreiller en mousse à mémoire de forme',
        minQuantity: 1
    },
    {
        id: 113,
        name: 'Parure de lit 4 pièces coton',
        brand: 'TextileHome',
        category: 'Literie',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
        currentPrice: 55000,
        oldPrice: 70000,
        discount: 21,
        inStock: true,
        rating: 4.6,
        description: 'Parure complète en coton 100%, taille 160x200',
        minQuantity: 1
    },
    
    // Articles de cuisine
    {
        id: 114,
        name: 'Casserole anti-adhésive 24cm',
        brand: 'CookPro',
        category: 'Cuisine',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400',
        currentPrice: 28000,
        oldPrice: 35000,
        discount: 20,
        inStock: true,
        rating: 4.4,
        description: 'Casserole avec revêtement anti-adhésif',
        minQuantity: 1
    },
    {
        id: 115,
        name: 'Set de couteaux de cuisine 6 pièces',
        brand: 'CookPro',
        category: 'Cuisine',
        image: 'https://images.unsplash.com/photo-1594736797933-d0c0d0b5b5b5?w=400',
        currentPrice: 45000,
        oldPrice: 60000,
        discount: 25,
        inStock: true,
        rating: 4.7,
        description: 'Set de couteaux en acier inoxydable',
        minQuantity: 1
    },
    {
        id: 116,
        name: 'Vaisselle en porcelaine 12 couverts',
        brand: 'TableStyle',
        category: 'Cuisine',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        currentPrice: 120000,
        oldPrice: 150000,
        discount: 20,
        inStock: true,
        rating: 4.5,
        description: 'Service complet en porcelaine blanche',
        minQuantity: 1
    },
    
    // Électronique
    {
        id: 117,
        name: 'Écouteurs Bluetooth sans fil',
        brand: 'TechSound',
        category: 'Électronique',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        currentPrice: 35000,
        oldPrice: 50000,
        discount: 30,
        inStock: true,
        rating: 4.6,
        description: 'Écouteurs avec réduction de bruit active',
        minQuantity: 1
    },
    {
        id: 118,
        name: 'Haut-parleur Bluetooth portable',
        brand: 'TechSound',
        category: 'Électronique',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        currentPrice: 45000,
        oldPrice: 60000,
        discount: 25,
        inStock: true,
        rating: 4.4,
        description: 'Enceinte Bluetooth étanche IPX7',
        minQuantity: 1
    },
    {
        id: 119,
        name: 'Chargeur sans fil universel',
        brand: 'TechSound',
        category: 'Électronique',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400',
        currentPrice: 18000,
        oldPrice: 25000,
        discount: 28,
        inStock: true,
        rating: 4.3,
        description: 'Chargeur sans fil compatible Qi',
        minQuantity: 1
    },
    
    // Jardin
    {
        id: 120,
        name: 'Set de jardin 4 pièces',
        brand: 'GardenStyle',
        category: 'Jardin',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
        currentPrice: 180000,
        oldPrice: 230000,
        discount: 21,
        inStock: true,
        rating: 4.5,
        description: 'Set table et 4 chaises en résine tressée',
        minQuantity: 1
    },
    {
        id: 121,
        name: 'Parasol déporté 3x3m',
        brand: 'GardenStyle',
        category: 'Jardin',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400',
        currentPrice: 95000,
        oldPrice: 120000,
        discount: 20,
        inStock: true,
        rating: 4.3,
        description: 'Parasol avec base et manivelle',
        minQuantity: 1
    },
    {
        id: 122,
        name: 'Canapé 2 places en cuir',
        brand: 'HomeStyle',
        category: 'Meubles',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        currentPrice: 380000,
        oldPrice: 380000,
        discount: 0, // Produit sans réduction
        inStock: true,
        rating: 4.4,
        description: 'Canapé en cuir véritable, 2 places',
        minQuantity: 1
    }
]

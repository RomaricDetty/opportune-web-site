export interface Article {
  id: string
  libelle: string
  slug: string
  description: string
  excerpt: string
  imagePrincipale: string
  /** Galerie additionnelle : tableau ou chaine JSON ["url1","url2"] selon l'API */
  images?: string | string[] | null
  category: Category
  isAvailable : boolean
  discount: number
  prix: number
  quantite_stock: number
  quantite_minimale: number
  created_at: string
  updated_at: string,
  marque : Marque
}

export interface Category{
  id : string,
  libelle : string
}

export interface Marque {
  id : string,
  libelle : string
}




import axiosInstance from '../lib/axios'
import {
  Category,
} from '../types/articles'

const CATEGORIES = '/categories'


export const CartegoryService = {

  // ── GET ALL ────────────────────────────────────────────────────────────────
  getAll: async (): Promise<Category> => {
    const { data } = await axiosInstance.get<any>(CATEGORIES)
    return data.data
  },

  // ── GET BY ID ──────────────────────────────────────────────────────────────
  getById: async (id: string): Promise< Category> => {
    const { data } = await axiosInstance.get<any>(`${CATEGORIES}/${id}`)
    return data.data
  },

  
 
}
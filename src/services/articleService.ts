import axiosInstance from '../lib/axios'
import {
  Article,
} from '../types/articles'

const ARTICLES = '/products'
const ORDERS   = '/orders'

export const articleService = {

  // ── GET ALL HOME────────────────────────────────────────────────────────────────
  getAllHome: async (): Promise<Article> => {
    const { data } = await axiosInstance.get<any>(`${ARTICLES}/home`)
    return data.data
  },

   // ── GET ALL ────────────────────────────────────────────────────────────────
  getAll: async (): Promise<Article> => {
    const { data } = await axiosInstance.get<any>(ARTICLES)
    return data.data
  },
  // ── GET BY ID ──────────────────────────────────────────────────────────────
  getById: async (id: string): Promise<Article> => {
    const { data } = await axiosInstance.get<any>(`${ARTICLES}/${id}`)
    return data.data
  },

  getByName: async (name: string): Promise<Article> => {
    const { data } = await axiosInstance.get<Article>(`${ARTICLES}/name/${name}`)
    return data
  },
  // ── GET BY SLUG ────────────────────────────────────────────────────────────
  getByParams: async (params:string, value:string): Promise<Article> => {
    console.log('params ==> ', params)
    console.log('value ==> ', value)
    console.log('${ARTICLES}?${params}=${value} ==> ', `${ARTICLES}?${params}=${value}`)
    const { data } = await axiosInstance.get<any>(`${ARTICLES}?${params}=${value}`)
    console.log('data ==> ', data)
    return data.data
  },

  updateViews: async (id: string): Promise<void> => {
    await axiosInstance.patch(`${ARTICLES}/${id}/views`)
  },


}
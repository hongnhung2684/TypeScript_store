import { Product } from './Product'

export type CartItem = {
  product: Product
  quantity: number
}
export interface Cart {
  id?: number | string
  products: CartItem[]
}

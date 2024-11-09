import { createContext, useEffect, useReducer } from 'react'
import instance from '../apis'
import { Product } from '../interfaces/Product'
import productReducer from '../reducers/productReducer'
import { useNavigate } from 'react-router-dom'

type ProductContextType = {
  state: {
    products: Product[]
    selectedProduct?: Product
  }
  handleRemove: (id: number) => void
  onSubmitProduct: (data: Product) => void
  getDetail: (data: number | string) => void
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate()
  const [state, dispatch] = useReducer(productReducer, { products: [] })
  useEffect(() => {
    ;(async () => {
      const { data } = await instance.get(`/products`)
      dispatch({ type: 'SET_PRODUCTS', payload: data })
    })()
  }, [])

  const handleRemove = async (id: number) => {
    if (confirm('Are you sure?')) {
      await instance.delete(`/products/${id}`)
      dispatch({ type: 'DELETE_PRODUCT', payload: id })
    }
  }
  const onSubmitProduct = async (data: Product) => {
    try {
      if (data.id) {
        const response = await instance.patch(`/products/${data.id}`, data)
        dispatch({ type: 'UPDATE_PRODUCT', payload: response.data })
      } else {
        const response = await instance.post(`/products`, data)
        dispatch({ type: 'ADD_PRODUCT', payload: response.data })
      }

      nav('/admin')
    } catch (error) {
      console.log(error)
    }
  }
  const getDetail = async (id: number | string | undefined) => {
    const { data } = await instance.get(`/products/${id}`)
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: data })
  }
  return (
    <ProductContext.Provider value={{ state, handleRemove, onSubmitProduct, getDetail }}>
      {children}
    </ProductContext.Provider>
  )
}

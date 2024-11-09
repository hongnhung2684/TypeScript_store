import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../contexts/ProductContext'
import { AuthContext } from '../contexts/AuthContext'
import { Product } from '../interfaces/Product'
import { CartItem } from '../interfaces/Cart'

const ProductDetail = () => {
  const { id } = useParams()
  const { getDetail, state } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const addToCart = (product: Product) => {
    const index = cart.findIndex((item: CartItem) => item.product.id === product.id)
    if (index === -1) {
      // Khi sản phẩm chưa có trong giỏ hàng, thi thêm sản phẩm vào giỏ hàng với quantity = 1
      cart.push({ product, quantity: 1 })
    } else {
      // Khi sản phẩm định mua đã có trong giỏ hàng, thì tìm sản phẩm đó và cập nhật quantity lên 1
      cart[index].quantity++
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Add to cart successfully')
  }

  useEffect(() => {
    if (id) {
      getDetail(id)
    }
  }, [id, getDetail])

  return (
    <>
      <div className='detail'>
        <h2 className='text-3xl'>Chi tiết sản phẩm</h2>
        <br />
        {state.selectedProduct && (
          <div className='detail1'>
            <img src={state.selectedProduct.thumbnail} alt='' className='border' />
            <div className='detail2'>
              <h2 className='text-3xl underline '> {state.selectedProduct.title}</h2>
              <p className='text-xl from-neutral-500'>Price: {state.selectedProduct.price}</p>
              <button
                className='btn btn-danger w-100'
                onClick={
                  user?.email
                    ? () => addToCart(state.selectedProduct)
                    : () => {
                        alert('Ban phai dang nhap de thuc hien tinh nang nay!')
                      }
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductDetail

import { useContext, useEffect, useState } from 'react'
import { CartItem } from '../interfaces/Cart'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const [totalPrice, setTotalPrice] = useState(0)
  const [showQRCode, setShowQRCode] = useState(true)
  const { user } = useContext(AuthContext)
  const nav = useNavigate()
  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc: number, item: CartItem) => {
        return acc + item.product.price * item.quantity
      }, 0)
      setTotalPrice(Math.round(total * 100) / 100)
    }
  }, [])

  const handlePayment = () => {
    const bill = { user, cart, totalPrice }
    localStorage.setItem('bill', JSON.stringify(bill))
    localStorage.removeItem('cart')
    setShowQRCode(false)
    alert('Thanh toan thanh cong!')
    nav('/order')
  }
  return (
    <div className='container'>
      <h2>Giỏ hàng</h2>
      <table className='table table-bordered table-striped text-center'>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item: CartItem, index: number) => (
              <tr key={index}>
                <td>{item.product.title}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
              </tr>
            ))
          ) : (
            <h2 className='text-danger'>Giỏ hàng trống!</h2>
          )}
        </tbody>
      </table>
      <h2>Thành tiền: {totalPrice || ''}</h2>
      <div className='thanhtoan'>
        <button onClick={() => handlePayment()} className='btn btn-danger w-100'>
          Thanh toán
        </button>
        <div className='qr'>{showQRCode && <img src='qr.png' width={200} />}</div>
      </div>
    </div>
  )
}

export default CartPage

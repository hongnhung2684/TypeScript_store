import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ProductContext } from '../contexts/ProductContext'
import { CartItem } from '../interfaces/Cart'
import { Product } from '../interfaces/Product'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import SearchBar from '../components/Search'

const Home = () => {
  const { state } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('')

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

  // Handle Search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle Sort
  const handleSort = (option: string) => {
    setSortOption(option)
  }

  // Filter and Sort Products
  const filteredAndSortedProducts = state.products
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') {
        return a.price - b.price
      } else if (sortOption === 'price-desc') {
        return b.price - a.price
      } else if (sortOption === 'name-asc') {
        return a.title.localeCompare(b.title)
      } else if (sortOption === 'name-desc') {
        return b.title.localeCompare(a.title)
      } else {
        return 0
      }
    })

  return (
    <div className='product'>
      <div className='bg-white'>
        <div className='search-sort-bar'>
          <SearchBar onSearch={handleSearch} />
          <select onChange={(e) => handleSort(e.target.value)} value={sortOption} className='aaa'>
            <option value=''>Sort by</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='name-asc'>Name: A to Z</option>
            <option value='name-desc'>Name: Z to A</option>
          </select>
        </div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {filteredAndSortedProducts.map((item) => (
              <a key={item.id} className='group'>
                <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                  <Link to={`/product-detail/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      className='h-full w-full object-cover object-center group-hover:opacity-75'
                    />
                  </Link>
                </div>
                <div className='title'>
                  <Link to={`/product-detail/${item.id}`}>
                    <h2>{item.title}</h2>
                  </Link>
                  <p className='mt-1 text-lg font-medium text-gray-800'>Price: {item.price}</p>
                </div>
                <button
                  className='btn btn-danger w-100'
                  onClick={
                    user?.email
                      ? () => addToCart(item)
                      : () => {
                          alert('Ban phai dang nhap de thuc hien tinh nang nay!')
                        }
                  }
                >
                  Add to cart
                </button>
              </a>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home

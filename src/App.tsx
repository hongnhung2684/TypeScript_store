import { Route, Routes } from 'react-router-dom'
import './App.scss'
import './index.scss'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import ProductForm from './pages/admin/ProductForm'
import AuthForm from './components/AuthForm'
import Header from './components/Header'
import ClientLayout from './components/ClientLayout'
import AdminLayout from './components/AdminLayout'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import Order from './pages/Order'

// extension: Console Ninja
// state =  trang thai, tinh trang

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/*Client */}
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order' element={<Order />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
        </Route>

        {/* Admin*/}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/product-add' element={<ProductForm />} />
          <Route path='/admin/product-edit/:id' element={<ProductForm />} />
        </Route>

        <Route path='/register' element={<AuthForm />} />
        <Route path='/login' element={<AuthForm isLogin />} />
      </Routes>
    </>
  )
}

export default App

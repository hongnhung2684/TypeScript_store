import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProductProvider } from './contexts/ProductContext.tsx'
import './index.scss'
import AuthProvider from './contexts/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

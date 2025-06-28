import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { CategoryProvider } from './contexts/CategoryContext.jsx' // 1. Import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider> {/* 2. Add the provider */}
          <CartProvider>
            <App />
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
)
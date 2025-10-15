// App.jsx (الكود الكامل مع الـ Footer)

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import TopBar from './components/TopBar/TopBar'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer/footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import BackToTop from './components/BackToTop/BackToTop'


function AppContent() {
  const location = useLocation()
  const is404Page = !['/', '/contact', '/about', '/signup', '/login', '/products', '/wishlist', '/cart', '/checkout'].includes(location.pathname) && !location.pathname.startsWith('/product/')
  const isHomePage = location.pathname === '/'
  const isWishlistPage = location.pathname === '/wishlist'
  const isCartPage = location.pathname === '/cart'
  const isCheckoutPage = location.pathname === '/checkout'
  const isContactPage = location.pathname === '/contact'
  const isProductDetailPage = location.pathname.startsWith('/product/')
  const isLoginPage = location.pathname === '/login'
  const isSignUpPage = location.pathname === '/signup'

  return (
    <div className="app">
      <TopBar />
      <Navbar />

      {/* هذا القسم ينمو ليملأ المساحة ويدفع الـ Footer للأسفل */}
      <div className="app-layout">
        {!is404Page && !isHomePage && !isWishlistPage && !isCartPage && !isCheckoutPage && !isContactPage && !isProductDetailPage && !isLoginPage && !isSignUpPage && <Sidebar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* 💡 إضافة مكون الـ Footer هنا، سيظهر بعد المحتوى الرئيسي */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
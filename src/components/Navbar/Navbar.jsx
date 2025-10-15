import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiHeart, FiUser, FiShoppingCart, FiSearch, FiLogOut, FiX } from 'react-icons/fi'
import { MdAccountCircle, MdShoppingBag, MdCancel, MdStar } from 'react-icons/md'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { getProducts } from '../../services/api'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { wishlistCount, addToWishlist } = useWishlist()
  const { cartCount, addToCart } = useCart()
  const { isLoggedIn, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const profileMenuRef = useRef(null)
  const searchInputRef = useRef(null)
  
  // Check if we're on signup or login pages
  const isAuthPage = location.pathname === '/signup' || location.pathname === '/login'

  // Load all products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts
        .filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 10) // Show top 10 results in modal
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, allProducts])

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearchModal])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showSearchModal) {
        closeSearchModal()
      }
    }

    if (showSearchModal) {
      document.addEventListener('keydown', handleEscKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [showSearchModal])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    // Stay on current page after logout, just update the navbar
  }

  const handleProfileMenuClick = (action) => {
    setShowProfileMenu(false)
    
    // For now, show alerts for menu items that don't have pages yet
    // In production, these would navigate to actual pages
    switch(action) {
      case 'account':
        alert('Manage My Account - This page is under construction')
        // navigate('/account')
        break
      case 'orders':
        alert('My Orders - This page is under construction')
        // navigate('/orders')
        break
      case 'cancellations':
        alert('My Cancellations - This page is under construction')
        // navigate('/cancellations')
        break
      case 'reviews':
        alert('My Reviews - This page is under construction')
        // navigate('/reviews')
        break
      default:
        break
    }
  }

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation()
    addToWishlist(product)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product)
  }

  const handleProductClick = (productId) => {
    closeSearchModal()
    navigate(`/product/${productId}`)
  }

  const openSearchModal = () => {
    setShowSearchModal(true)
  }

  const closeSearchModal = () => {
    setShowSearchModal(false)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-mobile-menu" aria-label="Open menu">
            <span className="navbar-mobile-menu-line"></span>
            <span className="navbar-mobile-menu-line"></span>
            <span className="navbar-mobile-menu-line"></span>
          </button>
          <Link to="/" className="navbar-logo">Exclusive</Link>
        </div>

        <div className="navbar-navigation">
          <Link 
            to="/" 
            className={`navbar-nav-link ${location.pathname === '/' ? 'active-page' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-nav-link ${location.pathname === '/contact' ? 'active-page' : ''}`}
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className={`navbar-nav-link ${location.pathname === '/about' ? 'active-page' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/signup" 
            className={`navbar-nav-link ${location.pathname === '/signup' ? 'active-page' : ''}`}
          >
            Sign Up
          </Link>
        </div>

        <div className="navbar-search-container">
          <div className="navbar-search-wrapper" onClick={openSearchModal}>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="navbar-search-input"
              readOnly
            />
            <FiSearch className="navbar-search-icon-right" />
          </div>
        </div>

        <div className="navbar-actions">
          {/* Hide all icons on Sign Up and Login pages */}
          {!isAuthPage && (
            <>
              {/* Heart Icon (Wishlist) - Always visible when not on auth pages */}
              <button 
                className="navbar-action-button" 
                aria-label="Wishlist"
                onClick={() => navigate('/wishlist')}
                style={{ position: 'relative' }}
              >
                <FiHeart className="text-xl" />
                {wishlistCount > 0 && (
                  <span className="navbar-cart-badge">{wishlistCount}</span>
                )}
              </button>

              {/* Shopping Cart Icon - Always visible when not on auth pages */}
              <button 
                className="navbar-cart-button" 
                aria-label="Cart"
                onClick={() => navigate('/cart')}
              >
                <FiShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="navbar-cart-badge">{cartCount}</span>
                )}
              </button>

              {/* User Profile Icon - Only visible when logged in */}
              {isLoggedIn && (
                <div ref={profileMenuRef} style={{ position: 'relative' }}>
                  <button 
                    className="navbar-action-button" 
                    aria-label="Account"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <FiUser className="text-xl" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="profile-dropdown-menu">
                      <button 
                        className="profile-menu-item"
                        onClick={() => handleProfileMenuClick('account')}
                      >
                        <MdAccountCircle className="profile-menu-icon" />
                        <span>Manage My Account</span>
                      </button>
                      <button 
                        className="profile-menu-item"
                        onClick={() => handleProfileMenuClick('orders')}
                      >
                        <MdShoppingBag className="profile-menu-icon" />
                        <span>My Order</span>
                      </button>
                      <button 
                        className="profile-menu-item"
                        onClick={() => handleProfileMenuClick('cancellations')}
                      >
                        <MdCancel className="profile-menu-icon" />
                        <span>My Cancellations</span>
                      </button>
                      <button 
                        className="profile-menu-item"
                        onClick={() => handleProfileMenuClick('reviews')}
                      >
                        <MdStar className="profile-menu-icon" />
                        <span>My Reviews</span>
                      </button>
                      <button 
                        className="profile-menu-item"
                        onClick={handleLogout}
                      >
                        <FiLogOut className="profile-menu-icon" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Full-Screen Search Modal */}
      {showSearchModal && (
        <div className="search-modal-overlay" onClick={closeSearchModal}>
          <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="search-modal-close" onClick={closeSearchModal} aria-label="Close search">
              <FiX size={24} />
            </button>

            {/* Search Header */}
            <div className="search-modal-header">
              <h2 className="search-modal-title">Search Products</h2>
              <div className="search-modal-input-wrapper">
                <FiSearch className="search-modal-search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  className="search-modal-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="search-modal-results">
              {searchQuery.trim().length === 0 ? (
                <div className="search-modal-empty">
                  <FiSearch size={48} />
                  <p>Start typing to search for products...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="search-modal-empty">
                  <p>No products found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-modal-result-item"
                    >
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="search-modal-result-image"
                        onClick={() => handleProductClick(product.id)}
                      />

                      {/* Product Details */}
                      <div 
                        className="search-modal-result-details"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <h4 className="search-modal-result-title">{product.title}</h4>
                        <p className="search-modal-result-price">${product.price}</p>
                      </div>

                      {/* Action Icons */}
                      <div className="search-modal-result-actions">
                        <button
                          className="search-modal-action-btn"
                          onClick={(e) => handleAddToWishlist(e, product)}
                          aria-label="Add to Wishlist"
                        >
                          <FiHeart />
                        </button>
                        <button
                          className="search-modal-action-btn"
                          onClick={(e) => handleAddToCart(e, product)}
                          aria-label="Add to Cart"
                        >
                          <FiShoppingCart />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
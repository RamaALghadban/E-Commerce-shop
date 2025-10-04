import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHeart, FiUser, FiShoppingCart, FiSearch } from 'react-icons/fi'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

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
            className={`navbar-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className={`navbar-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/signup" 
            className={`navbar-nav-link ${location.pathname === '/signup' ? 'active' : ''}`}
          >
            Sign Up
          </Link>
        </div>

        <div className="navbar-search-container">
          <div className="navbar-search-wrapper">
            <input
              type="text"
              placeholder="What are you looking for"
              className="navbar-search-input"
            />
            <FiSearch className="navbar-search-icon-right" />
          </div>
        </div>

        <div className="navbar-actions">
          {location.pathname !== '/signup' && location.pathname !== '/login' && (
            <button className="navbar-action-button" aria-label="Wishlist">
              <FiHeart className="text-xl" />
            </button>
          )}
          {location.pathname !== '/signup' && location.pathname !== '/login' && (
          <button className="navbar-cart-button" aria-label="Cart">
            <FiShoppingCart className="text-xl" />
            <span className="navbar-cart-badge">0</span>
          </button>)}
          {location.pathname !== '/signup' && location.pathname !== '/login' && (
            <button className="navbar-action-button" aria-label="Account">
              <FiUser className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
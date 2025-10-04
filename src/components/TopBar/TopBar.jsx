import React from 'react'
import './TopBar.css'

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <p className="topbar-message">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <a href="#shop" className="topbar-shop-link">shop now</a>
        </p>
        <select
          aria-label="Select language"
          className="topbar-language-selector"
          defaultValue="en"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </div>
  )
}

export default TopBar
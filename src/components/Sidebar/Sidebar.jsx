import React, { useState } from 'react'
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})

  const categories = [
    { name: "Women's Fashion", hasSubcategories: true },
    { name: "Men's Fashion", hasSubcategories: true },
    { name: "Electronics", hasSubcategories: true },
    { name: "Home & Lifestyle", hasSubcategories: true },
    { name: "Medicine", hasSubcategories: false },
    { name: "Sports & Outdoor", hasSubcategories: true },
    { name: "Baby's & Toys", hasSubcategories: true },
    { name: "Groceries & Pets", hasSubcategories: true },
    { name: "Health & Beauty", hasSubcategories: true }
  ]

  const toggleCategory = (categoryName) => {
    if (categories.find(cat => cat.name === categoryName)?.hasSubcategories) {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryName]: !prev[categoryName]
      }))
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="sidebar-mobile-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
      >
        <FiMenu className="sidebar-toggle-icon" />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Categories</h2>
          <button 
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <FiX className="sidebar-close-icon" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-categories">
            {categories.map((category) => (
              <li key={category.name} className="sidebar-category-item">
                <button
                  className={`sidebar-category-button ${
                    expandedCategories[category.name] ? 'expanded' : ''
                  }`}
                  onClick={() => toggleCategory(category.name)}
                >
                  <span className="sidebar-category-name">{category.name}</span>
                  {category.hasSubcategories && (
                    <span className="sidebar-category-icon">
                      {expandedCategories[category.name] ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      )}
                    </span>
                  )}
                </button>
                
                {category.hasSubcategories && expandedCategories[category.name] && (
                  <ul className="sidebar-subcategories">
                    <li className="sidebar-subcategory-item">
                      <a href="#" className="sidebar-subcategory-link">
                        View All {category.name}
                      </a>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <a href="#" className="sidebar-subcategory-link">
                        Featured Items
                      </a>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <a href="#" className="sidebar-subcategory-link">
                        New Arrivals
                      </a>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <a href="#" className="sidebar-subcategory-link">
                        Sale Items
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <p className="sidebar-footer-text">
              Discover amazing products across all categories
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

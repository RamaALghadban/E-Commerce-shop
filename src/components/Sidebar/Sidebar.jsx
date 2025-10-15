import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})

  const categories = [
    { name: "Women's Fashion", hasSubcategories: true },
    { name: "Men's Fashion", hasSubcategories: true },
    { name: "Electronics", hasSubcategories: false },
    { name: "Home & Lifestyle", hasSubcategories: false },
    { name: "Medicine", hasSubcategories: false },
    { name: "Sports & Outdoor", hasSubcategories: false },
    { name: "Baby's & Toys", hasSubcategories: false },
    { name: "Groceries & Pets", hasSubcategories: false },
    { name: "Health & Beauty", hasSubcategories: false }
  ]

  const toggleCategory = (categoryName) => {
    if (categories.find(cat => cat.name === categoryName)?.hasSubcategories) {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryName]: !prev[categoryName]
      }))
    } else {
      // Navigate to products page for categories without subcategories
      navigate('/products')
    }
  }

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page
    navigate('/products')
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
                  className={`sidebar-category-button ${expandedCategories[category.name] ? 'expanded' : ''
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
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className="sidebar-subcategory-link"
                      >
                        View All {category.name}
                      </button>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <button
                        onClick={() => handleCategoryClick('Featured')}
                        className="sidebar-subcategory-link"
                      >
                        Featured Items
                      </button>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <button
                        onClick={() => handleCategoryClick('New Arrivals')}
                        className="sidebar-subcategory-link"
                      >
                        New Arrivals
                      </button>
                    </li>
                    <li className="sidebar-subcategory-item">
                      <button
                        onClick={() => handleCategoryClick('Sale')}
                        className="sidebar-subcategory-link"
                      >
                        Sale Items
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        
      </aside>
    </>
  )
}

export default Sidebar

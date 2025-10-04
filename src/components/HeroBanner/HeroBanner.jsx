import React, { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './HeroBanner.css'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Apple iPhone 14 Series",
      subtitle: "Experience the future of smartphones",
      description: "Get up to 10% off on the latest iPhone 14, iPhone 14 Plus, iPhone 14 Pro, and iPhone 14 Pro Max. Limited time offer!",
      discount: "Up to 10% OFF",
      buttonText: "Shop Now",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      productImage: "📱"
    },
    {
      id: 2,
      title: "iPhone 14 Pro Max",
      subtitle: "Pro camera system with 48MP main camera",
      description: "Capture stunning photos and videos with the advanced Pro camera system. Dynamic Island brings alerts and Live Activities to life.",
      discount: "Save 8%",
      buttonText: "Explore Pro Max",
      backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      productImage: "📱"
    },
    {
      id: 3,
      title: "iPhone 14 Pro",
      subtitle: "A16 Bionic chip with 6-core GPU",
      description: "Superfast performance meets incredible efficiency. The A16 Bionic chip delivers the power you need for everything you love to do.",
      discount: "Save 10%",
      buttonText: "Buy Now",
      backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      productImage: "📱"
    },
    {
      id: 4,
      title: "iPhone 14 & 14 Plus",
      subtitle: "All-day battery life and advanced safety features",
      description: "Emergency SOS via satellite and Crash Detection. Available in stunning colors with all-day battery life.",
      discount: "Save 7%",
      buttonText: "Shop iPhone 14",
      backgroundImage: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      productImage: "📱"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  return (
    <div className="hero-banner">
      <div className="hero-banner-container">
        <div className="hero-slides-wrapper">
          <div 
            className="hero-slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="hero-slide"
                style={{ background: slide.backgroundImage }}
              >
                <div className="hero-slide-content">
                  <div className="hero-slide-left">
                    <div className="hero-badge">
                      <span className="hero-discount">{slide.discount}</span>
                    </div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <h2 className="hero-subtitle">{slide.subtitle}</h2>
                    <p className="hero-description">{slide.description}</p>
                    <button className="hero-cta-button">
                      {slide.buttonText}
                    </button>
                  </div>
                  <div className="hero-slide-right">
                    <div className="hero-product-image">
                      {slide.productImage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="hero-nav-button hero-nav-prev"
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
        >
          <FiChevronLeft />
        </button>
        <button 
          className="hero-nav-button hero-nav-next"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <FiChevronRight />
        </button>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner

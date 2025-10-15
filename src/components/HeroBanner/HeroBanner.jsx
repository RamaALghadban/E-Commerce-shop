import React, { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import './HeroBanner.css'
import iphoneImage from '../../assets/images/iphon.png'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      id: 1,
      logo: "Apple",
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
      productImage: iphoneImage
    },
    {
      id: 2,
      logo: "Apple",
      title: "iPhone 14 Pro Max",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
      productImage: iphoneImage
    },
    {
      id: 3,
      logo: "Apple",
      title: "iPhone 14 Pro",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
      productImage: iphoneImage
    }
  ]

  // Auto-slide functionality - enabled with pause on hover
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => 
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        )
      }, 4000) // Change slide every 4 seconds

      return () => clearInterval(timer)
    }
  }, [slides.length, isPaused])

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div 
      className="hero-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
              >
                <div className="hero-slide-content">
                  <div className="hero-slide-left">
                    <div className="hero-logo">
                      <FaApple className="apple-icon" />
                      <span className="hero-logo-text">{slide.logo}</span>
                    </div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <h2 className="hero-subtitle">{slide.subtitle}</h2>
                    <a href="#shop" className="hero-shop-link">
                      <span className="shop-link-text">{slide.buttonText}</span>
                      <FiArrowRight className="shop-link-arrow" />
                    </a>
                  </div>
                  <div className="hero-slide-right">
                    <img
                      src={slide.productImage}
                      alt={slide.title}
                      className="hero-product-image"
                    />
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

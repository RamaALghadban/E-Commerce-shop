import React from 'react'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import FlashSales from '../components/FlashSales/FlashSales'

function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <HeroBanner />
        <FlashSales />
        <div className="home-content">
          <h1>Welcome to Exclusive</h1>
          <p>Discover amazing products and great deals on our e-commerce platform.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
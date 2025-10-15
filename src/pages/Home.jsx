import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '../components/Sidebar/Sidebar'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import FlashSales from '../components/FlashSales/FlashSales'
import BrowseCategory from '../components/BrowseCategory/BrowseCategory'
import BestSelling from '../components/BestSelling/BestSelling'
import PromoBanner from '../components/PromoBanner/PromoBanner'
import ExploreProducts from '../components/ExploreProducts/ExploreProducts'
import NewArrival from '../components/NewArrival/NewArrival'
import Services from '../components/Services/Services'

function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section: Sidebar + Hero Banner */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          mb: 6,
          px: { xs: 1, md: 3 },
          pt: 2,
          overflow: 'visible',
        }}
      >
        {/* Left: Sidebar Navigation */}
        <Box
          sx={{
            width: '217px',
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            overflow: 'visible',
          }}
        >
          <Sidebar />
        </Box>

        {/* Right: Hero Banner */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: 'visible',
          }}
        >
          <HeroBanner />
        </Box>
      </Box>

      {/* Flash Sales Section */}
      <Box sx={{ mb: 6 }}>
        <FlashSales />
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          mx: { xs: 2, md: 6 },
          mb: 6,
        }}
      />

      {/* Browse By Category Section */}
      <Box sx={{ mb: 6 }}>
        <BrowseCategory />
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          borderBottom: '1px solid #e0e0e0',
          mx: { xs: 2, md: 6 },
          mb: 6,
        }}
      />

      {/* Best Selling Products Section */}
      <Box sx={{ mb: 6 }}>
        <BestSelling />
      </Box>

      {/* Promotional Banner */}
      <Box sx={{ mb: 6 }}>
        <PromoBanner />
      </Box>

      {/* Explore Our Products Section */}
      <Box sx={{ mb: 6 }}>
        <ExploreProducts />
      </Box>

      {/* New Arrival Section */}
      <Box sx={{ mb: 6 }}>
        <NewArrival />
      </Box>

      {/* Services Section */}
      <Box sx={{ mb: 6 }}>
        <Services />
      </Box>
    </Box>
  )
}

export default Home
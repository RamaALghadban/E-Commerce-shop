import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Container,
  IconButton,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import {
  ArrowBackIos,
  ArrowForwardIos,
  PhoneAndroid,
  Computer,
  Watch,
  CameraAlt,
  Headphones,
  SportsEsports,
} from '@mui/icons-material'

const BrowseCategory = () => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const categories = [
    { id: 1, name: 'Phones', icon: PhoneAndroid },
    { id: 2, name: 'Computers', icon: Computer },
    { id: 3, name: 'SmartWatch', icon: Watch },
    { id: 4, name: 'Camera', icon: CameraAlt },
    { id: 5, name: 'Headphones', icon: Headphones },
    { id: 6, name: 'Gaming', icon: SportsEsports },
  ]

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleCategoryClick = (category) => {
    navigate('/products')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Section Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            {/* Categories Label with Red Rectangle */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 20,
                  height: 40,
                  backgroundColor: '#d32f2f',
                  borderRadius: '4px'
                }}
              />
              <Typography
                sx={{
                  color: '#d32f2f',
                  fontWeight: 600,
                  fontSize: '16px',
                }}
              >
                Categories
              </Typography>
            </Stack>

            {/* Main Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: { xs: '28px', md: '36px' },
              }}
            >
              Browse By Category
            </Typography>
          </Box>

          {/* Navigation Arrows */}
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => scroll('left')}
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' },
                width: 46,
                height: 46,
                borderRadius: '50%',
              }}
            >
              <ArrowBackIos sx={{ fontSize: 16, ml: 1 }} />
            </IconButton>
            <IconButton
              onClick={() => scroll('right')}
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' },
                width: 46,
                height: 46,
                borderRadius: '50%',
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Category Cards Grid */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d32f2f',
            borderRadius: 4,
          },
        }}
      >
        {categories.map((category) => {
          const IconComponent = category.icon
          const isHovered = hoveredCard === category.id

          return (
            <Card
              key={category.id}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCategoryClick(category)}
              sx={{
                minWidth: 170,
                maxWidth: 170,
                height: 145,
                flexShrink: 0,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: isHovered ? '#d32f2f' : '#fff',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  borderColor: '#d32f2f',
                  boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  p: 2,
                }}
              >
                {/* Category Icon */}
                <IconComponent
                  sx={{
                    fontSize: 56,
                    color: isHovered ? '#fff' : '#fff',
                    mb: 2,
                    transition: 'all 0.3s ease',
                    filter: isHovered ? 'none' : 'drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000)',
                    WebkitTextStroke: isHovered ? '0px' : '1px #000',
                  }}
                />

                {/* Category Name */}
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: isHovered ? '#fff' : '#000',
                    textAlign: 'center',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Container>
  )
}

export default BrowseCategory


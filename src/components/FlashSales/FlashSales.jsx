import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip,
  IconButton,
  Grid,
  Container,
  Stack
} from '@mui/material'
import { 
  ShoppingCartOutlined, 
  FavoriteBorderOutlined,
  Star,
  StarBorder,
  ArrowForward
} from '@mui/icons-material'
import './FlashSales.css'

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const products = [
    {
      id: 1,
      name: "Gamepad Controller",
      price: 99.00,
      originalPrice: 149.00,
      rating: 4.8,
      reviews: 124,
      image: "🎮",
      discount: 33,
      hasAddToCart: true
    },
    {
      id: 2,
      name: "RGB Keyboard",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.9,
      reviews: 89,
      image: "⌨️",
      discount: 31,
      hasAddToCart: true
    },
    {
      id: 3,
      name: "Gaming Monitor",
      price: 399.99,
      originalPrice: 599.99,
      rating: 4.7,
      reviews: 156,
      image: "🖥️",
      discount: 33,
      hasAddToCart: false
    },
    {
      id: 4,
      name: "Comfortable Chair",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviews: 203,
      image: "🪑",
      discount: 33,
      hasAddToCart: true
    },
    {
      id: 5,
      name: "Second Chair Model",
      price: 179.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviews: 78,
      image: "🪑",
      discount: 28,
      hasAddToCart: true
    }
  ]

  // Countdown timer logic
  useEffect(() => {
    // Set target date (3 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3)
    targetDate.setHours(targetDate.getHours() + 5)
    targetDate.setMinutes(targetDate.getMinutes() + 30)
    targetDate.setSeconds(targetDate.getSeconds() + 45)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} sx={{ fontSize: 16, color: '#FFD700' }} />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" sx={{ fontSize: 16, color: '#FFD700' }} />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorder key={`empty-${i}`} sx={{ fontSize: 16, color: '#E0E0E0' }} />
      )
    }

    return stars
  }

  const TimeDisplay = ({ value, label }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '8px 12px',
        minWidth: '60px',
        border: '1px solid #e0e0e0'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#d32f2f',
          fontSize: '1.5rem'
        }}
      >
        {value.toString().padStart(2, '0')}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: '#666',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 500
        }}
      >
        {label}
      </Typography>
    </Box>
  )

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 20,
              height: 40,
              backgroundColor: '#d32f2f',
              borderRadius: '4px'
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#d32f2f'
            }}
          >
            Flash Sales
          </Typography>
        </Stack>

        {/* Countdown Timer */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Ends in:
            </Typography>
            <Stack direction="row" spacing={1}>
              <TimeDisplay value={timeLeft.days} label="Days" />
              <Typography sx={{ color: '#d32f2f', fontSize: '1.5rem', fontWeight: 'bold' }}>
                :
              </Typography>
              <TimeDisplay value={timeLeft.hours} label="Hours" />
              <Typography sx={{ color: '#d32f2f', fontSize: '1.5rem', fontWeight: 'bold' }}>
                :
              </Typography>
              <TimeDisplay value={timeLeft.minutes} label="Minutes" />
              <Typography sx={{ color: '#d32f2f', fontSize: '1.5rem', fontWeight: 'bold' }}>
                :
              </Typography>
              <TimeDisplay value={timeLeft.seconds} label="Seconds" />
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa',
                  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Chip
                  label={`-${product.discount}%`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      backgroundColor: 'white'
                    }
                  }}
                >
                  <FavoriteBorderOutlined />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }}
                >
                  {product.image}
                </Typography>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                {/* Product Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: '1rem',
                    lineHeight: 1.3
                  }}
                >
                  {product.name}
                </Typography>

                {/* Price */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#d32f2f',
                      fontWeight: 'bold'
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#999',
                      textDecoration: 'line-through'
                    }}
                  >
                    ${product.originalPrice}
                  </Typography>
                </Stack>

                {/* Rating */}
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={0}>
                    {renderStars(product.rating)}
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#666', ml: 0.5 }}>
                    ({product.reviews})
                  </Typography>
                </Stack>

                {/* Add to Cart Button */}
                {product.hasAddToCart && (
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartOutlined />}
                    sx={{
                      backgroundColor: '#d32f2f',
                      '&:hover': {
                        backgroundColor: '#b71c1c'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View All Products Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            borderColor: '#d32f2f',
            color: '#d32f2f',
            px: 4,
            py: 1.5,
            '&:hover': {
              borderColor: '#b71c1c',
              backgroundColor: 'rgba(211, 47, 47, 0.04)'
            }
          }}
        >
          View All Products
        </Button>
      </Box>
    </Container>
  )
}

export default FlashSales

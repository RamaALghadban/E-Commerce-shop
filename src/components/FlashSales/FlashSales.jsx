import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { getFlashSaleProducts } from '../../services/api'
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
  Stack,
  CircularProgress
} from '@mui/material'
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  Favorite,
  Star,
  StarBorder,
  ArrowForward,
  ArrowBackIos,
  ArrowForwardIos,
  VisibilityOutlined
} from '@mui/icons-material'
import './FlashSales.css'

const FlashSales = () => {
  const navigate = useNavigate()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = React.useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Use the API service to fetch Flash Sale products (5 items)
        const data = await getFlashSaleProducts(5)
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
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

          {/* Navigation Arrows */}
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => scroll('left')}
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' },
                width: 40,
                height: 40
              }}
            >
              <ArrowBackIos sx={{ fontSize: 16, ml: 1 }} />
            </IconButton>
            <IconButton
              onClick={() => scroll('right')}
              sx={{
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' },
                width: 40,
                height: 40
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ color: '#d32f2f' }} />
        </Box>
      ) : (
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'hidden', // Disable manual scrolling - use arrows only
            overflowY: 'hidden',
            pb: 2,
            scrollBehavior: 'smooth',
            cursor: 'default', // Prevent drag cursor
            userSelect: 'none', // Prevent text selection while trying to drag
            // Hide scrollbar completely
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',  // IE and Edge
            'scrollbarWidth': 'none',  // Firefox
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                minWidth: 270,
                maxWidth: 270,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  '& .add-to-cart-btn': {
                    opacity: 1,
                    visibility: 'visible',
                  }
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
                  overflow: 'hidden'
                }}
              >
                <Chip
                  label="-40%"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 2,
                  }}
                />

                {/* Wishlist and Quick View Icons */}
                <Stack
                  direction="column"
                  spacing={0.5}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 2,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product)
                    }}
                    sx={{
                      backgroundColor: isInWishlist(product.id) ? '#d32f2f' : 'rgba(255,255,255,0.95)',
                      width: 32,
                      height: 32,
                      color: isInWishlist(product.id) ? 'white' : 'inherit',
                      '&:hover': {
                        backgroundColor: isInWishlist(product.id) ? '#b71c1c' : 'white',
                        color: '#d32f2f',
                      }
                    }}
                  >
                    {isInWishlist(product.id) ? (
                      <Favorite sx={{ fontSize: 18 }} />
                    ) : (
                      <FavoriteBorderOutlined sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      width: 32,
                      height: 32,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#d32f2f',
                      }
                    }}
                  >
                    <VisibilityOutlined sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>

                <CardMedia
                  component="img"
                  image={product.images[0] || "https://via.placeholder.com/200"}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: 2
                  }}
                />

                {/* Add To Cart Button (appears on hover) */}
                <Button
                  className="add-to-cart-btn"
                  fullWidth
                  startIcon={<ShoppingCartOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      image: product.images[0] || "https://via.placeholder.com/200"
                    })
                  }}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#000',
                    color: 'white',
                    borderRadius: 0,
                    py: 1.2,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: 'opacity 0.3s, visibility 0.3s',
                    '&:hover': {
                      backgroundColor: '#1a1a1a',
                    }
                  }}
                >
                  Add To Cart
                </Button>
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
                  {product.title}
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
                    ${Math.round(product.price * 1.3)}
                  </Typography>
                </Stack>

                {/* Rating */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Stack direction="row" spacing={0}>
                    {renderStars(4.5)}
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#666', ml: 0.5 }}>
                    (88)
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* View All Products Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            px: 6,
            py: 1.5,
            fontSize: '16px',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#b71c1c'
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

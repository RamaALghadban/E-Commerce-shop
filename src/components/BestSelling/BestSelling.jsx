import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { getBestSellingProducts } from '../../services/api'
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material'
import {
  FavoriteBorderOutlined,
  Favorite,
  VisibilityOutlined,
  Star,
  StarBorder,
} from '@mui/icons-material'

const BestSelling = () => {
  const navigate = useNavigate()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Use API service to get best selling products
        const data = await getBestSellingProducts(4)
        setProducts(data)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} sx={{ fontSize: 20, color: '#FFD700' }} />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" sx={{ fontSize: 20, color: '#FFD700' }} />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorder key={`empty-${i}`} sx={{ fontSize: 20, color: '#E0E0E0' }} />
      )
    }

    return stars
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Section Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Box>
            {/* This Month Label with Red Rectangle */}
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
                This Month
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
              Best Selling Products
            </Typography>
          </Box>

          {/* View All Button */}
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              px: 5,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#b71c1c'
              }
            }}
          >
            View All
          </Button>
        </Stack>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ color: '#d32f2f' }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                width: '270px',
                minWidth: '270px',
                maxWidth: '270px',
                height: '350px',
                minHeight: '350px',
                maxHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                cursor: 'pointer',
                border: '1px solid #E5E5E5',
                boxShadow: 'none',
                borderRadius: 1,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  position: 'relative',
                  height: '200px',
                  minHeight: '200px',
                  maxHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={product.images[0] || "https://via.placeholder.com/250"}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: 2
                  }}
                />

                {/* Wishlist and Quick View Icons */}
                <Stack
                  direction="column"
                  spacing={0.5}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
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
                      width: 34,
                      height: 34,
                      color: isInWishlist(product.id) ? 'white' : 'inherit',
                      '&:hover': {
                        backgroundColor: isInWishlist(product.id) ? '#b71c1c' : 'white',
                        color: '#d32f2f',
                      }
                    }}
                  >
                    {isInWishlist(product.id) ? (
                      <Favorite sx={{ fontSize: 20 }} />
                    ) : (
                      <FavoriteBorderOutlined sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      width: 34,
                      height: 34,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#d32f2f',
                      }
                    }}
                  >
                    <VisibilityOutlined sx={{ fontSize: 20 }} />
                  </IconButton>
                </Stack>
              </Box>

              {/* Details Section */}
              <CardContent sx={{ 
                height: '150px',
                minHeight: '150px',
                maxHeight: '150px',
                p: '12px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxSizing: 'border-box',
                '&:last-child': {
                  paddingBottom: '12px',
                },
              }}>
                {/* Product Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: '16px',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
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
                      fontWeight: 'bold',
                      fontSize: '18px',
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#999',
                      textDecoration: 'line-through',
                      fontSize: '16px',
                    }}
                  >
                    ${Math.round(product.price * 1.4)}
                  </Typography>
                </Stack>

                {/* Rating */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Stack direction="row" spacing={0}>
                    {renderStars(4.5)}
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#666', ml: 0.5, fontSize: '14px' }}>
                    (65)
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  )
}

export default BestSelling


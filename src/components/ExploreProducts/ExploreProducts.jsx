import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import { getProducts } from '../../services/api'
import {
  Box,
  Typography,
  Container,
  IconButton,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
} from '@mui/material'
import {
  ArrowBackIos,
  ArrowForwardIos,
  FavoriteBorderOutlined,
  Favorite,
  VisibilityOutlined,
  Star,
  StarBorder,
  ShoppingCartOutlined,
} from '@mui/icons-material'

const ExploreProducts = () => {
  const navigate = useNavigate()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const scrollContainerRef = useRef(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Use API service to get products
        const data = await getProducts()
        // Get 8 products (2 rows x 4 columns)
        setProducts(data.slice(0, 8))
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} sx={{ fontSize: 16, color: '#FFD700' }} />
      )
    }

    const emptyStars = 5 - fullStars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorder key={`empty-${i}`} sx={{ fontSize: 16, color: '#E0E0E0' }} />
      )
    }

    return stars
  }

  const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF']

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
            {/* Our Products Label with Red Rectangle */}
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
                Our Products
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
              Explore Our Products
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

      {/* Product Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ color: '#d32f2f' }} />
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            mb: 4,
            '& .MuiGrid-item': {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product.id} sx={{ maxWidth: '270px' }}>
              <Card
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
                  borderRadius: 1,
                  border: '1px solid #E5E5E5',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '& .add-to-cart-banner': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: 'relative',
                    bgcolor: '#F5F5F5',
                    height: '200px',
                    minHeight: '200px',
                    maxHeight: '200px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    image={product.images[0] || 'https://via.placeholder.com/250'}
                    alt={product.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: 2,
                    }}
                  />

                  {/* NEW Badge (for first 3 products) */}
                  {index < 3 && (
                    <Chip
                      label="NEW"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: '#00FF66',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '11px',
                        height: '24px',
                        borderRadius: '12px',
                      }}
                    />
                  )}

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
                        <Favorite sx={{ fontSize: 18 }} />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: 18 }} />
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
                      <VisibilityOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Stack>

                  {/* Add to Cart Banner (Hover Effect) */}
                  <Box
                    className="add-to-cart-banner"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: '#000',
                      color: 'white',
                      py: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      opacity: 0,
                      transform: 'translateY(100%)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#1a1a1a',
                      },
                    }}
                  >
                    <ShoppingCartOutlined sx={{ fontSize: 20, mr: 1 }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                      ADD TO CART
                    </Typography>
                  </Box>
                </Box>

                {/* Details Section */}
                <CardContent 
                  sx={{ 
                    p: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '150px',
                    minHeight: '150px',
                    maxHeight: '150px',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                    '&:last-child': {
                      paddingBottom: '12px',
                    },
                  }}
                >
                  {/* Product Name */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: '8px',
                      fontSize: '14px',
                      lineHeight: '18px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      height: '36px',
                    }}
                  >
                    {product.title}
                  </Typography>

                  {/* Price */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#d32f2f',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      mb: '8px',
                      height: '24px',
                      lineHeight: '24px',
                    }}
                  >
                    ${product.price}
                  </Typography>

                  {/* Rating */}
                  <Box sx={{ mb: '8px', height: '20px', display: 'flex', alignItems: 'center' }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Stack direction="row" spacing={0}>
                        {renderStars(4.5)}
                      </Stack>
                      <Typography variant="body2" sx={{ color: '#666', ml: 0.5, fontSize: '12px', lineHeight: '20px' }}>
                        (95)
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Color Swatches (for even-indexed products) */}
                  <Box sx={{ height: '34px', display: 'flex', alignItems: 'center', mt: 'auto' }}>
                    {index % 2 === 0 && (
                      <Stack direction="row" spacing={0.5}>
                        {colors.slice(0, 3).map((color, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              backgroundColor: color,
                              border: '2px solid white',
                              boxShadow: '0 0 0 1px #e0e0e0',
                              cursor: 'pointer',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.2)',
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* View All Products Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
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

export default ExploreProducts


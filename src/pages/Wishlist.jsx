import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Stack,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  Delete,
  ShoppingCartOutlined,
  Star,
} from '@mui/icons-material'

const Wishlist = () => {
  const navigate = useNavigate()
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Sample data for demo purposes - will be replaced by actual wishlist items
  const sampleWishlistItems = [
    {
      id: 1,
      title: 'Gucci duffle bag',
      price: 960,
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80'],
      originalPrice: 1160,
    },
    {
      id: 2,
      title: 'RGB liquid CPU Cooler',
      price: 1960,
      images: ['https://images.unsplash.com/photo-1591238371159-8e9d44d66bca?auto=format&fit=crop&w=400&q=80'],
    },
    {
      id: 3,
      title: 'GP11 Shooter USB Gamepad',
      price: 550,
      images: ['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=400&q=80'],
    },
    {
      id: 4,
      title: 'Quilted Satin Jacket',
      price: 750,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80'],
    },
  ]

  // Just For You items data
  const recommendedItems = [
    {
      id: 5,
      title: 'ASUS FHD Gaming Laptop',
      price: 960,
      images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80'],
      originalPrice: 1160,
      rating: 5,
      reviews: 65,
    },
    {
      id: 6,
      title: 'IPS LCD Gaming Monitor',
      price: 1160,
      images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80'],
      rating: 5,
      reviews: 65,
    },
    {
      id: 7,
      title: 'HAVIT HV-G92 Gamepad',
      price: 560,
      images: ['https://images.unsplash.com/photo-1585857893447-f3b4bfa5b55c?auto=format&fit=crop&w=400&q=80'],
      rating: 5,
      reviews: 65,
      isNew: true,
    },
    {
      id: 8,
      title: 'AK-900 Wired Keyboard',
      price: 200,
      images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80'],
      rating: 5,
      reviews: 65,
    },
  ]

  // Use actual wishlist if it has items, otherwise show sample data
  const displayItems = wishlist.length > 0 ? wishlist : sampleWishlistItems

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice) return null
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
    return `-${discount}%`
  }

  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId)
    setSnackbar({ open: true, message: 'Item removed from wishlist', severity: 'info' })
  }

  const handleMoveAllToBag = () => {
    // This would integrate with your cart context
    setSnackbar({ open: true, message: 'All items moved to bag', severity: 'success' })
    // Optionally clear wishlist: clearWishlist()
  }

  const handleAddToCart = (item) => {
    // This would integrate with your cart context
    setSnackbar({ open: true, message: `${item.title} added to cart`, severity: 'success' })
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          sx={{
            fontSize: 16,
            color: i < rating ? '#FFD700' : '#E0E0E0'
          }}
        />
      )
    }
    return stars
  }

  // Empty state
  if (displayItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: '#666' }}>
          Your Wishlist is Empty
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
          Add products you love to your wishlist
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{
            backgroundColor: '#DB4444',
            '&:hover': { backgroundColor: '#b71c1c' },
            px: 4,
            py: 1.5,
          }}
        >
          Browse Products
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          bgcolor: '#fff',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Wishlist Section */}
        <Box sx={{ mb: 6 }}>
          {/* Header with Move All button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: '500',
                color: '#000',
                fontSize: { xs: '18px', md: '20px' },
              }}
            >
              Wishlist ({displayItems.length})
            </Typography>
            <Button
              variant="outlined"
              onClick={handleMoveAllToBag}
              sx={{
                borderColor: '#000',
                color: '#000',
                px: 4,
                py: 1,
                textTransform: 'none',
                fontWeight: '500',
                fontSize: '16px',
                '&:hover': {
                  borderColor: '#000',
                  bgcolor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Move All To Bag
            </Button>
          </Box>

          {/* Wishlist Products Grid */}
          <Grid container spacing={3}>
            {displayItems.map((item) => {
              const discount = calculateDiscount(item.price, item.originalPrice)
              return (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card
                    sx={{
                      border: 'none',
                      boxShadow: 'none',
                      borderRadius: 0,
                    }}
                  >
                    {/* Product Image Container */}
                    <Box
                      sx={{
                        position: 'relative',
                        bgcolor: '#F5F5F5',
                        height: 250,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        borderRadius: 1,
                      }}
                    >
                      {discount && (
                        <Chip
                          label={discount}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: '#DB4444',
                            color: 'white',
                            fontWeight: '500',
                            fontSize: '12px',
                            height: '26px',
                            borderRadius: '4px',
                          }}
                        />
                      )}

                      {/* Delete Button */}
                      <IconButton
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'white',
                          width: 34,
                          height: 34,
                          '&:hover': {
                            bgcolor: '#DB4444',
                            color: 'white',
                          },
                        }}
                      >
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>

                      <CardMedia
                        component="img"
                        image={item.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={item.title}
                        sx={{
                          width: '70%',
                          height: '70%',
                          objectFit: 'contain',
                        }}
                      />

                      {/* Add to Cart Button */}
                      <Button
                        fullWidth
                        startIcon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(item)}
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: '#000',
                          color: 'white',
                          py: 1,
                          borderRadius: 0,
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                          textTransform: 'none',
                          fontSize: '14px',
                          '&:hover': {
                            backgroundColor: '#333',
                          },
                        }}
                      >
                        Add To Cart
                      </Button>
                    </Box>

                    {/* Product Details */}
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: '500',
                          mb: 1,
                          fontSize: '16px',
                          color: '#000',
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#DB4444',
                            fontWeight: '600',
                            fontSize: '16px',
                          }}
                        >
                          ${item.price}
                        </Typography>
                        {item.originalPrice && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#999',
                              textDecoration: 'line-through',
                              fontSize: '16px',
                              fontWeight: '500',
                            }}
                          >
                            ${item.originalPrice}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>

        {/* Just For You Section */}
        <Box>
          {/* Section Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 20,
                  height: 40,
                  bgcolor: '#DB4444',
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: '500',
                  color: '#000',
                  fontSize: { xs: '18px', md: '20px' },
                }}
              >
                Just For You
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
              sx={{
                borderColor: '#000',
                color: '#000',
                px: 4,
                py: 1,
                textTransform: 'none',
                fontWeight: '500',
                fontSize: '16px',
                '&:hover': {
                  borderColor: '#000',
                  bgcolor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              See All
            </Button>
          </Box>

          {/* Recommended Products Grid */}
          <Grid container spacing={3}>
            {recommendedItems.map((item) => {
              const discount = calculateDiscount(item.price, item.originalPrice)
              return (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card
                    sx={{
                      border: 'none',
                      boxShadow: 'none',
                      borderRadius: 0,
                    }}
                  >
                    {/* Product Image Container */}
                    <Box
                      sx={{
                        position: 'relative',
                        bgcolor: '#F5F5F5',
                        height: 250,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        borderRadius: 1,
                      }}
                    >
                      {discount && (
                        <Chip
                          label={discount}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: '#DB4444',
                            color: 'white',
                            fontWeight: '500',
                            fontSize: '12px',
                            height: '26px',
                            borderRadius: '4px',
                          }}
                        />
                      )}

                      {item.isNew && (
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: '#00FF66',
                            color: 'white',
                            fontWeight: '500',
                            fontSize: '12px',
                            height: '26px',
                            borderRadius: '4px',
                          }}
                        />
                      )}

                      <CardMedia
                        component="img"
                        image={item.images?.[0] || 'https://via.placeholder.com/300'}
                        alt={item.title}
                        sx={{
                          width: '70%',
                          height: '70%',
                          objectFit: 'contain',
                        }}
                      />

                      {/* Add to Cart Button */}
                      <Button
                        fullWidth
                        startIcon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(item)}
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: '#000',
                          color: 'white',
                          py: 1,
                          borderRadius: 0,
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                          textTransform: 'none',
                          fontSize: '14px',
                          '&:hover': {
                            backgroundColor: '#333',
                          },
                        }}
                      >
                        Add To Cart
                      </Button>
                    </Box>

                    {/* Product Details */}
                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: '500',
                          mb: 1,
                          fontSize: '16px',
                          color: '#000',
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#DB4444',
                            fontWeight: '600',
                            fontSize: '16px',
                          }}
                        >
                          ${item.price}
                        </Typography>
                        {item.originalPrice && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#999',
                              textDecoration: 'line-through',
                              fontSize: '16px',
                              fontWeight: '500',
                            }}
                          >
                            ${item.originalPrice}
                          </Typography>
                        )}
                      </Box>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Stack direction="row" spacing={0.25}>
                          {renderStars(item.rating)}
                        </Stack>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#999',
                            fontSize: '14px',
                            fontWeight: '500',
                          }}
                        >
                          ({item.reviews})
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Wishlist


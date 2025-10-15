import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from '@mui/material'
import {
  Close,
  Delete,
  ShoppingCartOutlined,
  FavoriteBorder,
} from '@mui/icons-material'

const WishlistDrawer = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { wishlist, removeFromWishlist } = useWishlist()

  const handleViewAll = () => {
    navigate('/wishlist')
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <FavoriteBorder sx={{ color: '#d32f2f', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              My Wishlist ({wishlist.length})
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        {wishlist.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <FavoriteBorder sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: '#666' }}>
              Your Wishlist is Empty
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#999', textAlign: 'center' }}>
              Save your favorite items here
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/products')
                onClose()
              }}
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#b71c1c' },
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <>
            {/* Products List */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
              }}
            >
              <Stack spacing={2}>
                {wishlist.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      display: 'flex',
                      border: '1px solid #e0e0e0',
                      boxShadow: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {/* Product Image */}
                    <CardMedia
                      component="img"
                      image={product.images[0] || 'https://via.placeholder.com/100'}
                      alt={product.title}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        p: 1,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        navigate('/products')
                        onClose()
                      }}
                    />

                    {/* Product Details */}
                    <CardContent
                      sx={{
                        flex: 1,
                        p: 1.5,
                        '&:last-child': { pb: 1.5 },
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '14px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            flex: 1,
                            mr: 1,
                          }}
                        >
                          {product.title}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeFromWishlist(product.id)}
                          sx={{
                            color: '#999',
                            '&:hover': {
                              color: '#d32f2f',
                            },
                          }}
                        >
                          <Delete sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Stack>

                      <Typography
                        variant="h6"
                        sx={{
                          color: '#d32f2f',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          mb: 1,
                        }}
                      >
                        ${product.price}
                      </Typography>

                      <Button
                        fullWidth
                        size="small"
                        startIcon={<ShoppingCartOutlined />}
                        sx={{
                          backgroundColor: '#000',
                          color: 'white',
                          fontSize: '12px',
                          py: 0.75,
                          '&:hover': {
                            backgroundColor: '#d32f2f',
                          },
                        }}
                      >
                        Add To Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleViewAll}
                sx={{
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#b71c1c',
                    backgroundColor: 'rgba(211, 47, 47, 0.04)',
                  },
                }}
              >
                View All Wishlist
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default WishlistDrawer


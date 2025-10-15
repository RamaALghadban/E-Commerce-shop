import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FiX } from 'react-icons/fi'
import { Box, Typography, Button, TextField } from '@mui/material'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState('')

  const subtotal = getCartTotal()
  const shipping = subtotal > 0 ? 0 : 0 // Free shipping for now
  const total = subtotal + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity)
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(productId, quantity)
    }
  }

  const handleUpdateCart = () => {
    // Update cart logic (currently cart updates automatically)
    alert('Cart updated successfully!')
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied!`)
      // Implement coupon logic here
    }
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#fff',
        minHeight: '60vh',
      }}
    >
      {/* Breadcrumb */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Home / <span style={{ color: '#000' }}>Cart</span>
      </Typography>

      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              textTransform: 'none',
              borderColor: '#DB4444',
              color: '#DB4444',
              '&:hover': {
                borderColor: '#DB4444',
                bgcolor: 'rgba(219, 68, 68, 0.04)',
              },
            }}
          >
            Return To Shop
          </Button>
        </Box>
      ) : (
        <>
          {/* Cart Items Table */}
          <Box
            sx={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: 1,
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '2fr 1fr 1fr 1fr', md: '2fr 1fr 1fr 1fr' },
                gap: 2,
                p: 2,
                bgcolor: '#fff',
                borderBottom: '1px solid #e0e0e0',
                fontWeight: 'bold',
              }}
            >
              <Typography fontWeight="600">Product</Typography>
              <Typography fontWeight="600" sx={{ textAlign: 'center' }}>Price</Typography>
              <Typography fontWeight="600" sx={{ textAlign: 'center' }}>Quantity</Typography>
              <Typography fontWeight="600" sx={{ textAlign: 'center' }}>Subtotal</Typography>
            </Box>

            {/* Table Rows */}
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '2fr 1fr 1fr 1fr', md: '2fr 1fr 1fr 1fr' },
                  gap: 2,
                  p: 2,
                  bgcolor: '#fff',
                  borderBottom: '1px solid #f0f0f0',
                  alignItems: 'center',
                }}
              >
                {/* Product Column */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: { xs: 50, md: 70 },
                        height: { xs: 50, md: 70 },
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        bgcolor: '#DB4444',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: '#c93838',
                        },
                      }}
                    >
                      <FiX size={14} />
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '12px', md: '14px' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>

                {/* Price Column */}
                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}
                >
                  ${item.price}
                </Typography>

                {/* Quantity Column */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    inputProps={{
                      min: 1,
                      style: { textAlign: 'center' },
                    }}
                    sx={{
                      width: { xs: 50, md: 70 },
                      '& input': {
                        padding: '6px 8px',
                        fontSize: { xs: '12px', md: '14px' },
                      },
                    }}
                  />
                </Box>

                {/* Subtotal Column */}
                <Typography
                  variant="body2"
                  fontWeight="600"
                  sx={{ textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Cart Actions */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', md: 'flex-start' },
              gap: 2,
              mb: 4,
            }}
          >
            {/* Left Actions */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flex: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderColor: '#000',
                  color: '#000',
                  width: { xs: '100%', sm: 'fit-content' },
                  '&:hover': {
                    borderColor: '#000',
                    bgcolor: 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                Return To Shop
              </Button>

              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  size="small"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                      padding: '10px',
                    },
                    '& .MuiOutlinedInput-input': {
                      fontSize: '14px',
                    },
                    '& .MuiOutlinedInput-input::placeholder': {
                      fontSize: '14px',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  sx={{
                    textTransform: 'none',
                    bgcolor: '#DB4444',
                    px: 3,
                    fontSize: '14px',
                    '&:hover': {
                      bgcolor: '#c93838',
                    },
                  }}
                >
                  Apply Coupon
                </Button>
              </Box>
            </Box>

            {/* Right Action */}
            <Button
              variant="outlined"
              onClick={handleUpdateCart}
              sx={{
                textTransform: 'none',
                px: 4,
                py: 1.5,
                borderColor: '#000',
                color: '#000',
                width: { xs: '100%', md: 'fit-content' },
                '&:hover': {
                  borderColor: '#000',
                  bgcolor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              Update Cart
            </Button>
          </Box>

          {/* Cart Total Summary */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                border: '2px solid #000',
                borderRadius: 1,
                p: 3,
                width: { xs: '100%', sm: '400px' },
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Cart Total
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  pb: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography>Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  pb: 2,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <Typography>Shipping:</Typography>
                <Typography>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <Typography fontWeight="600">Total:</Typography>
                <Typography fontWeight="600">${total.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/checkout')}
                sx={{
                  textTransform: 'none',
                  bgcolor: '#DB4444',
                  py: 1.5,
                  fontSize: '16px',
                  '&:hover': {
                    bgcolor: '#c93838',
                  },
                }}
              >
                Process to checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Cart


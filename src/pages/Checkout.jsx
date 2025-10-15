import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    Divider,
    Grid,
} from '@mui/material'

const Checkout = () => {
    const navigate = useNavigate()
    const { cart, getCartTotal } = useCart()
    const [couponCode, setCouponCode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('bank')
    const [saveInfo, setSaveInfo] = useState(false)

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        city: '',
        phoneNumber: '',
        email: '',
    })

    const subtotal = getCartTotal()
    const shipping = 0 // Free shipping
    const total = subtotal + shipping

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBillingDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault()
        // Validate required fields
        if (!billingDetails.firstName || !billingDetails.streetAddress ||
            !billingDetails.city || !billingDetails.phoneNumber || !billingDetails.email) {
            alert('Please fill in all required fields')
            return
        }

        // Process order
        alert('Order placed successfully!')
        navigate('/')
    }

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            alert(`Coupon "${couponCode}" applied!`)
            // Implement coupon logic here
        }
    }

    if (cart.length === 0) {
        return (
            <Box sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', minHeight: '60vh' }}>
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
                    Continue Shopping
                </Button>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                bgcolor: '#fff',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pr: { md: 0 },
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '1200px', ml: { md: 'auto' }, mr: { md: 8 } }}>
                {/* Breadcrumb */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Account / My Account / Product / View Cart / <span style={{ color: '#000' }}>CheckOut</span>
                </Typography>

                {/* Main Content */}
                <form onSubmit={handlePlaceOrder}>
                    <Grid container spacing={4}>
                        {/* Left Column: Billing Details */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                                Billing Details
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                {/* First Name */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        First Name<span style={{ color: '#DB4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="firstName"
                                        value={billingDetails.firstName}
                                        onChange={handleInputChange}
                                        required
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Company Name */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Company Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="companyName"
                                        value={billingDetails.companyName}
                                        onChange={handleInputChange}
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Street Address */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Street Address<span style={{ color: '#DB4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="streetAddress"
                                        value={billingDetails.streetAddress}
                                        onChange={handleInputChange}
                                        required
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Apartment */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Apartment, floor, etc. (optional)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="apartment"
                                        value={billingDetails.apartment}
                                        onChange={handleInputChange}
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Town/City */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Town/City<span style={{ color: '#DB4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="city"
                                        value={billingDetails.city}
                                        onChange={handleInputChange}
                                        required
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Phone Number */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Phone Number<span style={{ color: '#DB4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="phoneNumber"
                                        value={billingDetails.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Email Address */}
                                <Box>
                                    <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
                                        Email Address<span style={{ color: '#DB4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        type="email"
                                        value={billingDetails.email}
                                        onChange={handleInputChange}
                                        required
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#F5F5F5',
                                                '& fieldset': {
                                                    borderColor: 'transparent',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#DB4444',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Save Info Checkbox */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={saveInfo}
                                            onChange={(e) => setSaveInfo(e.target.checked)}
                                            sx={{
                                                color: '#DB4444',
                                                '&.Mui-checked': {
                                                    color: '#DB4444',
                                                },
                                            }}
                                        />
                                    }
                                    label="Save this information for faster check-out next time"
                                />
                            </Box>
                        </Grid>

                        {/* Right Column: Order Summary & Payment */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ pl: { md: 4 } }}>
                                {/* Order Items */}
                                <Box sx={{ mb: 4 }}>
                                    {cart.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mb: 2,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    component="img"
                                                    src={item.image}
                                                    alt={item.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                    }}
                                                />
                                                <Typography variant="body2">{item.name}</Typography>
                                            </Box>
                                            <Typography variant="body2" fontWeight="600">
                                                ${item.price}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Cost Summary */}
                                <Box sx={{ mb: 3 }}>
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
                                </Box>

                                {/* Payment Method */}
                                <Box sx={{ mb: 3 }}>
                                    <RadioGroup
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mb: 2,
                                            }}
                                        >
                                            <FormControlLabel
                                                value="bank"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: '#DB4444',
                                                            '&.Mui-checked': {
                                                                color: '#DB4444',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="Bank"
                                            />
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Box
                                                    component="img"
                                                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                                    alt="Visa"
                                                    sx={{ height: 20 }}
                                                />
                                                <Box
                                                    component="img"
                                                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                                    alt="Mastercard"
                                                    sx={{ height: 20 }}
                                                />
                                            </Box>
                                        </Box>

                                        <FormControlLabel
                                            value="cash"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: '#DB4444',
                                                        '&.Mui-checked': {
                                                            color: '#DB4444',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Cash on delivery"
                                        />
                                    </RadioGroup>
                                </Box>

                                {/* Coupon Field */}
                                <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                                    <TextField
                                        placeholder="Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        size="small"
                                        sx={{
                                            width: { xs: '100%', sm: '200px' },
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 1,
                                            },
                                            '& .MuiOutlinedInput-input': {
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

                                {/* Place Order Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: '#DB4444',
                                        py: 1.5,
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        '&:hover': {
                                            bgcolor: '#c93838',
                                        },
                                    }}
                                >
                                    Place Order
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}

export default Checkout


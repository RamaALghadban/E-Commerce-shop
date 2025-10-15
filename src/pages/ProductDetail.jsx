import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Rating,
  TextField,
  Stack,
  Chip,
  Divider,
  CircularProgress,
  Breadcrumbs,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import {
  FavoriteBorderOutlined,
  Favorite,
  LocalShippingOutlined,
  ReplayOutlined,
  Add,
  Remove,
  VisibilityOutlined,
  ShoppingCartOutlined,
  Star,
  StarBorder,
} from '@mui/icons-material'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { fetchProductById, getProducts } from '../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [postalCode, setPostalCode] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])

  // Available colors (simulated)
  const colors = ['#DB4444', '#A0A0A0']
  
  // Available sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProductById(id)
        if (data) {
          setProduct(data)
          // Fetch related products (4 random products)
          const allProducts = await getProducts()
          const filtered = allProducts.filter(p => p.id !== parseInt(id))
          setRelatedProducts(filtered.slice(0, 4))
        } else {
          navigate('/404')
        }
      } catch (error) {
        console.error('Error loading product:', error)
        navigate('/404')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
    // Scroll to top when product changes
    window.scrollTo(0, 0)
  }, [id, navigate])

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[selectedImage],
        quantity: quantity,
        size: selectedSize,
        color: colors[selectedColor],
      }
      addToCart(productToAdd)
      // Navigate to checkout after adding to cart
      navigate('/checkout')
    }
  }

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[selectedImage],
        quantity: quantity,
        size: selectedSize,
        color: colors[selectedColor],
      }
      addToCart(productToAdd)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} sx={{ color: '#DB4444' }} />
      </Box>
    )
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" sx={{ py: 4 }}>Product not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 4, fontSize: '14px', color: '#666' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>
          Account
        </Link>
        <Link to="/products" style={{ color: '#666', textDecoration: 'none' }}>
          {product.category?.name || 'Products'}
        </Link>
        <Typography sx={{ color: '#000', fontSize: '14px' }}>
          {product.title}
        </Typography>
      </Breadcrumbs>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center' }}>
        {/* Left Side - Product Images */}
        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '600px' } }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Thumbnail Images */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {product.images.slice(0, 4).map((image, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 70,
                    height: 80,
                    border: selectedImage === index ? '2px solid #DB4444' : '1px solid #e0e0e0',
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    bgcolor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      borderColor: '#DB4444',
                    },
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '4px',
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Main Image */}
            <Box
              sx={{
                flex: 1,
                bgcolor: '#f5f5f5',
                borderRadius: 1,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 500,
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                style={{
                  maxWidth: '95%',
                  maxHeight: '95%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Side - Product Details */}
        <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '450px' } }}>
          <Box>
            {/* Product Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '20px', md: '24px' },
                mb: 1,
                color: '#000',
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </Typography>

            {/* Rating and Reviews */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <Typography sx={{ color: '#666', fontSize: '13px' }}>
                (150 Reviews)
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Typography sx={{ color: '#00FF66', fontSize: '13px', fontWeight: 500 }}>
                In Stock
              </Typography>
            </Stack>

            {/* Price */}
            <Typography
              variant="h5"
              sx={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#000',
                mb: 1.5,
              }}
            >
              ${product.price}.00
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: '14px',
                color: '#000',
                lineHeight: 1.5,
                mb: 1.5,
                borderBottom: '1px solid #e0e0e0',
                pb: 1.5,
              }}
            >
              {product.description}
            </Typography>

            {/* Colors */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 400, minWidth: '60px' }}>
                Colours:
              </Typography>
              <Stack direction="row" spacing={1}>
                {colors.map((color, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: color,
                      border: selectedColor === index ? '2px solid #000' : 'none',
                      outline: selectedColor === index ? '2px solid #fff' : 'none',
                      outlineOffset: selectedColor === index ? '1px' : '0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'scale(1.15)',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {/* Size */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 400, minWidth: '60px' }}>
                Size:
              </Typography>
              <Stack direction="row" spacing={1}>
                {sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    variant="outlined"
                    sx={{
                      minWidth: 32,
                      height: 32,
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: selectedSize === size ? '1px solid #DB4444' : '1px solid rgba(0,0,0,0.5)',
                      bgcolor: selectedSize === size ? '#DB4444' : 'transparent',
                      color: selectedSize === size ? '#fff' : '#000',
                      padding: 0,
                      '&:hover': {
                        bgcolor: selectedSize === size ? '#C13939' : 'rgba(219,68,68,0.1)',
                        borderColor: '#DB4444',
                      },
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Stack>
            </Stack>

            {/* Quantity and Buy Now */}
            <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
              {/* Quantity Selector */}
              <Stack direction="row" alignItems="center" sx={{ border: '1px solid rgba(0,0,0,0.5)', borderRadius: '4px' }}>
                <IconButton
                  onClick={() => handleQuantityChange('decrease')}
                  sx={{ color: '#000', borderRadius: 0, px: 1, py: 0.5, borderRight: '1px solid rgba(0,0,0,0.5)' }}
                  size="small"
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography sx={{ px: 3, fontSize: '20px', fontWeight: 600, minWidth: '80px', textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange('increase')}
                  sx={{ color: '#fff', bgcolor: '#DB4444', borderRadius: 0, px: 1, py: 0.5, '&:hover': { bgcolor: '#C13939' } }}
                  size="small"
                >
                  <Add fontSize="small" />
                </IconButton>
              </Stack>

              {/* Buy Now Button */}
              <Button
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  bgcolor: '#DB4444',
                  color: '#fff',
                  px: 4,
                  py: 1,
                  fontSize: '16px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: '#C13939',
                  },
                }}
              >
                Buy Now
              </Button>

              {/* Wishlist Button */}
              <IconButton
                onClick={() => toggleWishlist(product)}
                sx={{
                  border: '1px solid rgba(0,0,0,0.5)',
                  borderRadius: '4px',
                  width: 40,
                  height: 40,
                  color: isInWishlist(product.id) ? '#DB4444' : '#000',
                }}
              >
                {isInWishlist(product.id) ? <Favorite /> : <FavoriteBorderOutlined />}
              </IconButton>
            </Stack>

            {/* Shipping Information */}
            <Box sx={{ border: '1px solid rgba(0,0,0,0.5)', borderRadius: '4px' }}>
              {/* Free Delivery */}
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.5)' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocalShippingOutlined sx={{ fontSize: 40, color: '#000' }} />
                  <Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 0.25, color: '#000' }}>
                      Free Delivery
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#000', textDecoration: 'underline' }}>
                      Enter your postal code for Delivery Availability
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Return Delivery */}
              <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ReplayOutlined sx={{ fontSize: 40, color: '#000' }} />
                  <Box>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 0.25, color: '#000' }}>
                      Return Delivery
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#000' }}>
                      Free 30 Days Delivery Returns.{' '}
                      <span style={{ textDecoration: 'underline' }}>Details</span>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Related Items Section */}
      <Box sx={{ mt: 8, mb: 4 }}>
        {/* Section Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 20,
              height: 40,
              backgroundColor: '#DB4444',
              borderRadius: '4px'
            }}
          />
          <Typography
            sx={{
              color: '#DB4444',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            Related Item
          </Typography>
        </Stack>

        {/* Related Products Grid */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                sx={{
                  width: '270px',
                  minWidth: '270px',
                  maxWidth: '270px',
                  height: '350px',
                  minHeight: '350px',
                  maxHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  border: '1px solid #E5E5E5',
                  boxShadow: 'none',
                  borderRadius: 1,
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
                  {/* Discount Badge */}
                  {relatedProduct.discount && (
                    <Chip
                      label={`-${relatedProduct.discount}%`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: '#DB4444',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2,
                      }}
                    />
                  )}

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
                        toggleWishlist(relatedProduct)
                      }}
                      sx={{
                        backgroundColor: isInWishlist(relatedProduct.id) ? '#DB4444' : 'rgba(255,255,255,0.95)',
                        width: 32,
                        height: 32,
                        color: isInWishlist(relatedProduct.id) ? 'white' : 'inherit',
                        '&:hover': {
                          backgroundColor: isInWishlist(relatedProduct.id) ? '#C13939' : 'white',
                          color: '#DB4444',
                        }
                      }}
                    >
                      {isInWishlist(relatedProduct.id) ? (
                        <Favorite sx={{ fontSize: 18 }} />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${relatedProduct.id}`)
                      }}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        width: 32,
                        height: 32,
                        '&:hover': {
                          backgroundColor: 'white',
                          color: '#DB4444',
                        }
                      }}
                    >
                      <VisibilityOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Stack>

                  <CardMedia
                    component="img"
                    image={relatedProduct.images?.[0] || relatedProduct.image || "https://via.placeholder.com/200"}
                    alt={relatedProduct.title}
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
                        id: relatedProduct.id,
                        name: relatedProduct.title,
                        price: relatedProduct.price,
                        image: relatedProduct.images?.[0] || relatedProduct.image
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

                {/* Product Details */}
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
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: '16px',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {relatedProduct.title || relatedProduct.name}
                  </Typography>

                  {/* Price */}
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <Typography
                      sx={{
                        color: '#DB4444',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}
                    >
                      ${relatedProduct.price}
                    </Typography>
                    {relatedProduct.originalPrice && (
                      <Typography
                        sx={{
                          color: '#999',
                          fontSize: '16px',
                          textDecoration: 'line-through'
                        }}
                      >
                        ${relatedProduct.originalPrice}
                      </Typography>
                    )}
                  </Stack>

                  {/* Rating */}
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {[...Array(5)].map((_, index) => (
                      <Box key={index}>
                        {index < Math.floor(relatedProduct.rating || 4) ? (
                          <Star sx={{ fontSize: 16, color: '#FFD700' }} />
                        ) : (
                          <StarBorder sx={{ fontSize: 16, color: '#E0E0E0' }} />
                        )}
                      </Box>
                    ))}
                    <Typography sx={{ fontSize: '14px', color: '#666', ml: 1 }}>
                      ({relatedProduct.reviews || 88})
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default ProductDetail

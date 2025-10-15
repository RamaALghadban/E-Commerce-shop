import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { getProducts } from "../services/api";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";

const Products = () => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Use API service to get all products
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 1, md: 2 },
        bgcolor: "#fff",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#000",
            fontSize: { xs: "28px", md: "36px" },
            mb: 1,
          }}
        >
          Our Products
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            fontSize: "16px",
          }}
        >
          Explore our wide collection of quality products
        </Typography>
      </Box>

      {/* Products Grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: 0,
        }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #E5E5E5",
                boxShadow: "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  borderColor: "#DB4444",
                },
              }}
            >
              {/* Product Image Container */}
              <Box
                sx={{
                  position: "relative",
                  bgcolor: "#F5F5F5",
                  height: 250,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                {/* Category Badge */}
                <Chip
                  label={product.category.name}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    fontWeight: 600,
                    fontSize: "11px",
                    height: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />

                {/* Wishlist Icon */}
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: isInWishlist(product.id) ? "#DB4444" : "rgba(255, 255, 255, 0.95)",
                    color: isInWishlist(product.id) ? "white" : "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: isInWishlist(product.id) ? "#b71c1c" : "white",
                      color: "#DB4444",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "18px" }}>
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                  </Typography>
                </Box>
              </Box>

              {/* Product Details */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                {/* Product Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "600",
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    minHeight: "40px",
                    color: "#1a1a1a",
                  }}
                >
                  {product.title}
                </Typography>

                {/* Product Description */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    flexGrow: 1,
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: 1.5,
                  }}
                >
                  {product.description}
                </Typography>

                {/* Price Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#DB4444",
                      fontWeight: "bold",
                      fontSize: "22px",
                    }}
                  >
                    ${product.price}
                  </Typography>

                  {/* Add to Cart Icon/Button */}
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#DB4444",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontSize: "20px" }}>
                      +
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Products Message */}
      {products.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Products;


// API Service for E-commerce Application
import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

/**
 * Fetch products by category
 * @param {number} categoryId - Category ID
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get('/products/', {
      params: { categoryId }
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }
}

/**
 * Fetch products with pagination
 * @param {number} offset - Starting point
 * @param {number} limit - Number of items to fetch
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchProductsPaginated = async (offset = 0, limit = 10) => {
  try {
    const response = await api.get('/products', {
      params: { offset, limit }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching paginated products:', error)
    return []
  }
}

/**
 * Fetch all categories
 * @returns {Promise<Array>} Array of category objects
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Transform API product data to match application format
 * @param {Object} apiProduct - Product from API
 * @returns {Object} Transformed product object
 */
export const transformProduct = (apiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    title: apiProduct.title,
    price: apiProduct.price,
    originalPrice: apiProduct.price + 20, // Add markup for discount display
    discount: Math.floor(Math.random() * 40) + 10, // Random discount 10-50%
    image: apiProduct.images[0] || 'https://via.placeholder.com/300',
    images: apiProduct.images,
    rating: (Math.random() * 2 + 3).toFixed(1), // Random rating 3.0-5.0
    reviews: Math.floor(Math.random() * 200) + 50, // Random reviews 50-250
    description: apiProduct.description,
    category: apiProduct.category?.name || 'General',
    slug: apiProduct.slug,
    isNew: apiProduct.creationAt ? 
      (new Date() - new Date(apiProduct.creationAt)) < 7 * 24 * 60 * 60 * 1000 : false
  }
}

/**
 * Fetch and transform all products
 * @returns {Promise<Array>} Array of transformed product objects
 */
export const getProducts = async () => {
  const products = await fetchAllProducts()
  return products.map(transformProduct)
}

/**
 * Fetch and transform products for Flash Sales (limited quantity)
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} Array of transformed product objects
 */
export const getFlashSaleProducts = async (limit = 5) => {
  const products = await fetchProductsPaginated(0, limit)
  return products.map(transformProduct)
}

/**
 * Fetch and transform best selling products (higher priced items)
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} Array of transformed product objects
 */
export const getBestSellingProducts = async (limit = 4) => {
  const allProducts = await fetchAllProducts()
  // Sort by price descending and take top items
  const sortedProducts = allProducts.sort((a, b) => b.price - a.price).slice(0, limit)
  return sortedProducts.map(transformProduct)
}

/**
 * Fetch and transform new arrival products
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} Array of transformed product objects
 */
export const getNewArrivalProducts = async (limit = 8) => {
  const allProducts = await fetchAllProducts()
  // Get the most recently created products
  const sortedProducts = allProducts
    .sort((a, b) => new Date(b.creationAt) - new Date(a.creationAt))
    .slice(0, limit)
  return sortedProducts.map(transformProduct)
}

export default {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchProductsPaginated,
  fetchCategories,
  transformProduct,
  getProducts,
  getFlashSaleProducts,
  getBestSellingProducts,
  getNewArrivalProducts,
}


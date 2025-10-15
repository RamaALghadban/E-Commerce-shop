# API Usage Guide

## Overview
This guide explains how to use the `api.js` service to fetch products from the [Fake Store API](https://api.escuelajs.co/api/v1/products) in your e-commerce application.

## API Service Location
- **File**: `src/services/api.js`
- **API Base URL**: `https://api.escuelajs.co/api/v1`

## Available Functions

### 1. `getFlashSaleProducts(limit)`
Fetches products for Flash Sales section (already integrated in FlashSales component)

**Parameters:**
- `limit` (number, default: 5) - Number of products to fetch

**Returns:** Promise<Array> - Array of transformed product objects

**Example:**
```javascript
import { getFlashSaleProducts } from '../../services/api'

const fetchProducts = async () => {
  const products = await getFlashSaleProducts(5)
  setProducts(products)
}
```

---

### 2. `getBestSellingProducts(limit)`
Fetches best selling products (sorted by price, high to low)

**Parameters:**
- `limit` (number, default: 4) - Number of products to fetch

**Usage in BestSelling component:**
```javascript
import { getBestSellingProducts } from '../../services/api'

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true)
    const data = await getBestSellingProducts(4)
    setProducts(data)
    setLoading(false)
  }
  fetchProducts()
}, [])
```

---

### 3. `getNewArrivalProducts(limit)`
Fetches newest products based on creation date

**Parameters:**
- `limit` (number, default: 8) - Number of products to fetch

**Usage in NewArrival component:**
```javascript
import { getNewArrivalProducts } from '../../services/api'

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true)
    const data = await getNewArrivalProducts(8)
    setProducts(data)
    setLoading(false)
  }
  fetchProducts()
}, [])
```

---

### 4. `getProducts()`
Fetches ALL products from the API

**Returns:** Promise<Array> - Array of all transformed products

**Usage in ExploreProducts component:**
```javascript
import { getProducts } from '../../services/api'

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts()
    setProducts(data)
    setLoading(false)
  }
  fetchProducts()
}, [])
```

---

### 5. `fetchProductsByCategory(categoryId)`
Fetches products filtered by category

**Parameters:**
- `categoryId` (number) - Category ID to filter by

**Usage:**
```javascript
import { fetchProductsByCategory } from '../../services/api'

const fetchElectronics = async () => {
  const products = await fetchProductsByCategory(2)
  setProducts(products)
}
```

---

### 6. `fetchProductById(id)`
Fetches a single product by ID

**Parameters:**
- `id` (number) - Product ID

**Usage in Product Detail Page:**
```javascript
import { fetchProductById } from '../../services/api'

useEffect(() => {
  const fetchProduct = async () => {
    const product = await fetchProductById(productId)
    setProduct(product)
  }
  fetchProduct()
}, [productId])
```

---

### 7. `fetchCategories()`
Fetches all available categories

**Usage in BrowseCategory component:**
```javascript
import { fetchCategories } from '../../services/api'

useEffect(() => {
  const loadCategories = async () => {
    const categories = await fetchCategories()
    setCategories(categories)
  }
  loadCategories()
}, [])
```

---

## Product Data Structure

### API Response (Before Transform)
```javascript
{
  id: 6,
  title: "Classic Comfort Fit Joggers",
  slug: "classic-comfort-fit-joggers",
  price: 25,
  description: "Discover the perfect blend of style...",
  category: {
    id: 1,
    name: "Clothes",
    slug: "clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg"
  },
  images: [
    "https://i.imgur.com/ZKGofuB.jpeg",
    "https://i.imgur.com/GJi73H0.jpeg"
  ],
  creationAt: "2025-10-08T15:35:54.000Z",
  updatedAt: "2025-10-08T15:35:54.000Z"
}
```

### Transformed Product (After Transform)
```javascript
{
  id: 6,
  name: "Classic Comfort Fit Joggers",
  title: "Classic Comfort Fit Joggers",
  price: 25,
  originalPrice: 45,      // Calculated
  discount: 35,           // Calculated (10-50%)
  image: "https://i.imgur.com/ZKGofuB.jpeg",
  images: [...],
  rating: 4.2,           // Random (3.0-5.0)
  reviews: 125,          // Random (50-250)
  description: "Discover the perfect blend of style...",
  category: "Clothes",
  slug: "classic-comfort-fit-joggers",
  isNew: false           // Based on creation date
}
```

---

## Integration Examples

### Example 1: Update BestSelling Component

**File**: `src/components/BestSelling/BestSelling.jsx`

```javascript
import React, { useState, useEffect } from 'react'
import { getBestSellingProducts } from '../../services/api'

const BestSelling = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getBestSellingProducts(4)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching best selling products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

---

### Example 2: Update ExploreProducts Component

**File**: `src/components/ExploreProducts/ExploreProducts.jsx`

```javascript
import React, { useState, useEffect } from 'react'
import { getProducts } from '../../services/api'

const ExploreProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
```

---

### Example 3: Update Products Page with Pagination

**File**: `src/pages/Products.jsx`

```javascript
import React, { useState, useEffect } from 'react'
import { fetchProductsPaginated } from '../../services/api'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 12

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const offset = page * itemsPerPage
        const data = await fetchProductsPaginated(offset, itemsPerPage)
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [page])

  return (
    <div>
      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination 
        page={page + 1} 
        onChange={(e, value) => setPage(value - 1)}
      />
    </div>
  )
}
```

---

## Available Categories from API

| ID | Name | Slug |
|----|------|------|
| 1 | Clothes | clothes |
| 2 | Electronics | electronics |
| 3 | Furniture | furniture |
| 4 | Shoes | shoes |
| 5 | Miscellaneous | miscellaneous |

---

## Error Handling

All API functions include built-in error handling. If a request fails:
- The function will log the error to console
- Return an empty array `[]` (for list functions)
- Return `null` (for single item functions)

**Custom Error Handling:**
```javascript
try {
  const products = await getProducts()
  if (products.length === 0) {
    // Handle empty state
  }
} catch (error) {
  // Additional error handling if needed
}
```

---

## Performance Tips

1. **Cache Products**: Store fetched products in state to avoid refetching
2. **Use Pagination**: For large product lists, use `fetchProductsPaginated`
3. **Lazy Loading**: Load images lazily for better performance
4. **Loading States**: Always show loading indicators during API calls

---

## Testing the API

You can test the API directly:
```bash
# Get all products
curl https://api.escuelajs.co/api/v1/products

# Get single product
curl https://api.escuelajs.co/api/v1/products/6

# Get categories
curl https://api.escuelajs.co/api/v1/categories
```

---

## Next Steps

1. ✅ **FlashSales** component - Already integrated
2. **BestSelling** component - Update to use `getBestSellingProducts(4)`
3. **ExploreProducts** component - Update to use `getProducts()`
4. **NewArrival** component - Update to use `getNewArrivalProducts(8)`
5. **BrowseCategory** component - Update to use `fetchCategories()`
6. **Products** page - Update to use `fetchProductsPaginated()`

---

## Support

For more information about the API, visit:
- **API Documentation**: https://fakeapi.platzi.com/
- **API Base URL**: https://api.escuelajs.co/api/v1



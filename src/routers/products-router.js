import { Router } from 'express'

const products = [
  { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics' },
  { id: 2, name: 'Product 2', price: 25.49, category: 'Clothing' },
  { id: 3, name: 'Product 3', price: 5.99, category: 'Home' },
  { id: 4, name: 'Product 4', price: 7.99, category: 'Groceries' },
  { id: 5, name: 'Product 5', price: 15.99, category: 'Electronics' },
  { id: 6, name: 'Product 6', price: 12.99, category: 'Clothing' },
  { id: 7, name: 'Product 7', price: 2.99, category: 'Home' },
  { id: 8, name: 'Product 8', price: 3.99, category: 'Groceries' },
  { id: 9, name: 'Product 9', price: 49.99, category: 'Electronics' },
  { id: 10, name: 'Product 10', price: 29.99, category: 'Clothing' },
  { id: 11, name: 'Product 11', price: 8.99, category: 'Home' },
  { id: 12, name: 'Product 12', price: 1.99, category: 'Groceries' },
  { id: 13, name: 'Product 13', price: 39.99, category: 'Electronics' },
  { id: 14, name: 'Product 14', price: 18.99, category: 'Clothing' },
  { id: 15, name: 'Product 15', price: 4.99, category: 'Home' }
]

const router = Router()

router.get('/', (req, res) => {
  const { limit } = req.query
  if (!limit) return res.status(200).json(products)
  const newProducts = products.slice(0, limit)
  res.status(200).json(newProducts)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const product = products.find(item => item.id === parseInt(id))
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.status(200).json(product)
})

export default router

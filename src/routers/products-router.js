import { Router } from 'express'
import { validateProduct } from '../schema/product.js'

const products = [
  {
    id: 1,
    title: 'Smartphone',
    description: 'High-end smartphone with advanced features.',
    code: 'PHN001',
    price: 799.99,
    status: true,
    stock: 100,
    category: 'Electronics',
    thumbnails: [
      'smartphone_thumbnail1.jpg',
      'smartphone_thumbnail2.jpg',
      'smartphone_thumbnail3.jpg'
    ]
  },
  {
    id: 2,
    title: 'Running Shoes',
    description: 'Comfortable running shoes for your active lifestyle.',
    code: 'SHS002',
    price: 89.99,
    status: true,
    stock: 50,
    category: 'Clothing',
    thumbnails: [
      'shoes_thumbnail1.jpg',
      'shoes_thumbnail2.jpg',
      'shoes_thumbnail3.jpg'
    ]
  },
  {
    id: 3,
    title: 'Cotton Sheets',
    description: "Soft and breathable cotton sheets for a good night's sleep.",
    code: 'HME003',
    price: 39.99,
    status: true,
    stock: 200,
    category: 'Home',
    thumbnails: [
      'sheets_thumbnail1.jpg',
      'sheets_thumbnail2.jpg',
      'sheets_thumbnail3.jpg'
    ]
  },
  {
    id: 4,
    title: 'Organic Snacks Box',
    description: 'A box of assorted organic and healthy snacks.',
    code: 'GRB004',
    price: 24.99,
    status: true,
    stock: 30,
    category: 'Groceries',
    thumbnails: [
      'snacks_thumbnail1.jpg',
      'snacks_thumbnail2.jpg',
      'snacks_thumbnail3.jpg'
    ]
  },
  {
    id: 5,
    title: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker for music on the go.',
    code: 'SPK005',
    price: 49.99,
    status: true,
    stock: 75,
    category: 'Electronics',
    thumbnails: [
      'speaker_thumbnail1.jpg',
      'speaker_thumbnail2.jpg',
      'speaker_thumbnail3.jpg'
    ]
  },
  {
    id: 6,
    title: 'Graphic T-Shirt',
    description: 'Stylish graphic t-shirt with unique design.',
    code: 'CLT006',
    price: 19.99,
    status: true,
    stock: 40,
    category: 'Clothing',
    thumbnails: [
      'shirt_thumbnail1.jpg',
      'shirt_thumbnail2.jpg',
      'shirt_thumbnail3.jpg'
    ]
  },
  {
    id: 7,
    title: 'Cookware Set',
    description: 'Complete set of non-stick cookware for your kitchen.',
    code: 'KTC007',
    price: 149.99,
    status: true,
    stock: 20,
    category: 'Home',
    thumbnails: [
      'cookware_thumbnail1.jpg',
      'cookware_thumbnail2.jpg',
      'cookware_thumbnail3.jpg'
    ]
  },
  {
    id: 8,
    title: 'Fresh Produce Bundle',
    description: 'Assortment of fresh and locally sourced produce.',
    code: 'GRP008',
    price: 29.99,
    status: true,
    stock: 15,
    category: 'Groceries',
    thumbnails: [
      'produce_thumbnail1.jpg',
      'produce_thumbnail2.jpg',
      'produce_thumbnail3.jpg'
    ]
  },
  {
    id: 9,
    title: 'Wireless Earbuds',
    description: 'Wireless earbuds with noise-cancellation technology.',
    code: 'EAR009',
    price: 79.99,
    status: true,
    stock: 60,
    category: 'Electronics',
    thumbnails: [
      'earbuds_thumbnail1.jpg',
      'earbuds_thumbnail2.jpg',
      'earbuds_thumbnail3.jpg'
    ]
  },
  {
    id: 10,
    title: 'Denim Jeans',
    description: 'Classic denim jeans for a casual yet stylish look.',
    code: 'CLT010',
    price: 59.99,
    status: true,
    stock: 25,
    category: 'Clothing',
    thumbnails: [
      'jeans_thumbnail1.jpg',
      'jeans_thumbnail2.jpg',
      'jeans_thumbnail3.jpg'
    ]
  }
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

router.post('/', (req, res) => {
  const product = validateProduct(req.body)
  if (product.error) return res.status(400).json({ error: product.error })
  const id = products.length === 0 ? 1 : products[products.length - 1].id + 1
  const newProduct = {
    id,
    ...product.data
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

export default router

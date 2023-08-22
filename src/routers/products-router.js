import { Router } from 'express'
import { validatePartialProduct, validateProduct } from '../schema/product.js'
import { ProductManager } from '../product-manager.js'

const router = Router()
const DM = new ProductManager('./src/data/products.json')

router.get('/', async (req, res) => {
  const products = await DM.getProducts()
  const { limit } = req.query
  if (!limit) return res.status(200).json(products)
  const newProducts = products.slice(0, limit)
  res.status(200).json(newProducts)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const product = await DM.getProductByID(id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.status(200).json(product)
})

router.post('/', async (req, res) => {
  const product = validateProduct(req.body)
  if (product.error) return res.status(400).json({ error: product.error })
  const newProduct = {
    ...product.data
  }
  const addProduct = await DM.addProduct(newProduct)
  res.status(201).json(addProduct)
})

router.put('/:id', async (req, res) => {
  const result = validatePartialProduct(req.body)
  if (result.error) return res.status(400).json({ error: result.error })

  const id = req.params.id
  const productUpdate = await DM.productUpdate(id, { ...result.data })
  res.status(200).json(productUpdate)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const productDeleted = await DM.productDelete(id)
  if (!productDeleted) return res.status(404).json({ error: 'Product not found' })
  res.status(201).json(productDeleted)
})

export default router

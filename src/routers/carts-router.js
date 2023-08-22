import { Router } from 'express'
import { CartManager } from '../cart-manager.js'

const CM = new CartManager('./src/data/carts.json')
const router = Router()

router.post('/', async (req, res) => {
  const cart = await CM.createCart()
  res.status(201).json(cart)
})

router.get('/:cid', async (req, res) => {
  const id = req.params.cid
  const cart = await CM.getCartByID(id)
  if (!cart) return res.status(404).json({ error: 'Cart not found' })
  res.status(200).json(cart)
})

export default router

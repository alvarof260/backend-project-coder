import { Router } from 'express'

const carts = []

const router = Router()

router.post('/', (req, res) => {
  const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1
  const cart = {
    id,
    products: []
  }
  carts.push(cart)
  res.status(201).json(cart)
})

router.get('/:cid', (req, res) => {
  const id = req.params.cid
  const cart = carts.find(item => item.id === parseInt(id))
  if (!cart) return res.status(404).json({ error: 'Cart not found' })
  res.status(200).json(cart)
})

export default router

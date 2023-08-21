import express from 'express'
import productRouter from './routers/products-router.js'
import cartRouter from './routers/carts-router.js'

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
  console.log(`listen on http://localhost:${PORT}`)
})

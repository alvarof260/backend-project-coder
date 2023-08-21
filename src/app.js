import express from 'express'
import productRouter from './routers/products-router.js'
const app = express()
const PORT = process.env.PORT ?? 8080

app.use('/api/products', productRouter)

app.listen(PORT, () => {
  console.log(`listen on http://localhost:${PORT}`)
})

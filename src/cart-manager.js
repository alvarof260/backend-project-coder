import { writeFile, readFile } from 'node:fs/promises'

export class CartManager {
  #path
  constructor (path) {
    this.#path = path
  }

  async getCarts () {
    try {
      const response = await readFile(this.#path, 'utf-8')
      if (!response) {
        return []
      }
      const parseResponse = JSON.parse(response)
      return parseResponse
    } catch (error) {
      console.error('Error al leer o analizar el archivo:', error)
      return []
    }
  }

  async createCart () {
    const carts = await this.getCarts()
    const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1
    const cart = {
      id,
      products: []
    }
    carts.push(cart)
    await writeFile(this.#path, JSON.stringify(carts, null, '\t'))
    return cart
  }

  async getCartByID (cartId) {
    const carts = await this.getCarts()
    const cart = carts.find(item => item.id === parseInt(cartId))
    if (!cart) return undefined
    return cart
  }
}

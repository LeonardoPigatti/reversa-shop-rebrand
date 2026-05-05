import express from 'express'
import jwt from 'jsonwebtoken'
import Wishlist from '../models/Wishlist.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'rvlt-store-secret-2025'

// Middleware para pegar o usuário do token
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Não autenticado' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}

// GET /api/wishlist — buscar wishlist do usuário
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id })
    res.json(wishlist?.itens ?? [])
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar wishlist' })
  }
})

// POST /api/wishlist — adicionar item
router.post('/', auth, async (req, res) => {
  try {
    const { itemId, nome, imagem, preco, preco_promocional, categoria } = req.body

    let wishlist = await Wishlist.findOne({ userId: req.user.id })

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user.id,
        itens: [{ itemId, nome, imagem, preco, preco_promocional, categoria }],
      })
    } else {
      const existe = wishlist.itens.find((i) => i.itemId === itemId)
      if (!existe) {
        wishlist.itens.push({ itemId, nome, imagem, preco, preco_promocional, categoria })
        await wishlist.save()
      }
    }

    res.json(wishlist.itens)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/wishlist/:itemId — remover item
router.delete('/:itemId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id })
    if (!wishlist) return res.json([])

    wishlist.itens = wishlist.itens.filter((i) => i.itemId !== req.params.itemId)
    await wishlist.save()

    res.json(wishlist.itens)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover item' })
  }
})

export default router
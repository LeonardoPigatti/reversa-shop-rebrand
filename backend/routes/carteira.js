import express from 'express'
import jwt from 'jsonwebtoken'
import Cartao from '../models/Cartao.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'rvlt-store-secret-2025'

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Não autenticado' })
  try { req.user = jwt.verify(token, JWT_SECRET); next() }
  catch { res.status(401).json({ error: 'Token inválido' }) }
}

function detectarBandeira(numero) {
  const n = numero.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n)) return 'mastercard'
  if (/^6(?:011|5)/.test(n)) return 'elo'
  if (/^3[47]/.test(n)) return 'amex'
  if (/^(606282|3841)/.test(n)) return 'hipercard'
  return 'outro'
}

// GET /api/carteira
router.get('/', auth, async (req, res) => {
  try {
    const cartoes = await Cartao.find({ userId: req.user.id }).sort({ principal: -1, createdAt: -1 })
    res.json(cartoes)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cartões' })
  }
})

// POST /api/carteira
router.post('/', auth, async (req, res) => {
  try {
    const { numero, nome_titular, validade, apelido } = req.body

    const numero_final = numero.replace(/\s/g, '').slice(-4)
    const bandeira = detectarBandeira(numero)

    // Primeiro cartão vira principal automaticamente
    const total = await Cartao.countDocuments({ userId: req.user.id })

    const cartao = await Cartao.create({
      userId:       req.user.id,
      apelido,
      numero_final,
      bandeira,
      nome_titular,
      validade,
      principal:    total === 0,
    })

    res.status(201).json(cartao)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH /api/carteira/:id/principal — definir como principal
router.patch('/:id/principal', auth, async (req, res) => {
  try {
    await Cartao.updateMany({ userId: req.user.id }, { principal: false })
    const cartao = await Cartao.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { principal: true },
      { new: true }
    )
    if (!cartao) return res.status(404).json({ error: 'Cartão não encontrado' })
    res.json(cartao)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar cartão' })
  }
})

// DELETE /api/carteira/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const cartao = await Cartao.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!cartao) return res.status(404).json({ error: 'Cartão não encontrado' })

    // Se era o principal, promove o próximo
    if (cartao.principal) {
      const proximo = await Cartao.findOne({ userId: req.user.id }).sort({ createdAt: -1 })
      if (proximo) await Cartao.findByIdAndUpdate(proximo._id, { principal: true })
    }

    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover cartão' })
  }
})

export default router
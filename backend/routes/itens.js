import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()

// GET /api/itens
router.get('/', async (req, res) => {
  try {
    const itens = await Item.find({ ativo: true }).sort({ createdAt: -1 })
    res.json(itens)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar itens' })
  }
})

// GET /api/itens/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item não encontrado' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar item' })
  }
})

// POST /api/itens
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/itens/:id
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ error: 'Item não encontrado' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/itens/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item não encontrado' })
    res.json({ message: 'Item deletado com sucesso' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar item' })
  }
})

export default router
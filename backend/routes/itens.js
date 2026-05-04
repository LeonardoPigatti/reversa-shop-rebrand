import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()

// GET /api/itens?genero=feminino&categoria=Vestidos&plus_size=true&colecao=Marimoon
router.get('/', async (req, res) => {
  try {
    const query = { ativo: true }

    if (req.query.genero)    query.genero    = req.query.genero
    if (req.query.categoria) query.categoria = req.query.categoria
    if (req.query.colecao)   query.colecao   = req.query.colecao
    if (req.query.plus_size) query.plus_size = req.query.plus_size === 'true'

    const itens = await Item.find(query).sort({ createdAt: -1 })
    res.json(itens)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar itens' })
  }
})

// GET /api/itens/colecoes — lista todas as coleções cadastradas
router.get('/colecoes', async (req, res) => {
  try {
    const colecoes = await Item.distinct('colecao', { ativo: true, colecao: { $ne: null } })
    res.json(colecoes.sort())
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar coleções' })
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
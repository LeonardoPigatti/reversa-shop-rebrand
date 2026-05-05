import express from 'express'
import Item from '../models/Item.js'

const router = express.Router()

// GET /api/itens?genero=feminino&oferta=true&recentes=true&limit=6
router.get('/', async (req, res) => {
  try {
    const query = { ativo: true }

    if (req.query.genero)    query.genero    = req.query.genero
    if (req.query.categoria) query.categoria = req.query.categoria
    if (req.query.colecao)   query.colecao   = req.query.colecao
    if (req.query.plus_size) query.plus_size = req.query.plus_size === 'true'
    if (req.query.oferta)    query.oferta    = req.query.oferta === 'true'
    if (req.query.busca)     query.nome      = { $regex: req.query.busca, $options: 'i' }

    const limit = req.query.limit ? parseInt(req.query.limit) : 0 // 0 = sem limite

    const itens = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)

    res.json(itens)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar itens' })
  }
})

// GET /api/itens/colecoes
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
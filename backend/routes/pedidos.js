import express from 'express'
import Pedido from '../models/Pedido.js'

const router = express.Router()

// POST /api/pedidos — criar pedido
router.post('/', async (req, res) => {
  try {
    const {
      identificacao,
      entrega,
      pagamento,
      itens,
      subtotal,
      total,
    } = req.body

    const freteValores = { pac: 18.90, sedex: 34.90, retirada: 0 }

    const pedido = await Pedido.create({
      cliente: {
        nome:       identificacao.nome,
        cpf:        identificacao.cpf,
        email:      identificacao.email,
        telefone:   identificacao.tel,
        nascimento: identificacao.nascimento,
        genero:     identificacao.genero,
      },
      entrega: {
        cep:         entrega.cep,
        rua:         entrega.rua,
        numero:      entrega.num,
        comp:        entrega.comp,
        bairro:      entrega.bairro,
        cidade:      entrega.cidade,
        estado:      entrega.estado,
        frete:       entrega.frete,
        valor_frete: freteValores[entrega.frete] ?? 0,
      },
      pagamento: {
        metodo:   pagamento.metodo,
        parcelas: parseInt(pagamento.parcelas) || 1,
        cupom:    pagamento.cupom,
      },
      itens: itens.map((item) => ({
        itemId:     item._id,
        nome:       item.nome,
        imagem:     item.imagem,
        tamanho:    item.tamanho,
        preco:      item.preco_promocional ?? item.preco,
        quantidade: item.quantidade,
        subtotal:   (item.preco_promocional ?? item.preco) * item.quantidade,
      })),
      subtotal,
      total,
    })

    res.status(201).json({ ok: true, pedidoId: pedido._id, numero: pedido._id.toString().slice(-6).toUpperCase() })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/pedidos?email=x — listar por email ou todos (admin)
router.get('/', async (req, res) => {
  try {
    const query = {}
    if (req.query.email) query['cliente.email'] = req.query.email.toLowerCase()
    const pedidos = await Pedido.find(query).sort({ createdAt: -1 })
    res.json(pedidos)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' })
  }
})

// GET /api/pedidos/:id — buscar um
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' })
    res.json(pedido)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pedido' })
  }
})

// PATCH /api/pedidos/:id/status — atualizar status
router.patch('/:id/status', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' })
    res.json(pedido)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
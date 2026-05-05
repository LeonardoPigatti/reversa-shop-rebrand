import mongoose from 'mongoose'

const itemPedidoSchema = new mongoose.Schema({
  itemId:    { type: String, required: true },
  nome:      { type: String, required: true },
  imagem:    { type: String, default: '' },
  tamanho:   { type: String, default: null },
  preco:     { type: Number, required: true },
  quantidade:{ type: Number, required: true, min: 1 },
  subtotal:  { type: Number, required: true },
})

const pedidoSchema = new mongoose.Schema(
  {
    // Identificação
    cliente: {
      nome:       { type: String, required: true },
      cpf:        { type: String, required: true },
      email:      { type: String, required: true },
      telefone:   { type: String, default: '' },
      nascimento: { type: String, default: '' },
      genero:     { type: String, default: '' },
    },

    // Entrega
    entrega: {
      cep:    { type: String, required: true },
      rua:    { type: String, required: true },
      numero: { type: String, required: true },
      comp:   { type: String, default: '' },
      bairro: { type: String, default: '' },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      frete:  { type: String, enum: ['pac', 'sedex', 'retirada'], required: true },
      valor_frete: { type: Number, required: true },
    },

    // Pagamento
    pagamento: {
      metodo:   { type: String, enum: ['cartao', 'pix', 'boleto'], required: true },
      parcelas: { type: Number, default: 1 },
      cupom:    { type: String, default: '' },
    },

    // Itens
    itens: [itemPedidoSchema],

    // Totais
    subtotal:    { type: Number, required: true },
    total:       { type: Number, required: true },

    // Status
    status: {
      type: String,
      enum: ['pendente', 'confirmado', 'em_preparo', 'enviado', 'entregue', 'cancelado'],
      default: 'pendente',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Pedido', pedidoSchema)
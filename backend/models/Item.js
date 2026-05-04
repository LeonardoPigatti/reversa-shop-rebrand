import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      default: '',
    },
    preco: {
      type: Number,
      required: true,
      min: 0,
    },
    preco_promocional: {
      type: Number,
      default: null,
    },
    imagem: {
      type: String,
      default: '',
    },
    categoria: {
      type: String,
      default: '',
    },
    estoque: {
      type: Number,
      default: 0,
      min: 0,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Item', itemSchema)
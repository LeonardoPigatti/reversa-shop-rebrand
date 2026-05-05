import mongoose from 'mongoose'

const TAMANHOS_VALIDOS = [
  'PP', 'P', 'M', 'G', 'GG', 'XG',
  '1G', '2G', '3G', '4G', '5G',
  '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
  'U',
]

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
    colecao: {
      type: String,
      default: null,
      trim: true,
    },
    genero: {
      type: String,
      enum: ['masculino', 'feminino', 'unissex'],
      required: true,
    },
    tamanhos: {
      type: [String],
      enum: TAMANHOS_VALIDOS,
      default: [],
    },
    plus_size: {
      type: Boolean,
      default: false,
    },
    oferta: {
      type: Boolean,
      default: false,
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

// Marca plus_size automaticamente se tiver tamanhos 1G ou maior
itemSchema.pre('save', function (next) {
  const plusSizes = ['1G', '2G', '3G', '4G', '5G']
  this.plus_size = this.tamanhos.some((t) => plusSizes.includes(t))
  next()
})

export default mongoose.model('Item', itemSchema)
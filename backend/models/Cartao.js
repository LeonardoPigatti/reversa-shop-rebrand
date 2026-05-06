import mongoose from 'mongoose'

const cartaoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    apelido: {
      type: String,
      default: '',
      trim: true,
    },
    numero_final: {
      type: String,
      required: true, // últimos 4 dígitos
      length: 4,
    },
    bandeira: {
      type: String,
      enum: ['visa', 'mastercard', 'elo', 'amex', 'hipercard', 'outro'],
      default: 'outro',
    },
    nome_titular: {
      type: String,
      required: true,
      trim: true,
    },
    validade: {
      type: String,
      required: true, // MM/AA
    },
    principal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Cartao', cartaoSchema)
import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    itens: [
      {
        itemId: { type: String, required: true },
        nome:   { type: String, required: true },
        imagem: { type: String, default: '' },
        preco:  { type: Number, required: true },
        preco_promocional: { type: Number, default: null },
        categoria: { type: String, default: '' },
        adicionadoEm: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Wishlist', wishlistSchema)
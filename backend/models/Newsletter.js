import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema(
  {
    nome:  { type: String, trim: true, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Newsletter', newsletterSchema)
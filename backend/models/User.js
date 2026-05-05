import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
      minlength: 6,
    },
    cpf: {
      type: String,
      default: '',
    },
    telefone: {
      type: String,
      default: '',
    },
    nascimento: {
      type: String,
      default: '',
    },
    genero: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['cliente', 'admin'],
      default: 'cliente',
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

// Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next()
  this.senha = await bcrypt.hash(this.senha, 10)
  next()
})

// Método para comparar senha
userSchema.methods.compararSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha)
}

export default mongoose.model('User', userSchema)
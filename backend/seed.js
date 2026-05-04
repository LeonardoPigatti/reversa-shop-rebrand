import 'dotenv/config'
import mongoose from 'mongoose'
import Item from './models/Item.js'

const itens = [
  {
    nome: 'Camiseta Neon Rosa',
    descricao: 'Camiseta oversized com estampa neon.',
    preco: 89.90,
    preco_promocional: 69.90,
    imagem: '',
    categoria: 'Camisetas',
    estoque: 50,
    ativo: true,
  },
  {
    nome: 'Moletom Dark',
    descricao: 'Moletom unissex tom escuro com capuz.',
    preco: 199.90,
    preco_promocional: null,
    imagem: '',
    categoria: 'Moletons',
    estoque: 30,
    ativo: true,
  },
  {
    nome: 'Calça Cargo',
    descricao: 'Calça cargo streetwear com bolsos laterais.',
    preco: 149.90,
    preco_promocional: 129.90,
    imagem: '',
    categoria: 'Calças',
    estoque: 20,
    ativo: true,
  },
]

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Item.deleteMany({})
    await Item.insertMany(itens)
    console.log('✅ Banco populado com', itens.length, 'itens!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Erro:', err.message)
    process.exit(1)
  })
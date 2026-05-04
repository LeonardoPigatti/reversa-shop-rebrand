import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import itensRoutes from './routes/itens.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/itens', itensRoutes)

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API Loja rodando!' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado — banco: loja')
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message)
    process.exit(1)
  })
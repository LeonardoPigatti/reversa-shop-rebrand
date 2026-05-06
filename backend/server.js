import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import itensRoutes      from './routes/itens.js'
import pedidosRoutes    from './routes/pedidos.js'
import authRoutes       from './routes/auth.js'
import wishlistRoutes   from './routes/wishlist.js'
import carteiraRoutes   from './routes/carteira.js'
import newsletterRoutes from './routes/newsletter.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/itens',      itensRoutes)
app.use('/api/pedidos',    pedidosRoutes)
app.use('/api/auth',       authRoutes)
app.use('/api/wishlist',   wishlistRoutes)
app.use('/api/carteira',   carteiraRoutes)
app.use('/api/newsletter', newsletterRoutes)

app.get('/', (req, res) => res.json({ status: 'ok', message: 'API Loja rodando!' }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado — banco: loja')
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`)
    )
  })
  .catch((err) => { console.error('❌', err.message); process.exit(1) })
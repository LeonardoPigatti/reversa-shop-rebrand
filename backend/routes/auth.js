import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'rvlt-secret-key'

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha, cpf, telefone, nascimento, genero } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' })
    }

    const existe = await User.findOne({ email })
    if (existe) {
      return res.status(400).json({ error: 'E-mail já cadastrado' })
    }

    const user = await User.create({ nome, email, senha, cpf, telefone, nascimento, genero })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role },
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })
    }

    const senhaOk = await user.compararSenha(senha)
    if (!senhaOk) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role },
    })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
})

// GET /api/auth/me — dados do usuário logado
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'Não autenticado' })

    const token = auth.replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-senha')
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

    res.json(user)
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' })
  }
})

export default router
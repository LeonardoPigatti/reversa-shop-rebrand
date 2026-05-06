import express from 'express'
import nodemailer from 'nodemailer'
import Newsletter from '../models/Newsletter.js'
import { emailBoasVindas } from '../emails/emailTemplate.js'

const router = express.Router()

// Configura o transporter do nodemailer
// Use suas credenciais SMTP no .env
function criarTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body

    if (!email) return res.status(400).json({ error: 'E-mail é obrigatório' })

    // Verifica se já está cadastrado
    const existe = await Newsletter.findOne({ email: email.toLowerCase() })
    if (existe) {
      if (existe.ativo) return res.status(400).json({ error: 'E-mail já cadastrado!' })
      // Reativa se estava inativo
      existe.ativo = true
      existe.nome  = nome || existe.nome
      await existe.save()
    } else {
      await Newsletter.create({ nome, email })
    }

    // Envia o email de boas-vindas
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = criarTransporter()
      await transporter.sendMail({
        from:    `"Midnight Queens Club" <${process.env.SMTP_USER}>`,
        to:      email,
        subject: '🖤 Bem-vinda à Midnight Queens Club!',
        html:    emailBoasVindas(nome),
      })
    }

    res.status(201).json({ ok: true, message: 'Cadastro realizado com sucesso!' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar. Tente novamente.' })
  }
})

// GET /api/newsletter — listar todos (admin)
router.get('/', async (req, res) => {
  try {
    const lista = await Newsletter.find({ ativo: true }).sort({ createdAt: -1 })
    res.json(lista)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar lista' })
  }
})

export default router
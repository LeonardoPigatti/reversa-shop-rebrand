import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

const API = 'http://localhost:5000/api/wishlist'

function getToken() {
  return localStorage.getItem('rvlt_token')
}

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [itens, setItens] = useState([])

  // Carrega wishlist ao logar
  useEffect(() => {
    if (!user) { setItens([]); return }
    fetch(API, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then((r) => r.json())
      .then((data) => setItens(Array.isArray(data) ? data : []))
      .catch(() => setItens([]))
  }, [user])

  const estaNA = (itemId) => itens.some((i) => i.itemId === itemId)

  const adicionar = async (item) => {
    if (!user) return
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({
        itemId:           item._id,
        nome:             item.nome,
        imagem:           item.imagem,
        preco:            item.preco,
        preco_promocional: item.preco_promocional,
        categoria:        item.categoria,
      }),
    })
    const data = await res.json()
    if (Array.isArray(data)) setItens(data)
  }

  const remover = async (itemId) => {
    if (!user) return
    const res = await fetch(`${API}/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await res.json()
    if (Array.isArray(data)) setItens(data)
  }

  const toggle = (item) => {
    if (estaNA(item._id)) remover(item._id)
    else adicionar(item)
  }

  return (
    <WishlistContext.Provider value={{ itens, estaNA, adicionar, remover, toggle }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
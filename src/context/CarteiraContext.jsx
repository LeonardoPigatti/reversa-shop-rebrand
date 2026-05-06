import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CarteiraContext = createContext(null)
const API = 'http://localhost:5000/api/carteira'
const token = () => localStorage.getItem('rvlt_token')

export function CarteiraProvider({ children }) {
  const { user } = useAuth()
  const [cartoes, setCartoes] = useState([])

  useEffect(() => {
    if (!user) { setCartoes([]); return }
    fetch(API, { headers: { Authorization: `Bearer ${token()}` } })
      .then((r) => r.json())
      .then((d) => setCartoes(Array.isArray(d) ? d : []))
      .catch(() => setCartoes([]))
  }, [user])

  const adicionar = async (dados) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(dados),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    setCartoes((prev) => [...prev, data])
    return data
  }

  const remover = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    setCartoes((prev) => prev.filter((c) => c._id !== id))
  }

  const definirPrincipal = async (id) => {
    await fetch(`${API}/${id}/principal`, { method: 'PATCH', headers: { Authorization: `Bearer ${token()}` } })
    setCartoes((prev) => prev.map((c) => ({ ...c, principal: c._id === id })))
  }

  const cartaoPrincipal = cartoes.find((c) => c.principal) ?? cartoes[0] ?? null

  return (
    <CarteiraContext.Provider value={{ cartoes, adicionar, remover, definirPrincipal, cartaoPrincipal }}>
      {children}
    </CarteiraContext.Provider>
  )
}

export function useCarteira() {
  return useContext(CarteiraContext)
}
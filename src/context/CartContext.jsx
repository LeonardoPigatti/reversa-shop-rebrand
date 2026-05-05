import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])

  const adicionar = (item, tamanho, quantidade = 1) => {
    setItens((prev) => {
      const key = `${item._id}-${tamanho}`
      const existe = prev.find((i) => i.key === key)
      if (existe) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantidade: i.quantidade + quantidade } : i
        )
      }
      return [...prev, { ...item, key, tamanho, quantidade }]
    })
  }

  const remover = (key) => {
    setItens((prev) => prev.filter((i) => i.key !== key))
  }

  const alterarQty = (key, quantidade) => {
    if (quantidade <= 0) return remover(key)
    setItens((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantidade } : i))
    )
  }

  const limpar = () => setItens([])

  const total = itens.reduce((acc, i) => {
    const preco = i.preco_promocional ?? i.preco
    return acc + preco * i.quantidade
  }, 0)

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <CartContext.Provider value={{ itens, adicionar, remover, alterarQty, limpar, total, totalItens }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
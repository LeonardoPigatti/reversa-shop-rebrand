import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Recupera sessão do localStorage ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('rvlt_token')
    const saved = localStorage.getItem('rvlt_user')
    if (token && saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const login = async (email, senha) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('rvlt_token', data.token)
    localStorage.setItem('rvlt_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const registro = async (form) => {
    const res = await fetch('http://localhost:5000/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('rvlt_token', data.token)
    localStorage.setItem('rvlt_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('rvlt_token')
    localStorage.removeItem('rvlt_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
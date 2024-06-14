import React, { createContext, useState } from 'react'

const TokenContext = createContext()

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '')

  const updateToken = (newToken) => {
    setToken(newToken)
    sessionStorage.setItem('token', newToken)
  }

  const removeToken = () => {
    setToken('')
    sessionStorage.removeItem('token')
  }

  return (
    <TokenContext.Provider value={{ token, updateToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export { TokenProvider, TokenContext }

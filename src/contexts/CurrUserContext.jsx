import React, { createContext, useState } from 'react'

const currUserContext = createContext()

const CurrUserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(sessionStorage.getItem('currUser') || '')

  const updateCurrUser = (newCurrUser) => {
    setCurrUser(newCurrUser)
    sessionStorage.setItem('currUser', newCurrUser)
  }

  const removeCurrUser = () => {
    setCurrUser('')
    sessionStorage.removeItem('currUser')
  }

  return (
    <currUserContext.Provider value={{ currUser, updateCurrUser, removeCurrUser }}>
      {children}
    </currUserContext.Provider>
  )
}

export { CurrUserProvider, currUserContext }
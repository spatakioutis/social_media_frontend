import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {TokenProvider} from './contexts/TokenContext.jsx'
import {CurrUserProvider} from './contexts/CurrUserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CurrUserProvider>
    <TokenProvider>
        <App />
    </TokenProvider>
  </CurrUserProvider>

  // </React.StrictMode>
)

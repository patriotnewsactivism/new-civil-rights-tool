import React from 'react'
import ReactDOM from 'react-dom/client'
import ModernCivilRightsTool from './ModernCivilRightsTool'
import { AuthProvider } from './AuthContext'
import './modern-design.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ModernCivilRightsTool />
    </AuthProvider>
  </React.StrictMode>,
)
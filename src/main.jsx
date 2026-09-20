import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LenisProvider } from './hooks/useLenis.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* LenisProvider sits above everything — one scroll engine for the whole app */}
    <LenisProvider>
      <App />
    </LenisProvider>
  </StrictMode>,
)

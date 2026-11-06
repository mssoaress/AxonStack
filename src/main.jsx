import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Fontes e estilos globais antes dos componentes: garante a ordem da cascata.
import './fonts.js'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML vem pré-renderizado (scripts/prerender.js): hidrata.
// A hidratação roda como transição: o React a divide em fatias e não bloqueia a
// thread principal (o conteúdo já está visível; só a interatividade chega em seguida).
// No `npm run dev` o #root chega vazio: renderiza do zero.
if (container.firstElementChild) {
  startTransition(() => {
    hydrateRoot(container, app)
  })
} else {
  createRoot(container).render(app)
}

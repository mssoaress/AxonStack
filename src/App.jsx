import NetCanvas from './components/NetCanvas.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ClientsStrip from './components/ClientsStrip.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Diferenciais from './components/Diferenciais.jsx'
import Cases from './components/Cases.jsx'
import Faq from './components/Faq.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import { useScrollReveal } from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <NetCanvas />
      <CustomCursor />
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <ClientsStrip />
        <Services />
        <Process />
        <Diferenciais />
        <Cases />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}

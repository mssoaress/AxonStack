import NetCanvas from './components/NetCanvas.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ClientsStrip from './components/ClientsStrip.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Diferenciais from './components/Diferenciais.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Footer from './components/Footer.jsx'
import { useScrollReveal } from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  return (
    <>
      <NetCanvas />
      <CustomCursor />
      <Navbar />
      <Hero />
      <ClientsStrip />
      <Services />
      <Process />
      <Diferenciais />
      <CtaFinal />
      <Footer />
    </>
  )
}

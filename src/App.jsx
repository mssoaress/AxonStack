import NetCanvas from './components/NetCanvas.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Process from './components/Process.jsx'
import Diferenciais from './components/Diferenciais.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
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
        <Marquee />
        <Services />
        <Projects />
        <About />
        <Process />
        <Diferenciais />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

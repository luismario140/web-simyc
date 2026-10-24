import { useEffect, useSyncExternalStore } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import WhatsAppBubble from './components/WhatsAppBubble/WhatsAppBubble.jsx'
import { whatsappConfig } from './config/whatsapp.js'
import About from './pages/About/About.jsx'
import { aboutHref, socialLinks } from './config/navigation.js'

const subscribeToLocation = (callback) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const isAboutPage = () => window.location.hash === aboutHref

function App() {
  const showAbout = useSyncExternalStore(subscribeToLocation, isAboutPage)

  // Mantiene atrás/adelante y los enlaces directos sin exigir rutas al servidor.
  useEffect(() => {
    document.title = 'Simyc'
    const frame = window.requestAnimationFrame(() => {
      if (showAbout || !window.location.hash) window.scrollTo(0, 0)
      else document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
      document.querySelector('.app-main')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [showAbout])

  return (
    <>
      <Navbar />
      <main id="inicio" className="app-main" tabIndex={-1}>
        {showAbout ? <About /> : <Home />}
      </main>
      <Footer socialLinks={socialLinks} />
      <WhatsAppBubble {...whatsappConfig} />
    </>
  )
}

export default App

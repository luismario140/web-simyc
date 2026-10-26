import { lazy, Suspense, useEffect, useSyncExternalStore } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import WhatsAppBubble from './components/WhatsAppBubble/WhatsAppBubble.jsx'
import { whatsappConfig } from './config/whatsapp.js'
import ServiceInquiryProvider from './components/ServiceInquiry/ServiceInquiryProvider.jsx'
import { aboutHref, faqHref, socialLinks } from './config/navigation.js'

const About = lazy(() => import('./pages/About/About.jsx'))
const FAQ = lazy(() => import('./pages/FAQ/FAQ.jsx'))

const subscribeToLocation = (callback) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const getPage = () => {
  const hash = window.location.hash
  if (hash === aboutHref) return 'about'
  if (hash === faqHref || hash === '#preguntas-frecuentes') return 'faq'
  return 'home'
}

function App() {
  const page = useSyncExternalStore(subscribeToLocation, getPage)
  const Page = page === 'about' ? About : page === 'faq' ? FAQ : Home

  // Mantiene atrás/adelante y los enlaces directos sin exigir rutas al servidor.
  useEffect(() => {
    document.title = 'Simyc'
    const frame = window.requestAnimationFrame(() => {
      if (page !== 'home' || !window.location.hash) window.scrollTo(0, 0)
      else {
        let targetId = ''
        try {
          targetId = decodeURIComponent(window.location.hash.slice(1))
        } catch {
          // Un fragmento inválido no debe interrumpir el enfoque de la página.
        }
        if (targetId) document.getElementById(targetId)?.scrollIntoView()
      }
      document.querySelector('.app-main')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [page])

  return (
    <ServiceInquiryProvider>
      <Navbar />
      <main id="inicio" className="app-main" tabIndex={-1}>
        <Suspense fallback={<p className="page-loading" role="status">Cargando página…</p>}>
          <Page />
        </Suspense>
      </main>
      <Footer socialLinks={socialLinks} />
      <WhatsAppBubble {...whatsappConfig} />
    </ServiceInquiryProvider>
  )
}

export default App

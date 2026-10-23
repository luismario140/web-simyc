import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import WhatsAppBubble from './components/WhatsAppBubble/WhatsAppBubble.jsx'
import { whatsappConfig } from './config/whatsapp.js'

function App() {
  return (
    <>
      <Navbar />
      <main id="inicio" className="app-main" tabIndex={-1}>
        <Home />
      </main>
      <Footer socialLinks={{ email: 'mailto:operadorlogisticosimyc@gmail.com' }} />
      <WhatsAppBubble {...whatsappConfig} />
    </>
  )
}

export default App

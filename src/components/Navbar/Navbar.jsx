import { useEffect, useId, useRef, useState } from 'react'
import brandLogo from '../../assets/Logo1.png'
import { services } from '../../config/services.js'
import './Navbar.css'

const defaultLinks = [
  { label: 'Servicios', href: '#servicios', dropdown: true },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

// El listado y las tarjetas comparten los textos de src/config/services.js.

function Navbar({ logoSrc = brandLogo, links = defaultLinks }) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesItemRef = useRef(null)
  const servicesButtonRef = useRef(null)
  const servicesId = useId()

  // Cierra el listado al pulsar Escape o hacer clic fuera de Servicios.
  useEffect(() => {
    if (!servicesOpen) return

    const closeOutside = (event) => {
      if (!servicesItemRef.current?.contains(event.target)) setServicesOpen(false)
    }
    const closeWithEscape = (event) => {
      if (event.key !== 'Escape') return
      setServicesOpen(false)
      servicesButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [servicesOpen])

  return (
    <header className="site-header">
      <a className="navbar-brand" href={import.meta.env.BASE_URL} aria-label="SYMIC, ir al inicio">
        {logoSrc ? (
          <img className="navbar-logo" src={logoSrc} alt="SYMIC" />
        ) : (
          <span className="navbar-wordmark">
            <span className="navbar-name">SYMIC<span>.</span></span>
            <span className="navbar-tagline">Publicidad digital</span>
          </span>
        )}
      </a>

      <nav className="navbar" aria-label="Navegación principal">
        <ul className="navbar-links">
          {links.map(({ label, href, current, dropdown }) => (
            <li
              className="navbar-item"
              key={href}
              ref={dropdown ? servicesItemRef : undefined}
              onBlur={dropdown ? (event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false)
              } : undefined}
            >
              {dropdown ? (
                <>
                  <button
                    className="navbar-link"
                    type="button"
                    ref={servicesButtonRef}
                    aria-expanded={servicesOpen}
                    aria-controls={servicesId}
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    {label}
                    <svg className="navbar-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <ul className="navbar-services" id={servicesId} aria-label="Servicios de publicidad">
                      {services.map((service) => (
                        <li className="navbar-service-item" key={service.id}>
                          <a href={`#${service.id}`} onClick={() => setServicesOpen(false)}>
                            {service.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a className="navbar-link" href={href} aria-current={current ? 'page' : undefined}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

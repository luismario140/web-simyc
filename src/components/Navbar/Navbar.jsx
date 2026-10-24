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
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)
  const mobileButtonRef = useRef(null)
  const servicesItemRef = useRef(null)
  const servicesButtonRef = useRef(null)
  const servicesId = useId()
  const navigationId = useId()

  // Cierra el listado al pulsar Escape o hacer clic fuera de Servicios.
  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return

    const closeOutside = (event) => {
      if (!servicesItemRef.current?.contains(event.target)) setServicesOpen(false)
      if (!headerRef.current?.contains(event.target)) setMobileOpen(false)
    }
    const closeWithEscape = (event) => {
      if (event.key !== 'Escape') return
      if (servicesOpen) {
        setServicesOpen(false)
        servicesButtonRef.current?.focus()
      } else {
        setMobileOpen(false)
        mobileButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [servicesOpen, mobileOpen])

  // Si se pasa de móvil a escritorio, restablece los paneles de navegación.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 821px)')
    const resetMenus = () => {
      setMobileOpen(false)
      setServicesOpen(false)
    }
    desktop.addEventListener('change', resetMenus)
    return () => desktop.removeEventListener('change', resetMenus)
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="navbar-container">
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

      {/* MENÚ MÓVIL: aparece hasta 820 px; permite abrirlo con toque o teclado. */}
      <button
        className="navbar-toggle"
        type="button"
        ref={mobileButtonRef}
        aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        aria-expanded={mobileOpen}
        aria-controls={navigationId}
        onClick={() => {
          setMobileOpen((open) => !open)
          setServicesOpen(false)
        }}
      >
        <span>{mobileOpen ? 'Cerrar' : 'Menú'}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d={mobileOpen ? 'm6 6 12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      <nav
        className={`navbar${mobileOpen ? ' is-open' : ''}`}
        id={navigationId}
        aria-label="Navegación principal"
        onClick={(event) => {
          if (event.target.closest('a')) {
            setMobileOpen(false)
            setServicesOpen(false)
          }
        }}
      >
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
      </div>
    </header>
  )
}

export default Navbar

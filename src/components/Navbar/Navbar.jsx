import { useEffect, useId, useRef, useState } from 'react'
import brandLogo from '../../assets/Logo1.png'
import { services } from '../../config/services.js'
// El PDF se importa desde docs para que Vite lo incluya también al publicar la web.
import { aboutHref, faqHref, contactLinks, portfolioPdf } from '../../config/navigation.js'
import './Navbar.css'

// NOSOTROS: edita aquí los nombres y los destinos del desplegable.
const aboutLinks = [
  { label: 'Quiénes somos', href: aboutHref },
  { label: 'Preguntas frecuentes', href: faqHref },
]

const defaultLinks = [
  { label: 'Servicios', href: '#servicios', dropdown: true },
  { label: 'Portafolio', href: portfolioPdf, target: '_blank' },
  { label: 'Nosotros', href: '#nosotros', dropdown: true, items: aboutLinks },
  { label: 'Contacto', href: '#contacto', dropdown: true, items: contactLinks },
]

// El listado y las tarjetas comparten los textos de src/config/services.js.

function Navbar({ logoSrc = brandLogo, links = defaultLinks }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)
  const mobileButtonRef = useRef(null)
  const dropdownButtonRefs = useRef({})
  const dropdownId = useId()
  const navigationId = useId()

  // Solo se abre un listado a la vez; Escape devuelve el foco a su botón.
  useEffect(() => {
    if (!openDropdown && !mobileOpen) return

    const closeOutside = (event) => {
      // Dentro del Navbar, el clic cambia de listado sin colapsar antes su posición.
      if (!headerRef.current?.contains(event.target)) {
        setOpenDropdown(null)
        setSelectedService(null)
        setMobileOpen(false)
      }
    }
    const closeWithEscape = (event) => {
      if (event.key !== 'Escape') return
      if (openDropdown) {
        setOpenDropdown(null)
        setSelectedService(null)
        dropdownButtonRefs.current[openDropdown]?.focus()
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
  }, [openDropdown, mobileOpen])

  // Si se pasa de móvil a escritorio, restablece los paneles de navegación.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 821px)')
    const resetMenus = () => {
      setMobileOpen(false)
      setOpenDropdown(null)
      setSelectedService(null)
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
          setOpenDropdown(null)
          setSelectedService(null)
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
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpenDropdown(null)
            setSelectedService(null)
          }
        }}
        onClick={(event) => {
          if (event.target.closest('a')) {
            setMobileOpen(false)
            setOpenDropdown(null)
            setSelectedService(null)
          }
        }}
      >
        <ul className="navbar-links">
          {links.map(({ label, href, current, dropdown, items, target }, index) => (
            <li
              className="navbar-item"
              key={href}
            >
              {dropdown ? (
                <>
                  <button
                    className="navbar-link"
                    type="button"
                    ref={(element) => { dropdownButtonRefs.current[href] = element }}
                    aria-expanded={openDropdown === href}
                    aria-controls={`${dropdownId}-${index}`}
                    onClick={() => {
                      setOpenDropdown((open) => open === href ? null : href)
                      setSelectedService(null)
                    }}
                  >
                    {label}
                    <svg className="navbar-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openDropdown === href && (
                    <ul
                      className={`navbar-services${items ? ' navbar-services--about' : ''}`}
                      id={`${dropdownId}-${index}`}
                      aria-label={`Opciones de ${label}`}
                    >
                      {(items || services.map((service) => ({ id: service.id, label: service.label, description: service.description }))).map((item) => (
                        <li className="navbar-service-item" key={item.id || item.href}>
                          {item.description ? (
                            <button
                              className="navbar-service-button"
                              type="button"
                              aria-expanded={selectedService === item.id}
                              aria-controls={`${dropdownId}-description-${item.id}`}
                              onClick={() => setSelectedService((selected) => selected === item.id ? null : item.id)}
                            >
                              {item.label}
                            </button>
                          ) : item.href ? (
                            <a href={item.href} target={item.target} rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}>
                              {item.label}
                            </a>
                          ) : (
                            <span aria-disabled="true">{item.label}</span>
                          )}
                          {item.description && selectedService === item.id && (
                            <p className="navbar-service-description" id={`${dropdownId}-description-${item.id}`}>
                              {item.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  className="navbar-link"
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  aria-current={current ? 'page' : undefined}
                >
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

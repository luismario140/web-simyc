import { useEffect, useId, useRef, useState } from 'react'
import brandLogo from '../../assets/Logo1.png'
import { services } from '../../config/services.js'
import './Navbar.css'

// NOSOTROS: edita aquí los nombres y los destinos del desplegable.
const aboutLinks = [
  { label: 'Quiénes somos', href: '#quienes-somos' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
]

const defaultLinks = [
  { label: 'Servicios', href: '#servicios', dropdown: true },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros', dropdown: true, items: aboutLinks },
  { label: 'Contacto', href: '#contacto' },
]

// El listado y las tarjetas comparten los textos de src/config/services.js.

function Navbar({ logoSrc = brandLogo, links = defaultLinks }) {
  const [openDropdown, setOpenDropdown] = useState(null)
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
        setMobileOpen(false)
      }
    }
    const closeWithEscape = (event) => {
      if (event.key !== 'Escape') return
      if (openDropdown) {
        setOpenDropdown(null)
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
          if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null)
        }}
        onClick={(event) => {
          if (event.target.closest('a')) {
            setMobileOpen(false)
            setOpenDropdown(null)
          }
        }}
      >
        <ul className="navbar-links">
          {links.map(({ label, href, current, dropdown, items }, index) => (
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
                    onClick={() => setOpenDropdown((open) => open === href ? null : href)}
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
                      aria-label={items ? 'Información sobre nosotros' : 'Servicios de publicidad'}
                    >
                      {(items || services.map((service) => ({ label: service.label, href: `#${service.id}` }))).map((item) => (
                        <li className="navbar-service-item" key={item.href}>
                          <a href={item.href}>
                            {item.label}
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

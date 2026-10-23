import brandLogo from '../../assets/Logo1.png'
import './Navbar.css'

const defaultLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar({ logoSrc = brandLogo, links = defaultLinks }) {
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
          {links.map(({ label, href, current }) => (
            <li key={href}>
              <a href={href} aria-current={current ? 'page' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

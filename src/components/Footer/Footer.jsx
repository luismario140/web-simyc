import brandLogo from '../../assets/Logo1.png'
import { aboutHref, contactLinks, portfolioPdf } from '../../config/navigation.js'
import './Footer.css'

const socialChannels = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" /></>,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: <path d="M15.5 2h-3v13.3a3.3 3.3 0 1 1-2.8-3.26V8.98a6.3 6.3 0 1 0 5.8 6.32V8.1A8.2 8.2 0 0 0 21 10V7a5.5 5.5 0 0 1-5.5-5Z" />,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: <path d="M14 22v-9h3l.5-3H14V8c0-.87.25-1.5 1.5-1.5H18V3.3c-.43-.06-1.9-.3-3.6-.3C10.85 3 9 5.1 9 8v2H6v3h3v9h5Z" />,
  },
  {
    id: 'email',
    label: 'Email',
    icon: <><rect x="2" y="4" width="20" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m3 6 9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></>,
  },
]

function Footer({ socialLinks = {} }) {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href={import.meta.env.BASE_URL} aria-label="SIMYC, ir al inicio">
            <img src={brandLogo} alt="SYMIC" width="220" height="51" />
          </a>
          <p>
            Publicidad digital en pantallas y tótems.
            Conectamos tu marca con las personas.
          </p>
        </div>

        <nav className="footer-navigation" aria-label="Navegación del pie de página">
          <h2>Explora</h2>
          <ul>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href={portfolioPdf} target="_blank" rel="noopener noreferrer">Portafolio</a></li>
            <li><a href={aboutHref}>Nosotros</a></li>
            <li>
              <details className="footer-contact">
                <summary>Contacto</summary>
                <ul aria-label="Opciones de contacto">
                  {contactLinks.map(({ id, label, href, target }) => (
                    <li key={id}>
                      {href ? <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{label}</a> : <span aria-disabled="true">{label}</span>}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </nav>

        <div className="footer-social">
          <h2>Síguenos</h2>
          <ul className="footer-social-links" aria-label="Redes sociales y correo">
            {socialChannels.map(({ id, label, icon }) => {
              const href = socialLinks[id]
              const Element = href ? 'a' : 'span'

              return (
                <li key={id}>
                  <Element
                    className="footer-social-icon"
                    href={href || undefined}
                    aria-label={label}
                    title={label}
                    role={href ? undefined : 'img'}
                    target={href && id !== 'email' ? '_blank' : undefined}
                    rel={href && id !== 'email' ? 'noopener noreferrer' : undefined}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      {icon}
                    </svg>
                  </Element>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SIMYC. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

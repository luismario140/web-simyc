import { services } from '../../config/services.js'
import { whatsappConfig } from '../../config/whatsapp.js'
import './Services.css'

// Iconos de las tarjetas: cada uno corresponde al id de un servicio.
const icons = {
  'simyc-marketing': <><path d="m4 10 12-5v14L4 14zM16 10h3a2 2 0 0 1 0 4h-3M6 15l2 6h3l-2-5M20 4l2-2M21 19l1 1" /></>,
  'simyc-media': <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4m-2-13 5 3-5 3z" /></>,
  'activacion-btl': <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM20 15v6M17 18h6M3 2v4M1 4h4" /></>,
  'simyc-rental': <><rect x="3" y="3" width="13" height="12" rx="2" /><path d="M7 19h5M9.5 15v4" /><rect x="17" y="8" width="5" height="13" rx="1" /><path d="M19 18h1" /></>,
  'simyc-produccion': <><rect x="2" y="7" width="14" height="12" rx="2" /><path d="m16 11 6-3v10l-6-3M6 3h6M9 3v4" /></>,
  'simyc-consulting': <><path d="M8 18H5l-3 3V5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v5M6 7h10M6 11h5" /><circle cx="17" cy="16" r="3" /><path d="m19.2 18.2 2.8 2.8" /></>,
}

function Services() {
  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="services-container">
        {/* ENCABEZADO: cambia aquí el título y la introducción de la sección. */}
        <header className="services-heading">
          <p className="services-eyebrow">Ideas que conectan</p>
          <h2 id="services-title">Nuestros <span>servicios</span></h2>
          <p className="services-introduction">
            De la estrategia a la pantalla: soluciones para crear, proyectar y acercar tu marca a las personas.
          </p>
        </header>

        {/* TARJETAS: sus textos se editan en src/config/services.js. */}
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id} id={service.id} aria-labelledby={`${service.id}-title`}>
              <span className="service-card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {icons[service.id]}
                </svg>
              </span>
              <h3 id={`${service.id}-title`}>{service.label}</h3>
              <p>{service.description}</p>
              {/* CONTACTO: abre una consulta de WhatsApp sobre esta tarjeta. */}
              <a
                className="service-card-link"
                href={`https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(`Hola, quiero conocer más sobre ${service.label}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Consultar sobre ${service.label} por WhatsApp`}
              >
                Consultar servicio <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

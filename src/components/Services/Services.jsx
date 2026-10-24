import ServiceGallery from './ServiceGallery.jsx'
import './Services.css'

function Services() {
  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <div className="services-container">
        {/* ENCABEZADO: cambia aquí el título y la introducción de la sección. */}
        <header className="services-heading">
          {/* ETIQUETA SUPERIOR: texto pequeño sobre el título. */}
          <p className="services-eyebrow">Ideas que conectan</p>
          {/* TÍTULO: lo que está dentro de span lleva el color de énfasis. */}
          <h2 id="services-title">Nuestros <span>servicios</span></h2>
          {/* DESCRIPCIÓN GENERAL: párrafo que presenta los seis servicios. */}
          <p className="services-introduction">
            De la estrategia a la pantalla: soluciones para crear, proyectar y acercar tu marca a las personas.
          </p>
        </header>

        {/* GALERÍA: fila curva de imágenes en movimiento continuo. */}
        <ServiceGallery />
      </div>
    </section>
  )
}

export default Services

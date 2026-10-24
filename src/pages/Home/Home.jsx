import { useEffect, useRef } from 'react'
import Services from '../../components/Services/Services.jsx'
import './Home.css'

// CONTENIDO DE LA PORTADA: modifica estos textos para actualizar lo que se ve sobre la imagen.
const coverContent = {
  // 1. Etiquetas superiores. Los puntos separadores se agregan desde el CSS.
  tags: ['Publicidad', 'Creatividad', 'Logística'],
  // 2. Título: la segunda parte se resalta en amarillo.
  title: 'Hacemos que las marcas se conviertan en',
  highlightedTitle: 'experiencias.',
  // 3. Descripción debajo del título.
  description: 'En SIMYC unimos creatividad, estrategia y tecnología para llevar tu marca más lejos. Somos una agencia integral de publicidad, producción, eventos y soluciones empresariales.',
  // 4. Texto del botón. Su destino es #servicios, la sección debajo de la portada.
  buttonLabel: 'Conoce nuestros servicios',
}

function Home() {
  const heroRef = useRef(null)

  // Movimiento del fondo al desplazarse. No afecta la posición de los textos.
  useEffect(() => {
    const hero = heroRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null

    const updatePosition = () => {
      frame = null
      const { top, height } = hero.getBoundingClientRect()
      const offset = motionPreference.matches
        ? 0
        : Math.min(Math.max(-top, 0) * 0.22, height * 0.16)

      hero.style.setProperty('--background-offset', `${-offset}px`)
    }

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updatePosition)
    }

    updatePosition()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    motionPreference.addEventListener('change', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      motionPreference.removeEventListener('change', scheduleUpdate)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="home">
      <section className="home-cover" ref={heroRef} aria-labelledby="cover-title">
        {/* Imagen decorativa: cambia el archivo y su encuadre en Home.css. */}
        <div className="home-cover-image" aria-hidden="true" />

        <div className="home-cover-content">
          {/* Etiquetas: edita la lista tags en coverContent, arriba. */}
          <ul className="home-cover-tags" aria-label="Soluciones de publicidad">
            {coverContent.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>

          {/* Título: highlightedTitle es la parte que lleva otro color. */}
          <h1 className="home-cover-title" id="cover-title">
            {coverContent.title} <span>{coverContent.highlightedTitle}</span>
          </h1>

          {/* Descripción: edita description en coverContent. */}
          <p className="home-cover-description">{coverContent.description}</p>

          {/* Botón: baja a Nuestros servicios en esta misma página. */}
          <a className="home-cover-button" href="#servicios">
            {coverContent.buttonLabel}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      {/* Sección de servicios: tarjetas y estilos en src/components/Services/. */}
      <Services />
    </div>
  )
}

export default Home

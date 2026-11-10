import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import './Reviews.css'

// Se ordenan por nombre: 01.jpeg → 12.jpeg.
const photos = Object.entries(import.meta.glob('../../assets/imgresenas/*.jpeg', {
  eager: true,
  query: '?url',
  import: 'default',
})).sort(([a], [b]) => a.localeCompare(b)).map(([, src]) => src)

const subscribeToMotion = (callback) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const wrap = (index) => (index + photos.length) % photos.length

function Reviews() {
  const [active, setActive] = useState(0)
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, () => false)
  const carouselRef = useRef(null)

  useEffect(() => {
    if (reducedMotion || photos.length < 2) return
    // AVANCE AUTOMÁTICO: una fotografía cada 4,5 segundos, solo a la vista.
    let visible = false
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(carouselRef.current)
    const timer = window.setInterval(() => {
      if (visible && !document.hidden) setActive((index) => wrap(index + 1))
    }, 4500)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [reducedMotion])

  return (
    <article className="reviews-page" aria-labelledby="reviews-title">
      <header className="reviews-heading">
        <p className="reviews-eyebrow">Momentos que nos conectan</p>
        <h1 id="reviews-title">Reseñas</h1>
        <p className="reviews-story">
          Simyc vivió un momento muy especial en su primera aparición en público durante el evento Corriendo por Istmina.
          Una experiencia llena de alegría, emoción y conexión con la comunidad, donde dimos a conocer nuestra esencia
          y compartimos con todos los asistentes. <strong>¡Este es solo el comienzo de grandes momentos que viviremos juntos!</strong>
        </p>
      </header>

      <section className="reviews-carousel" ref={carouselRef} role="region" aria-roledescription="carrusel"
        aria-label="Fotografías de Corriendo por Istmina">
        <div className="reviews-stage">
          {photos.map((src, index) => {
            const offset = wrap(index - active + Math.floor(photos.length / 2)) - Math.floor(photos.length / 2)
            const distance = Math.abs(offset)
            return (
              <figure className={`reviews-slide${distance === 0 ? ' is-active' : ''}`} key={src}
                role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${photos.length}`}
                aria-hidden={distance !== 0}
                style={{ '--offset': offset, '--distance': distance, zIndex: photos.length - distance, visibility: distance > 2 ? 'hidden' : 'visible' }}>
                <div className="reviews-photo">
                  <img src={src} alt={`SIMYC en el evento Corriendo por Istmina, fotografía ${index + 1}`}
                    loading={distance <= 2 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                </div>
              </figure>
            )
          })}
        </div>

        <p className="reviews-caption">Corriendo por Istmina <span aria-hidden="true">·</span> Nuestro primer encuentro con la comunidad</p>
      </section>
    </article>
  )
}

export default Reviews

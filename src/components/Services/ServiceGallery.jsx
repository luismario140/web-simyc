import { useContext, useEffect, useRef } from 'react'
import serviceBackground from '../../assets/optimized/fondo.webp'
import { services } from '../../config/services.js'
import { ServiceInquiryContext } from '../ServiceInquiry/ServiceInquiryContext.js'
import './ServiceGallery.css'

// Repetimos las imágenes para que el recorrido no tenga un principio ni un final visible.
const galleryItems = Array.from({ length: 3 }, () => services).flat()
const imagePositions = ['15% 50%', '65% 45%', '85% 75%', '60% 80%', '90% 20%', '25% 25%']

function ServiceGallery() {
  const openInquiry = useContext(ServiceInquiryContext)
  const stageRef = useRef(null)
  const distanceRef = useRef(0)

  useEffect(() => {
    const stage = stageRef.current
    const tiles = [...stage.querySelectorAll('.service-gallery-tile')]
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null
    let previousTime = 0
    let isVisible = false
    let pointerInside = false
    let focusInside = false
    let width = 1
    let step = 1

    // ANIMACIÓN: velocidad en píxeles por segundo y profundidad máxima de los bordes.
    const speed = 36
    const depth = 130
    const curvature = 44

    const draw = () => {
      if (motionPreference.matches) {
        tiles.forEach((tile) => {
          tile.style.removeProperty('transform')
          tile.style.removeProperty('visibility')
        })
        return
      }

      const length = step * tiles.length
      tiles.forEach((tile, index) => {
        const position = index * step - distanceRef.current
        const x = ((position + length / 2) % length + length) % length - length / 2
        const edge = Math.max(-1.25, Math.min(1.25, x / (width / 2)))
        // El centro queda más atrás; los laterales se acercan al espectador.
        const y = -edge * edge * curvature
        const z = edge * edge * depth
        tile.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateX(-8deg) rotateY(${-edge * 28}deg) rotateZ(${edge * 5}deg)`
        // Los seis originales siguen disponibles para teclado y lectores de pantalla.
        tile.style.visibility = index < services.length || Math.abs(x) < width / 2 + step * 2 ? 'visible' : 'hidden'
      })
      // El enfoque de una imagen no debe desplazar internamente la fila 3D.
      stage.scrollLeft = 0
      stage.scrollTop = 0
    }

    const canAnimate = () => isVisible && !pointerInside && !focusInside && !document.hidden && !motionPreference.matches

    const tick = (time) => {
      frame = null
      if (!canAnimate()) return
      const elapsed = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      distanceRef.current = (distanceRef.current + elapsed * speed) % (step * tiles.length)
      draw()
      frame = window.requestAnimationFrame(tick)
    }

    const syncAnimation = () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      previousTime = performance.now()
      draw()
      if (canAnimate()) frame = window.requestAnimationFrame(tick)
    }

    const measure = () => {
      width = Math.max(stage.clientWidth, 1)
      const gap = parseFloat(getComputedStyle(stage).getPropertyValue('--gallery-gap')) || 18
      const nextStep = Math.max(tiles[0].offsetWidth + gap, 1)
      if (step > 1) distanceRef.current = distanceRef.current / step * nextStep
      step = nextStep
      syncAnimation()
    }

    const pauseOnHover = (event) => {
      if (event.pointerType === 'touch') return
      pointerInside = true
      syncAnimation()
    }
    const resumeOnLeave = () => {
      pointerInside = false
      syncAnimation()
    }

    const focusService = (event) => {
      focusInside = true
      const tile = event.target.closest('.service-gallery-tile')
      // Centrar solo al navegar con teclado evita mover la imagen durante un clic.
      if (tile && event.target.matches(':focus-visible') && !motionPreference.matches) {
        distanceRef.current = Number(tile.dataset.index) * step
      }
      syncAnimation()
    }
    const releaseFocus = (event) => {
      if (stage.contains(event.relatedTarget)) return
      focusInside = false
      syncAnimation()
    }

    // Conserva el centrado de la galería al entrar desde un enlace directo al servicio.
    const navigateToService = () => {
      const index = services.findIndex((service) => `#${service.id}` === window.location.hash)
      if (index < 0) return
      if (motionPreference.matches) {
        tiles[index].scrollIntoView({ block: 'center', inline: 'center' })
      } else {
        distanceRef.current = index * step
        syncAnimation()
        stage.scrollIntoView({ block: 'center', inline: 'nearest' })
      }
    }

    const followServiceLink = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const hash = link.getAttribute('href')
      if (!services.some((service) => `#${service.id}` === hash)) return
      event.preventDefault()
      if (window.location.hash !== hash) window.history.pushState(null, '', hash)
      // También centra el servicio al pulsar un enlace cuyo hash ya estaba seleccionado.
      navigateToService()
    }

    const resizeObserver = new ResizeObserver(measure)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      syncAnimation()
    })

    measure()
    resizeObserver.observe(stage)
    visibilityObserver.observe(stage)
    stage.addEventListener('pointerenter', pauseOnHover)
    stage.addEventListener('pointerleave', resumeOnLeave)
    stage.addEventListener('focusin', focusService)
    stage.addEventListener('focusout', releaseFocus)
    window.addEventListener('hashchange', navigateToService)
    document.addEventListener('click', followServiceLink)
    document.addEventListener('visibilitychange', syncAnimation)
    motionPreference.addEventListener('change', measure)
    navigateToService()

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      stage.removeEventListener('pointerenter', pauseOnHover)
      stage.removeEventListener('pointerleave', resumeOnLeave)
      stage.removeEventListener('focusin', focusService)
      stage.removeEventListener('focusout', releaseFocus)
      window.removeEventListener('hashchange', navigateToService)
      document.removeEventListener('click', followServiceLink)
      document.removeEventListener('visibilitychange', syncAnimation)
      motionPreference.removeEventListener('change', measure)
    }
  }, [])

  return (
    <div className="service-gallery">
      {/* Los seis originales tienen destinos y enlaces accesibles.
          Las copias mantienen el recorrido infinito sin repetir paradas de teclado. */}
      <div className="service-gallery-stage" ref={stageRef} role="list" aria-label="Servicios de SIMYC">
        {galleryItems.map((service, index) => (
          <div
            className="service-gallery-tile"
            key={`${service.id}-${index}`}
            id={index < services.length ? service.id : undefined}
            data-index={index}
            role="listitem"
            aria-hidden={index >= services.length ? true : undefined}
          >
            <a
              className="service-gallery-link"
              href={`#${service.id}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                event.preventDefault()
                openInquiry(service.id)
              }}
              tabIndex={index >= services.length ? -1 : undefined}
              aria-label={`${service.label}: ${service.description} Abrir formulario de consulta.`}
            >
            {/* IMÁGENES: agrega image e imagePosition al servicio en src/config/services.js.
                Sin imagen propia se reutiliza fondo.jpg con un encuadre diferente. */}
            <img
              src={service.image || serviceBackground}
              style={{ objectPosition: service.imagePosition || imagePositions[index % imagePositions.length] }}
              alt=""
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            <span className="service-gallery-number">{String(index % services.length + 1).padStart(2, '0')}</span>
            <div className="service-gallery-caption">
              <span>{service.label}</span>
            </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceGallery

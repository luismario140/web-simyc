import { useEffect, useRef } from 'react'
import './NeuralBackground.css'

// Fondo decorativo: no recibe clics y no aparece en los lectores de pantalla.
function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 1
    let height = 1
    let nodes = []
    let frame = null
    let visible = false
    let previousTime = 0
    let elapsed = 0

    // ANIMACIÓN: ajusta velocidad, distancia de conexión y cantidad de nodos aquí.
    const speed = 0.22
    const draw = () => {
      context.clearRect(0, 0, width, height)
      const reach = width < 600 ? 170 : 240
      nodes.forEach((node) => {
        node.x = node.baseX * width + Math.sin(elapsed * speed + node.phase) * 22
        node.y = node.baseY * height + Math.cos(elapsed * speed * 0.7 + node.phase) * 20
      })

      nodes.forEach((node, index) => {
        for (let next = index + 1; next < nodes.length; next++) {
          const other = nodes[next]
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance > reach) continue
          const opacity = (1 - distance / reach) * 0.32
          context.strokeStyle = `rgba(216, 214, 243, ${opacity})`
          context.lineWidth = 0.8
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(other.x, other.y)
          context.stroke()

          // Impulsos dorados que recorren algunas conexiones como señales digitales.
          if ((index + next) % 5 === 0) {
            const progress = (elapsed * 0.13 + node.phase / (Math.PI * 2)) % 1
            context.fillStyle = `rgba(244, 178, 35, ${(1 - distance / reach) * 0.85})`
            context.beginPath()
            context.arc(node.x + (other.x - node.x) * progress, node.y + (other.y - node.y) * progress, 1.8, 0, Math.PI * 2)
            context.fill()
          }
        }

        const pulse = 0.65 + Math.sin(elapsed * 0.8 + node.phase) * 0.2
        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12)
        glow.addColorStop(0, `rgba(244, 178, 35, ${pulse * 0.24})`)
        glow.addColorStop(1, 'rgba(244, 178, 35, 0)')
        context.fillStyle = glow
        context.fillRect(node.x - 12, node.y - 12, 24, 24)
        context.fillStyle = index % 4 === 0 ? `rgba(244, 178, 35, ${pulse})` : `rgba(225, 223, 248, ${pulse * 0.7})`
        context.beginPath()
        context.arc(node.x, node.y, index % 4 === 0 ? 2.3 : 1.6, 0, Math.PI * 2)
        context.fill()
      })
    }

    const canAnimate = () => visible && !document.hidden && !motionPreference.matches
    const tick = (time) => {
      frame = null
      if (!canAnimate()) return
      // Máximo 30 cuadros por segundo para mantener el fondo liviano.
      if (time - previousTime >= 1000 / 30) {
        elapsed += Math.min((time - previousTime) / 1000, 0.1)
        previousTime = time
        draw()
      }
      frame = window.requestAnimationFrame(tick)
    }
    const syncAnimation = () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      previousTime = performance.now()
      draw()
      if (canAnimate()) frame = window.requestAnimationFrame(tick)
    }

    const resize = () => {
      width = Math.max(1, canvas.clientWidth)
      height = Math.max(1, canvas.clientHeight)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const count = Math.min(width < 600 ? 32 : 72, Math.max(24, Math.round(width * height / 18000)))
      const columns = Math.ceil(Math.sqrt(count * width / height))
      const rows = Math.ceil(count / columns)
      nodes = Array.from({ length: count }, (_, index) => ({
        baseX: ((index % columns) + 0.25 + Math.random() * 0.5) / columns,
        baseY: (Math.floor(index / columns) + 0.25 + Math.random() * 0.5) / rows,
        phase: Math.random() * Math.PI * 2,
      }))
      syncAnimation()
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncAnimation()
    })
    resize()
    resizeObserver.observe(canvas)
    visibilityObserver.observe(canvas)
    document.addEventListener('visibilitychange', syncAnimation)
    motionPreference.addEventListener('change', syncAnimation)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', syncAnimation)
      motionPreference.removeEventListener('change', syncAnimation)
    }
  }, [])

  return <div className="neural-background" aria-hidden="true"><canvas ref={canvasRef} /></div>
}

export default NeuralBackground

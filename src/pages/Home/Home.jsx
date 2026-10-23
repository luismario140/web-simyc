import { useEffect, useRef } from 'react'
import './Home.css'

function Home() {
  const heroRef = useRef(null)

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
      <div className="home-cover" ref={heroRef} aria-hidden="true">
        <div className="home-cover-image" />
      </div>
    </div>
  )
}

export default Home

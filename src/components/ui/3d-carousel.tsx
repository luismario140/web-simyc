"use client"

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion'
import type { MotionValue, PanInfo } from 'framer-motion'
import { CircuitBoard, Fingerprint, MapPin, Network, Radio, Users, X, Expand } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import resource from '../../assets/imgrecurses/recurso3.png'
import './3d-carousel.css'

export type CarouselCard = { id: string; title: string; description: string }
type CarouselProps = { cards: CarouselCard[]; label?: string }

// ICONOS: se asocian al id del contenido en src/config/about.js.
const icons: Record<string, LucideIcon> = {
  'que-somos': Network,
  'que-hacemos': Radio,
  'para-quien': Users,
  diferencial: Fingerprint,
  territorio: MapPin,
  promesa: CircuitBoard,
}
const wrap = (index: number, length: number) => ((index % length) + length) % length
const subscribeToMobile = (callback: () => void) => {
  const query = window.matchMedia('(max-width: 640px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getMobile = () => window.matchMedia('(max-width: 640px)').matches

function CardArtwork({ card, titleId }: { card: CarouselCard; titleId?: string }) {
  const Icon = icons[card.id] || Network
  return (
    <>
      <img className="simyc-carousel-watermark" src={resource} alt="" draggable={false} aria-hidden="true" />
      <div className="simyc-carousel-card-brand" aria-hidden="true"><span>SIMYC</span><span className="simyc-carousel-signal" /></div>
      <span className="simyc-carousel-icon" aria-hidden="true"><Icon size={34} strokeWidth={1.35} /></span>
      <h3 id={titleId}>{card.title}</h3>
      <p>{card.description}</p>
    </>
  )
}

function CarouselFace({ card, index, step, radius, rotation, active, onSelect, onOpen }: {
  card: CarouselCard; index: number; step: number; radius: number; rotation: MotionValue<number>
  active: boolean; onSelect: () => void; onOpen: () => void
}) {
  const opacity = useTransform(rotation, (value) => {
    const angle = ((index * step + value + 180) % 360 + 360) % 360 - 180
    return Math.max(0.12, (Math.cos(angle * Math.PI / 180) + 1) / 2)
  })
  return (
    <motion.div className="simyc-carousel-face" style={{ transform: `rotateY(${index * step}deg) translateZ(${radius}px)`, opacity }} aria-hidden={!active}>
      <button className={`simyc-carousel-card${active ? ' is-active' : ''}`} type="button" tabIndex={active ? 0 : -1}
        aria-label={`Ver detalle de ${card.title}`} onClick={active ? onOpen : onSelect}>
        <CardArtwork card={card} />
        <span className="simyc-carousel-card-footer"><span>Te conecta</span><Expand size={16} aria-hidden="true" /></span>
      </button>
    </motion.div>
  )
}

// Carrusel cilíndrico: giro automático lento y control manual con mouse, dedo o teclado.
// El contenido se recibe por props; no contiene imágenes ni textos de muestra.
export function ThreeDPhotoCarousel({ cards, label = 'SIMYC en una mirada' }: CarouselProps) {
  const mobile = useSyncExternalStore(subscribeToMobile, getMobile, () => false)
  const reducedMotion = useReducedMotion()
  const rotation = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [detail, setDetail] = useState<CarouselCard | null>(null)
  const [paused, setPaused] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const resumeTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const lastActiveIndex = useRef(0)
  const dragStart = useRef(0)
  const dragged = useRef(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const detailTitleId = useId()
  const instructionsId = useId()
  // TAMAÑO Y PROFUNDIDAD: radios diferentes para celular y escritorio.
  const radius = mobile ? 260 : 385
  const step = 360 / Math.max(cards.length, 1)
  const transform = useTransform(rotation, (value) => `translateZ(${-radius}px) rotateY(${value}deg)`)

  // La tarjeta destacada sigue el giro real sin volver a renderizar en cada cuadro.
  useMotionValueEvent(rotation, 'change', (value) => {
    const next = wrap(-Math.round(value / step), Math.max(cards.length, 1))
    if (next !== lastActiveIndex.current) {
      lastActiveIndex.current = next
      setActiveIndex(next)
    }
  })

  useEffect(() => () => {
    animationRef.current?.stop()
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || paused || keyboardFocus || detail || reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches || cards.length < 2) return
    // VELOCIDAD AUTOMÁTICA: grados por segundo. 5 equivale a una vuelta cada 72 segundos.
    const speed = 5
    let autoplay: ReturnType<typeof animate> | null = null
    let visible = false
    const sync = () => {
      autoplay?.stop()
      autoplay = null
      if (visible && !document.hidden) {
        autoplay = animate(rotation, rotation.get() - 360, { duration: 360 / speed, ease: 'linear', repeat: Infinity })
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(stage)
    document.addEventListener('visibilitychange', sync)
    return () => {
      autoplay?.stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [paused, keyboardFocus, detail, reducedMotion, rotation, cards.length])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!detail || !dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [detail])

  const turnTo = (target: number) => {
    animationRef.current?.stop()
    const snapped = Math.round(target / step) * step
    if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rotation.set(snapped)
    } else {
      animationRef.current = animate(rotation, snapped, { type: 'spring', stiffness: 100, damping: 24, mass: 0.85 })
    }
  }
  const pauseAutoplay = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current)
    animationRef.current?.stop()
    setPaused(true)
  }
  const resumeAutoplayLater = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current)
    // PAUSA TRAS ARRASTRAR: tiempo para leer la tarjeta antes de retomar el giro.
    resumeTimer.current = window.setTimeout(() => setPaused(false), 3500)
  }
  const move = (direction: number) => turnTo(Math.round(rotation.get() / step) * step - direction * step)
  const select = (index: number) => {
    const current = -rotation.get() / step
    const offset = wrap(index - wrap(Math.round(current), cards.length) + cards.length / 2, cards.length) - cards.length / 2
    turnTo(-(Math.round(current) + offset) * step)
  }
  const onKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (detail) return
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      pauseAutoplay()
      event.currentTarget.focus({ preventScroll: true })
      move(event.key === 'ArrowRight' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      pauseAutoplay()
      event.currentTarget.focus({ preventScroll: true })
      select(event.key === 'Home' ? 0 : cards.length - 1)
    }
  }
  const onPan = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 6 || Math.abs(info.offset.y) > Math.abs(info.offset.x)) return
    dragged.current = true
    // offset se aplica desde el inicio del gesto, no se acumula en cada cuadro.
    rotation.set(dragStart.current + info.offset.x * (mobile ? 0.23 : 0.16))
  }

  if (!cards.length) return null

  return (
    <div className="simyc-carousel relative w-full" role="region" aria-roledescription="carrusel" aria-label={label} aria-describedby={instructionsId} tabIndex={0} onKeyDown={onKeyboard}
      data-autoplay={paused ? 'paused' : keyboardFocus ? 'keyboard' : detail ? 'detail' : reducedMotion ? 'reduced' : 'running'}
      onFocusCapture={(event) => { if (event.target.matches(':focus-visible')) setKeyboardFocus(true) }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setKeyboardFocus(false)
          resumeAutoplayLater()
        }
      }}>
      <span className="simyc-carousel-instructions" id={instructionsId}>Giro automático. Arrastra con el mouse o el dedo para detener y mover las tarjetas. Con teclado, usa las flechas izquierda y derecha.</span>
      <motion.div className="simyc-carousel-stage" ref={stageRef} style={{ '--carousel-radius': `${radius}px` } as CSSProperties}
        onPointerDownCapture={pauseAutoplay}
        onPointerUpCapture={resumeAutoplayLater}
        onPointerCancel={resumeAutoplayLater}
        onPanStart={() => { animationRef.current?.stop(); dragStart.current = rotation.get(); dragged.current = false }}
        onPan={onPan}
        onPanEnd={(_event, info) => {
          resumeAutoplayLater()
          if (!dragged.current) return
          const inertia = Math.max(-step, Math.min(step, info.velocity.x * 0.065))
          turnTo(rotation.get() + inertia)
          // Evita abrir una tarjeta por el clic que genera el final de un arrastre.
          window.setTimeout(() => { dragged.current = false }, 0)
        }}
        onClickCapture={(event) => { if (dragged.current) { event.preventDefault(); event.stopPropagation() } }}>
        <div className="simyc-carousel-halo" aria-hidden="true" />
        <motion.div className="simyc-carousel-cylinder" style={{ transform }}>
          {cards.map((card, index) => <CarouselFace key={card.id} card={card} index={index} step={step} radius={radius} rotation={rotation}
            active={index === activeIndex} onSelect={() => select(index)} onOpen={() => setDetail(card)} />)}
        </motion.div>
        <div className="simyc-carousel-orbit" aria-hidden="true" />
      </motion.div>
      <p className="simyc-carousel-caption" aria-live={paused || keyboardFocus || reducedMotion ? 'polite' : 'off'} aria-atomic="true">{cards[activeIndex]?.title}</p>
      <dialog className="simyc-carousel-dialog" ref={dialogRef} aria-labelledby={detailTitleId}
        onCancel={() => setDetail(null)} onClose={() => setDetail(null)} onClick={(event) => { if (event.target === event.currentTarget) setDetail(null) }}>
        {detail && <motion.div className="simyc-carousel-detail" initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94 }} animate={{ opacity: 1, scale: 1 }}>
          <button className="simyc-carousel-close" type="button" aria-label="Cerrar detalle" autoFocus onClick={() => setDetail(null)}><X size={22} aria-hidden="true" /></button>
          <CardArtwork card={detail} titleId={detailTitleId} />
        </motion.div>}
      </dialog>
    </div>
  )
}

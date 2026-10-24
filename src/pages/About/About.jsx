import { aboutContent } from '../../config/about.js'
import NeuralBackground from '../../components/NeuralBackground/NeuralBackground.jsx'
import resource1 from '../../assets/imgrecurses/recurso1.png'
import resource2 from '../../assets/imgrecurses/recurso2.png'
import resource3 from '../../assets/imgrecurses/recurso3.png'
import resource4 from '../../assets/imgrecurses/recurso4.png'
import './About.css'

const backgroundResources = [resource1, resource2, resource3, resource4]

function About() {
  return (
    <article className="about-page" aria-labelledby="about-title">
      {/* RECURSOS DECORATIVOS: detrás de la red y del contenido.
          Posición, tamaño y opacidad de cada imagen se ajustan en About.css. */}
      <div className="about-background-resources" aria-hidden="true">
        {backgroundResources.map((src, index) => (
          <img className={`about-background-resource about-background-resource--${index + 1}`} key={src} src={src} alt="" decoding="async" draggable={false} />
        ))}
      </div>
      <NeuralBackground />
      <div className="about-content">
        <p className="about-eyebrow">Nosotros</p>
        <h1 id="about-title">{aboutContent.title}</h1>
        {/* ESCALERA: el CSS alterna los lados; en celular conserva el orden texto → imagen.
            Textos, imágenes y encuadres se editan en src/config/about.js. */}
        <div className="about-sections">
          {aboutContent.sections.map(({ id, title, paragraphs, image, imageAlt, imagePosition }) => (
            <section className="about-section" key={id} aria-labelledby={`about-${id}`}>
              <div className="about-section-copy">
                <h2 id={`about-${id}`}>{title}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {/* Sin foto, queda un fondo decorativo sin textos ni iconos de ejemplo. */}
              <div className={`about-section-media${image ? '' : ' is-empty'}`} aria-hidden={!image || undefined}>
                {image && <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} loading="lazy" decoding="async" />}
              </div>
            </section>
          ))}
        </div>
        {/* SIMYC EN UNA MIRADA: título central y dos columnas de tres cards.
            Edita sus títulos y descripciones en overview, dentro de src/config/about.js. */}
        <section className="about-overview" aria-labelledby="about-overview-title">
          <div className="about-overview-heading">
            <h2 id="about-overview-title">{aboutContent.overview.title}</h2>
            <p>{aboutContent.overview.description}</p>
          </div>
          {[0, 1].map((side) => (
            <ul className={`about-overview-cards about-overview-cards--${side === 0 ? 'left' : 'right'}`} key={side}>
              {aboutContent.overview.cards.slice(side * 3, side * 3 + 3).map(({ id, title, description }) => (
                <li className="about-overview-card" key={id}>
                  <span className="about-overview-dot" aria-hidden="true" />
                  <h3>{title}</h3>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
          ))}
        </section>
      </div>
    </article>
  )
}

export default About

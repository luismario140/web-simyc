import { aboutContent } from '../../config/about.js'
import './About.css'

function About() {
  return (
    <article className="about-page" aria-labelledby="about-title">
      <div className="about-content">
        <p className="about-eyebrow">Nosotros</p>
        <h1 id="about-title">{aboutContent.title}</h1>
        {/* ESCALERA: el CSS alterna los lados; en celular conserva el orden texto → imagen.
            Textos, imágenes y encuadres se editan en src/config/about.js. */}
        <div className="about-sections">
          {aboutContent.sections.map(({ id, title, paragraphs, image, imageAlt, imagePosition }, index) => (
            <section className="about-section" key={id} aria-labelledby={`about-${id}`}>
              <div className="about-section-copy">
                <span className="about-section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
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
              {aboutContent.overview.cards.slice(side * 3, side * 3 + 3).map(({ id, title, description }, index) => (
                <li className="about-overview-card" key={id}>
                  <span className="about-overview-number" aria-hidden="true">{String(side * 3 + index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
          ))}
        </section>
        <a className="about-services-link" href="#servicios">Conoce nuestros servicios <span aria-hidden="true">→</span></a>
      </div>
    </article>
  )
}

export default About

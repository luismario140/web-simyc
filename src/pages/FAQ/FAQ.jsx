import { ArrowUpRight, ChevronDown, CircleHelp, Mail, MessageCircle } from 'lucide-react'
import NeuralBackground from '../../components/NeuralBackground/NeuralBackground.jsx'
import { faqContent } from '../../config/faq.js'
import { socialLinks } from '../../config/navigation.js'
import { services } from '../../config/services.js'
import { whatsappConfig } from '../../config/whatsapp.js'
import resource1 from '../../assets/imgrecurses/recurso1.png'
import resource2 from '../../assets/imgrecurses/recurso2.png'
import resource3 from '../../assets/imgrecurses/recurso3.png'
import resource4 from '../../assets/imgrecurses/recurso4.png'
import './FAQ.css'

const backgroundResources = [resource1, resource2, resource3, resource4]

function FAQ() {
  function handleQuestionSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name').trim()
    const company = data.get('company').trim()
    const service = data.get('service')
    const question = data.get('question').trim()

    if (!question) {
      const field = form.elements.namedItem('question')
      field.setCustomValidity('Escribe tu consulta para continuar.')
      field.reportValidity()
      return
    }

    const message = [
      'Hola, tengo una consulta desde la página de preguntas frecuentes de SIMYC.',
      '',
      `Nombre: ${name}`,
      ...(company ? [`Empresa: ${company}`] : []),
      `Servicio: ${service}`,
      '',
      `Consulta: ${question}`,
    ].join('\n')

    window.open(`https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="faq-page" aria-labelledby="faq-title">
      {/* RECURSOS: ajusta posición, tamaño y opacidad en FAQ.css.
          Las tres capas son recursos, red neuronal y contenido. */}
      <div className="faq-background-resources" aria-hidden="true">
        {backgroundResources.map((src, index) => (
          <img className={`faq-background-resource faq-background-resource--${index + 1}`} key={src} src={src} alt="" decoding="async" draggable={false} />
        ))}
      </div>
      <NeuralBackground />
      <div className="faq-content">
        <header className="faq-heading">
          <p className="faq-eyebrow">Nosotros</p>
          <h1 id="faq-title">{faqContent.title}</h1>
          <p className="faq-introduction">{faqContent.description}</p>
        </header>
        <div className="faq-layout">
          {/* PREGUNTAS Y RESPUESTAS: edita src/config/faq.js.
              El acordeón nativo funciona con clic, toque, Enter y Espacio. */}
          <div className="faq-questions">
            {faqContent.questions.map(({ id, question, paragraphs, items, link }) => (
              <div className="faq-card" key={id}>
                <details className="faq-item" name="simyc-faq">
                  <summary>
                    <h2>{question}</h2>
                    <ChevronDown size={20} strokeWidth={1.6} aria-hidden="true" />
                  </summary>
                  <div className="faq-answer">
                    {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {items && <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>}
                    {link && <a href={link.href} target={link.target} rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}>
                      {link.label}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>}
                  </div>
                </details>
              </div>
            ))}
          </div>
          <aside className="faq-contact" aria-labelledby="faq-contact-title">
            <span className="faq-contact-icon" aria-hidden="true"><CircleHelp size={30} strokeWidth={1.4} /></span>
            <h2 id="faq-contact-title">{faqContent.contactTitle}</h2>
            <p>{faqContent.contactDescription}</p>
            <form className="faq-contact-form" onSubmit={handleQuestionSubmit}>
              <label htmlFor="faq-name">Nombre <span aria-hidden="true">*</span></label>
              <input id="faq-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" title="Escribe tu nombre." />
              <label htmlFor="faq-company">Empresa <span className="faq-field-optional">(opcional)</span></label>
              <input id="faq-company" name="company" autoComplete="organization" maxLength={120} />
              <label htmlFor="faq-service">Servicio de interés <span aria-hidden="true">*</span></label>
              <select id="faq-service" name="service" required defaultValue="">
                <option value="" disabled>Selecciona una opción</option>
                {services.map(({ id, label }) => <option key={id} value={label}>{label}</option>)}
                <option value="Consulta general">Consulta general / No estoy seguro</option>
              </select>
              <label htmlFor="faq-question">Tu consulta <span aria-hidden="true">*</span></label>
              <textarea id="faq-question" name="question" rows={4} required maxLength={1500} placeholder="Cuéntanos qué necesitas y los detalles de tu proyecto." onInput={(event) => event.currentTarget.setCustomValidity('')} />
              <p className="faq-form-note" id="faq-form-note">Los campos con * son obligatorios. Al continuar, tus respuestas se compartirán con WhatsApp mediante un enlace para preparar el mensaje; allí confirmarás el envío al chat. No incluyas contraseñas, documentos de identidad ni información sensible.</p>
              <button className="faq-whatsapp" type="submit" aria-describedby="faq-form-note">
                <MessageCircle size={19} aria-hidden="true" /> Continuar a WhatsApp
              </button>
            </form>
            <a className="faq-email" href={socialLinks.email}><Mail size={18} aria-hidden="true" /> Envíanos un correo</a>
          </aside>
        </div>
      </div>
    </article>
  )
}

export default FAQ

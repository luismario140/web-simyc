import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { serviceInquiries, buildServiceInquiryMessage } from '../../config/serviceInquiries.js'
import { whatsappConfig } from '../../config/whatsapp.js'
import './ServiceInquiryDialog.css'

function InquiryField({ field }) {
  const { name, label, type = 'text', options, required, placeholder } = field
  const id = `inquiry-${name}`
  const attributes = { id, name, required, defaultValue: '', 'aria-required': required || undefined }
  return (
    <div className={`inquiry-field${type === 'textarea' ? ' inquiry-field--wide' : ''}`}>
      <label htmlFor={id}>{label} {required ? <span aria-hidden="true">*</span> : <span className="inquiry-optional">(opcional)</span>}</label>
      {options ? (
        <select {...attributes}>
          <option value="" disabled>Selecciona una opción</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...attributes} rows={3} maxLength={1000} placeholder={placeholder} />
      ) : (
        <input {...attributes} type={type} maxLength={200} placeholder={placeholder} autoComplete={name === 'name' ? 'name' : name === 'company' ? 'organization' : undefined} />
      )}
    </div>
  )
}

function ServiceInquiryDialog({ service, triggerRef, onClose }) {
  const dialogRef = useRef(null)
  const fields = serviceInquiries[service.id]

  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      // Las opciones del desplegable se desmontan al seleccionarlas.
      const fallback = document.querySelector('.navbar-toggle[aria-expanded="false"]')
      const returnTarget = trigger?.isConnected ? trigger : (fallback?.getClientRects().length ? fallback : document.querySelector('.navbar-link'))
      returnTarget?.focus({ preventScroll: true })
    }
  }, [triggerRef])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    for (const field of form.querySelectorAll('[required]')) {
      if (!field.value.trim()) {
        field.setCustomValidity('Completa este campo para continuar.')
        field.reportValidity()
        return
      }
    }
    const message = buildServiceInquiryMessage(service, fields, new FormData(form))
    window.open(`https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  function handleDialogKeyDown(event) {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll('button, input, select, textarea')].filter((control) => !control.disabled)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog className="service-inquiry-dialog" ref={dialogRef} aria-labelledby="inquiry-title" aria-describedby="inquiry-description" onCancel={onClose} onKeyDown={handleDialogKeyDown} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="inquiry-panel">
        <button className="inquiry-close" type="button" onClick={onClose} aria-label="Cerrar formulario"><X size={22} aria-hidden="true" /></button>
        <header className="inquiry-header">
          <p className="inquiry-eyebrow">Hablemos de tu proyecto</p>
          <h2 id="inquiry-title">{service.label}</h2>
          <p id="inquiry-description">{service.description}</p>
        </header>
        <form onSubmit={handleSubmit} onInput={(event) => event.target.setCustomValidity?.('')}>
          <p className="inquiry-required-note">Los campos con * son obligatorios.</p>
          <fieldset>
            <legend><span aria-hidden="true">01</span> Cuéntanos quién eres</legend>
            <div className="inquiry-fields">
              <InquiryField field={{ name: 'name', label: 'Tu nombre', required: true }} />
              <InquiryField field={{ name: 'company', label: 'Empresa o marca' }} />
            </div>
          </fieldset>
          <fieldset>
            <legend><span aria-hidden="true">02</span> Lo que tienes en mente</legend>
            <div className="inquiry-fields">
              {fields.map((field) => <InquiryField key={field.name} field={field} />)}
            </div>
          </fieldset>
          <fieldset>
            <legend><span aria-hidden="true">03</span> Los últimos detalles</legend>
            <div className="inquiry-fields">
              <InquiryField field={{ name: 'budget', label: 'Presupuesto aproximado', placeholder: 'Valor y moneda, o por definir' }} />
              <InquiryField field={{ name: 'details', label: '¿Algo más que debamos saber?', type: 'textarea', placeholder: 'Referencias, necesidades especiales o preguntas' }} />
            </div>
          </fieldset>
          <footer className="inquiry-footer">
            <p id="inquiry-send-note">Al continuar, tus respuestas se compartirán con WhatsApp mediante un enlace para preparar el mensaje. Allí podrás revisarlo y confirmar el envío al chat. No incluyas contraseñas, documentos de identidad ni información sensible.</p>
            <button className="inquiry-submit" type="submit" aria-describedby="inquiry-send-note">Continuar a WhatsApp <ArrowUpRight size={19} aria-hidden="true" /></button>
          </footer>
        </form>
      </div>
    </dialog>
  )
}

export default ServiceInquiryDialog

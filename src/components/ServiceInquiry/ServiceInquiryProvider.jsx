import { useRef, useState } from 'react'
import { services } from '../../config/services.js'
import { ServiceInquiryContext } from './ServiceInquiryContext.js'
import ServiceInquiryDialog from './ServiceInquiryDialog.jsx'

function ServiceInquiryProvider({ children }) {
  const [service, setService] = useState(null)
  const triggerRef = useRef(null)

  function openInquiry(id) {
    const selected = services.find((item) => item.id === id)
    if (!selected) return
    triggerRef.current = document.activeElement
    setService(selected)
  }

  return (
    <ServiceInquiryContext value={openInquiry}>
      {children}
      {service && <ServiceInquiryDialog key={service.id} service={service} triggerRef={triggerRef} onClose={() => setService(null)} />}
    </ServiceInquiryContext>
  )
}

export default ServiceInquiryProvider

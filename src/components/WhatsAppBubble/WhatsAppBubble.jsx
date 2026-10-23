import { useEffect, useId, useState } from 'react'
import './WhatsAppBubble.css'

const defaultMessages = ['¡Escríbenos!']

function WhatsAppBubble({ phoneNumber = '', initialMessage = '', messages = defaultMessages }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const messageId = useId()
  const messageCount = messages.length

  useEffect(() => {
    if (messageCount < 2) return

    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % messageCount)
    }, 8000)

    return () => window.clearInterval(timer)
  }, [messageCount])

  const number = phoneNumber.replace(/\D/g, '')
  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(initialMessage)}`
    : undefined
  const Element = href ? 'a' : 'button'

  return (
    <div className="whatsapp-widget">
      {messageCount > 0 && (
        <span className="whatsapp-message" id={messageId}>
          {messages[messageIndex % messageCount]}
        </span>
      )}
      <Element
        className="whatsapp-bubble"
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        type={href ? undefined : 'button'}
        disabled={href ? undefined : true}
        aria-label="Escríbenos por WhatsApp"
        aria-describedby={messageCount > 0 ? messageId : undefined}
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 3a13 13 0 0 0-11.3 19.4L3 29l6.8-1.7A13 13 0 1 0 16 3Zm0 23.7a10.7 10.7 0 0 1-5.5-1.5l-.4-.2-4 1 1-3.9-.3-.4A10.7 10.7 0 1 1 16 26.7Zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-2.6-1.6 9.7 9.7 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4a3.6 3.6 0 0 0-1.1 2.6c0 1.6 1.2 3.1 1.4 3.3.1.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      </Element>
    </div>
  )
}

export default WhatsAppBubble

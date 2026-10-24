import { services } from './services.js'
import { portfolioPdf } from './navigation.js'

// PREGUNTAS FRECUENTES: edita aquí el título, la introducción y las respuestas.
// Agrega preguntas con un id único, question y paragraphs (lista de párrafos).
// Las respuestas de servicios reutilizan sus descripciones para mantenerlas actualizadas.
export const faqContent = {
  title: 'Preguntas frecuentes',
  description: 'Conoce más sobre SIMYC, nuestros servicios y cómo ponerte en contacto con nosotros.',
  questions: [
    {
      id: 'sobre-simyc',
      question: '¿Qué es SIMYC?',
      paragraphs: ['SIMYC es una agencia integral de publicidad, producción, eventos y soluciones empresariales. Unimos creatividad, estrategia y tecnología para llevar tu marca más lejos.'],
    },
    {
      id: 'servicios',
      question: '¿Qué servicios ofrece SIMYC?',
      paragraphs: ['Nuestros servicios conectan publicidad, creatividad y logística:'],
      items: services.map((service) => service.label),
      link: { href: '#servicios', label: 'Conoce nuestros servicios' },
    },
    {
      id: 'publicidad-digital',
      question: '¿En qué consiste la publicidad de SIMYC Media?',
      paragraphs: [services.find((service) => service.id === 'simyc-media').description],
    },
    {
      id: 'alquiler',
      question: '¿Ofrecen alquiler de pantallas y equipos?',
      paragraphs: [services.find((service) => service.id === 'simyc-rental').description],
    },
    {
      id: 'asesoria',
      question: '¿Puedo recibir asesoría para mi marca?',
      paragraphs: [services.find((service) => service.id === 'simyc-consulting').description],
    },
    {
      id: 'portafolio',
      question: '¿Dónde puedo consultar el portafolio?',
      paragraphs: ['Puedes abrir nuestro portafolio en PDF desde la opción Portafolio del menú o desde este enlace:'],
      link: { href: portfolioPdf, label: 'Abrir portafolio', target: '_blank' },
    },
    {
      id: 'contacto',
      question: '¿Cómo solicito información o una cotización?',
      paragraphs: ['Escríbenos por WhatsApp al 320 530 6790 o al correo operadorlogisticosimyc@gmail.com. Cuéntanos qué servicio necesitas y qué tienes en mente para tu proyecto.'],
    },
  ],
  // PANEL DE CONTACTO: los destinos se toman de navigation.js y whatsapp.js.
  contactTitle: '¿Tienes otra pregunta?',
  contactDescription: 'Cuéntanos sobre tu proyecto y el servicio que te interesa.',
}

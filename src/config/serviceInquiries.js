// Cada servicio define sus preguntas y el orden del mensaje de WhatsApp.
export const serviceInquiries = {
  'simyc-marketing': [
    { name: 'goal', label: '¿Qué quieres lograr?', options: ['Dar a conocer mi marca', 'Conseguir clientes o ventas', 'Lanzar un producto o servicio', 'Mejorar mi presencia digital', 'Necesito orientación'], required: true },
    { name: 'audience', label: '¿A qué público quieres llegar?', placeholder: 'Tipo de cliente, ciudad o zona de interés', required: true },
    { name: 'channels', label: '¿Dónde quieres desarrollar la campaña?', options: ['Redes sociales', 'Publicidad digital', 'Varios canales', 'Necesito una recomendación'], required: true },
    { name: 'timing', label: '¿Cuándo te gustaría comenzar?', placeholder: 'Por ejemplo: el próximo mes o por definir', required: true },
  ],
  'simyc-media': [
    { name: 'goal', label: '¿Qué marca, producto o evento quieres anunciar?', required: true },
    { name: 'location', label: '¿En qué ciudad o zona quieres anunciarte?', required: true },
    { name: 'duration', label: '¿Cuándo y por cuánto tiempo?', placeholder: 'Fechas aproximadas y duración, o por definir', required: true },
    { name: 'content', label: '¿Ya tienes la pieza publicitaria?', options: ['Sí, tengo el contenido listo', 'Tengo material, pero necesita ajustes', 'Necesito crear la pieza', 'Necesito orientación'], required: true },
  ],
  'activacion-btl': [
    { name: 'activation', label: '¿Qué experiencia buscas?', options: ['Lanzamiento de marca o producto', 'Activación en punto de venta', 'Evento o experiencia de marca', 'Muestreo de producto', 'Necesito desarrollar una idea'], required: true },
    { name: 'audience', label: '¿A qué público y cuántas personas quieres llegar?', placeholder: 'Describe el público y el alcance aproximado', required: true },
    { name: 'location', label: '¿En qué ciudad y lugar se realizaría?', placeholder: 'Puedes indicar si el lugar está por definir', required: true },
    { name: 'date', label: '¿Tienes una fecha prevista?', type: 'date' },
  ],
  'simyc-rental': [
    { name: 'equipment', label: '¿Qué equipo necesitas?', options: ['Pantallas', 'Tótems digitales', 'Varios equipos', 'Necesito asesoría para elegir'], required: true },
    { name: 'event', label: '¿Para qué tipo de evento o proyecto?', placeholder: 'Evento empresarial, feria, activación…', required: true },
    { name: 'location', label: '¿Dónde se usará el equipo?', placeholder: 'Ciudad, lugar e interior o exterior', required: true },
    { name: 'date', label: '¿Qué día comienza el evento?', type: 'date' },
    { name: 'duration', label: '¿Por cuánto tiempo lo necesitas?', placeholder: 'Horas o días aproximados, o por definir', required: true },
  ],
  'simyc-produccion': [
    { name: 'format', label: '¿Qué contenido necesitas producir?', options: ['Video publicitario', 'Contenido para redes sociales', 'Fotografía', 'Cubrimiento de evento', 'Varios formatos / Necesito orientación'], required: true },
    { name: 'goal', label: '¿Qué quieres comunicar y a quién?', type: 'textarea', placeholder: 'Tema, producto, público y objetivo del contenido', required: true },
    { name: 'material', label: '¿Con qué material cuentas?', options: ['Tengo una idea inicial', 'Tengo un guion o una propuesta', 'Tengo fotos o videos para editar', 'Necesito desarrollar todo desde cero'], required: true },
    { name: 'deadline', label: '¿Para qué fecha lo necesitas?', type: 'date' },
  ],
  'simyc-consulting': [
    { name: 'stage', label: '¿En qué etapa está tu negocio?', options: ['Estoy creando mi marca', 'Ya está en funcionamiento', 'Quiero crecer o lanzar una nueva línea', 'Quiero replantear mi estrategia'], required: true },
    { name: 'challenge', label: '¿Cuál es el principal reto de tu marca?', type: 'textarea', placeholder: 'Cuéntanos qué está pasando y dónde necesitas apoyo', required: true },
    { name: 'goal', label: '¿Qué te gustaría lograr con la asesoría?', required: true },
    { name: 'channels', label: '¿Dónde podemos conocer tu marca?', placeholder: 'Sitio web o usuario de redes sociales' },
  ],
}

export function buildServiceInquiryMessage(service, fields, data) {
  const value = (name) => String(data.get(name) || '').trim()
  return [
    `Hola, me interesa el servicio de ${service.label}.`,
    '',
    `Nombre: ${value('name')}`,
    ...(value('company') ? [`Empresa: ${value('company')}`] : []),
    '',
    ...fields.filter((field) => value(field.name)).map((field) => `${field.label}\n${value(field.name)}`),
    ...(value('budget') ? ['', `Presupuesto aproximado: ${value('budget')}`] : []),
    ...(value('details') ? ['', `Detalles adicionales: ${value('details')}`] : []),
  ].join('\n')
}

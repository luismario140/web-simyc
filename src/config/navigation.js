import portfolioPdf from '../../docs/PortafolioSIMYC.pdf?url'

// DESTINOS COMPARTIDOS: Navbar y Footer utilizan el mismo PDF y la misma página.
export { portfolioPdf }
// La ruta con # funciona también al publicar en un alojamiento estático.
export const aboutHref = '#/quienes-somos'

// REDES SOCIALES: pega aquí los enlaces oficiales completos de SIMYC.
// Una cadena vacía mantiene la opción visible sin enviar a una cuenta incorrecta.
export const socialLinks = {
  instagram: '',
  tiktok: '',
  facebook: '',
  email: 'mailto:operadorlogisticosimyc@gmail.com',
}

export const contactLinks = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'email', label: 'Email' },
].map((channel) => ({
  ...channel,
  href: socialLinks[channel.id],
  target: channel.id === 'email' ? undefined : '_blank',
}))

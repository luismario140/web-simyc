// QUIÉNES SOMOS: todo el contenido de esta página se modifica aquí.
// Escribe los textos oficiales dentro de paragraphs: ['Primer párrafo', 'Segundo párrafo'].
// IMÁGENES: guárdalas en src/assets/imgabout y asigna image a cada bloque.
// Por ejemplo, cuando exista el archivo: image: new URL('../assets/imgabout/proposito.jpg', import.meta.url).href
// imageAlt describe la foto; imagePosition ajusta su encuadre ('50% 50%' = centro).
// Las cadenas y listas vacías reservan el espacio sin mostrar textos de ejemplo.
export const aboutContent = {
  title: 'Quiénes somos',
  // SIMYC EN UNA MIRADA: las primeras tres cards van a la izquierda; las otras a la derecha.
  // Agrega el contenido oficial de cada card en description. Vacío no muestra texto de ejemplo.
  overview: {
    title: 'SIMYC en una mirada',
    description: 'La esencia estratégica en una sola página',
    cards: [
      { id: 'que-somos', title: 'Qué somos', description: 'Un ecosistema integrado de publicidad, creatividad y logística.' },
      { id: 'que-hacemos', title: 'Qué hacemos', description: 'Conectamos necesidades, ideas, medios y ejecución para generar impacto.' },
      { id: 'para-quien', title: 'Para quién', description: 'Empresas, instituciones, organizaciones y emprendimientos que necesitan visibilidad y capacidad operativa.' },
      { id: 'diferencial', title: 'Diferencial', description: 'Un solo aliado capaz de pensar, crear, producir y ejecutar.' },
      { id: 'territorio', title: 'Territorio', description: 'Pacífico colombiano, con proyección de expansión regional.' },
      { id: 'promesa', title: 'Promesa', description: 'Te conectamos con las personas, soluciones y oportunidades que hacen crecer tu proyecto.' },
    ],
  },
  sections: [
    {
      id: 'proposito',
      title: 'Propósito',
      paragraphs: ['Crear conexiones que permitan a marcas, instituciones y comunidades avanzar, hacerse visibles y convertir sus ideas en resultados.'], // Agrega aquí el texto de Propósito.
      image: new URL('../assets/imgabout/somos1.png', import.meta.url).href,
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'mision',
      title: 'Misión',
      paragraphs: ['Integrar publicidad, creatividad y logística para ofrecer soluciones estratégicas, confiables y adaptadas a las necesidades de cada proyecto.'], // Agrega aquí el texto de Misión.
      image: new URL('../assets/imgabout/somos2.png', import.meta.url).href,
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'vision',
      title: 'Visión',
      paragraphs: ['Consolidar a SIMYC como un medio referente de comunicación, medios y operación en el Pacífico colombiano, reconocido por su innovación, cumplimiento e impacto.'], // Agrega aquí el texto de Visión.
      image: new URL('../assets/imgabout/somos3.png', import.meta.url).href,
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'ambicion',
      title: 'Ambición',
      paragraphs: ['Pasar de operar servicios aislados a liderar una red regional capaz de conectar oportunidades, talento y territorio.'], // Agrega aquí el texto de Ambición.
      image: new URL('../assets/imgabout/somos4.png', import.meta.url).href,
      imageAlt: '',
      imagePosition: '50% 50%',
    },
  ],
}

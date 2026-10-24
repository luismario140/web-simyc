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
      { id: 'que-somos', title: 'Qué somos', description: '' },
      { id: 'que-hacemos', title: 'Qué hacemos', description: '' },
      { id: 'para-quien', title: 'Para quién', description: '' },
      { id: 'diferencial', title: 'Diferencial', description: '' },
      { id: 'territorio', title: 'Territorio', description: '' },
      { id: 'promesa', title: 'Promesa', description: '' },
    ],
  },
  sections: [
    {
      id: 'proposito',
      title: 'Propósito',
      paragraphs: [], // Agrega aquí el texto de Propósito.
      image: '', // Ruta de la imagen de Propósito.
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'mision',
      title: 'Misión',
      paragraphs: [], // Agrega aquí el texto de Misión.
      image: '', // Ruta de la imagen de Misión.
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'vision',
      title: 'Visión',
      paragraphs: [], // Agrega aquí el texto de Visión.
      image: '', // Ruta de la imagen de Visión.
      imageAlt: '',
      imagePosition: '50% 50%',
    },
    {
      id: 'ambicion',
      title: 'Ambición',
      paragraphs: [], // Agrega aquí el texto de Ambición.
      image: '', // Ruta de la imagen de Ambición.
      imageAlt: '',
      imagePosition: '50% 50%',
    },
  ],
}

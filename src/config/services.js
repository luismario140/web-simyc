// SERVICIOS: edita aquí los nombres y descripciones.
// El Navbar y la galería de Inicio comparten esta lista.
// Conserva cada id para mantener los enlaces a las tarjetas.
// label = nombre visible en la galería y en el Navbar.
// description = descripción accesible del enlace de cada imagen.
// El orden de los objetos define el recorrido de la galería y del desplegable.
// image (opcional) = ruta pública o imagen importada para la galería curva.
// imagePosition (opcional) = encuadre CSS, como '65% 50%'.
// Sin image se usa fondo.jpg con distintos encuadres.
export const services = [
  {
    id: 'simyc-marketing',
    label: 'SIMYC Marketing',
    description: 'Estrategias y campañas para comunicar lo que hace única a tu marca y conectar con tu público.',
    image: new URL('../assets/imgservice/img6.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-media',
    label: 'SIMYC Media',
    description: 'Publicidad en pantallas digitales y tótems para acercar tus productos y servicios a las personas.',
    image: new URL('../assets/imgservice/img5.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'activacion-btl',
    label: 'Activacion BTL',
    description: 'Experiencias y acciones de marca que generan interacción directa con tu público, más allá de la pantalla.',
    image: new URL('../assets/imgservice/img3.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-rental',
    label: 'SIMYC Rental',
    description: 'Alquiler de pantallas y equipos para acompañar tus eventos, activaciones y espacios publicitarios.',
    image: new URL('../assets/imgservice/img4.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-produccion',
    label: 'SIMYC Produccion',
    description: 'Producción de contenido audiovisual para contar tu historia y dar vida a tus campañas publicitarias.',
    image: new URL('../assets/imgservice/img2.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-consulting',
    label: 'SIMYC Consulting',
    description: 'Asesoría para definir tus objetivos de comunicación y orientar las acciones de marketing de tu marca.',
    image: new URL('../assets/imgservice/img1.jpeg', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
]

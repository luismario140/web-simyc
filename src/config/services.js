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
    description: 'Transforma ideas en identidades visuales que representan la esencia de cada marca y fortalecen su posicionamiento.',
    image: new URL('../assets/optimized/servicio6.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-media',
    label: 'SIMYC Media',
    description: 'Conecta marcas con audiencias mediante medios digitales, pantallas publicitarias y estrategias de comunicación visual.',
    image: new URL('../assets/optimized/servicio5.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'activacion-btl',
    label: 'Activacion BTL',
    description: 'Crea experiencias de marca que generan interación, conexión directa con el público y recordación.',
    image: new URL('../assets/optimized/servicio3.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-rental',
    label: 'SIMYC Rental',
    description: 'Facilita la realizacion de eventos mediante soluciones de infraestructura, equipamiento, logística y producción.',
    image: new URL('../assets/optimized/servicio4.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-produccion',
    label: 'SIMYC Produccion',
    description: 'Materializa la comunicación de las marcas mediante soluciones gráficas, publicidad exterior y señalización empresarial.',
    image: new URL('../assets/optimized/servicio2.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
  {
    id: 'simyc-consulting',
    label: 'SIMYC Consulting',
    description: 'Impulsa el desarrollo empresarial medinate consultoría, planeación estratégica, gestión de proyectos y oportunidades de crecimiento.',
    image: new URL('../assets/optimized/servicio1.webp', import.meta.url).href,
imagePosition: '50% 50%', // Ajusta el encuadre de la imagen
  },
]

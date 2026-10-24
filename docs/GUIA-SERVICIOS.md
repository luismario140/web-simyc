# Editar Nuestros servicios

La sección está en Inicio, después de la portada. Ahora muestra únicamente la
galería curva de imágenes: se retiraron las cards de resumen y el botón de pausa.
Los archivos de los componentes se conservan.

## Textos y datos

- src/components/Services/Services.jsx: etiqueta superior, título e introducción.
- src/config/services.js: lista de servicios. label es el nombre visible;
  description es la descripción accesible del enlace de la imagen.
- Conserva cada id: conecta el Navbar con la imagen correspondiente.
- src/config/whatsapp.js: teléfono usado al consultar un servicio.

## Imágenes

Cada servicio puede tener image (una imagen importada o una ruta pública) e
imagePosition (el encuadre CSS de object-position). Agrega las imágenes a
src/assets e impórtalas desde src/config/services.js. Si no se proporciona image,
la galería reutiliza fondo.jpg con diferentes encuadres.

## Tamaños y colores

En src/components/Services/Services.css están los márgenes de la sección, el
ancho del contenedor y los colores y tamaños del encabezado.

En src/components/Services/ServiceGallery.css:

| Selector o variable | Qué controla |
| --- | --- |
| --gallery-card-width | Ancho adaptable de cada imagen |
| --gallery-card-height | Alto de cada imagen |
| --gallery-gap | Separación entre imágenes |
| .service-gallery-stage | Perspectiva y desvanecido lateral con mask-image |
| .service-gallery-tile | Fondo, borde, esquinas y sombra |
| .service-gallery-caption | Nombre sobre la imagen y degradado inferior |
| .service-gallery-link:focus-visible | Borde al navegar con teclado |

La paleta y el fondo de la página se cambian en src/styles/variables.css.

## Movimiento y revisión

En ServiceGallery.jsx, speed cambia la velocidad, depth la profundidad de los
laterales y curvature la elevación de los extremos. ResizeObserver ajusta el
recorrido al cambiar el ancho de pantalla sin perder la posición relativa.

La fila se repite tres veces para que el movimiento sea continuo. Solo la primera
copia tiene los seis destinos del Navbar y paradas de teclado; las repeticiones
no duplican contenido para lectores de pantalla. Las imágenes enlazan a WhatsApp.

No hay botón de pausa. La animación se detiene al pasar el mouse, enfocar un enlace
con teclado, salir de la pantalla o cambiar de pestaña. Con reducir movimiento
activado se muestran seis imágenes en una fila desplazable manualmente.

Seleccionar un servicio en el Navbar centra su imagen, incluso si se vuelve a
seleccionar el mismo servicio. Con teclado, Tab enfoca y centra cada uno de los
seis servicios y permite salir de la galería sin quedar atrapado.

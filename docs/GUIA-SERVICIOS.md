# Cómo editar Nuestros servicios

Es una sección de la página de inicio, no una página independiente.
Se inserta con `<Services />` al final de `src/pages/Home/Home.jsx`, después de la portada.

## Dónde editar cada cosa

| Qué quieres modificar | Archivo | Qué buscar |
| --- | --- | --- |
| Etiqueta «Ideas que conectan» | `src/components/Services/Services.jsx` | `services-eyebrow` |
| Título «Nuestros servicios» | `src/components/Services/Services.jsx` | `services-title` |
| Palabra del título con otro color | `src/components/Services/Services.jsx` | `<span>servicios</span>` |
| Descripción general bajo el título | `src/components/Services/Services.jsx` | `services-introduction` |
| Nombre de cada servicio | `src/config/services.js` | Propiedad `label` |
| Descripción de cada card | `src/config/services.js` | Propiedad `description` |
| Orden de las tarjetas | `src/config/services.js` | Orden de los objetos de la lista |
| Dibujos de los iconos | `src/components/Services/Services.jsx` | Objeto `icons` |
| Texto «Consultar servicio» | `src/components/Services/Services.jsx` | Texto dentro del enlace de la card |
| Teléfono de WhatsApp | `src/config/whatsapp.js` | `phoneNumber` |
| Mensaje de consulta de las cards | `src/components/Services/Services.jsx` | `href` del enlace |

Los nombres de `services.js` también se muestran en el desplegable del Navbar.
Conserva los `id`: conectan las opciones del desplegable con las tarjetas y los iconos.
Para agregar un servicio, agrega un objeto con un `id` único, `label` y `description`,
y añade su icono con la misma clave en `icons`. Si cambias la cantidad de tarjetas,
revisa también el número de columnas del CSS.

## Colores en Services.css

Todos estos selectores están en `src/components/Services/Services.css`.

| Elemento | Selector | Propiedad que debes cambiar |
| --- | --- | --- |
| Etiqueta superior | `.services-eyebrow` | `color` |
| Título de la sección | `.services-heading h2` | `color` |
| Palabra destacada del título | `.services-heading h2 span` | `color` |
| Descripción general | `.services-introduction` | `color` |
| Fondo de las tarjetas | `.service-card` | Los dos colores de `background: linear-gradient(...)` |
| Borde de las tarjetas | `.service-card` | `border` |
| Descripción de las tarjetas | `.service-card` | `color`, heredado por el párrafo |
| Título de cada tarjeta | `.service-card h3` | `color` |
| Fondo del recuadro del icono | `.service-card-icon` | `background` |
| Color del dibujo del icono | `.service-card-icon` | `color` |
| Enlace de consulta | `.service-card-link` | `color` |
| Enlace al pasar el mouse | `.service-card-link:hover` | `color` |
| Borde y sombra al inclinarse | `.service-card:hover` | `border-color` y `box-shadow` |

El fondo lavanda detrás de las tarjetas viene de `.home` en
`src/pages/Home/Home.css`: usa `var(--page-background)`.
Su valor se cambia en `src/styles/variables.css`.

`var(--yellow-light)`, `var(--yellow)` y `var(--white)` también se definen en
`variables.css`. Cambiar una variable afecta todos los lugares que la usan.
Para cambiar solo un elemento, modifica el color directamente en su selector de
`Services.css`. Un color `#...` o `rgba(...)` ya está definido en ese selector.

## Tamaños y distribución

- `.services-container` → `max-width`: ancho máximo del conjunto.
- `.services-grid` → `grid-template-columns: repeat(6, minmax(0, 1fr))`: seis tarjetas por fila en escritorio.
- `.services-grid` → `gap`: separación entre tarjetas.
- `.service-card` → `padding`: espacio interior; `border-radius`: redondeo.
- `.service-card h3` y `.service-card p` → `font-size`: tamaño de nombres y descripciones.
- `.service-card-icon` → `width` y `height`: tamaño del recuadro del icono.
- `.service-card-icon svg` → `width` y `height`: tamaño del dibujo.
- `.services-section` → `padding`: espacio antes, a los lados y después de la sección.

Las reglas `@media` del final adaptan la distribución: hasta 1100 px son tres
columnas, hasta 760 px son dos y hasta 480 px es una. Esas reglas pueden reemplazar
valores de arriba cuando la ventana es más pequeña.

## Animación de profundidad

Busca `.service-card:hover` dentro de `@media (hover: hover) and (pointer: fine)`:

- `perspective(900px)` controla la perspectiva; valores menores acentúan el efecto.
- `rotateX(4deg)` inclina la tarjeta verticalmente.
- `rotateY(-7deg)` hace que un lateral se aleje.
- `translateY(-4px)` la levanta un poco.
- `transition` en `.service-card` controla la duración y suavidad.

El efecto se aplica a dispositivos con mouse. La regla
`prefers-reduced-motion` lo desactiva cuando el usuario solicita menos movimiento.

## Tipografías

En `src/index.css`, `--heading` controla titulares y `--sans` los textos de lectura.
Las fuentes se cargan en `src/styles/fonts.css`. Lexend está incluida; Monument
Extended utiliza una instalación local mientras no se agregue su archivo al proyecto.

## Ver los cambios

Ejecuta `npm run dev` y abre la dirección que muestra la terminal.
Guarda los archivos para ver los cambios. Mantén las comillas, comas y llaves al
editar la lista de servicios; los comentarios no aparecen en la página.

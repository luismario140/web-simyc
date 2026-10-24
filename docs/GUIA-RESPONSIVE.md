# Diseño adaptable a pantallas

El diseño usa el ancho disponible, no el nombre del dispositivo.
No se necesitan versiones separadas de la página.

| Ancho de la ventana | Tarjetas por fila | Navbar |
| --- | --- | --- |
| Hasta 480 px | 1 | Botón Menú |
| De 481 a 760 px | 2 | Botón Menú |
| De 761 a 820 px | 3 | Botón Menú |
| De 821 a 1100 px | 3 | Enlaces visibles |
| Desde 1101 px | 6 | Enlaces visibles |

## Dónde cambiar las medidas

- `src/styles/variables.css`: `--header-height` define el alto reservado al Navbar,
  `--page-gutter` los márgenes laterales y `--content-width` el límite de ancho
  de la portada y la navegación. No uses un desplazamiento `left` negativo para
  colocar el logo: el contenedor controla su posición sin sacarlo de la pantalla.
- `src/components/Navbar/Navbar.css`: el bloque `@media (max-width: 820px)`
  controla el botón Menú y el panel móvil. Los enlaces conservan su color blanco.
- `src/pages/Home/Home.css`: tamaños adaptables, encuadre del fondo y separación
  entre el Navbar y los textos. El alto puede crecer cuando el texto lo requiere.
- `src/components/Services/Services.css`: columnas, espacios y tamaños de tarjetas.
  El contenedor está limitado a 1680 px para monitores grandes.
- `src/components/Footer/Footer.css`: tres columnas en escritorio; marca arriba
  y dos columnas debajo en tablet; una columna en celulares.
- `src/components/WhatsAppBubble/WhatsAppBubble.css`: posición de la burbuja,
  tamaño en celulares y márgenes seguros para dispositivos con recortes de pantalla.
- `src/index.css`: tamaños de caja y margen de desplazamiento para que el Navbar
  fijo no tape la tarjeta al navegar desde Servicios.

Si cambias el punto de corte de 820 px del Navbar, actualízalo también en
`Navbar.jsx` (la consulta de `matchMedia`), `variables.css` y `Home.css`.
La animación de las tarjetas se mantiene para mouse y se desactiva cuando el
dispositivo solicita reducir movimiento.

## Cómo revisarlo

Ejecuta `npm run dev` y usa el modo de dispositivos del navegador (F12).
Prueba anchos de 320, 390, 768, 1024, 1366, 1920 y 2560 px, así como un celular
en horizontal. Comprueba abrir y cerrar Menú, desplegar Servicios y seleccionar
SIMYC Consulting. El menú debe cerrarse y la tarjeta debe quedar visible debajo
del Navbar. Escape cierra primero Servicios y después el menú móvil.

En monitores grandes se limita el ancho del contenido; los fondos siguen
ocupando toda la ventana. En pantallas pequeñas los textos se ajustan y las
tarjetas bajan de fila sin necesitar desplazamiento horizontal.

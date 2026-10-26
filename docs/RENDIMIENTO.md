# Optimización de imágenes y carga de páginas

Se conservaron las imágenes originales y se añadieron versiones de entrega en `src/assets/optimized/`:

- Fotografías de Nosotros: WebP de 640 y 1152 píxeles de ancho, calidad 82, seleccionadas mediante `srcSet` y `sizes`. Primera fotografía de carga inmediata; las restantes conservan carga diferida.
- Tarjetas de servicios: WebP de 640 píxeles de ancho, calidad 82.
- Fondo de inicio: WebP de 1366 píxeles y versión móvil de 768 píxeles.
- Favicon: PNG de 64 × 64 en `public/favicon-simyc.png`. El original de 1254 × 1254 ya no se descarga como icono.

Las versiones se generaron con Sharp como herramienta temporal. No se añadió esa dependencia a la aplicación. Al cambiar una foto, actualizar también sus variantes y referencias; conservar `imageSrcSet` coherente con `image` en `src/config/about.js`.

Nosotros y FAQ usan carga de código por página con `React.lazy` y `Suspense`. El inicio no descarga sus módulos ni el carrusel de Framer Motion hasta necesitarlos. El archivo de JavaScript inicial pasó de aproximadamente 416 KB a 251 KB sin comprimir; las otras páginas se entregan en archivos separados.

## Medición comparable

Prueba local de la compilación de producción en Microsoft Edge, viewport móvil de 390 × 844, DPR 1, movimiento reducido y caché desactivada mediante CDP. Se contabilizó `Network.loadingFinished.encodedDataLength`. En Nosotros se forzó completar la descarga de sus imágenes para comparar el conjunto completo.

| Recorrido | Antes | Después | Reducción |
| --- | ---: | ---: | ---: |
| Inicio | 5.086.258 bytes | 702.244 bytes | 86,2 % |
| Inicio + Nosotros, acumulado | 15.993.176 bytes | 985.919 bytes | 93,8 % |

Son bytes descargados en este escenario local, no segundos de carga ni una medición del rendimiento real en Hostinger. El tamaño transferido puede variar con DPR, caché, compresión HTTP y posición de desplazamiento.

Las pruebas comprobaron imágenes WebP completas, carga separada de módulos, acceso directo a las páginas, retorno a Inicio, apertura/cierre del formulario de Rental desde el menú móvil y ausencia de errores de página o respuestas HTTP fallidas. Se revisó visualmente Nosotros en móvil y escritorio. Build, lint y tipos pasaron.

## Compartir la revisión

Para compartir una versión compilada mediante un túnel temporal, construir con `npm run build` y servir `dist/` con `npm run preview -- --host 127.0.0.1 --port 5173 --strictPort`, sin otro servidor ocupando ese puerto. No se actualiza automáticamente al editar: hay que volver a compilar.

El modo desarrollo transforma y sirve módulos por demanda; esas peticiones adicionales pueden añadir espera a través de un túnel. [Arquitectura de Vite](https://vite.dev/guide/why.html).

El preview permite revisar el resultado localmente. Para el sitio definitivo se publica `dist/` en el alojamiento elegido; `vite preview` no es un servidor de producción. [Despliegue estático de Vite](https://vite.dev/guide/static-deploy.html).

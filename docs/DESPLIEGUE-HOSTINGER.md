# Publicar en Hostinger

1. Ejecuta `npm run build` después de modificar el código. Esto regenera `dist`.
2. Abre en Hostinger la carpeta `public_html` del dominio que vas a actualizar.
3. Sube el **contenido** de `dist` directamente a esa carpeta y reemplaza los archivos existentes. El resultado debe ser `public_html/index.html` y `public_html/assets/`, no `public_html/dist/index.html`.
4. Incluye el archivo oculto `.htaccess` generado en `dist`. Si el servidor ya tiene reglas propias en `.htaccess`, conserva esas reglas e incorpora las de este proyecto.
5. Purga la caché del sitio desde Cache Manager de Hostinger y la del CDN si está habilitado. Después recarga el navegador con `Ctrl + F5`.

`index.html` apunta a archivos JS y CSS con nombres que cambian cuando cambia su contenido. Deben subirse juntos: copiar únicamente `assets` deja al sitio usando el HTML anterior. La configuración `.htaccess` pide revalidar `index.html`; una copia ya guardada en la caché de Hostinger puede requerir una purga inicial.

La navegación usa fragmentos (`/#/resenas`), por lo que no requiere reglas de reescritura para esas páginas.

## Comprobación del menú Servicios

El menú **Servicios** del Navbar muestra la descripción de cada servicio al seleccionarlo, sin abrir formularios. Las tarjetas de servicios de Inicio conservan su formulario de consulta, y Preguntas frecuentes conserva su propio formulario.

Si el menú del Navbar abre formularios, comprueba que se reemplazó `public_html/index.html` con el de la última compilación y que estás viendo el dominio y la carpeta correctos. Purga la caché antes de volver a probar.

Subir cambios a GitHub no actualiza una publicación manual en Hostinger: también hay que cargar el contenido de la nueva carpeta `dist`.

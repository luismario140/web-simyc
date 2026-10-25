# Auditoría de seguridad previa a publicación

Fecha: 25 de octubre de 2026, America/Bogota.

Este documento conserva los resultados de la revisión inicial. Para las correcciones aplicadas posteriormente y los pendientes externos vigentes, consultar el [seguimiento de seguridad](SEGUIMIENTO-SEGURIDAD.md).

Proyecto: `web-symic`. Referencia al cerrar la revisión inicial: `0e5c4b57cdfbc3eb32baba0cf2eabe64ee16bd70` y archivos presentes en el directorio de trabajo. Se incluyeron los formularios de FAQ y de los seis servicios. No se modificó el código de la aplicación ni se aplicaron actualizaciones o correcciones. Sólo se añadieron documentos de auditoría. La evaluación posterior por bloques se registra en [el control de 20 puntos](AUDITORIA-CONTROL-20-PUNTOS.md).

## Dictamen

No se identificaron vulnerabilidades críticas o altas en el alcance revisado. Se confirmó un error de severidad baja al procesar fragmentos de URL mal formados. Existe un riesgo de privacidad inherente al envío del contenido de los formularios mediante una URL de WhatsApp, y faltan controles de publicación por verificar en el alojamiento real.

El código puede pasar a una fase de despliegue de prueba. No doy por cerrada la revisión de publicación hasta comprobar HTTPS, cabeceras y exposición de archivos en el dominio definitivo. No se proporcionó una URL ni una configuración de alojamiento durante esta revisión. Un resultado sin vulnerabilidades conocidas en dependencias no demuestra ausencia de vulnerabilidades.

| ID | Tipo | Severidad o prioridad | Estado |
| --- | --- | --- | --- |
| S-01 | Error al decodificar el fragmento de URL | Baja | Reproducido en la compilación de producción |
| P-01 | Datos de formularios en URL de WhatsApp | Media, condicionada a la sensibilidad del contenido | Flujo confirmado; riesgo de privacidad, sin explotación demostrada |
| H-01 | Controles de seguridad del alojamiento | Verificación necesaria antes de publicación | No hay configuración de despliegue en el repositorio; producción no evaluada |
| H-02 | Exclusión preventiva de archivos de secretos | Baja, preventiva | `.env` y `.npmrc` no están excluidos; no se encontraron secretos |

## Arquitectura identificada

- Aplicación cliente estática construida con React **19.3.1** y Vite **8.3.5**, según `package-lock.json` y la instalación local. Estilos con CSS y Tailwind; animaciones con Framer Motion **14.6.0**. JavaScript/JSX y algunos componentes TypeScript/TSX.
- Entrada en `src/main.jsx`; selección de Inicio, Nosotros y Preguntas frecuentes mediante `window.location.hash` en `src/App.jsx`. No se encontró un servidor de aplicación ni renderizado React del lado del servidor.
- Los textos, servicios y destinos se definen en módulos locales de `src/config/`. No hay contenido proveniente de un CMS o una API.
- Siete formularios: FAQ y un formulario específico por cada uno de los seis servicios. Preparan texto en el navegador y abren `https://wa.me/573205306790?text=...`. El usuario confirma el mensaje dentro de WhatsApp. No hay integración con WhatsApp Business API, token de acceso ni envío automático desde un servidor.
- Instagram, TikTok y Facebook son enlaces de salida. El correo utiliza `mailto:`. El portafolio PDF es un archivo local que se publica como recurso estático. No se observaron SDK de redes sociales, analítica, widgets externos ni fuentes descargadas de terceros durante las pruebas.
- No se encontraron autenticación, sesiones propias, roles, panel administrativo, base de datos, pagos, cargas de archivos, webhooks, endpoints propios ni almacenamiento de formularios en servidor.

Por tanto, no se atribuyen al proyecto fallas de SQL, IDOR, autorización de API, CSRF de sesión, cookies de sesión o gestión de pagos: sus componentes necesarios no existen en el código inspeccionado. La validación de formularios es una ayuda al usuario; no se considera una frontera de seguridad de un servidor inexistente.

## Hallazgos

### S-01 — Excepción al abrir una URL con fragmento inválido

**Ubicación:** `src/App.jsx:32`.

```jsx
document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
```

`decodeURIComponent` puede lanzar `URIError` y no está protegido. La excepción ocurre dentro del callback de `requestAnimationFrame` que también debe enfocar el contenido principal.

**Reproducción sobre la compilación de producción:** abrir una página nueva o recargar con `/#%` o `/#%E0%A4%A`. Se observó el error `URI malformed`; el encabezado y la página siguieron visibles, pero no se completó el enfoque del contenido principal. Cambiar únicamente el hash dentro de una página ya abierta puede no ejecutar de nuevo este efecto y no es una reproducción suficiente.

**Impacto:** interrupción de esa operación de navegación y accesibilidad para la persona que abra el enlace. No se observó ejecución de código, acceso a datos, caída del servidor ni indisponibilidad para otros visitantes. Por eso se clasifica como baja, no como una caída completa de la aplicación.

**Recomendación:** manejar el fallo de decodificación con `try/catch`, ignorar el destino inválido y permitir que se complete el resto de la navegación. Añadir una prueba de regresión con ambos fragmentos. No se aplicó el cambio durante esta auditoría.

### P-01 — El texto del formulario se transmite como parte de una URL

**Ubicaciones:** `src/components/ServiceInquiry/ServiceInquiryDialog.jsx:59`, `src/pages/FAQ/FAQ.jsx:42`, `src/config/serviceInquiries.js:42`.

Los nombres, empresa, respuestas, presupuesto y detalles introducidos se incorporan al parámetro `text` de una URL HTTPS de WhatsApp. Es el mecanismo previsto por el producto, no un desvío de destino descubierto por la auditoría.

**Riesgo:** al abrir esa URL, el contenido ya se comunica al servicio de destino para preparar el mensaje, antes de que la persona pulse enviar en el chat. Puede quedar en historial o registros del navegador y de la infraestructura que procese la URL; su persistencia exacta no se verificó. HTTPS protege el transporte, pero la codificación con `encodeURIComponent` no cifra los datos ni impide su presencia en la URL. `noreferrer` protege la referencia a la página de origen, no elimina el parámetro de la URL de destino.

La web avisa que se abrirá WhatsApp con las respuestas. No se encontró una página de privacidad ni una explicación específica de este tratamiento. La severidad media expresa el riesgo si se escriben datos sensibles o información comercial confidencial; no se constató una filtración a un destinatario diferente del configurado ni una obligación legal incumplida.

**Recomendación:** mantener la minimización de datos; explicar cerca del botón que las respuestas se compartirán con WhatsApp al continuar; añadir una política de privacidad acorde al tratamiento real; pedir que no se incluyan contraseñas, documentos ni datos sensibles. Si el negocio necesita recibir información confidencial, diseñar un canal apropiado en vez de incluirla en este enlace. No hace falta añadir un backend solamente para conservar el flujo comercial actual.

**Criterio de cierre:** confirmar que el contenido solicitado es adecuado para este canal y que el aviso describe el momento real de transferencia. Revisar las responsabilidades y el acceso a las conversaciones en la cuenta empresarial, que no estuvo accesible en esta auditoría.

Referencia técnica: [OWASP: información expuesta en parámetros de URL](https://community.owasp.org/vulnerabilities/Information_exposure_through_query_strings_in_url).

### H-01 — La seguridad del alojamiento no está acreditada

**Ubicaciones:** `vite.config.js`, `index.html`, `package.json:7`, `package.json:11`, `README.md`.

No hay configuración de Netlify, Vercel, Nginx, Apache, CDN, GitHub Actions u otro despliegue que permita determinar las cabeceras y las reglas del sitio publicado. Tampoco se proporcionó un dominio para inspeccionarlo. La respuesta del preview local no incluyó CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ni HSTS. Esto describe exclusivamente el preview HTTP local; no demuestra que vayan a faltar en producción.

**Impacto si se publica sin estos controles:** menor defensa frente a inyección de scripts, inclusión del sitio en marcos de terceros y configuraciones incorrectas de tipos de contenido o referencias. No se demostró un XSS ni un ataque de clickjacking contra un alojamiento real.

**Verificación necesaria antes de publicar:**

1. Servir solamente el resultado `dist/` con un alojamiento estático de producción. No exponer la raíz del repositorio, `node_modules`, `.git` o el servidor de desarrollo. `vite preview` es una herramienta de revisión local, no un servidor de producción.
2. Activar HTTPS y redirección desde HTTP. Evaluar HSTS cuando el dominio y el alcance de sus subdominios estén listos para HTTPS permanente.
3. Configurar CSP, protección frente a marcos de terceros y `X-Content-Type-Options: nosniff`. Definir políticas de referencias y permisos apropiadas.
4. Como punto de partida para **probar** una CSP: scripts del mismo origen, `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'` y recursos limitados a lo que realmente se usa. Las animaciones aplican estilos en línea y Vite puede incrustar recursos pequeños como `data:`; la política de estilos e imágenes requiere pruebas de compatibilidad. No copiar una política rígida sin revisar Inicio, Nosotros, FAQ y los formularios. No permitir `unsafe-eval` por comodidad.
5. Enviar `frame-ancestors` mediante cabecera HTTP: no funciona dentro de una etiqueta `meta`. Probar primero los cambios de CSP con un mecanismo de reporte o en staging cuando la plataforma lo permita.
6. Verificar que `/.env`, `/.git/config`, `/src/main.jsx`, `/package.json` y `/node_modules/` no entreguen esos archivos reales. Un `200` con el HTML de la SPA no significa que se haya filtrado el archivo: hay que revisar el cuerpo y su tipo.

**Criterio de cierre:** repetir las comprobaciones sobre el dominio elegido y guardar las cabeceras finales. Esto sigue pendiente.

Fuentes: [despliegue estático de Vite](https://vite.dev/guide/static-deploy), [CSP en MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [restricciones de `frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

### H-02 — Faltan exclusiones preventivas para futuros archivos de secretos

**Ubicación:** `.gitignore`.

`git check-ignore` confirmó que `.env`, `.env.production`, `.env.development` y `.npmrc` no están excluidos. Sí se excluyen `*.local`, `node_modules` y `dist`. Los cuatro archivos comprobados no existen actualmente; no se encontró una credencial filtrada.

**Impacto:** si se incorporan integraciones más adelante, es más fácil añadir accidentalmente archivos con credenciales al repositorio.

**Recomendación preventiva:** ignorar `.env` y `.env.*`, permitir explícitamente una plantilla sin secretos como `.env.example`, y definir cómo gestionar un `.npmrc` que contenga autenticación. Una configuración de registro sin credenciales puede versionarse si es una decisión explícita. No introducir secretos en variables `VITE_*`: su uso en el cliente las hace públicas en el bundle. Una exclusión de Git no sustituye la rotación de una credencial que ya se hubiera publicado.

**Criterio de cierre:** verificar con `git check-ignore` que los archivos privados previstos estén excluidos y que las plantillas sólo tengan valores de ejemplo. No se modificó `.gitignore`.

Referencia: [variables de entorno y protección de secretos en Vite](https://vite.dev/guide/env-and-mode).

## Pruebas y evidencia

| Comprobación | Resultado |
| --- | --- |
| `npm audit --json`, contra `https://registry.npmjs.org/` | 225 paquetes en el inventario del lockfile; 0 vulnerabilidades reportadas en todas las severidades |
| Lockfile e instalación | Sin diferencias de versión en los paquetes instalados frente al lockfile; todos los paquetes del lockfile tienen integridad y sus URLs de descarga usan el registro npm. No faltan paquetes no opcionales |
| `npm run build` | Correcto; compilación de producción con Vite 8.3.5 |
| `npm run lint` | Correcto |
| `npm run typecheck` | Correcto. `checkJs: false` limita la revisión de tipos sobre archivos JS/JSX; no equivale a un análisis de seguridad |
| Secretos en archivos actuales e historial | Sin coincidencias en el escaneo por patrones; 80 blobs de texto del historial accesible revisados. Sin rutas históricas de secretos identificadas. Incluye patrones de claves privadas, tokens comunes y asignaciones de credenciales; no es una prueba exhaustiva |
| Resultado `dist/` | 24 archivos, sin sourcemaps y sin `.env`, `.git`, código fuente suelto, manifiestos npm o `node_modules` en el paquete publicado |
| Navegación en producción local | Inicio, Nosotros y FAQ cargaron correctamente |
| Siete formularios con entradas de prueba | Destino fijo `https://wa.me/573205306790`; un único parámetro `text`, sin fragmento inyectado ni parámetros adicionales |
| Pruebas de texto malicioso | Cadenas con HTML, `onerror`, comillas, `&text=`, `#`, tildes y emoji permanecieron como texto codificado; sin ejecución de script observada |
| Ventanas y enlaces externos | Los envíos revisados usan `noopener,noreferrer`; enlaces externos nuevos con protección equivalente en los componentes inspeccionados |
| Tráfico del navegador | Sólo peticiones GET al origen local durante la navegación y las pruebas con la apertura de WhatsApp interceptada. No se observaron envíos silenciosos de formularios ni peticiones de analítica |
| Persistencia en el navegador de prueba | Sin cookies accesibles por JavaScript y sin entradas en localStorage o sessionStorage. No se encontró registro de service worker en el código |
| Archivos sensibles por HTTP local | Las cinco rutas sondeadas devolvieron el HTML de la SPA, no los archivos solicitados. No se interpretó el estado `200` como fuga |
| Fragmentos mal formados, con recarga real | `#%` y `#%E0%A4%A` produjeron `URI malformed`; un fragmento HTML correctamente codificado no ejecutó código |
| Portafolio PDF | 10 páginas, sin cifrado ni claves de acciones ejecutables identificadas por el parser. Contiene metadatos de creación/edición y una especificación de archivo `CAI_Attachment_File.c2pa` de relación `C2PA_Manifest`; no se identificó un adjunto ejecutable. No es un análisis antimalware ni una validación criptográfica de C2PA |

Las pruebas dinámicas utilizaron Microsoft Edge con Playwright contra `dist/`, servido por un preview enlazado a `127.0.0.1:4173`. La apertura de WhatsApp se interceptó para inspeccionar las URLs sin enviar consultas reales ni comunicarse con la cuenta empresarial. Se usaron únicamente datos ficticios. Las herramientas auxiliares se instalaron en una carpeta temporal, sin añadir dependencias al proyecto.

La revisión de código no encontró `dangerouslySetInnerHTML`, `innerHTML`, `eval`, construcción dinámica de funciones ni uso del contenido de formularios como HTML. Los destinos externos proceden de configuración local. El escape de React y la codificación de URLs son controles positivos observados; no garantizan seguridad de funcionalidades que se añadan después.

## Orden de atención recomendado

1. Corregir S-01 y comprobar los dos enlaces de reproducción.
2. Resolver el aviso y la minimización de P-01 antes de recibir consultas reales.
3. Aplicar la prevención de H-02 antes de añadir credenciales o nuevas integraciones.
4. Completar H-01 en un alojamiento de prueba y repetir las comprobaciones en la URL final antes de abrir el sitio al público.

## Límites

No se accedió a la administración del repositorio remoto, controles de ramas, cuentas de alojamiento, DNS, certificados reales, CDN, reglas de red, cuenta de WhatsApp, buzón de correo ni cuentas de redes sociales. Los enlaces configurados se inspeccionaron como destinos de salida; su titularidad y sus permisos no se verificaron. Tampoco se revisó malware en todas las imágenes, vulnerabilidades desconocidas de dependencias, extensiones del navegador ni controles de los dispositivos que recibirán los mensajes.

Esta revisión no declara cumplimiento legal ni certifica ausencia total de vulnerabilidades. Su conclusión se limita al código y la configuración disponibles, las dependencias consultadas y las pruebas indicadas.

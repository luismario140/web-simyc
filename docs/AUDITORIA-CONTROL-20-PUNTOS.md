# Control de auditoría: 20 puntos

Fecha de los bloques 1 a 4: 25 de octubre de 2026, America/Bogota.

Acuerdo: evaluar en cuatro bloques de cinco; registrar resultados y pendientes; al completar los 20, recordar cualquier punto sin evaluar o sin verificar y consolidar los cambios acordados. Durante la evaluación no se modificó la aplicación. Posteriormente se inició la resolución local solicitada por el usuario; véase [seguimiento de correcciones](SEGUIMIENTO-SEGURIDAD.md).

**Avance: 20/20 puntos evaluados.** No falta ningún número. «No aplica» describe una función ausente en la arquitectura actual; no significa que se hayan probado permisos de un sistema inexistente. Un punto evaluado puede tener verificaciones externas pendientes; el avance no equivale a 20 controles aprobados sin reservas. Las evidencias de los primeros bloques se conservan como registro histórico; el seguimiento indica cuáles hallazgos se corrigieron después.

## Bloque 1: puntos 1 a 5

| Punto | Evaluación | Resultado y límites |
| --- | --- | --- |
| 1. Permisos por usuario | No aplica en la aplicación actual | No hay cuentas, sesiones, recursos asociados a usuarios ni API para ver, editar o borrar datos. Los IDs de tarjetas y fragmentos de URL seleccionan contenido público local. No hay un recurso ajeno cuyo acceso pueda probarse con otro usuario. |
| 2. Acceso de administradores | No aplica en la aplicación actual | No hay panel administrativo, servidor de aplicación, roles ni mecanismo para asignarlos. Ocultar una opción de interfaz no se usa como control de autorización. No se verificaron los administradores del repositorio, alojamiento, correo o WhatsApp; son servicios externos sin acceso administrativo disponible. |
| 3. Separación entre clientes | No aplica en la aplicación actual | No hay cuentas de empresas/equipos, identificadores de cliente ni datos persistidos por cliente. El campo «empresa» sólo se añade al mensaje que la persona abre en WhatsApp. El acceso del personal a esas conversaciones se administra fuera de esta web y no se verificó. |
| 4. Seguridad de base de datos y archivos privados | No aplica en la aplicación actual | No se encontraron motor de base de datos, clientes de base de datos, SQL, migraciones, funciones de servidor, RLS ni almacenamiento privado con reglas por usuario. Imágenes, fuentes y portafolio PDF son recursos públicos. No existen usuarios o políticas RLS sobre los que ejecutar una matriz de pruebas. Queda pendiente comprobar la raíz publicada y los permisos del alojamiento real. |
| 5. Claves privadas y secretos | Revisado: sin coincidencias de secretos en el alcance inspeccionado | Se revisaron código cliente, configuración, lockfile, `dist/`, historial accesible de Git, configuración de Git y sus reflogs. No se encontraron logs propios de ejecución de la aplicación. No se incluyeron valores de posibles secretos en los resultados. Se mantiene la mejora preventiva H-02 sobre `.gitignore`. |

### Evidencias del bloque

- Se volvió a inventariar el árbol de archivos y se buscaron usos de autenticación, sesiones, roles administrativos, clientes de base de datos, RLS, identificadores de tenant y peticiones a API. Las coincidencias de `role` corresponden a accesibilidad HTML/ARIA, no a permisos de usuarios.
- `package.json`, `vite.config.js`, `src/main.jsx` y `src/App.jsx` describen una SPA estática. No se encontraron rutas API ni código de servidor de aplicación. El servidor de desarrollo de Vite no constituye un sistema de administración de usuarios del producto.
- `src/components/ServiceInquiry/ServiceInquiryDialog.jsx`, `src/config/serviceInquiries.js` y `src/pages/FAQ/FAQ.jsx` preparan mensajes locales y abren WhatsApp. No envían una solicitud a un backend del proyecto para guardar o recuperar recursos privados.
- El nuevo escaneo cubrió 79 archivos candidatos del árbol de trabajo; se omitió contenido binario al aplicar patrones de secretos. Revisó 81 blobs históricos de texto accesibles y el resultado de compilación de 24 archivos. Los recuentos del historial pueden cambiar al añadirse commits; el informe inicial conserva los recuentos de su propia ejecución.
- Patrones examinados: claves privadas, formatos de tokens comunes de proveedores, asignaciones de credenciales y URLs con autenticación. En la revisión adicional de logs/configuración de Git también se buscaron tokens Bearer. Resultado: sin coincidencias. Esto es una búsqueda por patrones y revisión del código, no una garantía de que cualquier secreto de formato arbitrario sea detectable.
- Se inspeccionaron 9 archivos de reflog de Git y `.git/config`, sin coincidencias de los patrones de credenciales. Los datos de identidad propios de Git no se trataron como claves privadas ni se copiaron al registro.
- No se encontraron archivos de log de ejecución propios del proyecto al recorrer el directorio incluyendo archivos ignorados, fuera de dependencias y objetos internos de Git. Los logs del proveedor de alojamiento, CI/CD y servicios externos no están disponibles. No se inspeccionaron logs globales de otras aplicaciones o proyectos del equipo.
- No existen `.env`, `.env.production`, `.env.development` ni `.npmrc` locales. `git check-ignore` indica que sus nombres no están excluidos. Esto es una prevención pendiente, no una credencial filtrada.
- El número de WhatsApp, correo de contacto y enlaces de redes sociales configurados son destinos públicos del sitio; no son claves de acceso.
- No se encontraron archivos `.env`, `.git`, manifiestos npm, `node_modules` ni sourcemaps en `dist/`. El sondeo HTTP local de la auditoría inicial devolvió el HTML de la SPA para las rutas sensibles, no esos archivos reales. Todavía no acredita el alojamiento definitivo.

### Pendientes que deben recordarse al finalizar los 20 puntos

| Referencia | Pendiente | Cuándo puede verificarse |
| --- | --- | --- |
| Punto 2 | Administradores, permisos y asignación de acceso en repositorio, alojamiento y cuentas de contacto | Cuando exista acceso a la configuración correspondiente; no es una prueba realizada de la aplicación |
| Puntos 3 y 5 | Acceso a conversaciones/datos en WhatsApp y permisos de sus operadores | Con acceso a la cuenta empresarial o evidencia de su configuración |
| Puntos 4 y 5 / H-01 | Publicar sólo `dist/` y verificar que el alojamiento no exponga repositorio, archivos privados o logs | Al disponer de proveedor y URL de prueba/final |
| Punto 5 / H-02 | Incorporar exclusiones apropiadas para futuros archivos de secretos y una plantilla sin credenciales | En la fase final de adaptación acordada |
| Punto 5 | Secretos y logs de CI/CD o del alojamiento | Si existen y se obtiene acceso; actualmente no se puede concluir sobre ellos |
| Punto 8 | Confirmar activación de doble factor y recuperación segura en cada cuenta que administra repositorio, alojamiento, correo, WhatsApp y redes enlazadas | Con acceso a la configuración o evidencia de sus titulares; la disponibilidad de la función no acredita su activación |
| Punto 10 / H-01 | Verificar CSP y protección del alojamiento frente a scripts no autorizados | Al disponer del alojamiento real; no se ha demostrado un XSS que requiera corregir el renderizado actual |
| Puntos 11 a 15 / H-01 | Confirmar si el despliegue incorpora funciones, proxies, formularios gestionados o integraciones externas que no están en este repositorio | Al identificar el proveedor y la configuración final; si existen, evaluar las funciones correspondientes antes de cerrar esos controles |

Los pendientes de permisos externos no justifican añadir autenticación, roles o una base de datos a esta web. Si se incorporan esas funciones en el futuro, deben reevaluarse los controles correspondientes con usuarios y solicitudes reales.

## Bloque 2: puntos 6 a 10

| Punto | Evaluación | Resultado y límites |
| --- | --- | --- |
| 6. Registro e inicio de sesión | No aplica en la aplicación actual | No hay registro, autenticación, recuperación de contraseña ni cambios de correo o contraseña. El correo y el número de WhatsApp de configuración son contactos públicos, no identidades de una cuenta de usuario de la web. No se ejecutaron recuperaciones ni cambios en cuentas externas. |
| 7. Sesiones | No aplica en la aplicación actual | No hay cookies de autenticación, tokens de acceso/refresco, sesiones propias, cierre de sesión ni mecanismos de caducidad o revocación. La prueba local con un contexto de navegador nuevo no encontró cookies, localStorage o sessionStorage. Las sesiones de GitHub, WhatsApp, correo y redes sociales están fuera del sitio y no se verificaron. |
| 8. Doble factor de las cuentas administradoras | Evaluado parcialmente: activación pendiente | Se verificó en documentación oficial la disponibilidad de verificación en dos pasos en GitHub, Google/Gmail, WhatsApp, Facebook, Instagram y TikTok. No se obtuvo acceso administrativo para acreditar su activación en las cuentas concretas ni identificar todos sus administradores. Proveedor de alojamiento y dominio todavía no identificados. |
| 9. Inyecciones | Sin destinos de ejecución de SQL o comandos identificados; codificación de URLs revisada | No existen consultas SQL, conectores de base de datos, ejecución de shell ni endpoints del proyecto que interpreten entradas. El flujo de formularios construye texto y lo codifica dentro de un único parámetro `text` con destino fijo. No corresponde afirmar que se probó un motor SQL inexistente. |
| 10. XSS | Revisado: sin XSS identificado en el código y los casos probados | Los campos permanecen como valores de controles y como texto del mensaje. No se encontraron inserciones de HTML arbitrario, evaluación de código ni contenido remoto que alimente el renderizado. Se conservan los límites relativos a configuración confiable y futuras integraciones. La CSP del alojamiento continúa pendiente. |

### Evidencias del bloque 2

- Se revisaron nuevamente `package.json`, `vite.config.js`, `src/App.jsx`, los manejadores de los siete formularios y las rutas de presentación de FAQ, Nosotros, carrusel, tarjetas y enlaces. La búsqueda de autenticación, sesiones y tokens no identificó implementaciones de esas funciones. La función `resetMenus` de Navbar restablece el menú; no recupera contraseñas ni sesiones.
- No se encontraron `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, `DOMParser`, `srcDoc`, procesamiento de `postMessage`, ejecución de procesos ni consultas SQL en el código de aplicación inspeccionado. Esta búsqueda se combinó con la lectura del origen y destino de los datos; la ausencia de una palabra por sí sola no demuestra seguridad.
- Las respuestas de FAQ, títulos y descripciones se presentan como hijos de JSX. Los atributos `href`, `src` y estilos dinámicos revisados provienen de configuración local, recursos importados o cálculos de animación, no de las respuestas de formularios ni de una API de terceros. Un origen comprometido o cambios futuros en esa configuración requieren una nueva evaluación.
- Los fragmentos de URL se usan para elegir página o buscar un ID mediante `getElementById`. No se insertan como HTML. El `URIError` ante fragmentos mal formados sigue registrado como S-01; no se reclasifica como XSS.
- Se amplió la prueba dinámica sobre `dist/` en Edge: cuatro cadenas de prueba en FAQ y en cada formulario de servicio, 28 envíos interceptados en total. Incluyeron etiquetas de imagen con manejador de error, cierre de textarea y etiqueta script, SVG con manejador de carga y una cadena con sintaxis SQL/shell y delimitadores de URL.
- En esos casos el mensaje conservó la cadena como texto, el destino siguió siendo `https://wa.me/573205306790`, sólo existió el parámetro `text` y no apareció un fragmento inyectado. Se interceptó `window.open`: no se enviaron mensajes reales a WhatsApp ni se ejecutaron comandos o consultas contra un sistema externo.
- Se probaron además cuatro cargas reales de la página con esas cadenas codificadas en query y fragmento. No se observó ejecución de los scripts de prueba, creación de la imagen inyectada ni peticiones de imagen al recurso de prueba. No hubo errores de página en estos casos correctamente codificados. Esto no sustituye la prueba separada de fragmentos mal formados de S-01.
- En un contexto limpio del navegador, el preview no devolvió `Set-Cookie`; al finalizar no había cookies en el contexto ni entradas en localStorage o sessionStorage. Esta observación describe el origen local del proyecto y no las cookies de los sitios externos abiertos por un visitante.

### Disponibilidad y activación de doble factor

La disponibilidad se contrastó con documentación del proveedor. No se solicitaron contraseñas, códigos de un solo uso, claves de autenticador ni códigos de recuperación. No se modificó ninguna cuenta.

| Servicio observado | Disponibilidad documentada | Activación en la cuenta del proyecto |
| --- | --- | --- |
| GitHub, remoto del repositorio | [Autenticación de dos factores](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) | No verificada; una URL remota y un commit local no acreditan 2FA |
| Google/Gmail, correo de contacto | [Verificación en dos pasos](https://support.google.com/mail/answer/185839?hl=en-3) | No verificada |
| WhatsApp, canal de consultas | [Verificación en dos pasos](https://faq.whatsapp.com/1920866721452534/) | No verificada; comprobar la opción disponible en la versión y cuenta concretas |
| Facebook, enlace de salida | [Autenticación de dos factores](https://www.facebook.com/help/235353253505947) | No verificada; tampoco se identificaron los perfiles administradores de la página |
| Instagram, enlace de salida | [Autenticación de dos factores](https://www.facebook.com/help/instagram/1124604297705184) | No verificada |
| TikTok, enlace de salida | [Verificación en dos pasos](https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-safety) | No verificada |
| Alojamiento y gestión del dominio | Proveedor aún no identificado | Pendiente de identificar proveedor, administradores y controles |

El punto 8 no está cerrado como «doble factor activado». Para cerrarlo se necesita evidencia del estado de seguridad de cada cuenta administradora, sin compartir secretos, junto con revisión de métodos de recuperación y dispositivos o sesiones vinculados. No hay una función de login en esta aplicación a la que añadir 2FA.

## Bloque 3: puntos 11 a 15

| Punto | Evaluación | Resultado y límites |
| --- | --- | --- |
| 11. Acciones sensibles y CSRF | Formularios revisados; CSRF no aplica al flujo actual | No hay solicitudes autenticadas que cambien estado en un servidor del proyecto. Los siete formularios cancelan el envío HTML normal, preparan texto y abren un enlace fijo de WhatsApp. No cambian contraseñas, permisos, recursos ni datos persistidos. No se considera una vulnerabilidad la ausencia de un token CSRF en este flujo. |
| 12. Archivos subidos | No aplica en la aplicación actual | No hay selector de archivos, carga por arrastre, lectura de archivos de usuario, envío multipart, almacenamiento de cargas ni URLs de descarga privada. El portafolio, imágenes y fuentes se incluyen en el proyecto como recursos públicos. No hay una política de tipos, tamaños o descargas privadas que se pueda probar. |
| 13. SSRF y accesos internos | No aplica en la aplicación actual | No hay servidor de aplicación que reciba una URL del usuario y la consulte. Tampoco se encontraron un proxy configurado en Vite ni funciones de previsualización o descarga remota. Las referencias escritas por el visitante se incorporan como texto al mensaje; no se descargan. Navegar desde el navegador a WhatsApp no constituye una petición de servidor a una URL del usuario. |
| 14. Webhooks | No aplica en el código e integraciones inspeccionados | No hay endpoints receptores, SDK de webhooks, procesamiento de eventos ni integración con WhatsApp Business API. No existen firmas, identificadores de eventos o colas del producto sobre los que probar autenticidad o repetición. Las configuraciones externas del proveedor de despliegue no están disponibles. |
| 15. Pagos y operaciones duplicadas | No aplica en la aplicación actual | No hay cobros, reservas confirmadas, saldos, pedidos, inventario ni transacciones persistidas. Los campos de presupuesto, fecha y duración son datos de una consulta, no una operación comercial confirmada por el sistema. No existe una operación financiera o reserva sobre la que ejecutar solicitudes simultáneas. |

### Evidencias del bloque 3

- Se volvió a inventariar el proyecto, sus dependencias, configuración de Vite y código de formularios sin detectar cambios de aplicación respecto de los bloques anteriores. Se revisaron también `src/config/serviceInquiries.js`, `src/config/navigation.js`, `src/config/whatsapp.js` y el proveedor del diálogo de consultas.
- Los únicos manejadores de envío de formularios son `handleQuestionSubmit` en `src/pages/FAQ/FAQ.jsx` y `handleSubmit` en `src/components/ServiceInquiry/ServiceInquiryDialog.jsx`, reutilizado para los seis servicios. Ambos llaman a `event.preventDefault()` antes de construir el mensaje. `new FormData(form)` extrae valores de controles locales; por sí mismo no envía una solicitud ni sube archivos.
- La validación `required`, los límites de longitud y el rechazo de campos obligatorios con sólo espacios ayudan al visitante. No se los presenta como autenticación, autorización, control CSRF ni protección de una operación de servidor. `noopener,noreferrer` protege la apertura del enlace en otro contexto y tampoco es un mecanismo CSRF.
- Se aprovecharon las pruebas de navegador ya completadas: siete formularios con destino fijo y codificación del texto, apertura de WhatsApp interceptada y ausencia de solicitudes autenticadas o envíos a un backend del proyecto. No se repitieron pruebas de las mismas rutas sin cambios ni se enviaron mensajes reales.
- La búsqueda de cargas de archivos incluyó controles de archivo, `accept`, multipart, `FileReader`, `createObjectURL`, acceso a `files`, `dataTransfer`, manejadores de arrastre de archivos y selectores nativos. Los campos dinámicos definidos son texto, textarea, selección o fecha. El arrastre del carrusel mueve tarjetas; no carga archivos.
- Las descargas e imágenes revisadas proceden de archivos locales y configuración de confianza. En particular, `src/config/navigation.js` importa `docs/PortafolioSIMYC.pdf?url`, que Vite publica como recurso estático. Su disponibilidad pública es intencional y no requiere sesión.
- No se encontraron llamadas de red basadas en entradas del visitante, endpoints de servidor, funciones serverless, credenciales de servicios, configuración de proxy, verificación de firmas webhook ni librerías de pago. Coincidencias de palabras como «reserva» en comentarios o `text-wrap: balance` en CSS no representan reservas o saldos financieros.
- Escribir una URL, sintaxis de una solicitud o datos de pago en un campo libre sólo produce texto dentro de `text` en el destino de WhatsApp. La aplicación no sigue esas URLs ni interpreta esa información como una orden financiera. El tratamiento posterior dentro de WhatsApp y los procesos manuales del negocio no se evaluaron.
- Repetir el clic de continuar puede volver a intentar abrir el chat; el código no confirma reservas ni envía automáticamente el mensaje. No se confunde una posible repetición de pestañas o consultas con una vulnerabilidad de doble cobro. No se ejecutaron pruebas de concurrencia contra operaciones inexistentes.

**Límite y seguimiento:** las conclusiones anteriores corresponden al código y las integraciones visibles. Si el alojamiento añade un proxy, funciones de backend, procesamiento propio de formularios, cargas de archivos, webhooks o pagos, deben evaluarse esos componentes. Queda registrado en H-01 confirmar la configuración del despliegue antes de cerrar la auditoría. P-01 sigue pendiente para el tratamiento de datos que se incluyen en el enlace de WhatsApp; no se elimina al marcar CSRF como no aplicable.

## Bloque 4: puntos 16 a 20

| Punto | Estado | Evidencia y límite |
| --- | --- | --- |
| 16. Solicitudes excesivas | No se pudo verificar | No hay login, cargas, API o llamadas facturables propias. Los formularios sólo preparan un enlace; los límites de longitud no limitan tráfico. Faltan cuotas y configuración de protección del alojamiento/CDN. |
| 17. Dependencias y despliegue | No se pudo verificar | El audit de dependencias de la fase inicial reportó cero vulnerabilidades conocidas; no se volvió a consultar un servicio externo. `clsx` y `tailwind-merge` sólo se referencian desde `src/lib/utils.ts`, que no se importa desde la entrada activa. Faltan la identidad y los permisos del despliegue. |
| 18. Paneles y debug expuestos | No se pudo verificar | La aplicación sólo selecciona páginas públicas en `src/App.jsx:16`. El paquete local de producción no tiene sourcemaps ni cliente HMR; esto no acredita lo que sirve el alojamiento final. |
| 19. Registros y alertas | No se pudo verificar | No hay autenticación propia ni instrumentación de alertas identificada en el cliente. No están disponibles logs, alertas ni auditoría de cambios de los proveedores externos. |
| 20. Copias de seguridad | No se pudo verificar | Git local conserva el código; `git fsck --full --no-reflogs` terminó con código 0 y avisos de objetos sin referencia, sin otros errores. No hay evidencia de copia independiente, control de acceso o restauración desde un proveedor. La posterior prueba local de recuperación se documenta en el seguimiento y no cierra esa parte externa. |

Los puntos 5, 8 y 16 a 20 conservan verificaciones externas pendientes. También quedan fuera de alcance los permisos de servicios externos mencionados en los puntos 2 a 4. No se ejecutaron pruebas contra esos servicios ni se usaron datos reales en este bloque.

## Control de bloques recibidos

| Punto | Tema | Estado |
| --- | --- | --- |
| 6 | Registro e inicio de sesión | Evaluado; no aplica en la aplicación actual |
| 7 | Sesiones | Evaluado; no aplica en la aplicación actual |
| 8 | Doble factor | Evaluado parcialmente; activación externa pendiente |
| 9 | Inyecciones | Evaluado; sin destinos de ejecución identificados |
| 10 | XSS | Evaluado; sin XSS identificado en el alcance probado |
| 11 | Acciones sensibles y CSRF | Formularios revisados; CSRF no aplica al flujo actual |
| 12 | Archivos subidos | Evaluado; no hay cargas de archivos |
| 13 | SSRF | Evaluado; no hay consultas de servidor a URLs del visitante |
| 14 | Webhooks | Evaluado; no existen en el alcance disponible |
| 15 | Pagos y operaciones duplicadas | Evaluado; no hay operaciones transaccionales |
| 16 | Solicitudes excesivas | No se pudo verificar; alojamiento pendiente |
| 17 | Dependencias y despliegue | No se pudo verificar el conjunto; permisos pendientes |
| 18 | Paneles y debug expuestos | No se pudo verificar en producción |
| 19 | Registros y alertas | No se pudo verificar en servicios externos |
| 20 | Copias de seguridad | No se pudo verificar copia independiente ni su restauración |

El [informe inicial](AUDITORIA-SEGURIDAD-2026-10-25.md) conserva los hallazgos originales: S-01 (fragmento de URL mal formado), P-01 (privacidad del enlace de WhatsApp), H-01 (alojamiento por verificar) y H-02 (exclusiones preventivas). El estado posterior de las correcciones está en el [seguimiento](SEGUIMIENTO-SEGURIDAD.md).

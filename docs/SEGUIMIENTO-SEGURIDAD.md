# Seguimiento de seguridad

Fecha: 25 de octubre de 2026, America/Bogota.

Este documento distingue las correcciones locales posteriores a la auditoría de las verificaciones que requieren evidencia de servicios externos. No certifica la seguridad del alojamiento ni de las cuentas administradoras.

## Correcciones locales

| Referencia | Cambio y estado | Comprobación |
| --- | --- | --- |
| S-01 | Corregido el fallo al decodificar un fragmento de URL inválido en `src/App.jsx`. Se ignora el destino inválido y continúa el enfoque del contenido principal. | En la compilación nueva, `#%` y `#%E0%A4%A` no producen excepciones, la página es visible y el foco llega a `main`. También se comprobó un fragmento HTML codificado sin ejecución de código. |
| H-02 / punto 5 | Añadidas exclusiones de `.env`, `.env.*`, `.npmrc`, archivos de claves/certificados y `backups/` en `.gitignore`; se permite `.env.example`. | `git check-ignore` confirma las exclusiones; `.env.example` no queda excluido. No se crearon archivos con secretos. Las reglas de Git no sustituyen los permisos del alojamiento ni garantizan que un archivo no se sirva por HTTP. |
| P-01 | Mitigación parcial: los formularios de FAQ y servicios explican que las respuestas se comparten con WhatsApp al continuar y piden evitar información sensible. | Los avisos están asociados al botón mediante `aria-describedby`. El mecanismo sigue usando texto en una URL; no se lo considera eliminado. Falta definir la política de privacidad y confirmar el tratamiento real por el negocio. |

La compilación, lint y tipos del proyecto original pasaron después de estos cambios. No se añadieron cuentas, backend, CAPTCHA, servicios de analítica ni integraciones de pago. No se probaron servicios externos ni se enviaron mensajes reales.

## Recuperación local: evidencia parcial del punto 20

Se creó un snapshot de los archivos del proyecto seleccionados por Git, incluyendo los archivos de trabajo no ignorados, y se extrajo en una carpeta temporal independiente del directorio de desarrollo. Se compararon hashes SHA-256 de los **82 archivos**: todos coincidieron.

- Snapshot local: `C:/Users/mario/AppData/Local/Temp/symic-restore-7mc7qh3d/snapshot.zip`.
- Carpeta recuperada: `C:/Users/mario/AppData/Local/Temp/symic-restore-7mc7qh3d/restored`.
- Evidencia de hashes: `C:/Users/mario/AppData/Local/Temp/symic-restore-7mc7qh3d/evidence.json`.
- SHA-256 del ZIP: `04d3d5e391b6b54b9e566257ea56e6ecfa78f54cb06dc6623722cd9323354ed9`.

El snapshot es anterior a esta actualización de documentos de seguimiento. Incluye las correcciones de aplicación y exclusiones privadas. No incluye `.git`, dependencias, `dist/`, archivos ignorados ni configuración de servicios externos.

La instalación de comprobación terminó correctamente con `npm ci --offline --ignore-scripts --no-audit --no-fund`: 179 paquetes instalados desde la caché local, sin consultas a servicios externos. La carpeta recuperada ejecutó `npm run build` con éxito y produjo el mismo nombre de bundle de aplicación que la carpeta original (`index-_fROW1Xf.js`). Esta evidencia acredita la recuperación de los archivos seleccionados y la compilación usando la caché disponible; no demuestra que esa caché exista en otro equipo.

**Límite:** esta prueba usa el mismo equipo y una carpeta temporal. No es una copia independiente, no acredita retención o permisos de un proveedor y puede desaparecer al limpiarse los temporales. El usuario indicó que el repositorio está en GitHub y que un amigo tiene un clon. Son copias externas declaradas; no se verificaron su sincronización, permisos ni restauración. El punto 20 sigue pendiente hasta acreditar la cobertura y recuperación desde una de esas copias, junto con la configuración del alojamiento.

## Información aportada por el usuario

- Proveedor: **Hostinger**. Producto y plan exactos aún desconocidos; no se asumió hosting compartido, VPS ni Website Builder.
- Doble factor de las cuentas: el usuario desconoce su estado. Se mantiene como no verificado.
- Copias externas declaradas: repositorio en GitHub y clon en el equipo de un amigo. No hubo acceso a esas copias ni pruebas contra servicios externos.
- Se consultó documentación pública oficial de Hostinger para preparar la [guía de verificación](HOSTINGER-SEGURIDAD.md). Esto no implicó iniciar sesión, inspeccionar la cuenta, modificar servicios ni probar el sitio publicado.

## Pendientes externos y evidencia requerida

| Puntos | Evidencia concreta necesaria | Estado |
| --- | --- | --- |
| 5 | Configuración de secretos y registros de CI/alojamiento, con valores privados ocultos. | No se pudo verificar. La prevención local H-02 sí se aplicó. |
| 8 | Estado de doble factor, responsables y métodos de recuperación de GitHub, correo, WhatsApp y cuentas de administración de los servicios elegidos, sin códigos ni claves. | No se pudo verificar. |
| 16 | Plan de Hostinger, límites de tráfico/consumo, protección de CDN y alertas de costos. | Proveedor identificado; controles efectivos no verificados. No existen endpoints propios que justifiquen añadir un límite cliente como protección de servidor. |
| 17 | Identidad que despliega, permisos efectivos, definición de CI y aprobaciones de publicación. | No se pudo verificar. Las dependencias sin uso siguen siendo candidatas a limpieza; no se eliminaron ni actualizaron sin necesidad funcional. |
| 18 | Producto de Hostinger, raíz publicada, dominio, HTTPS, cabeceras, funciones o proxies añadidos por el alojamiento. | No se pudo verificar. No se publicaron cambios ni se inspeccionaron URLs externas. |
| 19 | Configuración de registros/alertas y evidencia redactada o sintética de notificación ante eventos sensibles. | No se pudo verificar. No deben registrarse cuerpos de consultas ni URLs con datos personales. |
| 20 | Cobertura, sincronización, permisos y restauración del repositorio/clon externo declarado; copias de la configuración final de Hostinger. | Hay recuperación local por hashes, instalación offline y compilación correctas. No se verificaron ni restauraron las copias externas. |

No se necesitan contraseñas, códigos de autenticación, claves API ni copias de datos personales para aportar esa evidencia. Basta acceso de lectura adecuado o exportaciones redactadas. La configuración de alojamiento se preparará para el producto de Hostinger que se identifique, sin asumir que admite un formato concreto de configuración.

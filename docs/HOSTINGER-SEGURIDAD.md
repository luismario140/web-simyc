# Verificación de Hostinger antes de publicar

Proveedor confirmado por el usuario: Hostinger. Producto/plan, estado de doble factor y configuración del sitio aún no verificados. Esta guía no afirma que los controles estén activos y no autoriza publicar o restaurar sobre un sitio real.

## 1. Identificar el producto

En la cuenta de Hostinger, revisar el nombre de la suscripción. Para hosting web, la documentación indica **Sitios web → Panel/Dashboard → Plan de hosting → Detalles del plan**. Si no aparece esa ruta, revisar la suscripción o la sección VPS; no comprar ni cambiar de plan para completar la auditoría.

Compartir sólo el nombre del producto y plan. No hacen falta IP, datos de facturación ni credenciales. Este dato determina si corresponde configurar un alojamiento estático mediante el administrador de archivos, un servidor VPS u otro producto.

Fuente: [detalles del plan de Hostinger](https://www.hostinger.com/es/support/1583276-como-encontrar-los-detalles-del-plan-de-hosting-en-hostinger/).

## 2. Verificar la cuenta administradora

En Hostinger, abrir el perfil y **Seguridad**. Revisar el estado de la autenticación de dos factores. Si está desactivada, el titular puede configurarla; la documentación recomienda una aplicación autenticadora. Guardar los códigos de recuperación en un lugar privado, fuera del repositorio y del chat.

Registrar solamente: activada/no activada, método y responsable de la cuenta. No compartir QR, contraseña, códigos ni archivos de recuperación. Después revisar los estados equivalentes en GitHub, correo y WhatsApp con sus respectivos titulares; conocer el estado de una cuenta no acredita el de las demás.

Fuente: [doble factor de Hostinger](https://www.hostinger.com/support/4888148-how-to-set-up-two-factor-authentication-on-your-hostinger-account/). Las fuentes de los demás proveedores están en [el control de auditoría](AUDITORIA-CONTROL-20-PUNTOS.md).

## 3. Confirmar cobertura de las copias

El usuario declara un repositorio en GitHub y un clon en otro equipo. Registrar qué versión guarda cada copia y quién puede acceder a ella. La prueba local de recuperación ya está descrita en [el seguimiento](SEGUIMIENTO-SEGURIDAD.md), pero todavía no se recuperó desde esas copias externas.

Si el producto contratado incluye copias del alojamiento, revisar en su panel la sección **Backups/Copias de seguridad**, las fechas disponibles y la cobertura. No restaurar encima de un sitio real durante esta revisión. La frecuencia y las funciones disponibles dependen del producto y del plan; no se dan por contratadas.

Una copia del código no incluye automáticamente DNS, permisos, cabeceras configuradas en el proveedor ni mensajes de WhatsApp. Definir por separado qué configuración se necesita para recuperar el servicio completo. Para cerrar el control, usar una copia externa en un entorno aislado y documentar versión, fecha y resultado sin datos privados.

Fuente: [copias y descargas de Hostinger](https://www.hostinger.com/support/5981435-how-to-download-backups-at-hostinger/).

## 4. Datos para preparar el despliegue

Una vez identificado el producto, reunir:

- Raíz que se publicará y método de despliegue: manual o automatizado.
- Administradores y permisos de la identidad que publica.
- Configuración de HTTPS, cabeceras y caché.
- Límites de tráfico, consumo y alertas disponibles en el plan.
- Registros, retención, responsables y alertas ante cambios o accesos sensibles.

La aplicación debe construirse localmente y publicar sus archivos de `dist/` cuando el producto permita alojar ese resultado estático. No subir la raíz del repositorio, `.git`, dependencias, archivos privados o copias ZIP. No usar el servidor de desarrollo o `vite preview` como servidor de producción.

No se instaló un `.htaccess` ni una configuración de Nginx porque todavía no se sabe qué servidor o producto se utilizará. Tampoco se añadieron límites de uso de un backend inexistente. La configuración concreta debe prepararse y revisarse para el producto confirmado antes de publicarla.

## Registro pendiente

| Control | Estado actual |
| --- | --- |
| Producto/plan | Pendiente de identificar |
| Doble factor de Hostinger | Estado desconocido |
| Doble factor de GitHub/correo/WhatsApp | Estado desconocido |
| Copias externas de código | Declaradas por el usuario; sincronización y permisos sin verificar |
| Recuperación local del código | Verificada por hashes, instalación offline y compilación |
| Recuperación desde copia externa | Sin verificar |
| Cabeceras/HTTPS/raíz publicada | Sin verificar |
| Cuotas, registros y alertas | Sin verificar |

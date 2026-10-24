# Carrusel 3D de SIMYC

El componente de referencia se adaptó a las seis tarjetas de «SIMYC en una mirada». Conserva el giro cilíndrico y los gestos de Motion, con el contenido real de SIMYC, controles de teclado y un detalle ampliado accesible. No necesita proveedores de contexto ni fotografías externas.

## Dónde modificarlo

- Textos y orden: `src/config/about.js`, propiedad `overview.cards`. Conserva los `id` para mantener sus iconos.
- Colores, relieve, brillo y tamaños: `src/components/ui/3d-carousel.css`.
- Profundidad, sensibilidad del arrastre e iconos: `src/components/ui/3d-carousel.tsx`, comentarios `TAMAÑO Y PROFUNDIDAD` e `ICONOS`.
- Integración: `src/pages/About/About.jsx`.
- Demo reutilizable con contenido real: `src/components/ui/3d-carousel-demo.tsx`.

El carrusel gira automáticamente, despacio, sin botones ni puntos de navegación. Al presionarlo con el mouse o el dedo se detiene y permite arrastrar horizontalmente. Después de soltar, espera 3,5 segundos para retomar el giro. Ajusta estos valores en los comentarios `VELOCIDAD AUTOMÁTICA` y `PAUSA TRAS ARRASTRAR` del componente.

Con foco de teclado, el giro se detiene: las teclas izquierda/derecha cambian de tarjeta e Inicio/Fin seleccionan los extremos. La tarjeta central abre su texto completo; Escape cierra ese detalle y devuelve el foco. El desplazamiento vertical sigue disponible en celular. Se pausa fuera de pantalla, al ocultar la pestaña y mientras el detalle está abierto. Con movimiento reducido, conserva el manejo manual sin giro automático.

## Estructura y dependencias

El proyecto original era React/Vite con JavaScript y CSS. Ahora admite componentes TypeScript y Tailwind sin convertir los archivos existentes. `src/components/ui` es el equivalente a `/components/ui` dentro de este proyecto: centraliza componentes reutilizables y coincide con el alias de shadcn `@/components/ui`.

`components.json` configura las rutas de shadcn. `@/lib/utils` proporciona `cn`. Tailwind se configura en `vite.config.js` y `src/styles/tailwind.css`; se cargan tema y utilidades, sin Preflight, para conservar los estilos actuales. La paleta de los componentes nuevos está definida en ese CSS. No se ejecutó un generador que reescriba el diseño existente.

En otra copia de este repositorio basta ejecutar:

```bash
npm install
npm run dev
```

Si Vite ya estaba abierto antes de instalar las nuevas dependencias, detenlo con `Ctrl+C` y vuelve a ejecutar `npm run dev`. Esto carga el plugin de Tailwind en desarrollo. Un servidor con la configuración anterior puede mostrar un error `ENOENT` al buscar `tailwindcss/theme.css`, aunque la compilación de producción funcione.

Para revisar los cambios:

```bash
npm run typecheck
npm run lint
npm run build
```

Para agregar después un componente de shadcn a este proyecto configurado:

```bash
npx shadcn@latest add button
```

Para preparar otro proyecto Vite existente manualmente, las dependencias empleadas son:

```bash
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D typescript typescript-eslint tailwindcss @tailwindcss/vite @types/node
```

Además de instalar paquetes, hay que configurar el plugin de Tailwind, los imports CSS, `tsconfig.json`, el alias `@` y `components.json`, como en este repositorio. Para crear un proyecto nuevo mediante el CLI de shadcn, usa `npx shadcn@latest init --template vite` en una carpeta nueva.

La configuración sigue las guías oficiales de [shadcn para Vite](https://ui.shadcn.com/docs/installation/vite), [Tailwind para Vite](https://tailwindcss.com/docs/installation/using-vite) y [capas y Preflight](https://tailwindcss.com/docs/preflight). La animación usa [motion values](https://motion.dev/docs/react-motion-value) y [movimiento reducido](https://motion.dev/docs/react-use-reduced-motion).

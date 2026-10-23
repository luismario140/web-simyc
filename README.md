# React + Vite

## Estructura del proyecto

- `src/main.jsx`: punto de entrada de React y estilos globales.
- `src/App.jsx`: componente principal que muestra `Home`.
- `src/pages/Home/`: página de inicio con su componente y estilos.
- `src/components/Navbar/`: espacio reservado para la barra de navegación; sus archivos están vacíos.
- `src/assets/`: imágenes importadas desde los componentes.
- `public/`: recursos públicos, como `icons.svg` y `favicon.svg`.

Actualmente solo se muestra la página de inicio; no hay un router configurado.
Las páginas van en `src/pages` y los componentes reutilizables en `src/components`.
Desde `src/pages/Home/Home.jsx`, las imágenes se importan con `../../assets/`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

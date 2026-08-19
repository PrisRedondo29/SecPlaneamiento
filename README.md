# Secretaría de Planeamiento - UNLU

Landing page moderna de la Secretaría de Planeamiento de la Universidad Nacional de Luján, desarrollada con [Astro](https://astro.build) y estilos con [Tailwind CSS](https://tailwindcss.com).

## Acerca del proyecto

Este proyecto busca modernizar la presencia digital de la Secretaría de Planeamiento de la UNLU, ofreciendo una landing page rápida, accesible y fácil de mantener.

## Tecnologías

- **Astro** v7 - Framework web con soporte SSR
- **Tailwind CSS** v4 - Framework de utilidades CSS
- **TypeScript** - Tipado estático
- **Vite** - Bundler de desarrollo

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Vista previa del build
pnpm preview
```

> **Requisito:** Node.js >= 22.12.0

## Estructura del proyecto

```
src/
├── assets/       # Imágenes y recursos estáticos
├── components/   # Componentes reutilizables
├── layouts/      # Plantillas de layout
└── pages/        # Páginas del sitio
```

## Configuración de Tailwind

El proyecto usa Tailwind CSS v4 integrado mediante el plugin `@tailwindcss/vite` en `astro.config.mjs`. No se requiere archivo de configuración separado; las clases se usan directamente en los componentes `.astro`.

```astro
---
// Ejemplo de uso en un componente
---
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 class="text-2xl font-bold text-gray-800">Hola Tailwind</h1>
</div>
```

## Documentación del stack

| Tecnología | Documentación |
|---|---|
| Astro | [docs.astro.build](https://docs.astro.build/) |
| Tailwind CSS v4 | [tailwindcss.com/docs](https://tailwindcss.com/docs/installation/using-vite) |
| Astro + Tailwind | [docs.astro.build/guides/styling](https://docs.astro.build/guides/styling/#tailwind) |
| TypeScript | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| Vite | [vite.dev](https://vite.dev/) |
| Node.js | [nodejs.org/docs](https://nodejs.org/docs/latest/api/) |

## Licencia

Proyecto interno de la UNLU.

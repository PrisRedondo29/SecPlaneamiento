<<<<<<< Updated upstream
# SecPlaneamiento
Modernización web de la Secretaria de planeamiento unlu
=======
# Secretaría de Planeamiento - UNLU

Landing page moderna de la Secretaría de Planeamiento de la Universidad Nacional de Luján, desarrollada con [Astro](https://astro.build) y estilos con [Tailwind CSS](https://tailwindcss.com).

## Acerca del proyecto

Este proyecto busca modernizar la presencia digital de la Secretaría de Planeamiento de la UNLU, ofreciendo un sitio web multipágina, rápido, accesible y fiel al diseño institucional aprobado por la Secretaría. Utiliza los colores del escudo de la UNLu (verde, dorado y rojo) como paleta principal.

## Tecnologías

- **Astro** v7 - Framework web con soporte SSR y sistema de páginas/componentes
- **Tailwind CSS** v4 - Framework de utilidades CSS (integrado vía plugin Vite)
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
secretaria-planeamiento/
├── public/
│   ├── favicon.svg        # Escudo institucional UNLu
│   ├── hero-campus.jpg    # Imagen del campus
│   ├── mapa-unlu.png      # Mapa del campus numerado
│   └── unlu-logo.svg      # Logo "UNLu · Universidad Nacional de Luján"
├── src/
│   ├── components/
│   │   ├── Navbar.astro       # Barra de navegación de dos niveles
│   │   ├── Footer.astro       # Pie de página institucional
│   │   ├── ContactForm.astro  # Formulario de contacto
│   │   ├── InterviewCard.astro
│   │   └── StatCard.astro
│   ├── layouts/
│   │   └── Layout.astro       # Layout base con Navbar y Footer
│   ├── pages/
│   │   ├── index.astro           # Página de Inicio (en desarrollo por otro equipo)
│   │   ├── la-secretaria.astro   # La Secretaría (en desarrollo por otro equipo)
│   │   ├── autoevaluacion.astro  # Autoevaluación Institucional ✅
│   │   ├── plan-desarrollo.astro # PDI (en desarrollo por otro equipo)
│   │   └── contacto.astro        # Contacto ✅
│   └── styles/
│       └── global.css         # Variables de color UNLu y estilos globales
```

## Páginas implementadas

### Autoevaluación Institucional (`/autoevaluacion`)
- Banner verde con enlace al Informe de Autoevaluación (Google Drive)
- Sección "Proceso de Autoevaluación Institucional" con texto oficial del HCS
- Descripción de las 6 dimensiones de análisis y enlace al análisis final
- Galería de 10 entrevistas multimedia con previsualizaciones:
  - Iframes de YouTube (Mario Oloriz, Patricia Azparren)
  - Players de Soundcloud (3 audios de Radio UNLu)
  - Posts de Facebook (3 publicaciones)
  - Mockups de ventana de navegador para artículos de Prensa UNLu (HTTP)
- Scroll suave desde los sub-ítems del navbar (`#informe`, `#encuestas`, `#entrevistas`)

### Contacto (`/contacto`)
- Hero verde compacto con:
  - Logo institucional UNLu (filtro blanco sobre fondo verde)
  - Tarjetas de correo y teléfono con efecto glassmorphism
- Sección de Atención al Público con toggle/acordeón integrado:
  - Muestra horarios y botón "Cómo llegar" (enlace a Google Maps)
  - Teaser del mapa del campus (con gradiente y animación) que invita al clic
  - Al expandir: mapa completo del campus UNLu con indicador del edificio 8 (Rectorado/Secretarías)
- Formulario de contacto con 4 campos de texto libre:
  - Su nombre
  - Su dirección de correo electrónico
  - Asunto
  - Mensaje

## Componentes principales

### Navbar (`Navbar.astro`)
- **Nivel 1:** Fondo blanco con escudo UNLu (circular), título de la secretaría y barra de búsqueda.
  - Barra de búsqueda: fondo gris medio por defecto, fondo claro al enfocar, con transición suave.
- **Separador tricolor:** Línea de 3px dividida en partes iguales: verde / dorado / rojo (colores institucionales).
- **Nivel 2:** Fondo verde oscuro (`unlu-green-dark`) con links de navegación.
  - Al hover, los botones se aclaran (`bg-unlu-green`).
  - El ítem activo se resalta con borde inferior dorado.
  - Dropdowns con sub-secciones en hover.
- Menú colapsable para dispositivos móviles con botón hamburguesa.

### Footer (`Footer.astro`)
- Fondo verde oscuro con borde superior dorado.
- Tres columnas: información institucional, secciones del sitio y datos de contacto.
- Columna "Contacto" incluye: correo, teléfono y enlace a la **Guía para Internos** (guiatel.unlu.edu.ar).

### ContactForm (`ContactForm.astro`)
- Formulario limpio con 4 campos de texto libre requeridos.
- Validación HTML5 nativa (`required`).
- Notificación de éxito temporal al enviar (mock, sin backend).

## Paleta de colores institucionales

Definidos como variables CSS en `global.css`:

| Variable | Color | Hex |
|---|---|---|
| `--color-unlu-green` | Verde institucional | `#008541` |
| `--color-unlu-gold` | Dorado institucional | `#f9c540` |
| `--color-unlu-red` | Rojo institucional | `#b62d2e` |
| `--color-unlu-black` | Negro institucional | `#231f20` |

## Configuración de Tailwind

El proyecto usa Tailwind CSS v4 integrado mediante el plugin `@tailwindcss/vite` en `astro.config.mjs`. Los colores institucionales se definen como tokens CSS en `global.css` y se referencian con clases como `bg-unlu-green`, `text-unlu-gold`, etc.

## Documentación del stack

| Tecnología | Documentación |
|---|---|
| Astro | [docs.astro.build](https://docs.astro.build/) |
| Tailwind CSS v4 | [tailwindcss.com/docs](https://tailwindcss.com/docs/installation/using-vite) |
| Astro + Tailwind | [docs.astro.build/guides/styling](https://docs.astro.build/guides/styling/#tailwind) |
| TypeScript | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| Vite | [vite.dev](https://vite.dev/) |
| Node.js | [nodejs.org/docs](https://nodejs.org/docs/latest/api/) |

## Notas de desarrollo

- Las páginas `index.astro`, `la-secretaria.astro` y `plan-desarrollo.astro` están intencionalmente en blanco ya que serán desarrolladas por otros integrantes del equipo. El Navbar y Footer siguen siendo visibles en todas las páginas.
- Los artículos de Prensa UNLu (`http://www.prensa.unlu.edu.ar`) no pueden incrustarse en iframes sobre HTTPS por restricciones de contenido mixto; se representan como mockups de ventana de navegador con enlace directo.

## Licencia

Proyecto interno de la UNLU.
>>>>>>> Stashed changes

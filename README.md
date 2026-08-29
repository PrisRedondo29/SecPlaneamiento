# Secretaría de Planeamiento - UNLu

Sitio web oficial de la Secretaría de Planeamiento de la Universidad Nacional de Luján, desarrollado con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com).

---

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (localhost:4321)
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

> **Requisito:** Node.js >= 22.12.0

---

## 🧱 Sistema de Bloques — Arquitectura de Contenido (Opción C)

> **Este proyecto usa un sistema de Bloques como fuente única de verdad para el contenido de las páginas.**
> Comprender esta arquitectura es **obligatorio** antes de modificar o crear páginas.

### ¿Qué es el Sistema de Bloques?

Las páginas del sitio **no contienen HTML de contenido directamente**. En cambio, cada página está definida por un archivo JSON que es un array de "bloques". Cada bloque es un objeto con un tipo y sus propiedades configurables.

Esto garantiza que:
1. El **Dashboard de Administración** y la **página pública** muestren exactamente el mismo resultado.
2. El administrador puede editar el contenido sin tocar código.
3. Agregar un nuevo componente visual al sitio es un proceso estandarizado.

### Flujo de datos

```
src/data/pages/<pagina>.json   ← Fuente de verdad del CONTENIDO
         ↓
src/blocks/block-registry.js   ← Fuente de verdad de los TIPOS de bloque (render)
         ↓
src/blocks/BlockRenderer.astro ← Lee el JSON y llama a render() de cada bloque
         ↓
src/pages/<pagina>.astro       ← Solo importa JSON + BlockRenderer (sin HTML de contenido)
         ↓
Página pública HTML estática   ← El output final para el visitante
```

Y en paralelo, el Dashboard:
```
src/blocks/block-registry.js (función render())
         ↓
AdminContentEditor.astro → CLIENT_BLOCK_REGISTRY (espejo JS del registro)
         ↓
Vista Previa del editor       ← Idéntica a la página real
```

---

## Estructura del proyecto

```
secretaria-planeamiento/
├── public/
│   ├── escudo.svg             # Escudo institucional UNLu
│   ├── hero-campus.jpg        # Imagen del campus
│   ├── mapa-unlu.png          # Mapa del campus numerado
│   └── unlu-logo.svg          # Logo UNLu
│
├── src/
│   │
│   ├── blocks/                ← 🧱 SISTEMA DE BLOQUES
│   │   ├── block-registry.js  ← REGISTRO CENTRAL — único archivo a tocar para nuevos bloques
│   │   └── BlockRenderer.astro← Componente que renderiza un array de bloques como HTML
│   │
│   ├── data/
│   │   └── pages/             ← 📄 CONTENIDO DE PÁGINAS (JSON)
│   │       ├── autoevaluacion.json
│   │       ├── la-secretaria.json
│   │       └── plan-desarrollo.json
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminContentEditor.astro  ← Editor de bloques del Dashboard
│   │   │   ├── AdminBar.astro            ← Barra flotante de administración
│   │   │   ├── AdminOverview.astro
│   │   │   ├── AdminFileManager.astro
│   │   │   ├── AdminProfile.astro
│   │   │   └── AdminSiteManager.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── ContactForm.astro
│   │   └── Breadcrumb.astro
│   │
│   ├── layouts/
│   │   └── Layout.astro       # Layout base con Navbar, Footer y AdminBar
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── autoevaluacion.astro   ← Solo importa JSON + BlockRenderer
│   │   ├── la-secretaria.astro    ← Solo importa JSON + BlockRenderer
│   │   ├── plan-desarrollo.astro  ← Solo importa JSON + BlockRenderer
│   │   ├── contacto.astro         ← Página con formulario (no usa bloques aún)
│   │   └── admin.astro            ← Dashboard de administración
│   │
│   └── styles/
│       └── global.css         # Variables de color UNLu y estilos globales
```

---

## 🔧 Cómo añadir un nuevo bloque

Seguí estos 3 pasos **en orden**. Si se omite alguno, el bloque no aparecerá en el editor del Dashboard.

### Paso 1 — Registrar el bloque en `block-registry.js`

Abrir [`src/blocks/block-registry.js`](src/blocks/block-registry.js) y añadir un objeto al array `BLOCK_REGISTRY`:

```js
{
  // ID único del bloque — usar kebab-case
  id: "mi-nuevo-bloque",

  // Nombre legible que ve el administrador en el Dashboard
  name: "Mi Nuevo Bloque",

  // Categoría para organizar la galería del editor
  // Valores disponibles: "destacados" | "estructura" | "contenido" | "media"
  category: "contenido",

  // Ícono emoji que aparece en la lista y la galería del editor
  icon: "📌",

  // Descripción corta del bloque (ayuda al admin a entender para qué sirve)
  description: "Descripción breve de qué hace este bloque.",

  // Campos editables por el administrador (sin ver HTML)
  fields: [
    {
      key: "titulo",          // Nombre de la prop en el JSON de la página
      label: "Título",        // Etiqueta que ve el admin
      type: "text",           // Tipo: "text" | "url" | "textarea" | "richtext" | "json"
      placeholder: "Ej: Mi título...",
      default: "",            // Valor por defecto al insertar el bloque
    },
    // Agregar más campos según sea necesario...
  ],

  // Valores de ejemplo para la previsualización en la galería del editor
  preview: {
    titulo: "Ejemplo de título",
  },

  // ⚠ FUNCIÓN CRÍTICA: genera el HTML real del bloque.
  // Debe producir HTML idéntico al componente Astro correspondiente.
  // Solo usar estilos inline (style="...") — NO usar clases de Tailwind,
  // ya que el editor no puede procesarlas.
  render(props) {
    return `<div style="padding:1rem;border:1px solid #e2e8f0;border-radius:0.5rem;">
      <h3 style="font-weight:700;color:#111827;">${props.titulo || ''}</h3>
    </div>`;
  }
}
```

### Paso 2 — Añadir el mismo bloque al espejo del cliente en `AdminContentEditor.astro`

Abrir [`src/components/admin/AdminContentEditor.astro`](src/components/admin/AdminContentEditor.astro) y localizar el array `CLIENT_BLOCK_REGISTRY` dentro del tag `<script is:inline>`.

Añadir la misma entrada con la misma función `render()`. Este espejo es necesario porque el editor corre en el navegador del usuario, sin acceso a los módulos de Node.js.

> **Regla de sincronía:** `BLOCK_REGISTRY` en `block-registry.js` y `CLIENT_BLOCK_REGISTRY` en el editor deben estar siempre sincronizados. Si un bloque existe en uno pero no en el otro, aparecerá como "bloque desconocido" en el editor.

### Paso 3 — Usar el bloque en una página JSON

Abrir el archivo JSON correspondiente en `src/data/pages/` y añadir el bloque al array `blocks`:

```json
{
  "id": "block-nuevo-unico",
  "type": "mi-nuevo-bloque",
  "props": {
    "titulo": "Contenido real de este bloque en esta página"
  }
}
```

El ID del bloque (`"block-nuevo-unico"`) puede ser cualquier string único dentro del array de la página.

---

## 📄 Estructura de un archivo JSON de página

```json
{
  "pageId": "nombre-de-la-ruta",
  "meta": {
    "title": "Título de la pestaña del navegador · Secretaría de Planeamiento UNLu",
    "activeSection": "nombre-de-la-ruta",
    "heroTitle": "Título visible en la cabecera verde",
    "heroBadge": "TEXTO DEL BADGE DORADO",
    "heroSubtitle": "Bajada descriptiva de la página."
  },
  "blocks": [
    {
      "id": "block-1",
      "type": "cta-banner",
      "props": {
        "etiqueta": "DOCUMENTO PRINCIPAL",
        "titulo": "Haga click aquí para acceder...",
        "url": "https://...",
        "textoBoton": "Acceder"
      }
    },
    {
      "id": "block-2",
      "type": "texto-rico",
      "props": {
        "contenido": "<p>Texto del párrafo...</p>"
      }
    }
  ]
}
```

---

## 📋 Tipos de bloque disponibles

| ID | Nombre | Descripción |
|---|---|---|
| `cta-banner` | Banner de Documento | Banner verde con botón dorado para enlazar a documentos externos (Drive, PDF, etc.) |
| `seccion-badge` | Sección con Badge y Título | Tarjeta blanca con etiqueta de categoría, título y barra tricolor institucional |
| `lista-numerada` | Lista Numerada Circular | Lista con números sobre círculos verdes institucionales |
| `link-card` | Tarjeta de Enlace Externo | Tarjeta gris con hover dorado para enlazar recursos externos |
| `grilla-medios` | Grilla de Medios | Grilla de 2 columnas con YouTube, SoundCloud o tarjetas de enlace |
| `texto-rico` | Texto Enriquecido | Bloque de texto libre con negritas, cursivas y listas |
| `texto-destacado` | Texto Destacado | Párrafo en verde bold para mensajes importantes o conclusiones |
| `separador` | Separador de Sección | Divisor decorativo de puntos para separar secciones visualmente |

---

## 🔐 Dashboard de Administración

Acceso local: [localhost:4321/admin](http://localhost:4321/admin)

- **Usuario:** `admin`
- **Contraseña:** `admin`

El Dashboard permite editar el contenido de las páginas sin tocar código. Los cambios se guardan en el `localStorage` del navegador (modo demostración local). Las páginas públicas siguen mostrando el contenido de los archivos JSON del servidor hasta que los cambios sean integrados al código por un desarrollador.

> **Nota:** El guardado local es para demostración. En producción, el administrador exportará el JSON editado y un desarrollador lo integrará al repositorio.

---

## Paleta de colores institucionales

| Variable CSS | Color | Hex |
|---|---|---|
| `--color-unlu-green` | Verde institucional | `#008541` |
| `--color-unlu-green-dark` | Verde oscuro | `#005c2e` |
| `--color-unlu-gold` | Dorado institucional | `#C8A951` |
| `--color-unlu-red` | Rojo institucional | `#c0392b` |
| `--color-unlu-black` | Negro institucional | `#231f20` |

Disponibles como clases Tailwind: `text-unlu-green`, `bg-unlu-gold`, `border-unlu-red`, etc.

---

## Tecnologías

| Tecnología | Versión | Documentación |
|---|---|---|
| Astro | v7 | [docs.astro.build](https://docs.astro.build/) |
| Tailwind CSS | v4 | [tailwindcss.com](https://tailwindcss.com/docs) |
| TypeScript | — | [typescriptlang.org](https://www.typescriptlang.org/docs/) |
| Vite | — | [vite.dev](https://vite.dev/) |
| Node.js | >= 22.12.0 | [nodejs.org](https://nodejs.org/docs/) |

---

## Notas de desarrollo

- **`contacto.astro`** usa un componente propio con formulario y no el sistema de bloques. Esto es intencional ya que su estructura es muy específica y contiene lógica interactiva.
- **`index.astro`** (página de inicio) tampoco usa el sistema de bloques por ahora; está siendo desarrollada por otro equipo.
- Los artículos de Prensa UNLu (`http://www.prensa.unlu.edu.ar`) no pueden incrustarse en iframes sobre HTTPS por restricciones de contenido mixto; se representan como mockups de ventana de navegador con enlace directo.

---

## Licencia

Proyecto interno de la Universidad Nacional de Luján.

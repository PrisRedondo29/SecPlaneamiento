/**
 * BLOCK REGISTRY — Fuente única de verdad del sistema de bloques.
 *
 * Arquitectura Tipo Editor de Documento (WYSIWYG + Bloques Prehechos):
 *   1. Secciones de Contenido: Tarjeta blanca institucional con título, badge y
 *      un editor rico estilo Word/CKEditor donde la persona escribe texto,
 *      negritas, listas, subtítulos y enlaces de manera natural.
 *   2. Bloques Prehechos: Componentes institucionales listos para usar
 *      (Banner verde de documento, Grilla de entrevistas/medios, Tarjeta de enlace).
 *
 * COLOR DORADO INSTITUCIONAL: #f9c540 (claro/brillante)
 * COLOR DORADO OSCURO:        #b07d2c (texto sobre fondo claro)
 */

export const BLOCK_REGISTRY = [

  // ─────────────────────────────────────────────
  // BLOQUES GRANULARES DE ESTRUCTURA
  // ─────────────────────────────────────────────
  {
    id: "titulo-bloque",
    name: "Título / Subtítulo",
    category: "estructura",
    icon: "🔤",
    description: "Bloque de título o subtítulo de sección.",
    fields: [
      { key: "texto", label: "Texto del título", type: "text", placeholder: "Escribí el título aquí..." },
      { key: "nivel", label: "Nivel de encabezado", type: "select", options: [{label: "Título H2", value: "h2"}, {label: "Subtítulo H3", value: "h3"}] }
    ],
    render(p) {
      const tag = p.nivel === 'h3' ? 'h3' : 'h2';
      const size = p.nivel === 'h3' ? 'font-size:1.25rem;' : 'font-size:1.5rem;';
      return `<${tag} style="${size}font-weight:700;color:#111827;font-family:Georgia,serif;margin:1.5rem 0 0.75rem;">${p.texto || ''}</${tag}>`;
    }
  },
  {
    id: "texto-rico",
    name: "Párrafo de Texto",
    category: "estructura",
    icon: "📝",
    description: "Párrafo de texto enriquecido con formato estilo Word.",
    fields: [
      { key: "contenido", label: "Contenido del párrafo", type: "wysiwyg", placeholder: "Escribí tu párrafo aquí..." }
    ],
    render(p) {
      return `<div style="color:#374151;line-height:1.8;font-size:0.9375rem;margin-bottom:1.5rem;">${p.contenido || ''}</div>`;
    }
  },
  {
    id: "lista-puntos",
    name: "Lista de Puntos",
    category: "estructura",
    icon: "📋",
    description: "Lista de elementos o viñetas.",
    fields: [
      { key: "items", label: "Elementos de la lista (uno por línea)", type: "textarea", placeholder: "Elemento 1\nElemento 2\nElemento 3" }
    ],
    render(p) {
      const itemsText = p.items || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco.';
      const lines = itemsText.split('\n').filter(l => l.trim() !== '');
      const listItems = lines.map(item => `<li style="margin-bottom:0.5rem;">${item}</li>`).join('');
      return `<ul style="list-style-type:disc;padding-left:1.5rem;color:#374151;line-height:1.75;margin-bottom:1.5rem;">${listItems}</ul>`;
    }
  },
  {
    id: "cta-banner",
    name: "Banner de Documento",
    category: "prehechos",
    icon: "📄",
    description: "Banner de enlace a documentos con estilo configurable (blanco o verde, tarjeta o botón).",
    fields: [
      { key: "etiqueta",   label: "Etiqueta superior",   type: "text", default: "DOCUMENTO PRINCIPAL" },
      { key: "titulo",    label: "Título del documento", type: "text", placeholder: "Haga click aquí para acceder al Informe..." },
      { key: "url",       label: "Enlace de destino",   type: "url",  placeholder: "https://drive.google.com/..." },
      { key: "estilo",    label: "Color de fondo",      type: "select", options: [{label: "🟢 Verde Institucional (Texto Blanco + Botón Dorado)", value: "verde"}, {label: "🤍 Blanco / Claro (Texto Verde + Icono Rojo)", value: "blanco"}] },
      { key: "tipoBoton", label: "Tipo de enlace",      type: "select", options: [{label: "🔘 Botón a la derecha", value: "boton"}, {label: "🔗 Toda la tarjeta es clickeable", value: "tarjeta"}] },
      { key: "textoBoton",label: "Texto del botón",     type: "text", default: "Acceder" },
    ],
    render(p) {
      const estilo = p.estilo || (p.colorFondo === 'blanco' ? 'blanco' : 'verde');
      const tipoBoton = p.tipoBoton || (p.esClickeableCompleto ? 'tarjeta' : 'boton');
      const titulo = p.titulo || p.text || '';
      const url = p.url || '#';

      if (estilo === 'blanco') {
        if (tipoBoton === 'boton') {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:block;background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #008541;border-radius:0.5rem;padding:1.25rem 1.75rem;text-decoration:none;margin-bottom:1.5rem;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
    <div>
      ${p.etiqueta ? `<span style="display:block;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#b07d2c;margin-bottom:0.25rem;">${p.etiqueta}</span>` : ''}
      <h3 style="font-size:1.0625rem;font-weight:700;color:#008541;font-family:Georgia,serif;margin:0;">${titulo}</h3>
    </div>
    <span style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.625rem 1rem;border-radius:0.5rem;font-weight:700;font-size:0.8125rem;background-color:#008541;color:white;white-space:nowrap;flex-shrink:0;">
      ${p.textoBoton || 'Ver Documento'} →
    </span>
  </div>
</a>`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:1.25rem;text-decoration:none;margin-bottom:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.04);transition:all 0.2s;">
  <div style="display:flex;align-items:center;gap:0.75rem;">
    <svg style="width:1.25rem;height:1.25rem;flex-shrink:0;color:#dc2626;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    <div>
      ${p.etiqueta ? `<span style="display:block;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#b07d2c;margin-bottom:0.15rem;">${p.etiqueta}</span>` : ''}
      <span style="font-weight:700;font-size:0.9375rem;color:#008541;">${titulo}</span>
    </div>
  </div>
</a>`;
      }

      if (tipoBoton === 'tarjeta') {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:block;background-color:#008541;color:white;border-radius:0.5rem;padding:1.5rem 2rem;border-left:4px solid #f9c540;text-decoration:none;margin-bottom:2rem;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
  <div style="display:flex;align-items:center;gap:1rem;">
    <div style="color:#f9c540;flex-shrink:0;">
      <svg style="width:1.75rem;height:1.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    </div>
    <div>
      ${p.etiqueta ? `<span style="display:block;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#f9c540;margin-bottom:0.25rem;">${p.etiqueta}</span>` : ''}
      <h3 style="font-size:1.125rem;font-weight:700;color:white;font-family:Georgia,serif;margin:0;">${titulo}</h3>
    </div>
  </div>
</a>`;
      }

      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display:block;background-color:#008541;color:white;border-radius:0.5rem;padding:1.5rem 2rem;border-left:4px solid #f9c540;text-decoration:none;margin-bottom:2rem;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.5rem;">
    <div style="display:flex;align-items:flex-start;gap:1rem;">
      <div style="color:#f9c540;flex-shrink:0;margin-top:4px;">
        <svg style="width:2rem;height:2rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      </div>
      <div>
        <span style="display:block;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#f9c540;margin-bottom:0.25rem;">${p.etiqueta || 'DOCUMENTO PRINCIPAL'}</span>
        <h3 style="font-size:1.25rem;font-weight:700;color:white;font-family:Georgia,serif;margin:0;line-height:1.3;">${titulo}</h3>
      </div>
    </div>
    </span>
  </div>
</a>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 2: Sección de Contenido Institucional (Tarjeta Blanca con editor estilo Word)
  // ─────────────────────────────────────────────
  {
    id: "seccion-badge",
    name: "Sección de Contenido",
    category: "estructura",
    icon: "🟧",
    description: "Tarjeta blanca institucional con badge, título y editor enriquecido estilo Word para escribir texto, negritas, listas y enlaces.",
    fields: [
      { key: "badge",     label: "Etiqueta (badge superior)", type: "text", placeholder: "PROCESO" },
      { key: "titulo",    label: "Título de la sección",       type: "text", placeholder: "Proceso de Autoevaluación Institucional" },
      { key: "contenido", label: "Cuerpo de la sección (Editor estilo Word)", type: "wysiwyg", placeholder: "Escribí o pegá tu contenido acá..." },
    ],
    render(p, block) {
      let bodyHtml = p.contenido || '';
      if (block && Array.isArray(block.children) && block.children.length > 0) {
        bodyHtml = renderPage(block.children);
      } else if (Array.isArray(p.children) && p.children.length > 0) {
        bodyHtml = renderPage(p.children);
      }
      return `<div style="background:white;border-radius:0.75rem;border:1px solid #e2e8f0;padding:2rem 2.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);margin-bottom:2rem;">
  ${(p.badge || p.titulo) ? `<div style="margin-bottom:1.5rem;">
    ${p.badge ? `<span style="display:inline-block;font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#b07d2c;margin-bottom:0.25rem;">${p.badge}</span>` : ''}
    ${p.titulo ? `<h2 style="font-size:1.5rem;font-weight:700;color:#111827;font-family:Georgia,serif;margin:0 0 0.5rem;line-height:1.25;">${p.titulo}</h2>` : ''}
    <div style="height:3px;background:linear-gradient(to right,#008541,#f9c540,#c0392b);width:9rem;"></div>
  </div>` : ''}
  <div style="color:#374151;line-height:1.8;font-size:0.9375rem;">${bodyHtml}</div>
</div>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 3: Grilla de Medios (Videos, Audios, Noticias)
  // ─────────────────────────────────────────────
  {
    id: "grilla-medios",
    name: "Grilla de Medios / Entrevistas",
    category: "prehechos",
    icon: "🎬",
    description: "Grilla de videos YouTube, SoundCloud o noticias. Permite agregar/editar tarjetas sin escribir código.",
    fields: [
      { key: "badge",       label: "Etiqueta superior",     type: "text",  default: "COMUNICACIÓN" },
      { key: "titulo",      label: "Título de la sección",  type: "text",  placeholder: "Entrevistas" },
      { key: "descripcion", label: "Descripción introductoria", type: "text", placeholder: "A continuación..." },
      { key: "items",       label: "Medios de la grilla",   type: "media-items" },
    ],
    render(p) {
      let items = [];
      try { items = JSON.parse(p.items || '[]'); } catch(e) { items = []; }
      const cards = items.map(item => {
        if (item.tipo === 'youtube') return `<div style="background:white;border-radius:0.75rem;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.05);"><div style="position:relative;padding-bottom:56.25%;background:#000;"><iframe style="position:absolute;inset:0;width:100%;height:100%;" src="https://www.youtube.com/embed/${item.id}" title="${item.titulo || ''}" frameborder="0" allowfullscreen></iframe></div><div style="padding:0.75rem 1rem;background:#f9fafb;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;"><span style="font-weight:700;font-size:0.75rem;color:#1f2937;font-family:Georgia,serif;">${item.titulo || ''}</span><a href="https://www.youtube.com/watch?v=${item.id}" target="_blank" style="font-size:0.75rem;font-weight:700;color:#c0392b;background:rgba(192,57,43,0.1);padding:0.375rem 0.75rem;border-radius:0.5rem;text-decoration:none;">Enlace ↗</a></div></div>`;
        if (item.tipo === 'soundcloud') return `<div style="background:white;border-radius:0.75rem;overflow:hidden;border:1px solid #e5e7eb;"><div style="height:10rem;background:#f8fafc;display:flex;align-items:center;padding:1rem;"><iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(item.url || '')}&color=%23008541&auto_play=false&hide_related=true&show_comments=false&show_user=true"></iframe></div><div style="padding:0.75rem 1rem;background:#f9fafb;border-top:1px solid #f1f5f9;"><span style="font-weight:700;font-size:0.75rem;color:#1f2937;">${item.titulo || ''}</span></div></div>`;
        return `<a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border-radius:0.75rem;overflow:hidden;border:1px solid #e5e7eb;text-decoration:none;"><div style="height:10rem;background:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.5rem;"><span style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1d4ed8;background:#eff6ff;padding:0.25rem 0.75rem;border-radius:9999px;margin-bottom:0.5rem;">${item.plataforma || 'Enlace'}</span><strong style="font-size:0.875rem;color:#1f2937;font-family:Georgia,serif;">${item.titulo || ''}</strong></div><div style="padding:0.75rem 1rem;background:#f9fafb;border-top:1px solid #f1f5f9;"><span style="font-weight:700;font-size:0.75rem;color:#1f2937;">${item.titulo || ''}</span></div></a>`;
      }).join('');
      return `<section style="margin-bottom:3rem;">
  <div style="margin-bottom:1.5rem;">
    <span style="display:inline-block;font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#b07d2c;margin-bottom:0.5rem;">${p.badge || ''}</span>
    <h2 style="font-size:1.5rem;font-weight:700;color:#111827;font-family:Georgia,serif;margin:0 0 0.5rem;">${p.titulo || ''}</h2>
    <div style="height:3px;background:linear-gradient(to right,#008541,#f9c540,#c0392b);width:9rem;"></div>
  </div>
  ${p.descripcion ? `<p style="color:#4b5563;margin-bottom:2rem;line-height:1.75;">${p.descripcion}</p>` : ''}
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;">${cards}</div>
</section>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 4: Tarjeta de Enlace Destacado
  // ─────────────────────────────────────────────
  {
    id: "link-card",
    name: "Tarjeta / Banner de Link",
    category: "prehechos",
    icon: "🔗",
    description: "Tarjeta de enlace externo clara con texto en verde e ícono en rojo.",
    fields: [
      { key: "text", label: "Texto del enlace", type: "text", placeholder: "Ver análisis de respuestas..." },
      { key: "url",  label: "URL de destino",   type: "url",  placeholder: "https://drive.google.com/..." },
    ],
    render(p) {
      return `<a href="${p.url || '#'}" target="_blank" rel="noopener noreferrer" style="display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:1.25rem;text-decoration:none;margin-bottom:1.5rem;">
  <div style="display:flex;align-items:center;gap:0.75rem;">
    <svg style="width:1.25rem;height:1.25rem;flex-shrink:0;color:#dc2626;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    <span style="font-weight:700;font-size:0.9375rem;color:#008541;">${p.text || ''}</span>
  </div>
</a>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 5: Tarjeta de Atención al Público y Mapa
  // ─────────────────────────────────────────────
  {
    id: "card-atencion-mapa",
    name: "Tarjeta de Atención al Público y Mapa",
    category: "prehechos",
    icon: "🗺️",
    description: "Tarjeta verde institucional con horario de atención al público, botón de mapa y teaser del mapa del campus.",
    fields: [
      { key: "badge",       label: "Etiqueta superior",        type: "text",     default: "ATENCIÓN AL PÚBLICO" },
      { key: "horario",     label: "Horario de Atención",       type: "text",     default: "Lunes a viernes · 8:00 a 16:00 hs." },
      { key: "descripcion", label: "Descripción / Detalles",    type: "textarea", default: "Consultas presenciales y recepción de documentación en Mesa de Entradas del Rectorado. La Secretaría de Planeamiento se ubica en el Edificio 8 — Rectorado." },
      { key: "urlMapa",     label: "URL de Google Maps",        type: "url",      default: "https://maps.app.goo.gl/LiaPfuTYbCt3FMuU6" },
      { key: "imagenMapa",  label: "Ruta de la imagen del mapa",type: "text",     default: "/mapa-unlu.png" }
    ],
    render(p) {
      const urlMapa = p.urlMapa || 'https://maps.app.goo.gl/LiaPfuTYbCt3FMuU6';
      const imagenMapa = p.imagenMapa || '/mapa-unlu.png';
      const badge = p.badge || 'ATENCIÓN AL PÚBLICO';
      const horario = p.horario || 'Lunes a viernes - 8:00 a 16:00 hs.';
      const descripcion = p.descripcion || 'Consultas presenciales y recepción de documentación en Mesa de Entradas del Rectorado.';

      return `<div class="card-atencion-mapa-container" data-expanded="false" style="background-color:#008541;border-radius:0.75rem;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.12);margin-bottom:2.5rem;color:white;">
  <!-- CABECERA -->
  <div style="display:flex;flex-wrap:wrap;align-items:stretch;background-color:#008541;">
    <div style="background-color:#005c2e;display:flex;align-items:center;justify-content:center;padding:1.5rem 1.75rem;flex-shrink:0;">
      <svg style="width:2.5rem;height:2.5rem;color:#f9c540;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
    <div style="padding:1.25rem 1.75rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.25rem;flex:1;">
      <div>
        <span style="display:block;font-size:0.625rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#f9c540;margin-bottom:0.15rem;">${badge}</span>
        <h3 style="font-size:1.125rem;font-weight:700;color:white;margin:0 0 0.25rem;">${horario}</h3>
        <p style="font-size:0.8125rem;color:rgba(255,255,255,0.85);margin:0;max-width:34rem;">${descripcion}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;">
        <a href="${urlMapa}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.375rem;background-color:#f9c540;color:#1a1a1a;font-weight:700;font-size:0.8125rem;padding:0.5rem 1rem;border-radius:0.5rem;text-decoration:none;white-space:nowrap;">
          <svg style="width:0.875rem;height:0.875rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>Cómo llegar</span>
        </a>
        <button type="button" onclick="toggleMapExpand(this)" style="display:inline-flex;align-items:center;gap:0.375rem;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.25);color:white;font-weight:600;font-size:0.8125rem;padding:0.5rem 1rem;border-radius:0.5rem;cursor:pointer;white-space:nowrap;transition:all 0.2s;">
          <svg style="width:0.875rem;height:0.875rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <span class="map-btn-text">Ver mapa</span>
          <svg class="map-btn-arrow" style="width:0.75rem;height:0.75rem;transition:transform 0.2s;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- BARRITA TEASER COLAPSADA -->
  <div class="map-teaser-bar" onclick="toggleMapExpandFromTeaser(this)" style="position:relative;height:3rem;background:#005c2e;cursor:pointer;overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <img src="${imagenMapa}" alt="Teaser mapa" style="position:absolute;inset:0;width:100%;height:12rem;object-fit:cover;object-position:top;opacity:0.3;filter:blur(1px);margin-top:-2.5rem;" />
    <div style="position:relative;z-index:10;display:flex;align-items:center;gap:0.5rem;color:#f9c540;font-size:0.6875rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;">
      <svg style="width:0.75rem;height:0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
      <span>VER MAPA DEL CAMPUS</span>
      <svg style="width:0.75rem;height:0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
    </div>
  </div>

  <!-- PANEL MAPA EXPANDIDO -->
  <div class="map-expanded-panel" style="display:none;background:#ffffff;padding:1.25rem;border-top:1px solid rgba(255,255,255,0.1);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;background-color:#005c2e;padding:0.75rem 1.25rem;border-radius:0.5rem;margin-bottom:1rem;color:white;font-size:0.8125rem;">
      <span>La Secretaría de Planeamiento se ubica en el <strong>edificio 8 — Rectorado</strong>, Dpto. Cs. Básicas, Dpto. Tecnología y Secretarías.</span>
      <span style="background-color:#f9c540;color:#1a1a1a;font-weight:800;padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;white-space:nowrap;display:inline-flex;align-items:center;gap:0.375rem;">
        <span style="background:#1a1a1a;color:#f9c540;width:1.125rem;height:1.125rem;border-radius:9999px;display:inline-flex;align-items:center;justify-content:center;font-size:0.625rem;font-weight:900;">8</span>
        <span>Secretaría de Planeamiento</span>
      </span>
    </div>
    <div style="position:relative;border-radius:0.75rem;overflow:hidden;border:1px solid #cbd5e1;background:#f8fafc;padding:0.5rem;">
      <img src="${imagenMapa}" alt="Mapa del Campus UNLu" style="width:100%;height:auto;display:block;border-radius:0.5rem;" />
      <div style="position:absolute;bottom:1.5rem;right:1.5rem;background-color:#008541;color:white;font-weight:800;font-size:0.75rem;padding:0.5rem 1rem;border-radius:9999px;box-shadow:0 4px 10px rgba(0,0,0,0.2);display:flex;align-items:center;gap:0.375rem;">
        <span style="background:#f9c540;color:#008541;width:1.25rem;height:1.25rem;border-radius:9999px;display:inline-flex;align-items:center;justify-content:center;font-size:0.6875rem;font-weight:900;">8</span>
        <span>Aquí nos encontrás</span>
      </div>
    </div>
  </div>
</div>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 6: Formulario de Consulta Institucional
  // ─────────────────────────────────────────────
  {
    id: "card-formulario-contacto",
    name: "Formulario de Consulta",
    category: "prehechos",
    icon: "✉️",
    description: "Tarjeta blanca con encabezado y formulario de mensajes de consulta a la Secretaría.",
    fields: [
      { key: "titulo",    label: "Título principal",  type: "text", default: "Envianos tu consulta" },
      { key: "subtitulo", label: "Texto descriptivo", type: "text", default: "¿Necesitás realizar una consulta o comunicarte con la Secretaría de Planeamiento? Podés hacerlo a través de nuestro formulario de contacto." }
    ],
    render(p) {
      return `<div style="background:white;border-radius:1rem;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-bottom:2.5rem;">
  <div style="background:linear-gradient(to right, #f8fafc, white);padding:1.5rem 2rem;border-bottom:1px solid #f1f5f9;">
    <h2 style="font-size:1.25rem;font-weight:700;color:#111827;font-family:Georgia,serif;margin:0 0 0.25rem;">${p.titulo||'Envianos tu consulta'}</h2>
    <p style="font-size:0.875rem;color:#4b5563;margin:0;">${p.subtitulo||''}</p>
  </div>
  <div style="padding:2rem;">
    <div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:0.75rem;padding:2rem;text-align:center;color:#64748b;">
      <svg style="width:2.5rem;height:2.5rem;margin:0 auto 0.5rem;color:#008541;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      <strong style="display:block;color:#1f2937;font-size:1rem;margin-bottom:0.25rem;">Formulario de Consulta Integrado</strong>
      <span style="font-size:0.8125rem;">Formulario interactivo con envío de mensajes, validación de correo y contador de caracteres.</span>
    </div>
  </div>
</div>`;
    }
  },

  // ─────────────────────────────────────────────
  // BLOQUE PREHECHO 7: Separador de Sección
  // ─────────────────────────────────────────────
  {
    id: "separator",
    name: "Separador de Sección",
    category: "estructura",
    icon: "—",
    description: "Divisor decorativo de puntos entre secciones.",
    fields: [],
    render() { return `<div style="text-align:center;color:#cbd5e1;letter-spacing:0.35em;font-size:0.75rem;user-select:none;margin:2rem 0;">.................................................................................</div>`; }
  }

];

export function getBlock(id) { return BLOCK_REGISTRY.find(b => b.id === id); }

export function renderBlock(block) {
  const def = getBlock(block.type);
  if (!def) return `<!-- Bloque desconocido: ${block.type} -->`;
  const html = def.render(block.props || {}, block);
  const elementId = block.anchorId || block.id;
  if (elementId) {
    return `<div id="${elementId}" class="scroll-mt-28 target:ring-2 target:ring-unlu-gold target:rounded-2xl transition-all">${html}</div>`;
  }
  return html;
}

export function renderPage(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks.map(renderBlock).join('\n');
}

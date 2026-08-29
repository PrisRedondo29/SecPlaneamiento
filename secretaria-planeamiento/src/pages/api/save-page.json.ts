import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ status: 'online', message: 'Endpoint de persistencia de contenidos activo.' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { pageKey, data } = body;

    if (!pageKey || !data) {
      return new Response(
        JSON.stringify({ success: false, message: 'Faltan parámetros obligatorios (pageKey, data).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitizar nombre de archivo (solo alfanumérico y guiones)
    const sanitizedKey = pageKey.replace(/[^a-zA-Z0-9_-]/g, '');
    const pagesDir = path.join(process.cwd(), 'src', 'data', 'pages');
    const filePath = path.join(pagesDir, `${sanitizedKey}.json`);

    // Guardar archivo JSON formateado en disco local
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return new Response(
      JSON.stringify({
        success: true,
        message: `Página "${sanitizedKey}" guardada exitosamente en disco local.`,
        filePath: `/src/data/pages/${sanitizedKey}.json`
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Error al guardar archivo en servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

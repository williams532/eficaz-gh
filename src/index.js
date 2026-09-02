export default {
  async fetch(request, env) {
    // La landing es estática y se sirve desde ./public (index.html + styles.css).
    // Cloudflare responde los assets directamente; el Worker solo se ejecuta para
    // rutas que no son un archivo y queda como punto de entrada para lógica
    // dinámica futura (p. ej. leer productos desde Supabase).
    return env.ASSETS.fetch(request);
  },
};

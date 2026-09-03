# EFICAZ G&H

Sitio web y CRM de la tienda **EFICAZ G&H** (estilo, calidad y variedad: ropa,
accesorios, perfumes, termos y artículos para el hogar).

El proyecto tiene dos partes:

1. **Landing estática** servida por un Worker de Cloudflare (`src/` + `public/`).
2. **CRM** sobre Supabase / PostgreSQL (`supabase/`), con leads, clientes,
   productos y un historial de contactos.

---

## Estructura

```
public/
  index.html      Landing page (hero, productos, beneficios, nosotros, contacto)
  styles.css      Estilos de la landing
src/
  index.js        Worker de Cloudflare: sirve los assets de ./public (env.ASSETS)
  database.types.ts  Tipos TypeScript generados del esquema de Supabase
supabase/
  migrations/     Esquema del CRM (tablas, índices, triggers, RLS)
  seed.sql        Datos de ejemplo para desarrollo local
wrangler.jsonc    Configuración del Worker y del binding de assets
.mcp.json         Servidor MCP de Supabase (para herramientas de IA)
```

---

## Web (Cloudflare Workers)

La landing es 100 % estática. El Worker (`src/index.js`) delega todas las
peticiones en `env.ASSETS.fetch(request)`, que resuelve los archivos de
`./public`. El Worker queda como punto de entrada para lógica dinámica futura
(por ejemplo, leer productos desde Supabase).

Configuración en `wrangler.jsonc`:

| Campo | Valor |
| --- | --- |
| `name` | `eficaz-gh` |
| `main` | `src/index.js` |
| `assets.directory` | `./public` |
| `assets.binding` | `ASSETS` |

### Desarrollo y despliegue

Requiere [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

```bash
npx wrangler dev      # servidor local en http://localhost:8787
npx wrangler deploy   # publica el Worker en Cloudflare
```

---

## CRM (Supabase)

### Modelo de datos

| Tabla | Descripción |
| --- | --- |
| `productos` | Catálogo: SKU, precio, moneda, IVA, stock, destacado, metadata. |
| `leads` | Contactos potenciales: origen, campaña, estado del embudo, puntuación (0–100), asignación. |
| `clientes` | Clientes convertidos (particular o empresa); enlazan opcionalmente con su `lead` de origen. |
| `contactos` | Historial de interacciones (llamada, email, reunión, WhatsApp…) sobre un lead o un cliente, con próximo seguimiento. |
| `leads_productos` | N:M — productos de interés de un lead. |
| `clientes_productos` | N:M — productos adquiridos/contratados por un cliente. |

Detalles transversales:

- PKs `uuid` con `gen_random_uuid()`.
- `created_at` / `updated_at` con `timestamptz`; `updated_at` lo mantiene el
  trigger compartido `public.set_updated_at()` (con `search_path` fijado por
  seguridad).
- **RLS activado en todas las tablas.** Cada usuario autenticado solo ve y
  gestiona las filas que ha creado (`created_by = auth.uid()`) o que tiene
  asignadas (`asignado_a = auth.uid()`). Las tablas N:M heredan el permiso de
  su lead / cliente. No hay políticas `USING (true)`.

### Migraciones

| Archivo | Contenido |
| --- | --- |
| `20260902044153_crm_base.sql` | Esquema base: tablas, índices, triggers y políticas RLS. |
| `20260902045530_crm_base_harden_function.sql` | Fija `search_path = ''` en `set_updated_at()`. |
| `20260902052535_crm_base_rls_optimize.sql` | Reescribe las políticas a `(select auth.uid())` para evaluarlas una vez por consulta (elimina los avisos `auth_rls_initplan`). |

### Uso local

Requiere la [CLI de Supabase](https://supabase.com/docs/guides/local-development).

```bash
supabase start        # levanta el stack local
supabase db reset     # aplica migraciones + carga supabase/seed.sql
```

Regenerar los tipos tras un cambio de esquema:

```bash
supabase gen types typescript --local > src/database.types.ts
```

`seed.sql` deja `created_by` / `asignado_a` / `realizado_por` en `NULL` porque
en un entorno recién inicializado no hay filas en `auth.users`.

---

## Configuración para agentes de IA

`.mcp.json` registra el servidor MCP de Supabase (HTTP). `.claude/settings.local.json`
habilita ese servidor y una lista acotada de operaciones permitidas
(migraciones, lectura de tablas, generación de tipos, advisors).

---

## Licencia

MIT — ver [LICENSE](LICENSE).

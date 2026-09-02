-- =====================================================================
-- Migración: CRM base (leads, clientes, productos, contactos)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Función compartida para mantener updated_at
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- 1. productos
-- ---------------------------------------------------------------------
create table public.productos (
  id           uuid primary key default gen_random_uuid(),
  sku          text unique,
  nombre       text not null,
  slug         text unique,
  descripcion  text,
  categoria    text,
  precio       numeric(12,2) not null default 0 check (precio >= 0),
  moneda       text not null default 'USD' check (char_length(moneda) = 3),
  tax_rate     numeric(5,2) not null default 0 check (tax_rate >= 0),
  stock        integer not null default 0,
  disponible   boolean not null default true,
  destacado    boolean not null default false,
  imagen_url   text,
  metadata     jsonb not null default '{}'::jsonb,
  created_by   uuid references auth.users(id) on delete set null default auth.uid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index productos_categoria_idx  on public.productos (categoria);
create index productos_disponible_idx on public.productos (disponible);
create index productos_created_by_idx on public.productos (created_by);

create trigger productos_set_updated_at
  before update on public.productos
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 2. leads   (sin cliente_id: la relación de conversión vive en clientes)
-- ---------------------------------------------------------------------
create table public.leads (
  id                    uuid primary key default gen_random_uuid(),
  nombre                text not null,
  apellidos             text,
  email                 text,
  telefono              text,
  empresa               text,
  cargo                 text,
  origen                text not null default 'otro'
                          check (origen in ('web','redes_sociales','referido','publicidad',
                                            'llamada_fria','evento','scraping','otro')),
  campana               text,
  presupuesto_estimado  numeric(12,2) check (presupuesto_estimado >= 0),
  estado                text not null default 'nuevo'
                          check (estado in ('nuevo','contactado','calificado','propuesta',
                                            'negociacion','ganado','perdido')),
  puntuacion            integer check (puntuacion between 0 and 100),
  asignado_a            uuid references auth.users(id) on delete set null,
  fecha_conversion      timestamptz,
  url_origen            text,
  notas                 text,
  created_by            uuid references auth.users(id) on delete set null default auth.uid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index leads_email_idx      on public.leads (email);
create index leads_estado_idx     on public.leads (estado);
create index leads_asignado_a_idx on public.leads (asignado_a);
create index leads_created_by_idx on public.leads (created_by);

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 3. clientes
-- ---------------------------------------------------------------------
create table public.clientes (
  id                uuid primary key default gen_random_uuid(),
  lead_id           uuid unique references public.leads(id) on delete set null,
  tipo_cliente      text not null default 'particular'
                      check (tipo_cliente in ('particular','empresa')),
  nombre            text not null,
  apellidos         text,
  empresa           text,
  tax_id            text,
  email             text unique,
  telefono          text,
  direccion         text,
  ciudad            text,
  estado            text,
  codigo_postal     text,
  pais              text,
  fecha_nacimiento  date,
  estatus           text not null default 'activo'
                      check (estatus in ('activo','inactivo','moroso')),
  valor_total       numeric(12,2) not null default 0,
  notas             text,
  asignado_a        uuid references auth.users(id) on delete set null,
  created_by        uuid references auth.users(id) on delete set null default auth.uid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index clientes_estatus_idx    on public.clientes (estatus);
create index clientes_asignado_a_idx on public.clientes (asignado_a);
create index clientes_created_by_idx on public.clientes (created_by);

create trigger clientes_set_updated_at
  before update on public.clientes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- 4. contactos  (historial de interacciones)
-- ---------------------------------------------------------------------
create table public.contactos (
  id                   uuid primary key default gen_random_uuid(),
  lead_id              uuid references public.leads(id)    on delete cascade,
  cliente_id           uuid references public.clientes(id) on delete cascade,
  tipo                 text not null
                         check (tipo in ('llamada','email','reunion','whatsapp',
                                         'sms','visita','otro')),
  direccion            text not null default 'saliente'
                         check (direccion in ('entrante','saliente')),
  asunto               text,
  resumen              text,
  resultado            text
                         check (resultado in ('sin_respuesta','interesado','no_interesado',
                                              'seguimiento','cerrado')),
  fecha_contacto       timestamptz not null default now(),
  proximo_seguimiento  timestamptz,
  realizado_por        uuid references auth.users(id) on delete set null default auth.uid(),
  created_at           timestamptz not null default now(),
  constraint contactos_sujeto_check
    check (lead_id is not null or cliente_id is not null)
);

create index contactos_lead_id_idx        on public.contactos (lead_id);
create index contactos_cliente_id_idx     on public.contactos (cliente_id);
create index contactos_realizado_por_idx  on public.contactos (realizado_por);
create index contactos_fecha_contacto_idx on public.contactos (fecha_contacto desc);
create index contactos_proximo_seg_idx    on public.contactos (proximo_seguimiento)
  where proximo_seguimiento is not null;

-- ---------------------------------------------------------------------
-- 5. leads_productos  (N:M — productos de interés de un lead)
-- ---------------------------------------------------------------------
create table public.leads_productos (
  lead_id      uuid not null references public.leads(id)     on delete cascade,
  producto_id  uuid not null references public.productos(id) on delete cascade,
  interes      text check (interes in ('bajo','medio','alto')),
  notas        text,
  created_at   timestamptz not null default now(),
  primary key (lead_id, producto_id)
);

create index leads_productos_producto_id_idx on public.leads_productos (producto_id);

-- ---------------------------------------------------------------------
-- 6. clientes_productos  (N:M — productos adquiridos/contratados)
-- ---------------------------------------------------------------------
create table public.clientes_productos (
  id                 uuid primary key default gen_random_uuid(),
  cliente_id         uuid not null references public.clientes(id)  on delete cascade,
  producto_id        uuid not null references public.productos(id) on delete restrict,
  cantidad           integer not null default 1 check (cantidad > 0),
  precio_acordado    numeric(12,2) check (precio_acordado >= 0),
  fecha_adquisicion  date not null default current_date,
  notas              text,
  created_at         timestamptz not null default now()
);

create index clientes_productos_cliente_id_idx  on public.clientes_productos (cliente_id);
create index clientes_productos_producto_id_idx on public.clientes_productos (producto_id);

-- =====================================================================
-- 7. RLS — multiusuario, sin políticas globales USING (true)
-- =====================================================================

-- ---- productos ----
alter table public.productos enable row level security;

create policy productos_owner_all on public.productos
  for all to authenticated
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

-- ---- leads ----
alter table public.leads enable row level security;

create policy leads_select on public.leads
  for select to authenticated
  using (created_by = auth.uid() or asignado_a = auth.uid());

create policy leads_insert on public.leads
  for insert to authenticated
  with check (created_by = auth.uid());

create policy leads_update on public.leads
  for update to authenticated
  using (created_by = auth.uid() or asignado_a = auth.uid())
  with check (created_by = auth.uid() or asignado_a = auth.uid());

create policy leads_delete on public.leads
  for delete to authenticated
  using (created_by = auth.uid());

-- ---- clientes ----
alter table public.clientes enable row level security;

create policy clientes_select on public.clientes
  for select to authenticated
  using (created_by = auth.uid() or asignado_a = auth.uid());

create policy clientes_insert on public.clientes
  for insert to authenticated
  with check (created_by = auth.uid());

create policy clientes_update on public.clientes
  for update to authenticated
  using (created_by = auth.uid() or asignado_a = auth.uid())
  with check (created_by = auth.uid() or asignado_a = auth.uid());

create policy clientes_delete on public.clientes
  for delete to authenticated
  using (created_by = auth.uid());

-- ---- contactos ----
alter table public.contactos enable row level security;

create policy contactos_select on public.contactos
  for select to authenticated
  using (realizado_por = auth.uid());

create policy contactos_insert on public.contactos
  for insert to authenticated
  with check (realizado_por = auth.uid());

create policy contactos_update on public.contactos
  for update to authenticated
  using (realizado_por = auth.uid())
  with check (realizado_por = auth.uid());

create policy contactos_delete on public.contactos
  for delete to authenticated
  using (realizado_por = auth.uid());

-- ---- leads_productos ----
alter table public.leads_productos enable row level security;

create policy leads_productos_all on public.leads_productos
  for all to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = leads_productos.lead_id
      and (l.created_by = auth.uid() or l.asignado_a = auth.uid())
  ))
  with check (exists (
    select 1 from public.leads l
    where l.id = leads_productos.lead_id
      and (l.created_by = auth.uid() or l.asignado_a = auth.uid())
  ));

-- ---- clientes_productos ----
alter table public.clientes_productos enable row level security;

create policy clientes_productos_all on public.clientes_productos
  for all to authenticated
  using (exists (
    select 1 from public.clientes c
    where c.id = clientes_productos.cliente_id
      and (c.created_by = auth.uid() or c.asignado_a = auth.uid())
  ))
  with check (exists (
    select 1 from public.clientes c
    where c.id = clientes_productos.cliente_id
      and (c.created_by = auth.uid() or c.asignado_a = auth.uid())
  ));

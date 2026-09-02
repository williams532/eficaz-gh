-- =====================================================================
-- Optimización RLS: auth.uid() -> (select auth.uid())
-- para que se evalúe una vez por consulta y no fila a fila.
-- Mismo comportamiento; elimina los avisos auth_rls_initplan.
-- =====================================================================

-- ---- productos ----
drop policy productos_owner_all on public.productos;

create policy productos_owner_all on public.productos
  for all to authenticated
  using (created_by = (select auth.uid()))
  with check (created_by = (select auth.uid()));

-- ---- leads ----
drop policy leads_select on public.leads;
drop policy leads_insert on public.leads;
drop policy leads_update on public.leads;
drop policy leads_delete on public.leads;

create policy leads_select on public.leads
  for select to authenticated
  using (created_by = (select auth.uid()) or asignado_a = (select auth.uid()));

create policy leads_insert on public.leads
  for insert to authenticated
  with check (created_by = (select auth.uid()));

create policy leads_update on public.leads
  for update to authenticated
  using (created_by = (select auth.uid()) or asignado_a = (select auth.uid()))
  with check (created_by = (select auth.uid()) or asignado_a = (select auth.uid()));

create policy leads_delete on public.leads
  for delete to authenticated
  using (created_by = (select auth.uid()));

-- ---- clientes ----
drop policy clientes_select on public.clientes;
drop policy clientes_insert on public.clientes;
drop policy clientes_update on public.clientes;
drop policy clientes_delete on public.clientes;

create policy clientes_select on public.clientes
  for select to authenticated
  using (created_by = (select auth.uid()) or asignado_a = (select auth.uid()));

create policy clientes_insert on public.clientes
  for insert to authenticated
  with check (created_by = (select auth.uid()));

create policy clientes_update on public.clientes
  for update to authenticated
  using (created_by = (select auth.uid()) or asignado_a = (select auth.uid()))
  with check (created_by = (select auth.uid()) or asignado_a = (select auth.uid()));

create policy clientes_delete on public.clientes
  for delete to authenticated
  using (created_by = (select auth.uid()));

-- ---- contactos ----
drop policy contactos_select on public.contactos;
drop policy contactos_insert on public.contactos;
drop policy contactos_update on public.contactos;
drop policy contactos_delete on public.contactos;

create policy contactos_select on public.contactos
  for select to authenticated
  using (realizado_por = (select auth.uid()));

create policy contactos_insert on public.contactos
  for insert to authenticated
  with check (realizado_por = (select auth.uid()));

create policy contactos_update on public.contactos
  for update to authenticated
  using (realizado_por = (select auth.uid()))
  with check (realizado_por = (select auth.uid()));

create policy contactos_delete on public.contactos
  for delete to authenticated
  using (realizado_por = (select auth.uid()));

-- ---- leads_productos ----
drop policy leads_productos_all on public.leads_productos;

create policy leads_productos_all on public.leads_productos
  for all to authenticated
  using (exists (
    select 1 from public.leads l
    where l.id = leads_productos.lead_id
      and (l.created_by = (select auth.uid()) or l.asignado_a = (select auth.uid()))
  ))
  with check (exists (
    select 1 from public.leads l
    where l.id = leads_productos.lead_id
      and (l.created_by = (select auth.uid()) or l.asignado_a = (select auth.uid()))
  ));

-- ---- clientes_productos ----
drop policy clientes_productos_all on public.clientes_productos;

create policy clientes_productos_all on public.clientes_productos
  for all to authenticated
  using (exists (
    select 1 from public.clientes c
    where c.id = clientes_productos.cliente_id
      and (c.created_by = (select auth.uid()) or c.asignado_a = (select auth.uid()))
  ))
  with check (exists (
    select 1 from public.clientes c
    where c.id = clientes_productos.cliente_id
      and (c.created_by = (select auth.uid()) or c.asignado_a = (select auth.uid()))
  ));

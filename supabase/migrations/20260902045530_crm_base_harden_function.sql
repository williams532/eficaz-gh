-- Fija un search_path inmutable en la función de trigger (hardening de seguridad)
alter function public.set_updated_at() set search_path = '';

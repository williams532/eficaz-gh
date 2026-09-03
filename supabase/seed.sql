-- ================= DATOS DE EJEMPLO (CRM EFICAZ G&H) =================
-- Se ejecuta tras las migraciones al hacer `supabase db reset` (desarrollo local).
-- created_by / asignado_a / realizado_por quedan NULL: no hay filas en auth.users
-- en un entorno recien inicializado.

-- ---------- PRODUCTOS ----------
insert into public.productos (sku, nombre, descripcion, categoria, precio, tax_rate, stock, disponible, destacado) values
('RM-001','Camiseta Premium','Algodón peinado, corte regular','Ropa y Moda',24.99,8.00,120,true,true),
('AC-001','Reloj Minimalista','Acero inoxidable, correa de malla','Accesorios',19.99,8.00,80,true,true),
('PF-001','Perfume Amber Nights','Eau de parfum 50 ml, notas amaderadas','Perfumes',39.99,8.00,45,true,true),
('TV-001','Termo Acero 500 ml','Doble pared, mantiene temperatura 12 h','Termos y Vasos',18.99,8.00,200,true,true),
('RM-002','Chaqueta Urbana','Cortavientos ligero resistente al agua','Ropa y Moda',59.90,8.00,35,true,false),
('AC-002','Gafas de Sol Classic','Protección UV400, montura acetato','Accesorios',29.50,8.00,60,true,false),
('HG-001','Set de Velas Aromaticas','Pack de 3, cera de soja natural','Hogar',22.00,8.00,90,true,false);

-- ---------- LEADS ----------
insert into public.leads (nombre, apellidos, email, telefono, empresa, cargo, origen, campana, presupuesto_estimado, estado, puntuacion, notas, fecha_conversion) values
('Lucia','Fernandez','lucia.fernandez@example.com','+34 600 111 222',null,null,'web','google-ads-sep',150,'contactado',60,'Pidio catalogo de ropa y moda',null),
('Marco','Ruiz','marco.ruiz@example.com','+34 600 333 444','Ruiz Diseno SL','Comprador','referido',null,800,'calificado',75,'Interesado en compra al por mayor',null),
('Sofia','Navarro','sofia.navarro@example.com','+34 600 555 666',null,null,'redes_sociales','ig-reels-agosto',60,'nuevo',30,null,null),
('Diego','Herrera','diego.herrera@example.com','+34 600 777 888','Herrera Retail SL','Gerente','publicidad',null,1200,'propuesta',82,'Propuesta comercial enviada',null),
('Elena','Castro','elena.castro@example.com','+34 600 999 000',null,null,'evento','feria-verano',200,'ganado',90,'Convertida a cliente', now() - interval '6 days'),
('Pablo','Gomez','pablo.gomez@example.com','+34 601 111 222',null,null,'scraping',null,null,'perdido',15,'No responde tras varios intentos',null),
('Ana','Molina','ana.molina@example.com','+34 601 333 444','Molina & Co','CEO','referido',null,2500,'negociacion',88,'Negociando descuento por volumen',null),
('Javier','Ortiz','javier.ortiz@example.com','+34 601 555 666',null,null,'web','seo-organico',90,'ganado',85,'Compro termo y reloj', now() - interval '2 days');

-- ---------- CLIENTES ----------
insert into public.clientes (lead_id, tipo_cliente, nombre, apellidos, empresa, tax_id, email, telefono, direccion, ciudad, estado, codigo_postal, pais, estatus, valor_total) values
((select id from public.leads where email='elena.castro@example.com'),'particular','Elena','Castro',null,'12345678Z','elena.castro@example.com','+34 600 999 000','C/ Mayor 10','Madrid','Madrid','28001','Espana','activo',64.98),
((select id from public.leads where email='javier.ortiz@example.com'),'particular','Javier','Ortiz',null,'87654321X','javier.ortiz@example.com','+34 601 555 666','Av. de la Constitucion 5','Sevilla','Andalucia','41001','Espana','activo',38.98),
(null,'empresa','Herrera','Retail','Herrera Retail SL','B12345678','contacto@herreraretail.com','+34 960 000 111','Poligono Norte 22','Valencia','Comunidad Valenciana','46001','Espana','activo',999.50),
(null,'particular','Carmen','Vidal',null,null,'carmen.vidal@example.com','+34 944 222 333','C/ Gran Via 3','Bilbao','Pais Vasco','48001','Espana','inactivo',29.50);

-- ---------- CONTACTOS (historial de interacciones) ----------
insert into public.contactos (lead_id, cliente_id, tipo, direccion, asunto, resumen, resultado, fecha_contacto, proximo_seguimiento) values
((select id from public.leads where email='lucia.fernandez@example.com'),null,'llamada','saliente','Primer contacto','Solicita catalogo de ropa y moda','interesado', now() - interval '10 days', now() + interval '2 days'),
((select id from public.leads where email='marco.ruiz@example.com'),null,'email','entrante','Solicita precios mayorista','Pide tarifa por volumen para reventa','seguimiento', now() - interval '8 days', null),
((select id from public.leads where email='marco.ruiz@example.com'),null,'reunion','saliente','Demo de producto','Presentacion de catalogo y condiciones B2B','interesado', now() - interval '3 days', now() + interval '5 days'),
((select id from public.leads where email='diego.herrera@example.com'),null,'email','saliente','Envio de propuesta comercial','Enviada propuesta con descuento por pronto pago','seguimiento', now() - interval '6 days', now() + interval '1 day'),
((select id from public.leads where email='ana.molina@example.com'),null,'llamada','saliente','Negociacion de descuento','Discutido descuento del 12% por volumen anual','seguimiento', now() - interval '2 days', now() + interval '3 days'),
((select id from public.leads where email='pablo.gomez@example.com'),null,'llamada','saliente','Intento de contacto','Sin respuesta, buzon de voz','sin_respuesta', now() - interval '15 days', null),
((select id from public.leads where email='pablo.gomez@example.com'),null,'whatsapp','saliente','Segundo intento','Responde que no le interesa por ahora','no_interesado', now() - interval '12 days', null),
(null,(select id from public.clientes where email='elena.castro@example.com'),'email','saliente','Confirmacion de pedido','Pedido confirmado y enviado','cerrado', now() - interval '5 days', null),
(null,(select id from public.clientes where email='javier.ortiz@example.com'),'llamada','entrante','Consulta post-venta','Consulta sobre limpieza del termo, resuelta','cerrado', now() - interval '1 day', null),
(null,(select id from public.clientes where email='contacto@herreraretail.com'),'reunion','saliente','Alta de cuenta B2B','Alta de cuenta mayorista y primer pedido','interesado', now() - interval '4 days', now() + interval '7 days');

-- ---------- LEADS_PRODUCTOS (productos de interes) ----------
insert into public.leads_productos (lead_id, producto_id, interes) values
((select id from public.leads where email='lucia.fernandez@example.com'),(select id from public.productos where sku='RM-001'),'alto'),
((select id from public.leads where email='lucia.fernandez@example.com'),(select id from public.productos where sku='RM-002'),'medio'),
((select id from public.leads where email='marco.ruiz@example.com'),(select id from public.productos where sku='RM-001'),'alto'),
((select id from public.leads where email='marco.ruiz@example.com'),(select id from public.productos where sku='AC-001'),'medio'),
((select id from public.leads where email='sofia.navarro@example.com'),(select id from public.productos where sku='PF-001'),'medio'),
((select id from public.leads where email='diego.herrera@example.com'),(select id from public.productos where sku='TV-001'),'alto'),
((select id from public.leads where email='diego.herrera@example.com'),(select id from public.productos where sku='AC-002'),'bajo'),
((select id from public.leads where email='ana.molina@example.com'),(select id from public.productos where sku='RM-001'),'alto'),
((select id from public.leads where email='ana.molina@example.com'),(select id from public.productos where sku='RM-002'),'alto'),
((select id from public.leads where email='ana.molina@example.com'),(select id from public.productos where sku='AC-001'),'medio'),
((select id from public.leads where email='javier.ortiz@example.com'),(select id from public.productos where sku='TV-001'),'alto'),
((select id from public.leads where email='javier.ortiz@example.com'),(select id from public.productos where sku='AC-001'),'alto');

-- ---------- CLIENTES_PRODUCTOS (compras) ----------
insert into public.clientes_productos (cliente_id, producto_id, cantidad, precio_acordado, fecha_adquisicion) values
((select id from public.clientes where email='elena.castro@example.com'),(select id from public.productos where sku='RM-001'),1,24.99, current_date - 5),
((select id from public.clientes where email='elena.castro@example.com'),(select id from public.productos where sku='PF-001'),1,39.99, current_date - 5),
((select id from public.clientes where email='javier.ortiz@example.com'),(select id from public.productos where sku='TV-001'),1,18.99, current_date - 2),
((select id from public.clientes where email='javier.ortiz@example.com'),(select id from public.productos where sku='AC-001'),1,19.99, current_date - 2),
((select id from public.clientes where email='contacto@herreraretail.com'),(select id from public.productos where sku='RM-001'),50,19.99, current_date - 4),
((select id from public.clientes where email='carmen.vidal@example.com'),(select id from public.productos where sku='AC-002'),1,29.50, current_date - 1);

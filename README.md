# GT Rental — Sitio web (versión demo)

Plataforma web de GT Rental para captar postulaciones de conductores: sitio multipágina, formulario de postulación en 3 pasos y panel administrativo.

> **Esta es una versión de demostración.** No usa base de datos ni envía correos: las postulaciones, los estados de los leads y los cambios en la flota se guardan **en el navegador** (localStorage), para poder mostrar el recorrido completo. La flota, las fotos y el logotipo son provisionales y están marcados como tales en la web.

## Cómo correrlo

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # desarrollo → http://localhost:3000
# o, para una demo más rápida y fluida:
npm run build && npm start
```

### Recorrido sugerido para la demo

1. **Inicio** (`/`): preloader, hero, propuesta, pasos, flota, requisitos, FAQ y CTA.
2. **Postulación** (`/postularme`): completar los 3 pasos. Probar “Continuar” con campos vacíos para ver las validaciones.
3. **Panel** (`/admin`): entrar con las credenciales demo y ver la postulación recién enviada en Dashboard → Postulaciones.
   - Correo: `demo@ejemplo.com`
   - Contraseña: `demo2026`
4. En la ficha del lead: cambiar estado, asignar responsable, agregar notas, registrar contacto (todo queda en el historial).
5. **Flota** (`/admin/flota`): editar un vehículo, cargar fotos, destacarlo o despublicarlo, y ver el cambio en `/flota` y en el inicio.
6. “Restablecer demo” (en el menú del panel) vuelve a los datos iniciales.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Home narrativa con todas las secciones |
| `/como-funciona` | Recorrido completo con timeline animado |
| `/requisitos` | Requisitos, autochequeo interactivo y FAQ relacionada |
| `/flota` | Catálogo con filtros |
| `/flota/[slug]` | Ficha con galería, especificaciones y consulta por WhatsApp |
| `/postularme` | Formulario por pasos con validación y confirmación |
| `/preguntas-frecuentes` | Centro de ayuda con categorías y buscador |
| `/contacto` | Canales y formulario de consulta |
| `/privacidad`, `/terminos` | Borradores marcados como pendientes de revisión legal |
| `/admin` | Panel: dashboard, postulaciones, ficha de lead, flota |

También incluye `sitemap.xml`, `robots.txt`, metadatos por página, Open Graph y datos estructurados (Organization, FAQPage). Mientras `site.demo` sea `true`, el sitio **no se indexa**.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Datos de la empresa, navegación, modo demo | `lib/site.ts` |
| Mensajes de WhatsApp por contexto | `lib/whatsapp.ts` |
| Flota inicial | `lib/fleet.ts` |
| Preguntas frecuentes | `lib/faq.ts` |
| Requisitos | `lib/requirements.ts` |
| Campos y validaciones de la postulación | `lib/application.ts` |
| Colores y tipografía | `app/globals.css` (bloque `@theme`) |
| Logotipo (espacio reservado) | `components/Logo.tsx` |
| Fotos | `public/img/` |

## Datos pendientes de confirmación por GT Rental

No se inventó ninguno de estos datos. Donde faltan, la web los omite o indica “a confirmar”.

- [ ] Logotipo oficial (versiones para fondo claro y oscuro)
- [ ] Correo comercial → `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] Número oficial de WhatsApp → `NEXT_PUBLIC_WHATSAPP_NUMBER` (mientras falte, los botones abren WhatsApp con el mensaje listo para que la persona elija el contacto)
- [ ] Dirección y zonas de operación
- [ ] Modelos reales de la flota y fotografías oficiales
- [ ] Tarifas y periodicidad de pago
- [ ] Condiciones del alquiler, coberturas y mantenimiento
- [ ] Aplicaciones autorizadas
- [ ] Requisitos definitivos
- [ ] Horarios de atención
- [ ] Información legal y fiscal (razón social, CUIT)
- [ ] Política de privacidad y términos aprobados

Las fotos actuales son imágenes de referencia de Unsplash y deben reemplazarse por fotos propias de GT Rental.

## Paso a producción

La demo ya separa la lógica para que el cambio sea acotado:

1. **Base de datos (Supabase)**: tablas `leads`, `lead_events` (historial y notas), `vehicles`, `admin_users` con políticas RLS (sin acceso público a leads). Reemplazar las funciones de `lib/demo-store.ts` por llamadas a la API.
2. **Endpoint** `POST /api/postulaciones`: validación del lado del servidor (las reglas de `lib/application.ts` se reutilizan), honeypot (ya incluido en el formulario), limitación de solicitudes, guardado en base y luego notificación.
3. **Correo (Resend)**: aviso interno a `GT_RENTAL_LEADS_EMAIL` y confirmación opcional al postulante. Si el envío falla, la postulación ya quedó guardada y se reintenta.
4. **Autenticación**: Supabase Auth con roles en lugar del login demo.
5. **Imágenes de flota**: Supabase Storage.
6. Poner `site.demo = false` en `lib/site.ts` y configurar las variables de `.env.example`.
7. Desplegar en Vercel.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · lucide-react.

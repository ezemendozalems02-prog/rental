export type FaqCategory = "requisitos" | "documentacion" | "pagos" | "vehiculos" | "aplicaciones" | "proceso";

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "requisitos", label: "Requisitos" },
  { id: "documentacion", label: "Documentación" },
  { id: "pagos", label: "Pagos" },
  { id: "vehiculos", label: "Vehículos" },
  { id: "aplicaciones", label: "Aplicaciones" },
  { id: "proceso", label: "Proceso de incorporación" },
];

export type Faq = { q: string; a: string; category: FaqCategory; home?: boolean };

/**
 * Respuestas basadas únicamente en información confirmada.
 * Cuando algo depende de cada caso, se indica y se ofrece un canal de consulta.
 */
export const faqs: Faq[] = [
  {
    category: "requisitos",
    home: true,
    q: "¿Qué necesito para postularme?",
    a: "Los requisitos informados inicialmente son: licencia de conducir vigente y habilitante, ser mayor de 21 años, certificado de antecedentes penales vigente y comprobante de domicilio actualizado. El equipo de GT Rental te confirma los requisitos definitivos y si hace falta algo más en tu caso.",
  },
  {
    category: "aplicaciones",
    home: true,
    q: "¿Puedo trabajar si nunca utilicé una aplicación de movilidad?",
    a: "Sí, podés postularte igual. Contanos en el formulario que es tu primera vez y el equipo te orienta sobre los próximos pasos. La aprobación depende de la evaluación de cada solicitud.",
  },
  {
    category: "aplicaciones",
    home: true,
    q: "¿Qué aplicaciones puedo utilizar?",
    a: "Las aplicaciones habilitadas y sus condiciones las confirma GT Rental en cada caso. Además, cada aplicación tiene sus propios requisitos para registrarte como conductor. Escribinos y te contamos cómo funciona hoy.",
  },
  {
    category: "documentacion",
    q: "¿Qué documentación tengo que presentar?",
    a: "La documentación informada inicialmente es licencia vigente, certificado de antecedentes penales y comprobante de domicilio. No te la pedimos en el formulario: una vez que revisamos tus datos, el equipo te indica cómo entregarla de forma segura.",
  },
  {
    category: "pagos",
    home: true,
    q: "¿Cuánto cuesta alquilar un vehículo?",
    a: "Las tarifas y la periodicidad de pago dependen del vehículo y de las condiciones vigentes. El equipo te las informa de forma clara antes de avanzar. No hay ningún costo por enviar tu postulación.",
  },
  {
    category: "vehiculos",
    q: "¿El vehículo queda a mi cargo?",
    a: "Las responsabilidades sobre el uso, cuidado y custodia del vehículo se detallan en las condiciones del alquiler que te informa GT Rental antes de la entrega. Si tenés dudas puntuales, consultanos.",
  },
  {
    category: "proceso",
    q: "¿Puedo organizar mis propios horarios?",
    a: "Depende de la modalidad y de las condiciones acordadas con GT Rental. Consultanos y te explicamos las opciones disponibles para tu caso.",
  },
  {
    category: "proceso",
    q: "¿Puedo trabajar todos los días?",
    a: "La frecuencia de uso depende de las condiciones del alquiler que se acuerden. El equipo te lo detalla durante el proceso.",
  },
  {
    category: "proceso",
    home: true,
    q: "¿Cómo funciona el proceso de evaluación?",
    a: "Completás tus datos, el equipo revisa tu solicitud, te pide la documentación necesaria y te comunica los siguientes pasos. Si la solicitud es aprobada y hay disponibilidad, se coordinan las condiciones y la entrega del vehículo.",
  },
  {
    category: "proceso",
    q: "¿Cuánto tiempo tarda la aprobación?",
    a: "Depende de cada caso y de la documentación presentada. El equipo te mantiene al tanto durante el proceso.",
  },
  {
    category: "vehiculos",
    q: "¿Qué sucede si no hay vehículos disponibles?",
    a: "Tu solicitud queda registrada y el equipo te informa cuando haya novedades. Enviar la postulación no implica una reserva ni disponibilidad inmediata.",
  },
  {
    category: "proceso",
    home: true,
    q: "¿Cómo puedo comunicarme con GT Rental?",
    a: "Por WhatsApp, por Instagram (@gt.rentalauto) o a través del formulario de contacto de esta web.",
  },
  {
    category: "pagos",
    q: "¿Tengo que pagar algo para postularme?",
    a: "No. Enviar tu postulación no tiene costo y no genera ningún compromiso.",
  },
  {
    category: "documentacion",
    q: "¿Tengo que subir mis documentos en la web?",
    a: "No. Por seguridad, el formulario solo te pide datos básicos. La documentación se entrega por el canal que te indique el equipo.",
  },
];

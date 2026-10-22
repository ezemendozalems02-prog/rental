import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata GT Rental los datos personales de quienes se postulan o consultan a través del sitio.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      updated="Última actualización: [fecha a confirmar]"
      sections={[
        {
          title: "Responsable del tratamiento",
          body: (
            <p>
              El responsable de los datos es <mark>[razón social]</mark>, CUIT <mark>[número]</mark>, con domicilio en <mark>[domicilio legal]</mark>. Para
              consultas sobre privacidad podés escribir a <mark>[correo de contacto]</mark>.
            </p>
          ),
        },
        {
          title: "Qué datos recopilamos",
          body: (
            <>
              <p>A través del formulario de postulación y de contacto recopilamos:</p>
              <ul>
                <li>Nombre, apellido, correo electrónico y número de WhatsApp.</li>
                <li>Fecha de nacimiento, localidad, provincia y zona de interés.</li>
                <li>Información sobre tu licencia, experiencia con aplicaciones y disponibilidad.</li>
              </ul>
              <p>El sitio no solicita la carga de documentos personales. La documentación se entrega por el canal que indique el equipo.</p>
            </>
          ),
        },
        {
          title: "Para qué los usamos",
          body: (
            <ul>
              <li>Evaluar tu postulación y contactarte sobre los próximos pasos.</li>
              <li>Responder tus consultas.</li>
              <li>Mejorar la atención y el funcionamiento del sitio.</li>
            </ul>
          ),
        },
        {
          title: "Quién recibe tus datos",
          body: (
            <p>
              Tus datos son accedidos únicamente por el equipo autorizado de GT Rental y por los proveedores tecnológicos necesarios para operar el
              sitio (alojamiento, base de datos y envío de correos): <mark>[listado de proveedores a confirmar]</mark>. No vendemos tus datos.
            </p>
          ),
        },
        {
          title: "Cuánto tiempo los conservamos",
          body: <p>Conservamos los datos durante <mark>[plazo a definir]</mark> o mientras sea necesario para la finalidad para la que fueron recopilados.</p>,
        },
        {
          title: "Tus derechos",
          body: (
            <p>
              Podés ejercer tus derechos de acceso, rectificación, actualización y supresión conforme a la Ley 25.326 de Protección de Datos
              Personales, escribiendo a <mark>[correo de contacto]</mark>. La Agencia de Acceso a la Información Pública es el órgano de control de
              la Ley 25.326 y atiende las denuncias y reclamos relacionados con el incumplimiento de las normas sobre protección de datos
              personales.
            </p>
          ),
        },
        {
          title: "Seguridad",
          body: <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra accesos no autorizados, pérdida o alteración.</p>,
        },
      ]}
    />
  );
}

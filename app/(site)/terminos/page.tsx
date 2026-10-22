import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso del sitio de GT Rental.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      updated="Última actualización: [fecha a confirmar]"
      sections={[
        { title: "Objeto del sitio", body: <p>Este sitio informa sobre la propuesta de GT Rental y permite enviar postulaciones y consultas. <mark>[Texto a completar por GT Rental]</mark></p> },
        {
          title: "Postulaciones",
          body: (
            <p>
              El envío de una postulación no implica aprobación automática, reserva ni disponibilidad de un vehículo. Cada solicitud se evalúa de forma
              individual. <mark>[Condiciones de admisión a confirmar]</mark>
            </p>
          ),
        },
        { title: "Condiciones del alquiler", body: <p><mark>[Tarifas, periodicidad, garantías, coberturas, mantenimiento y responsabilidades a incorporar]</mark></p> },
        { title: "Información publicada", body: <p>La información de vehículos, requisitos y condiciones puede modificarse. La información vigente es la que comunica el equipo de GT Rental.</p> },
        { title: "Propiedad intelectual", body: <p>Las marcas, logotipos e imágenes del sitio pertenecen a sus respectivos titulares. <mark>[A confirmar]</mark></p> },
        { title: "Jurisdicción", body: <p><mark>[Jurisdicción y legislación aplicable a definir con asesoría legal]</mark></p> },
      ]}
    />
  );
}

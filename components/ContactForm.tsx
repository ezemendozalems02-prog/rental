"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { normalizePhone } from "@/lib/application";
import { ArrowIcon } from "./icons";

const reasons = ["Quiero postularme", "Tengo una duda", "Consulta por la flota", "Otro motivo"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    reason: params.get("motivo") === "duda" ? "Tengo una duda" : reasons[0],
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const lock = useRef(false);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lock.current) return;
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Ingresá tu nombre.";
    if (!form.contact.trim()) errs.contact = "Dejanos un correo o WhatsApp para responderte.";
    else if (!EMAIL_RE.test(form.contact.trim()) && !normalizePhone(form.contact)) errs.contact = "Ingresá un correo válido o un WhatsApp con código de área.";
    if (form.message.trim().length < 10) errs.message = "Contanos un poco más (mínimo 10 caracteres).";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return document.getElementById(`c-${first}`)?.focus();

    lock.current = true;
    setStatus("sending");
    // DEMO: simula el envío. En producción: POST /api/contacto
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center" role="status">
          <CheckCircle2 className="mx-auto size-14 text-gt-orange" strokeWidth={1.5} />
          <h2 className="display mt-6 text-[44px] text-ink">¡Mensaje enviado!</h2>
          <p className="mx-auto mt-3 max-w-sm text-graphite/65">Gracias, {form.name.split(" ")[0]}. El equipo de GT Rental te va a responder a la brevedad.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="space-y-5" exit={{ opacity: 0 }}>
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} name="website" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Nombre y apellido" error={errors.name}>
              <input id="c-name" className="field" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
            </Field>
            <Field id="contact" label="Correo o WhatsApp" error={errors.contact}>
              <input id="c-contact" className="field" value={form.contact} onChange={(e) => set("contact", e.target.value)} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "e-contact" : undefined} />
            </Field>
          </div>
          <fieldset>
            <legend className="label">Motivo</legend>
            <div className="flex flex-wrap gap-2">
              {reasons.map((r) => (
                <label key={r} className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14px] transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gt-orange/40 ${form.reason === r ? "border-ink bg-ink text-white" : "border-line hover:border-ink/30"}`}>
                  <input type="radio" name="reason" className="sr-only" checked={form.reason === r} onChange={() => set("reason", r)} />
                  {r}
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="message" label="Mensaje" error={errors.message}>
            <textarea id="c-message" rows={5} className="field resize-none" value={form.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
          </Field>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12.5px] text-graphite/50">
              Al enviar aceptás la <a href="/privacidad" className="inline-block py-2 underline">política de privacidad</a>.
            </p>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar consulta <ArrowIcon />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`c-${id}`} className="label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`e-${id}`} className="flex items-center gap-1.5 pt-2 text-[13px] text-red-600">
          <AlertCircle className="size-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

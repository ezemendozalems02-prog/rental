"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Check, LoaderCircle, Lock, PencilLine } from "lucide-react";
import {
  emptyApplication,
  fieldLabels,
  formatPhone,
  normalizePhone,
  options,
  provinces,
  validateStep,
  type ApplicationData,
  type Errors,
} from "@/lib/application";
import { addLead } from "@/lib/demo-store";
import { waLink } from "@/lib/whatsapp";
import { ArrowIcon, WhatsAppIcon } from "./icons";

const DRAFT_KEY = "gt-application-draft";
const stepNames = ["Datos personales", "Perfil de conductor", "Confirmación"];
const ease = [0.16, 1, 0.3, 1] as const;

/* ───────── Campos ───────── */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-start gap-1.5 overflow-hidden pt-2 text-[13px] text-red-600"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

type InputProps = {
  name: keyof ApplicationData;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  hint?: string;
  className?: string;
};

function TextField({ name, label, value, error, onChange, type = "text", hint, className = "", ...rest }: InputProps) {
  const errId = `${name}-error`;
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label} <span className="text-gt-orange">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errId : hint ? `${name}-hint` : undefined}
        aria-required
        className="field"
        {...rest}
      />
      {hint && !error && (
        <p id={`${name}-hint`} className="pt-2 text-[12.5px] text-graphite/50">
          {hint}
        </p>
      )}
      <FieldError id={errId} msg={error} />
    </div>
  );
}

function OptionGroup({
  name,
  label,
  values,
  value,
  onChange,
  error,
  multiple = false,
  columns = 1,
}: {
  name: keyof ApplicationData;
  label: string;
  values: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  error?: string;
  multiple?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const selected = (v: string) => (Array.isArray(value) ? value.includes(v) : value === v);
  const toggle = (v: string) => {
    if (!multiple) return onChange(v);
    const arr = value as string[];
    onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };
  const cols = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <fieldset id={name} tabIndex={-1} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className="outline-none">
      <legend className="label">
        {label} <span className="text-gt-orange">*</span>
        {multiple && <span className="ml-1 font-normal text-graphite/45">(podés elegir varias)</span>}
      </legend>
      <div className={`grid gap-2.5 ${cols}`}>
        {values.map((v) => {
          const on = selected(v);
          return (
            <label
              key={v}
              className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[15px] transition-all ${
                on ? "border-gt-blue bg-gt-blue/[0.05] text-ink shadow-[inset_0_0_0_1px_var(--color-gt-blue)]" : error ? "border-red-300" : "border-line hover:border-ink/25"
              }`}
            >
              <input type={multiple ? "checkbox" : "radio"} name={name} value={v} checked={on} onChange={() => toggle(v)} className="peer sr-only" />
              <span
                className={`grid size-5 shrink-0 place-items-center border-2 transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-gt-orange/40 ${
                  multiple ? "rounded-md" : "rounded-full"
                } ${on ? "border-gt-blue bg-gt-blue text-white" : "border-ink/20"}`}
              >
                {on && (multiple ? <Check className="size-3" strokeWidth={3.5} /> : <span className="size-1.5 rounded-full bg-white" />)}
              </span>
              {v}
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} msg={error} />
    </fieldset>
  );
}

/* ───────── Stepper ───────── */
export function ApplicationStepper() {
  const [data, setData] = useState<ApplicationData>(emptyApplication);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [hydrated, setHydrated] = useState(false);
  const lock = useRef(false);
  const top = useRef<HTMLDivElement>(null);

  // Conserva el borrador durante la navegación
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        setData({ ...emptyApplication, ...draft.data, company: "" });
        setStep(Math.min(draft.step ?? 0, 2));
      }
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated || status === "success") return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data: { ...data, acceptPrivacy: false }, step }));
    } catch {}
  }, [data, step, hydrated, status]);

  const set = <K extends keyof ApplicationData>(k: K, v: ApplicationData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const scrollTop = () => top.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0];
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  };

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    if (step === 0) {
      const p = normalizePhone(data.whatsapp);
      if (p) set("whatsapp", formatPhone(p));
    }
    setDir(1);
    setStep((s) => s + 1);
    scrollTop();
  };
  const back = (to?: number) => {
    setDir(-1);
    setErrors({});
    setStep(to ?? step - 1);
    scrollTop();
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    if (lock.current) return; // evita envíos duplicados
    const e = { ...validateStep(0, data), ...validateStep(1, data), ...validateStep(2, data) };
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);

    lock.current = true;
    setStatus("sending");
    try {
      // DEMO: simula la latencia del endpoint. En producción: POST /api/postulaciones
      await new Promise((r) => setTimeout(r, 1400));
      const phone = normalizePhone(data.whatsapp)!;
      if (!data.company) addLead(data, phone); // honeypot: los bots no se guardan
      sessionStorage.removeItem(DRAFT_KEY);
      setStatus("success");
      scrollTop();
    } catch {
      setStatus("error");
      lock.current = false;
    }
  };

  if (status === "success") return <Success name={data.firstName} />;

  const summary: [string, string][] = (Object.keys(fieldLabels) as (keyof typeof fieldLabels)[])
    .filter((k) => !(k === "licenseYears" && data.hasLicense === "No tengo"))
    .map((k) => {
      const v = data[k];
      if (Array.isArray(v)) return [fieldLabels[k], v.join(", ")];
      if (k === "birthDate" && v) return [fieldLabels[k], String(v).split("-").reverse().join("/")];
      return [fieldLabels[k], String(v)];
    });

  return (
    <div ref={top} className="scroll-mt-28">
      {/* Progreso */}
      <nav aria-label="Progreso de la postulación" className="mb-6 sm:mb-8">
        <p className="mb-3 text-[12px] font-semibold tracking-[0.1em] text-graphite/60 uppercase sm:hidden" aria-hidden>
          Paso {step + 1} de 3 · <span className="text-ink">{stepNames[step]}</span>
        </p>
        <ol className="grid grid-cols-3 gap-2">
          {stepNames.map((n, i) => (
            <li key={n} aria-current={i === step ? "step" : undefined}>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.div className="h-full bg-gt-orange" initial={false} animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} transition={{ duration: 0.6, ease }} />
              </div>
              <p className={`mt-2 flex items-center gap-1.5 sm:mt-3 text-[11.5px] font-semibold tracking-[0.06em] uppercase sm:text-[12px] ${i <= step ? "text-ink" : "text-ink/35"}`}>
                <span className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] ${i < step ? "bg-gt-blue text-white" : i === step ? "bg-ink text-white" : "bg-ink/10 text-ink/50"}`}>
                  {i < step ? <Check className="size-3" strokeWidth={3.5} /> : i + 1}
                </span>
                <span className="hidden truncate sm:inline">{n}</span>
              </p>
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={submit} noValidate className="relative">
        {/* Honeypot antispam: invisible para personas */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Empresa</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" value={data.company} onChange={(e) => set("company", e.target.value)} />
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease }}
          >
            {step === 0 && (
              <div className="space-y-6">
                <StepTitle n={1} title="Contanos quién sos" text="Usamos estos datos para contactarte y revisar tu solicitud." />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField name="firstName" label="Nombre" value={data.firstName} error={errors.firstName} onChange={(v) => set("firstName", v)} autoComplete="given-name" />
                  <TextField name="lastName" label="Apellido" value={data.lastName} error={errors.lastName} onChange={(v) => set("lastName", v)} autoComplete="family-name" />
                  <TextField name="email" label="Correo electrónico" type="email" value={data.email} error={errors.email} onChange={(v) => set("email", v)} autoComplete="email" inputMode="email" placeholder="nombre@correo.com" />
                  <TextField
                    name="whatsapp"
                    label="Número de WhatsApp"
                    type="tel"
                    value={data.whatsapp}
                    error={errors.whatsapp}
                    onChange={(v) => set("whatsapp", v)}
                    autoComplete="tel-national"
                    inputMode="tel"
                    placeholder="11 2345-6789"
                    hint="Con código de área, sin 0 ni 15."
                  />
                  <TextField name="birthDate" label="Fecha de nacimiento" type="date" value={data.birthDate} error={errors.birthDate} onChange={(v) => set("birthDate", v)} autoComplete="bday" />
                  <div>
                    <label htmlFor="province" className="label">
                      Provincia <span className="text-gt-orange">*</span>
                    </label>
                    <select
                      id="province"
                      value={data.province}
                      onChange={(e) => set("province", e.target.value)}
                      aria-invalid={!!errors.province}
                      aria-describedby={errors.province ? "province-error" : undefined}
                      className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230A0D14%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11"
                    >
                      <option value="">Elegí una provincia</option>
                      {provinces.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <FieldError id="province-error" msg={errors.province} />
                  </div>
                  <TextField name="city" label="Localidad" value={data.city} error={errors.city} onChange={(v) => set("city", v)} autoComplete="address-level2" placeholder="Ej: Lanús" />
                  <TextField name="workZone" label="Zona donde te gustaría trabajar" value={data.workZone} error={errors.workZone} onChange={(v) => set("workZone", v)} placeholder="Ej: Capital y zona sur" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <StepTitle n={2} title="Tu perfil como conductor" text="Elegí las opciones que mejor te representen. No hay respuestas incorrectas." />
                <OptionGroup name="hasLicense" label="¿Tenés licencia de conducir vigente?" values={options.hasLicense} value={data.hasLicense} onChange={(v) => set("hasLicense", v as string)} error={errors.hasLicense} columns={3} />
                {data.hasLicense !== "No tengo" && (
                  <OptionGroup name="licenseYears" label="¿Desde hace cuánto tiempo tenés licencia?" values={options.licenseYears} value={data.licenseYears} onChange={(v) => set("licenseYears", v as string)} error={errors.licenseYears} columns={2} />
                )}
                <OptionGroup name="appExperience" label="¿Trabajaste anteriormente con aplicaciones de movilidad?" values={options.appExperience} value={data.appExperience} onChange={(v) => set("appExperience", v as string)} error={errors.appExperience} columns={3} />
                <OptionGroup name="apps" label="¿Con qué aplicaciones trabajás o te gustaría trabajar?" values={options.apps} value={data.apps} onChange={(v) => set("apps", v as string[])} error={errors.apps} multiple columns={3} />
                <OptionGroup name="availability" label="¿Contás con disponibilidad para comenzar?" values={options.availability} value={data.availability} onChange={(v) => set("availability", v as string)} error={errors.availability} columns={2} />
                <OptionGroup name="situation" label="¿Cuál es tu situación actual?" values={options.situation} value={data.situation} onChange={(v) => set("situation", v as string)} error={errors.situation} columns={3} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <StepTitle n={3} title="Revisá y confirmá" text="Chequeá que todo esté bien antes de enviar." />
                <div className="overflow-hidden rounded-2xl border border-line">
                  {[0, 1].map((s) => (
                    <div key={s} className="border-b border-line last:border-b-0">
                      <div className="flex items-center justify-between bg-mist px-5 py-3">
                        <p className="text-[12px] font-semibold tracking-[0.12em] text-graphite/60 uppercase">{stepNames[s]}</p>
                        <button type="button" onClick={() => back(s)} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gt-blue hover:underline">
                          <PencilLine className="size-3.5" /> Editar
                        </button>
                      </div>
                      <dl className="grid gap-x-6 px-5 py-2 sm:grid-cols-2">
                        {summary.slice(s === 0 ? 0 : 8, s === 0 ? 8 : undefined).map(([k, v]) => (
                          <div key={k} className="border-b border-line/60 py-3 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                            <dt className="text-[12px] text-graphite/50">{k}</dt>
                            <dd className="mt-0.5 text-[15px] font-medium break-words text-ink">{v || "—"}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-gt-blue/[0.05] p-5 text-[14px] leading-relaxed text-graphite/80">
                  Enviar la solicitud <strong>no implica aprobación automática ni reserva de un vehículo</strong>. El equipo revisará tus datos y te
                  contactará para informarte los próximos pasos y cómo entregar la documentación de forma segura.
                </div>

                <div>
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${errors.acceptPrivacy ? "border-red-300" : "border-line"}`}>
                    <input
                      id="acceptPrivacy"
                      type="checkbox"
                      checked={data.acceptPrivacy}
                      onChange={(e) => set("acceptPrivacy", e.target.checked)}
                      aria-invalid={!!errors.acceptPrivacy}
                      aria-describedby={errors.acceptPrivacy ? "acceptPrivacy-error" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-[#174FC1]"
                    />
                    <span className="text-[14.5px] leading-relaxed text-graphite">
                      Leí y acepto la{" "}
                      <Link href="/privacidad" target="_blank" className="font-semibold text-gt-blue underline underline-offset-2">
                        Política de privacidad
                      </Link>{" "}
                      y autorizo a GT Rental a utilizar mis datos para evaluar mi postulación y contactarme.
                    </span>
                  </label>
                  <FieldError id="acceptPrivacy-error" msg={errors.acceptPrivacy} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="mt-6 flex gap-2 rounded-xl bg-red-50 p-4 text-[14px] text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> No pudimos enviar tu solicitud. Tus datos siguen acá: probá de nuevo en unos segundos.
          </p>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => back()} className="btn btn-ghost-dark w-full sm:w-auto" disabled={status === "sending"}>
              Volver
            </button>
          ) : (
            <p className="flex items-center gap-2 text-[12.5px] text-graphite/50">
              <Lock className="size-3.5" /> Tus datos se tratan de forma confidencial.
            </p>
          )}
          {step < 2 ? (
            <button type="submit" className="btn btn-blue w-full sm:w-auto">
              Continuar <ArrowIcon />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-full sm:w-auto sm:min-w-[260px]" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar mi postulación <ArrowIcon />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepTitle({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.2em] text-gt-orange">PASO 0{n} / 03</p>
      <h2 className="display mt-2 text-[38px] text-ink sm:text-[46px]">{title}</h2>
      <p className="mt-2 text-[15px] text-graphite/60">{text}</p>
    </div>
  );
}

function Success({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="py-6 text-center sm:py-10" role="status">
      <div className="relative mx-auto grid size-24 place-items-center">
        <motion.span className="absolute inset-0 rounded-full bg-gt-orange/20" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: [0.4, 1.4, 1.2], opacity: [0, 1, 0] }} transition={{ duration: 1.4, ease }} />
        <motion.span className="grid size-20 place-items-center rounded-full bg-gt-orange text-ink" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}>
          <motion.svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.45 }} />
          </motion.svg>
        </motion.span>
      </div>
      <h2 className="display mt-8 text-[clamp(2.6rem,7vw,4.4rem)] text-ink">
        ¡Listo! Recibimos <br className="hidden sm:block" />
        tu solicitud<span className="text-gt-orange">.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-relaxed text-graphite/70">
        Gracias por tu interés en GT Rental{name ? `, ${name}` : ""}. Registramos tus datos y el equipo podrá revisarlos para orientarte sobre los
        próximos pasos.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-ghost-dark">
          Volver al inicio
        </Link>
        <a href={waLink("postulacion")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <WhatsAppIcon className="size-4" /> Consultar por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

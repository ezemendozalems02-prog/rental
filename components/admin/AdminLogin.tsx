"use client";

import Image from "next/image";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import { DEMO_CREDENTIALS, login } from "@/lib/demo-store";
import { Logo } from "../Logo";

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    if (login(email, password)) onLogin();
    else {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-ink lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/img/silueta.jpg" alt="" fill priority sizes="50vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink" />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="display text-[64px]">
            Panel <span className="text-gt-orange">comercial</span>
          </p>
          <p className="mt-2 text-white/60">Postulaciones, estados y flota en un solo lugar.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-16">
        <form onSubmit={submit} className="w-full max-w-sm text-white">
          <span className="text-[22px]">
            <Logo />
          </span>
          <h1 className="display mt-10 text-[44px]">Ingresar</h1>
          <p className="mt-1 text-[14px] text-white/50">Acceso exclusivo para el equipo de GT Rental.</p>

          <div className="mt-8 rounded-xl border border-gt-orange/30 bg-gt-orange/10 p-4 text-[13px] leading-relaxed text-white/80">
            <p className="font-semibold text-gt-orange">Credenciales de demostración</p>
            <p className="mt-1 font-mono text-[12.5px]">
              {DEMO_CREDENTIALS.email}
              <br />
              {DEMO_CREDENTIALS.password}
            </p>
            <button
              type="button"
              className="mt-1 inline-flex min-h-11 items-center text-[12.5px] font-semibold underline underline-offset-2"
              onClick={() => {
                setEmail(DEMO_CREDENTIALS.email);
                setPassword(DEMO_CREDENTIALS.password);
              }}
            >
              Completar automáticamente
            </button>
          </div>

          <label htmlFor="email" className="mt-8 mb-2 block text-[13px] font-semibold text-white/70">
            Correo
          </label>
          <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="field border-white/10 bg-white/[0.04] text-white" required />
          <label htmlFor="password" className="mt-5 mb-2 block text-[13px] font-semibold text-white/70">
            Contraseña
          </label>
          <div className="relative">
            <input id="password" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="field border-white/10 bg-white/[0.04] pr-12 text-white" required />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"} className="absolute top-1/2 right-1.5 grid size-11 -translate-y-1/2 place-items-center text-white/50 hover:text-white">
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-4 flex items-center gap-2 text-[13px] text-red-400">
              <AlertCircle className="size-4" /> {error}
            </p>
          )}
          <button type="submit" disabled={loading} className="btn btn-primary mt-8 w-full">
            {loading ? <LoaderCircle className="size-4 animate-spin" /> : <Lock className="size-4" />} Ingresar
          </button>
          <p className="mt-6 text-[12px] leading-relaxed text-white/35">
            En producción: autenticación real con Supabase Auth, roles y políticas de acceso a la base de datos.
          </p>
        </form>
      </div>
    </div>
  );
}

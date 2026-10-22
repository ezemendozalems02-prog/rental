import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-5 text-center text-white">
      <div aria-hidden className="road-dash absolute top-1/2 right-0 left-0 h-[2px] text-white/10" />
      <Link href="/" className="text-[20px]" aria-label="GT Rental — Inicio">
        <Logo />
      </Link>
      <p className="display relative mt-10 text-[30vw] leading-none text-white/[0.06] sm:text-[220px]">404</p>
      <h1 className="display -mt-6 text-[44px] sm:-mt-16 sm:text-[64px]">
        Te desviaste <span className="text-gt-orange">del camino.</span>
      </h1>
      <p className="mt-4 text-white/60">La página que buscás no existe o cambió de dirección.</p>
      <Link href="/" className="btn btn-primary mt-10">
        Volver al inicio
      </Link>
    </main>
  );
}

import { Logo } from "./Logo";

/**
 * Animación de entrada (~1,2 s) resuelta 100% en CSS: no espera recursos,
 * no bloquea la navegación y desaparece aunque el JS tarde en cargar.
 * Se omite en visitas siguientes de la sesión y con movimiento reducido.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__road" />
      <div className="preloader__spark" />
      <div className="preloader__logo bg-ink px-6 py-4 text-[28px] sm:text-[34px]">
        <Logo />
      </div>
    </div>
  );
}

/**
 * LOGOTIPO — ESPACIO RESERVADO.
 * Wordmark provisional hasta incorporar el logotipo oficial de GT Rental.
 * Para reemplazarlo: colocar /public/brand/logo-light.svg y logo-dark.svg
 * y devolver un <Image> con esos archivos manteniendo la proporción original.
 */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${text} ${className}`} aria-label="GT Rental">
      <svg viewBox="0 0 48 32" className="h-[1.6em] w-auto" aria-hidden="true">
        <path d="M6 0h42l-6 32H0z" fill="#174FC1" />
        <path d="M35 0h13l-6 32H29z" fill="#FF842F" />
        <text
          x="17"
          y="23.5"
          textAnchor="middle"
          fontFamily="var(--font-archivo)"
          fontWeight="800"
          fontSize="19"
          fontStyle="italic"
          fill="#fff"
          style={{ fontVariationSettings: '"wdth" 80' }}
        >
          GT
        </text>
      </svg>
      <span className="display-wide text-[1.05em] leading-none tracking-[0.18em]">Rental</span>
    </span>
  );
}

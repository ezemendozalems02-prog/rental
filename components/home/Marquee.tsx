const words = ["Movilidad", "Oportunidades", "Confianza", "Gestión", "Acompañamiento"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="overflow-hidden border-y border-white/[0.06] bg-ink py-5 text-white select-none">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="display flex items-center text-[34px] sm:text-[44px]">
                <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]" : "text-white"}>{w}</span>
                <span className="mx-8 inline-block h-2 w-8 -skew-x-[25deg] bg-gt-orange" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

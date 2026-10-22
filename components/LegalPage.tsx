import { FileWarning } from "lucide-react";

export type LegalSection = { title: string; body: React.ReactNode };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <section className="bg-white pt-28 pb-16 sm:pt-44 sm:pb-24">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-gt-blue">Legal</p>
            <h1 className="display mt-5 text-[clamp(2.8rem,6vw,4.8rem)] text-ink">{title}</h1>
            <p className="mt-4 text-[13px] text-graphite/50">{updated}</p>
            <nav aria-label="Secciones" className="mt-8 hidden lg:block">
              <ol className="space-y-2 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#s${i + 1}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-[14px] text-graphite/60 hover:border-gt-orange hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="flex gap-3 rounded-2xl border border-gt-orange/40 bg-gt-orange/[0.07] p-5 text-[14.5px] leading-relaxed text-graphite">
            <FileWarning className="mt-0.5 size-5 shrink-0 text-gt-orange" />
            <p>
              <strong>Borrador pendiente de revisión legal.</strong> Este texto es una estructura de trabajo y no fue aprobado por GT Rental. Los
              campos entre corchetes deben completarse con información confirmada antes de publicar.
            </p>
          </div>
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <article key={s.title} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-4 text-[22px] font-semibold text-ink">
                  <span className="font-mono text-[12px] text-gt-orange">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 pl-0 text-[16px] leading-relaxed text-graphite/75 sm:pl-9 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_mark]:rounded [&_mark]:bg-mist [&_mark]:px-1.5 [&_mark]:text-graphite/60">
                  {s.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

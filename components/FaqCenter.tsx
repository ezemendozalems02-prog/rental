"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { faqCategories, faqs, type FaqCategory } from "@/lib/faq";
import { FAQAccordion } from "./FAQAccordion";

export function FaqCenter() {
  const [cat, setCat] = useState<FaqCategory | "todas">("todas");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return faqs.filter(
      (f) => (cat === "todas" || f.category === cat) && (!term || f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  const tabs = [{ id: "todas" as const, label: "Todas" }, ...faqCategories];

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <label htmlFor="faq-search" className="sr-only">
            Buscar en preguntas frecuentes
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-graphite/40" />
            <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscá tu pregunta…" className="field pl-11" />
          </div>
          <div role="tablist" aria-label="Categorías" className="scrollbar-none -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:px-0">
            {tabs.map((t) => {
              const count = t.id === "todas" ? faqs.length : faqs.filter((f) => f.category === t.id).length;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={cat === t.id}
                  onClick={() => setCat(t.id)}
                  className={`flex min-h-11 shrink-0 items-center justify-between gap-4 rounded-full px-5 py-3 text-left text-[14px] font-medium whitespace-nowrap transition-colors lg:rounded-xl ${
                    cat === t.id ? "bg-ink text-white" : "bg-white text-graphite hover:bg-white/60"
                  }`}
                >
                  {t.label}
                  <span className={`text-[12px] ${cat === t.id ? "text-gt-orange" : "text-graphite/40"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="min-w-0 rounded-[28px] bg-white px-5 py-2 sm:px-8 lg:col-span-8" role="tabpanel">
        {list.length ? (
          <FAQAccordion key={cat + q} items={list} />
        ) : (
          <p className="py-16 text-center text-graphite/60">No encontramos resultados. Probá con otra palabra o escribinos.</p>
        )}
      </div>
    </div>
  );
}

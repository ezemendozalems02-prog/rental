"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";

export function FAQAccordion({ items, tone = "light" }: { items: Faq[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  const dark = tone === "dark";

  return (
    <div className={`border-t ${dark ? "border-white/10" : "border-line"}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        const id = `${uid}-${i}`;
        return (
          <div key={f.q} className={`border-b ${dark ? "border-white/10" : "border-line"}`}>
            <h3>
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold transition-colors sm:text-[19px] ${
                  dark ? "text-white hover:text-gt-orange" : "text-ink hover:text-gt-blue"
                }`}
              >
                {f.q}
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-gt-orange bg-gt-orange text-ink" : dark ? "border-white/20" : "border-ink/15"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-7 text-[16px] leading-relaxed ${dark ? "text-white/65" : "text-graphite/70"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

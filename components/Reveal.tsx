"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Aparición al entrar en pantalla. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Titular que aparece línea por línea con máscara. */
export function RevealTitle({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  accent,
  animateOnMount = false,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  /** índice de línea resaltada en naranja */
  accent?: number;
  animateOnMount?: boolean;
}) {
  // El disparador vive en el contenedor (no recortado): las líneas ocultas por la máscara
  // no son detectables por IntersectionObserver.
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };
  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <motion.span aria-hidden className="block" initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className={`block ${accent === i ? "text-gt-orange" : ""}`}
              variants={{ hidden: { y: "140%" }, show: { y: "0%", transition: { duration: 1, delay: delay + i * 0.09, ease } } }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/data/menu";
import { VegBadge } from "@/components/site/VegBadge";

const layers = [
  { src: img.waffle, cls: "left-[2%] top-[16%] w-[30vw] md:w-[19vw]", depth: 90, rot: -8 },
  { src: img.pancake, cls: "right-[1%] top-[8%] w-[34vw] md:w-[21vw]", depth: 160, rot: 7 },
  { src: img.shake, cls: "left-[14%] bottom-[4%] w-[24vw] md:w-[13vw]", depth: 220, rot: 5 },
  { src: img.brownie, cls: "right-[12%] bottom-[2%] w-[28vw] md:w-[16vw]", depth: 60, rot: -5 },
];

/** Cinematic menu opener: layered dessert imagery drifting at different depths. */
export function MenuHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex min-h-[86svh] items-center overflow-hidden pt-28 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 70%)",
        }}
      />

      {layers.map((l, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -l.depth]);
        return (
          <motion.img
            key={l.src}
            src={l.src}
            alt=""
            aria-hidden
            style={{ y, rotate: l.rot }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-none absolute drop-shadow-2xl ${l.cls}`}
          />
        );
      })}

      <motion.div style={{ y: titleY, opacity: fade }} className="relative mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <p className="eyebrow text-caramel">Follow your craving.</p>
        <h1 className="display mt-4 text-[24vw] leading-[0.78] md:text-[15vw]">
          THE
          <span className="ml-[0.12em] text-caramel">MENU</span>
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <VegBadge />
          <span className="eyebrow text-muted-foreground" style={{ fontSize: "0.55rem" }}>
            Prices in ₹ · Seasonal items subject to availability
          </span>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="eyebrow text-espresso/60" style={{ fontSize: "0.5rem" }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-2 h-8 w-px bg-caramel"
        />
      </motion.div>
    </section>
  );
}

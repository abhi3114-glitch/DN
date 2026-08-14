import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";
import pancake from "@/assets/pancake-nutella.png";

/** Featured item: oversized food visual + magnetic CTA. */
export function Spotlight({ onOpen }: { onOpen: () => void }) {
  const mx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });

  const magnet = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };

  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
      <p className="eyebrow absolute right-5 top-10 text-caramel md:right-10">Chef's obsession</p>
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative"
          data-cursor="TASTE"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-110"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 55%, color-mix(in oklab, var(--caramel) 32%, transparent), transparent 70%)",
            }}
          />
          <img
            src={pancake}
            alt="High on Nutella mini pancakes"
            className="mx-auto w-[86%] drop-shadow-2xl transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.06] group-hover:-rotate-2"
          />
        </motion.div>

        <div>
          <span className="eyebrow text-muted-foreground" style={{ fontSize: "0.55rem" }}>
            Featured — Mini Pancakes
          </span>
          <h2 className="display mt-4 text-[14vw] leading-[0.84] md:text-[5vw]">
            HIGH ON
            <br />
            <span className="text-caramel">NUTELLA</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">
            Rich, indulgent and unapologetically chocolatey.
          </p>
          <p className="display mt-6 text-6xl">₹270</p>

          <motion.button
            onClick={onOpen}
            onMouseMove={magnet}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ x: mx, y: my }}
            data-cursor="OPEN"
            className="mt-8 bg-espresso px-8 py-4 text-cream transition-colors hover:bg-cocoa"
          >
            <span className="eyebrow" style={{ fontSize: "0.55rem" }}>
              Explore
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { groups, priceLabel } from "@/data/menu";

const featured = ["waffles", "mini-pancakes", "brownie-bowl", "shakes"] as const;

const chapters = featured.map((id) => groups.find((g) => g.id === id)!);

/** Scroll-controlled cinematic product showcase — one dessert owns the screen at a time. */
export function Signature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = scrollYProgress;
  const n = chapters.length;

  return (
    <section
      id="signature"
      ref={ref}
      className="dark-zone relative"
      style={{ height: `${n * 110}svh` }}
    >
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 62% 45%, color-mix(in oklab, var(--caramel) 26%, transparent), transparent 70%)",
          }}
        />

        <div className="absolute left-5 top-24 z-30 md:left-10 md:top-28">
          <p className="eyebrow text-gold">Signature Selection</p>
        </div>

        {chapters.map((g, i) => (
          <Slide key={g.id} group={g} index={i} total={n} progress={p} />
        ))}

        {/* chapter rail */}
        <div className="absolute bottom-8 left-5 z-30 flex items-center gap-3 md:left-10">
          {chapters.map((g, i) => (
            <Tick key={g.id} index={i} total={n} progress={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const seg = 1 / total;
  const width = useTransform(
    progress,
    [index * seg - 0.02, index * seg + 0.02, (index + 1) * seg - 0.02, (index + 1) * seg + 0.02],
    [10, 54, 54, 10],
  );
  const opacity = useTransform(
    progress,
    [index * seg - 0.02, index * seg + 0.02, (index + 1) * seg - 0.02, (index + 1) * seg + 0.02],
    [0.3, 1, 1, 0.3],
  );
  return <motion.span className="h-px bg-gold" style={{ width, opacity }} />;
}

function Slide({
  group,
  index,
  total,
  progress,
}: {
  group: (typeof chapters)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const pad = seg * 0.16;

  const range = [start - pad, start + pad * 0.6, end - pad * 0.6, end + pad];
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const textOpacity = useTransform(
    progress,
    [start - pad * 0.2, start + pad * 0.45, end - pad * 0.9, end - pad * 0.25],
    [0, 1, 1, 0],
  );
  const imgY = useTransform(progress, range, ["26%", "0%", "0%", "-26%"]);
  const imgScale = useTransform(progress, range, [0.72, 1, 1.08, 1.3]);
  const imgRotate = useTransform(progress, range, [10, 0, -2, -12]);
  const textY = useTransform(progress, range, ["60%", "0%", "0%", "-60%"]);
  const numX = useTransform(progress, range, ["12%", "0%", "-4%", "-18%"]);

  return (
    <motion.div
      className="absolute inset-0 grid place-items-center px-5 md:px-10"
      style={{ opacity, pointerEvents: "none" }}
    >
      <motion.span
        className="display pointer-events-none absolute right-[2%] top-[12%] text-[38vw] leading-none text-cream/[0.05] md:text-[26vw]"
        style={{ x: numX }}
      >
        0{index + 1}
      </motion.span>

      <div className="relative grid w-full max-w-[1500px] items-center gap-6 md:grid-cols-[1.05fr_1fr]">
        <motion.div className="relative grid place-items-center" style={{ y: imgY }}>
          <div
            aria-hidden
            className="absolute h-[58%] w-[58%] rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--gold) 32%, transparent)" }}
          />
          <motion.img
            src={group.image}
            alt={group.title}
            loading="lazy"
            className="relative w-[62vw] max-w-[560px] drop-shadow-2xl md:w-[34vw]"
            style={{ scale: imgScale, rotate: imgRotate }}
          />
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 -mt-8 md:mt-0">
          <p className="eyebrow text-gold">{group.kicker ?? "Signature"}</p>
          <h3 className="display mt-3 text-[15vw] leading-[0.82] text-cream md:text-[6.4vw]">
            {group.title}
          </h3>
          <div className="mt-5 flex items-end gap-6">
            <p className="display text-5xl text-gold md:text-6xl">
              {priceLabel(group.items[0]?.price ?? null)}
            </p>
            <p className="max-w-xs pb-2 text-sm text-cream/60">
              {group.items
                .slice(0, 3)
                .map((it) => it.name)
                .join(" · ")}
            </p>
          </div>
          <Link
            to="/menu"
            hash={group.id}
            data-cursor="VIEW"
            className="eyebrow mt-8 inline-flex items-center gap-3 border-b border-cream/40 pb-1 text-cream transition-colors hover:border-gold hover:text-gold"
            style={{ pointerEvents: "auto" }}
          >
            The full {group.title} list →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

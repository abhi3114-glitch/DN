import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { priceLabel, type Group } from "@/data/menu";
import type { QuickItem } from "./QuickView";

type Props = {
  group: Group;
  index: number;
  dark?: boolean;
  onOpen: (item: QuickItem) => void;
};

/** One editorial menu chapter. Layout alternates by index for a magazine rhythm. */
export function Chapter({ group, index, dark, onOpen }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const variant = index % 3; // 0: image left, 1: image right, 2: centered visual

  const visual = (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative md:sticky md:top-28 md:self-start"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(50% 50% at 50% 55%, color-mix(in oklab, var(--${
            dark ? "gold" : "caramel"
          }) 26%, transparent), transparent 70%)`,
        }}
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={hover ?? group.id}
          src={group.image}
          alt={group.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: hover ? 1.06 : 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-[70%] drop-shadow-2xl md:w-[86%]"
        />
      </AnimatePresence>
      <AnimatePresence>
        {hover && (
          <motion.p
            key={hover}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`eyebrow mt-4 text-center ${dark ? "text-gold" : "text-caramel"}`}
            style={{ fontSize: "0.55rem" }}
          >
            {hover}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const list = (
    <ul className={dark ? "divide-y divide-cream/10" : "divide-y divide-border"}>
      {group.items.map((it) => {
        const on = hover === it.name;
        return (
          <li key={it.name}>
            <button
              onMouseEnter={() => setHover(it.name)}
              onMouseLeave={() => setHover(null)}
              onClick={() =>
                onOpen({
                  name: it.name,
                  price: it.price,
                  ...(it.note ? { note: it.note } : {}),
                  group: group.title,
                  ...(group.kicker ? { kicker: group.kicker } : {}),
                  image: group.image,
                })
              }
              data-cursor="TASTE"
              className="group flex w-full items-baseline gap-4 py-4 text-left transition-all duration-500"
              style={{ opacity: hover && !on ? 0.4 : 1, paddingLeft: on ? 14 : 0 }}
            >
              <span
                className={`display text-2xl transition-colors md:text-[2.1vw] ${
                  on ? (dark ? "text-gold" : "text-caramel") : ""
                }`}
              >
                {it.name}
                {it.note && (
                  <span className="ml-2 align-middle text-xs tracking-widest uppercase opacity-50">
                    {it.note}
                  </span>
                )}
              </span>
              <span
                className={`h-px flex-1 ${dark ? "bg-cream/15" : "bg-border"} transition-colors ${
                  on ? "bg-caramel/60" : ""
                }`}
              />
              <span
                className="eyebrow shrink-0 transition-opacity duration-300"
                style={{ fontSize: "0.5rem", opacity: on ? 1 : 0 }}
              >
                View
              </span>
              <span
                className="display shrink-0 text-xl transition-all duration-500 md:text-2xl"
                style={{ transform: on ? "scale(1.18)" : "scale(1)" }}
              >
                {priceLabel(it.price)}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const head = (
    <div className="mb-10">
      <span className={`eyebrow ${dark ? "text-gold" : "text-caramel"}`} style={{ fontSize: "0.55rem" }}>
        {String(index + 1).padStart(2, "0")} — {group.kicker ?? "Chapter"}
      </span>
      <h2 className="display mt-3 text-[13vw] leading-[0.84] md:text-[5.4vw]">{group.title}</h2>
    </div>
  );

  return (
    <motion.section
      ref={ref}
      id={group.id}
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.7 }}
      className={`grain scroll-mt-24 px-5 py-20 md:px-10 md:py-28 ${dark ? "dark-zone" : ""}`}
    >
      <div className="mx-auto max-w-[1600px]">
        {variant === 2 ? (
          <>
            <div className="text-center">{head}</div>
            <div className="mx-auto max-w-[520px]">{visual}</div>
            <div className="mx-auto mt-12 max-w-[900px]">{list}</div>
          </>
        ) : (
          <div
            className={`grid gap-10 md:gap-16 ${
              variant === 0 ? "md:grid-cols-[0.85fr_1.15fr]" : "md:grid-cols-[1.15fr_0.85fr]"
            }`}
          >
            {variant === 0 ? (
              <>
                <div>{visual}</div>
                <div>
                  {head}
                  {list}
                </div>
              </>
            ) : (
              <>
                <div>
                  {head}
                  {list}
                </div>
                <div>{visual}</div>
              </>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}

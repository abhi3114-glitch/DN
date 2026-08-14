import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { categories } from "@/data/menu";

/** Horizontal "doorway" gallery driven by vertical scroll (CSS sticky + spring). */
export function Categories() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  const measure = () => {
    const inner = track.current;
    if (!inner) return;
    const isDesktop = window.matchMedia("(min-width: 901px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) {
      setOverflow(0);
      return;
    }
    setOverflow(Math.max(0, inner.scrollWidth - window.innerWidth + 80));
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -overflow]), {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id="experience"
      ref={section}
      className="dark-zone relative"
      style={overflow ? { height: `calc(100svh + ${overflow}px)` } : undefined}
    >
      <div className="grain sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 md:pt-32">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: hover ? 1 : 0,
            background:
              "radial-gradient(50% 60% at 50% 60%, color-mix(in oklab, var(--caramel) 22%, transparent), transparent 70%)",
          }}
        />

        <div className="relative px-5 md:px-10">
          <p className="eyebrow text-gold">The Chapters</p>
          <h2 className="display mt-3 text-[13vw] leading-[0.8] text-cream md:text-[6vw]">
            TEN WAYS TO
            <br />
            <span className="text-gold">RUIN A DIET.</span>
          </h2>
        </div>

        <motion.div
          ref={track}
          style={{ x: overflow ? x : 0 }}
          className="hide-scrollbar relative mt-10 flex gap-px overflow-x-auto px-5 md:mt-14 md:overflow-visible md:px-10"
        >
          {categories.map((c) => {
            const dim = hover !== null && hover !== c.to;
            return (
              <Link
                key={c.to}
                to="/menu"
                hash={c.to}
                data-cursor="ENTER"
                onMouseEnter={() => setHover(c.to)}
                onMouseLeave={() => setHover(null)}
                className="group relative flex h-[58svh] w-[76vw] shrink-0 flex-col justify-between overflow-hidden border-l border-cream/10 px-5 pt-6 transition-all duration-700 last:border-r md:h-[62svh] md:w-[27vw] md:px-7"
                style={{ opacity: dim ? 0.35 : 1 }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-gold/20 to-transparent transition-transform duration-700 ease-out group-hover:scale-y-100"
                />
                <div className="relative flex items-start justify-between">
                  <span className="eyebrow text-gold">{c.n}</span>
                  <span className="eyebrow text-cream/40 transition-transform duration-700 group-hover:translate-x-2">
                    →
                  </span>
                </div>

                <h3 className="display relative z-10 mt-auto text-[11vw] leading-[0.85] text-cream transition-transform duration-700 group-hover:-translate-y-3 md:text-[3.4vw]">
                  {c.name}
                </h3>

                <div className="relative h-[46%] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute left-1/2 top-6 w-[78%] -translate-x-1/2 translate-y-4 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.14] group-hover:-rotate-3"
                  />
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

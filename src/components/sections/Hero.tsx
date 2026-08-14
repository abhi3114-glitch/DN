import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { VegBadge } from "@/components/site/VegBadge";
import hero from "@/assets/hero-waffle.png";
import pancake from "@/assets/pancake-nutella.png";
import shake from "@/assets/shake.png";
import icecream from "@/assets/icecream.png";
import drizzle from "@/assets/drizzle-choco.png";

/** Deterministic pseudo-random so SSR and client agree. */
function seeded(i: number, salt: number) {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function Particles({ tilt, depth }: { tilt: { x: number; y: number }; depth: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const count = isMobile ? 8 : 26;
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i, 1) * 100,
        top: seeded(i, 2) * 100,
        size: 3 + seeded(i, 3) * 9,
        z: 0.3 + seeded(i, 4) * 1.4,
        dur: 6 + seeded(i, 5) * 8,
        delay: -seeded(i, 6) * 10,
        blur: !isMobile && seeded(i, 7) > 0.7,
      })),
    [count, isMobile],
  );

  if (!mounted) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: depth }}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            background:
              i % 5 === 0
                ? "color-mix(in oklab, var(--gold) 85%, transparent)"
                : "color-mix(in oklab, var(--choco) 78%, transparent)",
            filter: b.blur ? "blur(3px)" : "none",
            opacity: b.blur ? 0.45 : 0.7,
            x: tilt.x * -40 * b.z,
            y: tilt.y * -30 * b.z,
            animation: `float-soft ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Direct scroll mapping gives immediate 60fps response without spring physics lag
  const p = scrollYProgress;

  // camera pushes into the dessert
  const plateScale = useTransform(p, [0, 0.55, 1], [1, 1.85, 2.7]);
  const plateY = useTransform(p, [0, 1], ["0%", "-16%"]);
  const plateRotate = useTransform(p, [0, 1], [0, -7]);

  const titleY = useTransform(p, [0, 1], ["0%", "-90%"]);
  const titleTrack = useTransform(p, [0, 1], ["-0.03em", "0.14em"]);
  const nationY = useTransform(p, [0, 1], ["0%", "70%"]);
  const copyFade = useTransform(p, [0, 0.3], [1, 0]);
  const glowScale = useTransform(p, [0, 1], [1, 1.6]);
  const particleDepth = useTransform(p, [0, 1], [0, -200]);

  // signature chocolate wipe that closes the scene
  const wipe = useTransform(p, [0.45, 1], ["130%", "0%"]);
  const wipeSkew = useTransform(p, [0.45, 1], [-3, 0]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      setTilt({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative h-[260svh]">
      <div
        className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden grain"
      >
        {/* dynamic warm light */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            scale: glowScale,
            x: tilt.x * 50,
            y: tilt.y * 30,
            background:
              "radial-gradient(60% 48% at 50% 44%, color-mix(in oklab, var(--gold) 34%, transparent), transparent 72%)",
            willChange: "transform",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 120%, color-mix(in oklab, var(--choco) 30%, transparent), transparent 60%)",
          }}
        />

        <Particles tilt={tilt} depth={particleDepth} />

        {/* satellites — deep parallax layer */}
        <motion.img
          src={pancake}
          alt=""
          aria-hidden
          className="absolute left-[3%] top-[18%] w-28 animate-float-soft opacity-90 md:w-52"
          style={{ x: tilt.x * -110, y: tilt.y * -70, rotate: tilt.x * 12, scale: glowScale, willChange: "transform" }}
        />
        <motion.img
          src={shake}
          alt=""
          aria-hidden
          className="absolute right-[4%] top-[12%] w-20 animate-float-soft opacity-90 md:w-40 [animation-delay:1.2s]"
          style={{ x: tilt.x * 130, y: tilt.y * 90, rotate: tilt.x * -12, willChange: "transform" }}
        />
        <motion.img
          src={icecream}
          alt=""
          aria-hidden
          className="absolute bottom-[12%] left-[9%] hidden w-28 animate-float-soft opacity-90 md:block [animation-delay:2.4s]"
          style={{ x: tilt.x * -150, y: tilt.y * 60, willChange: "transform" }}
        />

        <div className="relative w-full pt-16 md:pt-20">
          <div className="mx-auto max-w-[1700px] px-5 text-center md:px-10">
            <motion.p
              className="eyebrow text-cocoa"
              style={{ opacity: copyFade }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              Vegetarian Dessert Café · Est. Sweet
            </motion.p>

            <motion.h1
              style={{ y: titleY, letterSpacing: titleTrack, willChange: "transform" }}
              className="display mt-3 text-[21vw] leading-[0.78] text-espresso md:text-[13vw]"
            >
              {"DESSERT".split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.055, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {c}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <div className="relative -mt-[8vw] md:-mt-[7vw]">
              <motion.div
                className="relative z-10 mx-auto w-[80vw] max-w-[780px] md:w-[48vw]"
                style={{
                  y: plateY,
                  scale: plateScale,
                  rotate: plateRotate,
                  willChange: "transform",
                }}
                initial={{ opacity: 0, scale: 0.84, y: 70 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* contact shadow */}
                <motion.div
                  aria-hidden
                  className="absolute bottom-[6%] left-1/2 h-[10%] w-[62%] -translate-x-1/2 rounded-[50%] blur-2xl"
                  style={{
                    background: "color-mix(in oklab, var(--espresso) 55%, transparent)",
                    x: tilt.x * -18,
                  }}
                />
                <motion.img
                  src={drizzle}
                  alt=""
                  aria-hidden
                  className="absolute -left-[12%] bottom-[-6%] w-[54%] opacity-85"
                  style={{ x: tilt.x * -34, y: tilt.y * -18, rotate: tilt.x * -6 }}
                />
                <motion.img
                  src={hero}
                  alt="Belgian waffle stack with molten chocolate"
                  fetchPriority="high"
                  className="relative w-full drop-shadow-2xl"
                  style={{ x: tilt.x * 26, y: tilt.y * 18 }}
                />
                {/* specular sheen */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    x: tilt.x * 90,
                    y: tilt.y * 60,
                    background:
                      "radial-gradient(38% 32% at 40% 28%, rgba(255,255,255,0.4), transparent 70%)",
                  }}
                />
              </motion.div>

              <motion.h2
                className="display relative z-20 -mt-[9vw] text-[21vw] leading-[0.78] text-espresso md:-mt-[7vw] md:text-[13vw]"
                style={{ y: nationY, letterSpacing: titleTrack, willChange: "transform" }}
              >
                {"NATION".split("").map((c, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.55 + i * 0.055,
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {c}
                    </motion.span>
                  </span>
                ))}
              </motion.h2>
            </div>

            <motion.div
              className="mt-7 flex flex-col items-center gap-5"
              style={{ opacity: copyFade }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
            >
              <p className="max-w-sm text-sm text-muted-foreground">
                Sweet moments, perfectly made — waffles, pancake stacks, brownie bowls and shakes,
                handcrafted fresh every single day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/menu"
                  className="group relative overflow-hidden bg-espresso px-9 py-4 text-cream"
                  data-cursor="TASTE"
                >
                  <span className="eyebrow relative z-10">Explore the Menu</span>
                  <span className="absolute inset-0 -translate-y-full bg-caramel transition-transform duration-500 group-hover:translate-y-0" />
                </Link>
                <VegBadge />
              </div>
            </motion.div>
          </div>
        </div>

        {/* signature chocolate wipe into the next scene */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[120%]"
          style={{ y: wipe, skewY: wipeSkew }}
        >
          <div className="drip-strip -top-[70px]" />
          <div className="h-full w-full bg-espresso" />
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-5 hidden md:block"
          style={{ opacity: copyFade }}
          aria-hidden
        >
          <span className="eyebrow text-cocoa/60" style={{ fontSize: "0.55rem" }}>
            Scroll
          </span>
          <span className="mx-auto mt-2 block h-10 w-px bg-cocoa/30" />
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect } from "react";

/** Lenis smooth scroll, synced with GSAP ScrollTrigger. Disabled for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Mobile touch screens handle touch momentum scrolling natively; running Lenis smooth scroll on touch adds lag
    const isMobile = window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isMobile) return;

    let raf = 0;
    let destroy = () => {};

    (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1 });
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      destroy = () => lenis.destroy();
    })();


    return () => {
      cancelAnimationFrame(raf);
      destroy();
    };
  }, []);

  return null;
}

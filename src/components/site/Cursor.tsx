import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only chocolate cursor: a small disc that expands into a labelled
 * token over interactive elements (data-cursor="TASTE" etc).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("no-native-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor],a,button",
      ) as HTMLElement | null;
      if (!el) return setLabel(null);
      setLabel(el.dataset['cursor'] ?? (el.tagName === "A" ? "VIEW" : "PICK"));
    };

    const loop = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      if (dot.current)
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("no-native-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 transition-opacity duration-300"
        style={{ opacity: visible && !label ? 0.45 : 0 }}
      >
        <div className="h-9 w-9 rounded-full border border-espresso/40" />
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-espresso text-cream transition-all duration-500 ease-out"
          style={{
            width: label ? 88 : 12,
            height: label ? 88 : 12,
            transform: `scale(${down ? 0.86 : 1})`,
            mixBlendMode: label ? "normal" : "multiply",
          }}
        >
          <span
            className="eyebrow whitespace-nowrap transition-opacity duration-200"
            style={{ opacity: label ? 1 : 0, fontSize: "0.55rem" }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

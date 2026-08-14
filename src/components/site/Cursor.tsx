import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only chocolate cursor: a small disc that expands into a labelled
 * token over interactive elements (data-cursor="TASTE" etc).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLSpanElement>(null);

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
    let currentLabel: string | null = null;
    let isVisible = false;
    let isDown = false;

    const updateDOM = () => {
      if (ring.current) {
        ring.current.style.opacity = isVisible && !currentLabel ? "0.45" : "0";
      }
      if (dot.current) {
        dot.current.style.opacity = isVisible ? "1" : "0";
      }
      if (pill.current) {
        pill.current.style.width = currentLabel ? "88px" : "12px";
        pill.current.style.height = currentLabel ? "88px" : "12px";
        pill.current.style.transform = `scale(${isDown ? 0.86 : 1})`;
        pill.current.style.mixBlendMode = currentLabel ? "normal" : "multiply";
      }
      if (labelText.current) {
        labelText.current.textContent = currentLabel ?? "";
        labelText.current.style.opacity = currentLabel ? "1" : "0";
      }
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!isVisible) {
        isVisible = true;
        updateDOM();
      }
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor],a,button",
      ) as HTMLElement | null;
      const nextLabel = el ? (el.dataset["cursor"] ?? (el.tagName === "A" ? "VIEW" : "PICK")) : null;
      if (nextLabel !== currentLabel) {
        currentLabel = nextLabel;
        updateDOM();
      }
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

    const onDown = () => {
      isDown = true;
      updateDOM();
    };
    const onUp = () => {
      isDown = false;
      updateDOM();
    };
    const onLeave = () => {
      isVisible = false;
      updateDOM();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave, { passive: true });
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
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <div className="h-9 w-9 rounded-full border border-espresso/40" />
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 transition-opacity duration-300"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <div
          ref={pill}
          className="flex items-center justify-center rounded-full bg-espresso text-cream transition-all duration-300 ease-out"
          style={{
            width: 12,
            height: 12,
            mixBlendMode: "multiply",
            willChange: "width, height, transform",
          }}
        >
          <span
            ref={labelText}
            className="eyebrow whitespace-nowrap transition-opacity duration-200"
            style={{ opacity: 0, fontSize: "0.55rem" }}
          />
        </div>
      </div>
    </div>
  );
}

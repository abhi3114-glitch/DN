import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { priceLabel } from "@/data/menu";
import { VegBadge } from "@/components/site/VegBadge";

export type QuickItem = {
  name: string;
  price: number | null;
  note?: string;
  group: string;
  kicker?: string;
  image: string;
};

/** Premium side-panel quick view for a single menu item. */
export function QuickView({ item, onClose }: { item: QuickItem | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-espresso/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="dark-zone grain fixed inset-y-0 right-0 z-[80] flex w-full max-w-[560px] flex-col justify-between overflow-y-auto px-6 py-10 md:px-12"
          >
            <button
              onClick={onClose}
              className="eyebrow self-end text-cream/60 transition-colors hover:text-gold"
              style={{ fontSize: "0.55rem" }}
              data-cursor="CLOSE"
            >
              Close ✕
            </button>

            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--gold) 25%, transparent), transparent 70%)",
                }}
              />
              <motion.img
                key={item.name}
                initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                src={item.image}
                alt={item.name}
                className="relative mx-auto w-[70%] drop-shadow-2xl"
              />
            </div>

            <div>
              <span className="eyebrow text-gold" style={{ fontSize: "0.55rem" }}>
                {item.group}
              </span>
              <h3 className="display mt-3 text-[10vw] leading-[0.88] text-cream md:text-[3.2vw]">
                {item.name}
              </h3>
              <p className="display mt-4 text-5xl text-gold">{priceLabel(item.price)}</p>
              {(item.kicker || item.note) && (
                <p className="mt-4 text-sm text-cream/60">
                  {item.kicker}
                  {item.note ? ` · ${item.note}` : ""}
                </p>
              )}
              <div className="mt-6">
                <VegBadge />
              </div>
              <a
                href="#visit-cta"
                onClick={onClose}
                className="mt-8 block bg-gold px-8 py-4 text-center text-espresso transition-colors hover:bg-caramel"
                data-cursor="CRAVE"
              >
                <span className="eyebrow" style={{ fontSize: "0.55rem" }}>
                  Add to craving
                </span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

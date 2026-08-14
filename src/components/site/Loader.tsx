import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** ~1.8s chocolate-drop intro. Skipped entirely for reduced motion. */
export function Loader() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("dn-intro") === "1") return;
    setDone(false);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("dn-intro", "1");
      setDone(true);
      document.body.style.overflow = "";
    }, 1800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-cream grain"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.span
            className="absolute h-6 w-6 rounded-full bg-espresso"
            initial={{ y: "-60vh", scaleY: 1.8, opacity: 0 }}
            animate={{ y: 0, scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.5, 0, 0.2, 1] }}
          />
          <motion.span
            className="absolute rounded-full bg-espresso"
            initial={{ width: 24, height: 24, opacity: 0 }}
            animate={{ width: 3200, height: 3200, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="relative text-center text-cream"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <p className="display text-[13vw] leading-none md:text-[7vw]">DESSERT</p>
            <p className="eyebrow mt-3 text-gold">N A T I O N</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

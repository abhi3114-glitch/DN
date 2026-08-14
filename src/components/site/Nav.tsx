import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Menu", to: "/menu", hash: undefined as string | undefined },
  { label: "Experience", to: "/", hash: "experience" },
  { label: "About", to: "/", hash: "about" },
  { label: "Visit", to: "/", hash: "visit" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 backdrop-blur-md" : "py-6"
        }`}
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--cream) 78%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group leading-none" data-cursor="HOME" aria-label="Dessert Nation home">
            <span className="display block text-[1.15rem] tracking-[0.06em] md:text-[1.4rem]">DESSERT</span>
            <span
              className="eyebrow block text-caramel transition-all duration-500 group-hover:tracking-[0.5em]"
              style={{ fontSize: "0.5rem" }}
            >
              Nation
            </span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  className="eyebrow relative py-1 text-espresso/80 transition-colors hover:text-espresso"
                  data-cursor="GO"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-caramel transition-all duration-300 hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              hash="visit"
              className="hidden bg-espresso px-5 py-2.5 text-cream transition-colors hover:bg-cocoa md:block"
              data-cursor="LET'S GO"
            >
              <span className="eyebrow" style={{ fontSize: "0.58rem" }}>
                Order Now
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="eyebrow md:hidden"
              aria-label="Open menu"
              style={{ fontSize: "0.6rem" }}
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] dark-zone grain md:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(140% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-full flex-col justify-between p-7">
              <div className="flex items-start justify-between">
                <span className="display text-xl text-cream">DESSERT NATION</span>
                <button onClick={() => setOpen(false)} className="eyebrow text-gold" aria-label="Close menu">
                  Close
                </button>
              </div>
              <ul className="space-y-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + i * 0.07 }}
                  >
                    <Link
                      to={l.to}
                      {...(l.hash ? { hash: l.hash } : {})}
                      onClick={() => setOpen(false)}
                      className="display block text-[15vw] leading-[0.95] text-cream"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="eyebrow text-gold">Sweet Moments, Perfectly Made.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { VegBadge } from "./VegBadge";

const cols = [
  { label: "Menu", to: "/menu", hash: undefined as string | undefined },
  { label: "About", to: "/", hash: "about" },
  { label: "Contact", to: "/", hash: "visit" },
  { label: "Instagram", to: "/", hash: "gallery" },
  { label: "Location", to: "/", hash: "visit" },
] as const;

export function Footer() {
  return (
    <footer className="relative dark-zone grain overflow-hidden pt-28">
      <div className="drip-strip -top-1 animate-pulse [animation-duration:6s]" aria-hidden />
      <div className="mx-auto max-w-[1600px] px-5 pb-10 md:px-10">
        <div className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="display text-[13vw] leading-[0.85] text-cream md:text-[7vw]">
              DESSERT
              <br />
              <span className="text-gold">NATION</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm text-cream/60">Sweet Moments, Perfectly Made.</p>
            <VegBadge className="mt-6" />
          </div>
          <nav className="grid grid-cols-2 gap-3 self-end">
            {cols.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                {...(c.hash ? { hash: c.hash } : {})}
                className="eyebrow py-2 text-cream/70 transition-colors hover:text-gold"
                data-cursor="GO"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dessert Nation. All items are 100% vegetarian.</p>
          <p className="eyebrow text-gold">Good Food, Good Mood!</p>
        </div>
      </div>
    </footer>
  );
}

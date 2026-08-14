import { motion } from "framer-motion";
import { useState } from "react";

export type NavCat = { id: string; label: string };

/** Sticky category rail + coarse filter + inline search. */
export function MenuNav({
  cats,
  filters,
  filter,
  onFilter,
  query,
  onQuery,
  onJump,
}: {
  cats: NavCat[];
  filters: { id: string; label: string }[];
  filter: string;
  onFilter: (id: string) => void;
  query: string;
  onQuery: (q: string) => void;
  onJump: (id: string) => void;
}) {
  const [searching, setSearching] = useState(false);

  return (
    <div
      className="sticky top-[58px] z-40 border-y border-border backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in oklab, var(--cream) 86%, transparent)" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-3 md:px-10">
        <div className="hide-scrollbar flex flex-1 items-center gap-6 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => onJump(c.id)}
              data-cursor="JUMP"
              className="eyebrow shrink-0 whitespace-nowrap py-1 text-espresso/55 transition-colors hover:text-caramel"
              style={{ fontSize: "0.55rem" }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => onFilter(f.id)}
              data-cursor="FILTER"
              className={`eyebrow hidden border px-3 py-2 transition-colors sm:block ${
                filter === f.id
                  ? "border-espresso bg-espresso text-cream"
                  : "border-transparent text-muted-foreground hover:text-espresso"
              }`}
              style={{ fontSize: "0.5rem" }}
            >
              {f.label}
            </button>
          ))}

          <div className="flex items-center">
            <motion.input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search the menu"
              animate={{ width: searching || query ? 168 : 0, opacity: searching || query ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-caramel/60 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              style={{ width: 0 }}
            />
            <button
              onClick={() => setSearching((s) => !s)}
              aria-label="Search menu"
              data-cursor="SEARCH"
              className="grid h-9 w-9 place-items-center text-espresso/70 transition-colors hover:text-caramel"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

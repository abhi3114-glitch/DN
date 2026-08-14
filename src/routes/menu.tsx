import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Builder } from "@/components/sections/Builder";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuNav } from "@/components/menu/MenuNav";
import { Spotlight } from "@/components/menu/Spotlight";
import { Chapter } from "@/components/menu/Chapter";
import { QuickView, type QuickItem } from "@/components/menu/QuickView";
import { groups, priceLabel } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Full Menu — Dessert Nation | Waffles, Pancakes & Shakes" },
      {
        name: "description",
        content:
          "The complete Dessert Nation menu: Belgian waffles, mini pancakes, brownie bowls, waffle cakes, shakes, cold coffee, momos, pasta and more. 100% vegetarian.",
      },
      { property: "og:title", content: "Full Menu — Dessert Nation" },
      {
        property: "og:description",
        content: "Every waffle, pancake stack, brownie bowl, shake and savoury plate we serve.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

const navCats = [
  { id: "all", label: "All" },
  { id: "mini-pancakes", label: "Pancakes" },
  { id: "brownie-bowl", label: "Brownies" },
  { id: "waffles", label: "Waffles" },
  { id: "cold-beverages", label: "Drinks" },
  { id: "chinese", label: "Chinese" },
  { id: "wraps", label: "Wraps" },
  { id: "burger", label: "Burgers" },
  { id: "sandwich", label: "Sandwiches" },
  { id: "continental", label: "Continental" },
  { id: "fries", label: "Fries" },
  { id: "momo", label: "Mo-Mo" },
  { id: "maggie", label: "Maggie" },
  { id: "scoop", label: "Ice Cream" },
];

const coarse = [
  { id: "all", label: "All" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Food" },
];

const darkIds = new Set(["brownie-bowl", "cold-beverages", "hot-beverages", "shakes"]);

function MenuPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<QuickItem | null>(null);

  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return groups
      .filter((g) => filter === "all" || g.tags.includes(filter))
      .map((g) => ({ ...g, items: q ? g.items.filter((i) => i.name.toLowerCase().includes(q)) : g.items }))
      .filter((g) => g.items.length > 0);
  }, [filter, q]);

  const jump = (id: string) => {
    if (id === "all") {
      setFilter("all");
      setQuery("");
      document.getElementById("menu-body")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setFilter("all");
    setQuery("");
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <>
      <Nav />
      <main>
        <MenuHero />
        <MenuNav
          cats={navCats}
          filters={coarse}
          filter={filter}
          onFilter={setFilter}
          query={query}
          onQuery={setQuery}
          onJump={jump}
        />

        <Spotlight
          onOpen={() =>
            setQuick({
              name: "High on Nutella Pancakes",
              price: 270,
              group: "Mini Pancakes",
              kicker: "Rich, indulgent and unapologetically chocolatey.",
              image: groups[0]!.image,
            })
          }
        />

        <div id="menu-body">
          {q && (
            <p className="mx-auto max-w-[1600px] px-5 pt-10 text-sm text-muted-foreground md:px-10">
              {visible.reduce((n, g) => n + g.items.length, 0)} results for “{query}”
            </p>
          )}
          <AnimatePresence mode="popLayout">
            {visible.map((g, i) => (
              <Chapter
                key={g.id}
                group={g}
                index={i}
                dark={darkIds.has(g.id)}
                onOpen={setQuick}
              />
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <p className="mx-auto max-w-[1600px] px-5 py-24 text-center text-sm text-muted-foreground md:px-10">
              Nothing matches that craving — try “nutella”, “oreo” or “momos”.
            </p>
          )}
        </div>

        <Builder />

        <section id="visit-cta" className="dark-zone grain relative overflow-hidden px-5 py-28 text-center md:px-10 md:py-36">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[15vw] leading-[0.82] text-cream md:text-[8vw]"
          >
            FOUND YOUR
            <br />
            <span className="text-gold">CRAVING?</span>
          </motion.h2>
          <p className="eyebrow mt-8 text-cream/60" style={{ fontSize: "0.6rem" }}>
            Good food. Good mood.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/#visit"
              data-cursor="ORDER"
              className="bg-gold px-9 py-4 text-espresso transition-colors hover:bg-caramel"
            >
              <span className="eyebrow" style={{ fontSize: "0.55rem" }}>
                Order Now
              </span>
            </a>
            <a
              href="/#visit"
              data-cursor="VISIT"
              className="border border-cream/30 px-9 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <span className="eyebrow" style={{ fontSize: "0.55rem" }}>
                Visit Us
              </span>
            </a>
          </div>
          <p className="mt-12 text-xs text-cream/40">
            Cheapest craving on the menu: Hot Tea {priceLabel(15)} · everything 100% vegetarian.
          </p>
        </section>
      </main>
      <Footer />
      <QuickView item={quick} onClose={() => setQuick(null)} />
    </>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import waffle from "@/assets/hero-waffle.png";
import pancake from "@/assets/pancake-nutella.png";
import brownie from "@/assets/brownie-bowl.png";
import icecream from "@/assets/icecream.png";
import oreo from "@/assets/top-oreo.png";
import kitkat from "@/assets/top-kitkat.png";
import almond from "@/assets/top-almond.png";
import strawberry from "@/assets/top-strawberry.png";

const bases = [
  { id: "waffle", label: "Belgian Waffle", price: 130, image: waffle },
  { id: "pancake", label: "Mini Pancakes", price: 150, image: pancake },
  { id: "brownie", label: "Brownie Bowl", price: 150, image: brownie },
] as const;

const sauces = [
  { id: "triple", label: "Triple Chocolate", price: 0, tint: "oklch(0.36 0.09 45)" },
  { id: "dark", label: "Dark Chocolate", price: 10, tint: "oklch(0.24 0.06 40)" },
  { id: "nutella", label: "Nutella", price: 20, tint: "oklch(0.42 0.1 50)" },
  { id: "biscoff", label: "Lotus Biscoff", price: 20, tint: "oklch(0.6 0.12 62)" },
  { id: "redvelvet", label: "Red Velvet White", price: 20, tint: "oklch(0.55 0.17 25)" },
] as const;

const toppings = [
  { id: "oreo", label: "Oreo Crumble", price: 20, image: oreo, pos: "left-[20%] top-[30%] w-[13%]" },
  { id: "kitkat", label: "KitKat", price: 20, image: kitkat, pos: "right-[19%] top-[34%] w-[13%]" },
  {
    id: "almond",
    label: "Real Almond",
    price: 40,
    image: almond,
    pos: "left-[26%] bottom-[24%] w-[12%]",
  },
  {
    id: "strawberry",
    label: "Strawberry",
    price: 30,
    image: strawberry,
    pos: "right-[25%] bottom-[22%] w-[12%]",
  },
] as const;


const scoops = [
  { id: "none", label: "No Scoop", price: 0 },
  { id: "vanilla", label: "Premium Vanilla", price: 40 },
  { id: "choco", label: "Rich Chocolate", price: 40 },
  { id: "mudpie", label: "Choco Mud Pie", price: 50 },
] as const;

export function Builder() {
  const [base, setBase] = useState<string>("waffle");
  const [sauce, setSauce] = useState<string>("triple");
  const [tops, setTops] = useState<string[]>(["oreo"]);
  const [scoop, setScoop] = useState<string>("vanilla");

  const active = bases.find((b) => b.id === base)!;
  const activeSauce = sauces.find((s) => s.id === sauce)!;

  const total = useMemo(() => {
    const s = activeSauce.price;
    const t = tops.reduce((sum, id) => sum + (toppings.find((x) => x.id === id)?.price ?? 0), 0);
    const sc = scoops.find((x) => x.id === scoop)?.price ?? 0;
    return active.price + s + t + sc;
  }, [active, activeSauce, tops, scoop]);

  const toggleTop = (id: string) =>
    setTops((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const Chip = ({
    on,
    onClick,
    children,
  }: {
    on: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      data-cursor="BUILD"
      className={`border px-4 py-2.5 text-left text-sm transition-all duration-300 ${
        on
          ? "border-gold bg-gold/15 text-cream"
          : "border-cream/15 text-cream/60 hover:border-cream/40 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section className="dark-zone grain relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-gold">Build Your Own</p>
          <h2 className="display mt-3 max-w-4xl text-[13vw] leading-[0.8] text-cream md:text-[6.4vw]">
            DESIGN THE DESSERT
            <br />
            <span className="text-gold">IN YOUR HEAD.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div
            className="relative grid aspect-square place-items-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              aria-hidden
              key={activeSauce.id + "-glow"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.85, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute h-[68%] w-[68%] rounded-full blur-3xl"
              style={{ background: activeSauce.tint }}
            />

            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={base}
                  src={active.image}
                  alt={active.label}
                  initial={{ opacity: 0, scale: 0.82, rotate: -8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 8, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
                />
              </AnimatePresence>

              {/* sauce reads as a colour wash + pooled shadow under the dessert */}
              <motion.div
                aria-hidden
                key={sauce + "-wash"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-0"
              >
                <div
                  className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 mix-blend-soft-light blur-2xl"
                  style={{ background: activeSauce.tint }}
                />
                <div
                  className="absolute bottom-[14%] left-1/2 h-[9%] w-[52%] -translate-x-1/2 rounded-[50%] opacity-70 blur-xl"
                  style={{ background: activeSauce.tint }}
                />
              </motion.div>

              <AnimatePresence>
                {toppings
                  .filter((t) => tops.includes(t.id))
                  .map((t) => (
                    <motion.img
                      key={t.id}
                      src={t.image}
                      alt=""
                      aria-hidden
                      initial={{ opacity: 0, y: -28, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.7 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className={`absolute ${t.pos} drop-shadow-lg`}
                    />
                  ))}
              </AnimatePresence>

              <AnimatePresence>
                {scoop !== "none" && (
                  <motion.img
                    src={icecream}
                    alt=""
                    aria-hidden
                    initial={{ opacity: 0, y: -34, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.75 }}
                    transition={{ type: "spring", stiffness: 190, damping: 19 }}
                    className="absolute left-1/2 top-[15%] w-[23%] -translate-x-1/2 drop-shadow-2xl"
                  />
                )}
              </AnimatePresence>

            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3 text-cream/50">01 — Base</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {bases.map((b) => (
                  <Chip key={b.id} on={base === b.id} onClick={() => setBase(b.id)}>
                    {b.label}
                    <span className="mt-1 block text-xs opacity-60">₹{b.price}</span>
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3 text-cream/50">02 — Sauce</p>
              <div className="flex flex-wrap gap-2">
                {sauces.map((s) => (
                  <Chip key={s.id} on={sauce === s.id} onClick={() => setSauce(s.id)}>
                    {s.label}
                    {s.price > 0 && <span className="ml-2 text-xs opacity-60">+₹{s.price}</span>}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3 text-cream/50">03 — Toppings</p>
              <div className="flex flex-wrap gap-2">
                {toppings.map((t) => (
                  <Chip key={t.id} on={tops.includes(t.id)} onClick={() => toggleTop(t.id)}>
                    {t.label}
                    <span className="ml-2 text-xs opacity-60">+₹{t.price}</span>
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-3 text-cream/50">04 — Add a Scoop</p>
              <div className="flex flex-wrap gap-2">
                {scoops.map((s) => (
                  <Chip key={s.id} on={scoop === s.id} onClick={() => setScoop(s.id)}>
                    {s.label}
                    {s.price > 0 && <span className="ml-2 text-xs opacity-60">+₹{s.price}</span>}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-cream/15 pt-6">
              <div>
                <p className="eyebrow text-cream/50">Your creation</p>
                <p className="mt-2 max-w-sm text-sm text-cream/70">
                  {active.label} · {activeSauce.label}
                  {tops.length > 0 &&
                    ` · ${tops.map((id) => toppings.find((t) => t.id === id)?.label).join(", ")}`}
                  {scoop !== "none" && ` · ${scoops.find((s) => s.id === scoop)?.label}`}
                </p>
              </div>
              <motion.p
                key={total}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="display text-5xl text-gold md:text-6xl"
              >
                ₹{total}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

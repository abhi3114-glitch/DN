const words = [
  "100% VEGETARIAN",
  "BELGIAN WAFFLES",
  "MINI PANCAKES",
  "BROWNIE BOWLS",
  "COLD COFFEE",
  "GOOD FOOD, GOOD MOOD",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="dark-zone overflow-hidden border-y border-cream/10 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="eyebrow flex items-center gap-10 text-cream/80">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

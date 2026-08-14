export function VegBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-pistachio/60 px-2.5 py-1 ${className}`}
      title="100% Vegetarian"
    >
      <span className="grid h-3.5 w-3.5 place-items-center border border-pistachio">
        <span className="h-1.5 w-1.5 rounded-full bg-pistachio" />
      </span>
      <span className="eyebrow text-pistachio" style={{ fontSize: "0.55rem" }}>
        100% Veg
      </span>
    </span>
  );
}

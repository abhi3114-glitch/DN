import { Link } from "@tanstack/react-router";
import { Reveal, SplitHeading } from "@/components/site/Reveal";

const details = [
  { k: "Hours", v: "11:00 AM — 11:30 PM, all week" },
  { k: "Kitchen", v: "Pure vegetarian · No eggs in desserts" },
  { k: "Best For", v: "Late-night dessert runs & long table catch-ups" },
  { k: "Reservations", v: "Walk-ins welcome · Call ahead for groups" },
];

export function Visit() {
  return (
    <section id="visit" className="relative overflow-hidden py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-2 md:px-10">
        <div>
          <Reveal>
            <p className="eyebrow text-caramel">Visit Us</p>
          </Reveal>
          <h2 className="display mt-4 text-[13vw] leading-[0.84] md:text-[6vw]">
            <SplitHeading text="Come hungry." />
            <br />
            <SplitHeading text="Leave happy." delay={0.1} className="text-caramel" />
          </h2>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="group relative overflow-hidden bg-espresso px-8 py-4 text-cream"
                data-cursor="TASTE"
              >
                <span className="eyebrow relative z-10">View Full Menu</span>
                <span className="absolute inset-0 -translate-y-full bg-caramel transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
              <a
                href="tel:+910000000000"
                className="eyebrow border border-espresso px-8 py-4 transition-colors hover:bg-espresso hover:text-cream"
                data-cursor="CALL"
              >
                Call the Café
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <dl className="divide-y divide-border border-y border-border">
            {details.map((d) => (
              <div key={d.k} className="grid gap-1 py-6 md:grid-cols-[140px_1fr] md:gap-6">
                <dt className="eyebrow text-muted-foreground" style={{ fontSize: "0.55rem" }}>
                  {d.k}
                </dt>
                <dd className="text-base">{d.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

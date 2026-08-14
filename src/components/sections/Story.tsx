import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SplitHeading } from "@/components/site/Reveal";
import brownie from "@/assets/brownie-bowl.png";

const stats = [
  { k: "16", v: "Menu chapters" },
  { k: "90+", v: "Handmade items" },
  { k: "100%", v: "Vegetarian" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-5 md:grid-cols-2 md:px-10">
        <div>
          <Reveal>
            <p className="eyebrow text-caramel">Our Story</p>
          </Reveal>
          <h2 className="display mt-5 text-[11vw] leading-[0.88] md:text-[4.6vw]">
            <SplitHeading text="Dessert is not" />
            <br />
            <SplitHeading text="an afterthought." delay={0.1} className="text-caramel" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              Dessert Nation started with one stubborn idea: a café where the sweet course is the
              main event. Every waffle is pressed to order, every brownie bowl is warmed until the
              chocolate loosens, and every scoop lands at the exact right second.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Savoury lives here too — momos, mac n cheese, loaded fries and a very serious plate of
              Maggie — all fully vegetarian, all built for sharing.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {stats.map((s) => (
                <div key={s.v}>
                  <dt className="display text-4xl text-espresso md:text-5xl">{s.k}</dt>
                  <dd className="eyebrow mt-2 text-muted-foreground" style={{ fontSize: "0.55rem" }}>
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <motion.div style={{ y }} className="relative grid place-items-center">
          <div
            aria-hidden
            className="absolute h-[70%] w-[70%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--caramel) 40%, transparent), transparent 70%)",
            }}
          />
          <motion.img
            src={brownie}
            alt="Warm brownie bowl with fudge and ice cream"
            style={{ rotate }}
            className="relative w-[78%] drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

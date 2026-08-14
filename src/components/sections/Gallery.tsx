import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { img } from "@/data/menu";

const tiles = [
  { src: img.redVelvet, label: "Red Velvet Waffle Cake", span: "md:col-span-2 md:row-span-2" },
  { src: img.momos, label: "Tandoori Saucy Momos", span: "" },
  { src: img.coldCoffee, label: "Brownie Cold Coffee", span: "" },
  { src: img.fries, label: "Honey Chilli Fries", span: "" },
  { src: img.shake, label: "Lotus Biscoff Shake", span: "md:row-span-2" },
  { src: img.pancake, label: "High on Nutella", span: "" },
  { src: img.noodles, label: "Burnt Garlic Noodles", span: "" },
];

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-caramel">The Counter</p>
          <h2 className="display mt-4 max-w-2xl text-[12vw] leading-[0.85] md:text-[5.4vw]">
            EVERYTHING LOOKS
            <br />
            <span className="text-caramel">BETTER WARM.</span>

          </h2>
        </Reveal>

        <motion.div
          style={{ y, willChange: "transform" }}
          className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[230px]"
        >
          {tiles.map((t, i) => (
            <motion.figure
              key={t.label}
              data-cursor="LOOK"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative grid place-items-center overflow-hidden border-t border-border ${i % 2 ? "md:translate-y-4" : ""} ${t.span}`}
            >
              <img
                src={t.src}
                alt={t.label}
                loading="lazy"
                className="max-h-[80%] w-auto transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-espresso/90 px-4 py-3 transition-transform duration-500 group-hover:translate-y-0">
                <span className="eyebrow text-cream" style={{ fontSize: "0.55rem" }}>
                  {t.label}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

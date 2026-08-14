import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Story } from "@/components/sections/Story";
import { Categories } from "@/components/sections/Categories";
import { Signature } from "@/components/sections/Signature";
import { Builder } from "@/components/sections/Builder";
import { Gallery } from "@/components/sections/Gallery";
import { Visit } from "@/components/sections/Visit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dessert Nation — Vegetarian Dessert Café | Waffles & Pancakes" },
      {
        name: "description",
        content:
          "Sweet Moments, Perfectly Made. Belgian waffles, mini pancake stacks, brownie bowls, shakes and 100% vegetarian comfort food at Dessert Nation.",
      },
      { property: "og:title", content: "Dessert Nation — Vegetarian Dessert Café" },
      {
        property: "og:description",
        content:
          "Belgian waffles, mini pancakes, brownie bowls, shakes and pure-veg comfort food. Good Food, Good Mood!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Categories />
        <Signature />
        <Builder />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

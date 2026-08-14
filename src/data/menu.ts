import heroWaffle from "@/assets/hero-waffle.png";
import pancake from "@/assets/pancake-nutella.png";
import brownie from "@/assets/brownie-bowl.png";
import shake from "@/assets/shake.png";
import coldCoffee from "@/assets/cold-coffee.png";
import icecream from "@/assets/icecream.png";
import fries from "@/assets/fries.png";
import momos from "@/assets/momos.png";
import redVelvet from "@/assets/red-velvet.png";
import noodles from "@/assets/noodles.png";

export const img = {
  waffle: heroWaffle,
  pancake,
  brownie,
  shake,
  coldCoffee,
  icecream,
  fries,
  momos,
  redVelvet,
  noodles,
};

export type Item = {
  name: string;
  price: number | null;
  note?: string;
};

export type Group = {
  id: string;
  title: string;
  kicker?: string;
  tags: string[];
  image: string;
  items: Item[];
};

/** Source of truth: the Dessert Nation printed menu. Prices in INR. */
export const groups: Group[] = [
  {
    id: "mini-pancakes",
    title: "Mini Pancakes",
    kicker: "Stacked, sauced, seriously good",
    tags: ["desserts", "pancakes"],
    image: pancake,
    items: [
      { name: "Classic Triple Chocolate Pancakes", price: 150 },
      { name: "Red Velvet White Chocolate Pancakes", price: 200 },
      { name: "High on Nutella Pancakes", price: 270 },
      { name: "Oreo Topping Pancakes", price: 250 },
      { name: "Lotus Biscoff Pancakes", price: 300 },
      { name: "KitKat Topping Pancakes", price: 250 },
      { name: "Real Strawberry Pancakes", price: 300, note: "Seasonal" },
    ],
  },
  {
    id: "brownie-bowl",
    title: "Brownie Bowl",
    kicker: "Warm brownie, cold scoop",
    tags: ["desserts", "brownies"],
    image: brownie,
    items: [
      { name: "Brownie with Triple Chocolate", price: 150 },
      { name: "Brownie with Dairy Milk Chocolate", price: 170 },
      { name: "Brownie with White Dark Chocolate", price: 200 },
      { name: "Death By Chocolate Brownie", price: 250 },
      { name: "Strawberry Brownie", price: null, note: "Seasonal" },
      { name: "Nutella Bowl", price: 300 },
    ],
  },
  {
    id: "waffle-cake",
    title: "Waffle Cake",
    kicker: "Layered like a dream",
    tags: ["desserts", "waffles"],
    image: redVelvet,
    items: [
      { name: "Red Velvet Waffle Cake", price: 250 },
      { name: "Triple Chocolate Waffle Cake", price: 250 },
      { name: "Lotus Biscoff Waffle Cake", price: 250 },
      { name: "KitKat Oreo Waffle Cake", price: 250 },
    ],
  },
  {
    id: "waffles",
    title: "Waffles",
    kicker: "The Original Belgium Waffle",
    tags: ["desserts", "waffles"],
    image: heroWaffle,
    items: [
      { name: "Triple Chocolate Waffle", price: 130 },
      { name: "Strawberry | Blueberry Filling Waffle", price: 130 },
      { name: "Death By Triple Chocolate Waffle", price: 150 },
      { name: "Dark Chocolate Waffle", price: 140 },
      { name: "Lotus Biscoff Waffle", price: 150 },
      { name: "Naked Nutella Waffle", price: 150 },
      { name: "KitKat Waffle", price: 150 },
      { name: "Red Velvet White Chocolate Waffle", price: 150 },
      { name: "French Crunch Nutella Waffle", price: 150 },
      { name: "Real Almond Filling", price: 170 },
      { name: "Dairy Milk Waffle", price: 150 },
    ],
  },
  {
    id: "cold-beverages",
    title: "Cold Just Like Your Ex",
    kicker: "Beverages",
    tags: ["drinks"],
    image: coldCoffee,
    items: [
      { name: "Classic Cold Coffee", price: 100 },
      { name: "Hazelnut Cold Coffee", price: 120 },
      { name: "Brownie Cold Coffee", price: 120 },
      { name: "Ice Cream Cold Coffee", price: 120 },
    ],
  },
  {
    id: "hot-beverages",
    title: "Hot AF Just Like Your Comfort Person",
    tags: ["drinks"],
    image: coldCoffee,
    items: [
      { name: "Hot Tea", price: 15 },
      { name: "Hot Coffee", price: 30 },
      { name: "Black Coffee", price: 30 },
      { name: "Black Tea", price: 15 },
      { name: "Hot Chocolate", price: 70 },
      { name: "Hot Mocha", price: 50 },
    ],
  },
  {
    id: "shakes",
    title: "Shake Shakes",
    kicker: "Shakens",
    tags: ["drinks"],
    image: shake,
    items: [
      { name: "Oreo Shake", price: 100 },
      { name: "KitKat Shake", price: 120 },
      { name: "Lotus Biscoff Shake", price: 120 },
      { name: "Chocolate Shake", price: 120 },
    ],
  },
  {
    id: "chinese",
    title: "Chinese",
    tags: ["food"],
    image: noodles,
    items: [
      { name: "Veg Noodles", price: 100 },
      { name: "Hakka Noodles", price: 120 },
      { name: "Schezwan Noodles", price: 120 },
      { name: "Burnt Garlic Noodles", price: 130 },
      { name: "Chilli Garlic Noodles", price: 130 },
      { name: "Veg Fried Rice", price: 100 },
      { name: "Paneer Fried Rice", price: 130 },
      { name: "Chilli Paneer", price: 150 },
      { name: "Veg Manchurian", price: 130 },
      { name: "Crispy Corn", price: 120 },
    ],
  },
  {
    id: "wraps",
    title: "Wraps",
    tags: ["food"],
    image: noodles,
    items: [
      { name: "Paneer Wrap", price: 120 },
      { name: "Veg Wrap", price: 120 },
    ],
  },
  {
    id: "burger",
    title: "Burger",
    tags: ["food"],
    image: fries,
    items: [
      { name: "Veg Aloo Tikki Burger", price: 70 },
      { name: "Paneer Peri-Peri Burger", price: 110 },
    ],
  },
  {
    id: "sandwich",
    title: "Sandwich",
    tags: ["food"],
    image: fries,
    items: [
      { name: "Paneer Makhni Sandwich", price: 120 },
      { name: "Veg Italian Sandwich", price: 130 },
      { name: "Mexican Corn Cheese Sandwich", price: 130 },
      { name: "Tandoori Paneer Sandwich", price: 130 },
      { name: "Cheese Chutney Sandwich", price: 100 },
    ],
  },
  {
    id: "continental",
    title: "Continental",
    tags: ["food"],
    image: noodles,
    items: [
      { name: "Tandoori Mac n Cheese", price: 200 },
      { name: "Makhni Mac n Cheese", price: 200 },
      { name: "Chipotle Mac n Cheese", price: 200 },
      { name: "Arrabbiata Red Sauce Pasta", price: 200 },
      { name: "Alfredo White Sauce Pasta", price: 200 },
    ],
  },
  {
    id: "fries",
    title: "Fries",
    tags: ["food"],
    image: fries,
    items: [
      { name: "Peri Peri Fries", price: 80 },
      { name: "Schezwan Loaded Fries", price: 130 },
      { name: "Honey Chilli Fries", price: 150 },
    ],
  },
  {
    id: "momo",
    title: "MoMo",
    tags: ["food"],
    image: momos,
    items: [
      { name: "Veg Steam Momos", price: 80 },
      { name: "Paneer Steam Momos", price: 100 },
      { name: "Veg Fried Momos", price: 100 },
      { name: "Paneer Fried Momos", price: 120 },
      { name: "Tandoori Saucy Momos", price: 150 },
      { name: "Makhni Saucy Momos", price: 150 },
      { name: "Chilli Garlic Momos", price: 150 },
    ],
  },
  {
    id: "maggie",
    title: "Maggie",
    tags: ["food"],
    image: noodles,
    items: [
      { name: "Veg Maggie", price: 60 },
      { name: "Veg Cheese Maggie", price: 70 },
      { name: "Peri Peri Spicy Maggie", price: 60 },
    ],
  },
  {
    id: "scoop",
    title: "Add-On Ice Cream — Scoop",
    tags: ["desserts"],
    image: icecream,
    items: [
      { name: "Premium Vanilla", price: 40 },
      { name: "Rich Chocolate", price: 40 },
      { name: "Strawberry", price: 40 },
      { name: "American Nuts", price: 50 },
      { name: "Butter Scotch", price: 50 },
      { name: "Black Current", price: 50 },
      { name: "Choco Mud Pie", price: 50 },
      { name: "Alphonso Mango", price: 50 },
      { name: "Cookies N Cream", price: 50 },
    ],
  },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "desserts", label: "Desserts" },
  { id: "waffles", label: "Waffles" },
  { id: "pancakes", label: "Pancakes" },
  { id: "brownies", label: "Brownies" },
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Food" },
  { id: "veg", label: "Veg" },
];

export const categories = [
  { n: "01", name: "Pancakes", to: "mini-pancakes", image: pancake },
  { n: "02", name: "Brownie Bowls", to: "brownie-bowl", image: brownie },
  { n: "03", name: "Waffle Cakes", to: "waffle-cake", image: redVelvet },
  { n: "04", name: "Belgian Waffles", to: "waffles", image: heroWaffle },
  { n: "05", name: "Shakes", to: "shakes", image: shake },
  { n: "06", name: "Coffee", to: "cold-beverages", image: coldCoffee },
  { n: "07", name: "Food", to: "chinese", image: noodles },
  { n: "08", name: "Momos", to: "momo", image: momos },
  { n: "09", name: "Maggie", to: "maggie", image: noodles },
  { n: "10", name: "Fries", to: "fries", image: fries },
];

export const priceLabel = (p: number | null) => (p === null ? "—/—" : `₹${p}`);

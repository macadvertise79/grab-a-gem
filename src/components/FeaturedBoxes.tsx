import { motion } from "framer-motion";
import box1 from "@/assets/box-1.jpg";
import box2 from "@/assets/box-2.jpg";
import box3 from "@/assets/box-3.jpg";

const boxes = [
  {
    name: "Mystery Box #1",
    price: "$29.99",
    image: box1,
    description: "Who's inside? Unbox to reveal a legendary sports icon.",
    tag: "🔒 MYSTERY",
  },
  {
    name: "Mystery Box #2",
    price: "$29.99",
    image: box2,
    description: "A hidden champion awaits. Will you unlock greatness?",
    tag: "🔒 MYSTERY",
  },
  {
    name: "Mystery Box #3",
    price: "$29.99",
    image: box3,
    description: "Sealed tight. Only the bold will discover what's within.",
    tag: "🔒 MYSTERY",
  },
  {
    name: "Mystery Box #4",
    price: "$49.99",
    image: box1,
    description: "Premium tier mystery. A true collector's dream inside.",
    tag: "⭐ PREMIUM",
  },
  {
    name: "Mystery Box #5",
    price: "$49.99",
    image: box2,
    description: "Ultra-rare potential. This box holds something special.",
    tag: "⭐ PREMIUM",
  },
  {
    name: "Mystery Box #6",
    price: "$99.99",
    image: box3,
    description: "The rarest of them all. Limited edition legend inside.",
    tag: "🔥 LIMITED",
  },
];

const FeaturedBoxes = () => {
  return (
    <section id="boxes" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">
            CHOOSE YOUR BOX
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Each box contains mystery sports collectibles. Which tier will you choose?
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boxes.map((box, i) => (
            <motion.div
              key={box.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-lg overflow-hidden bg-card border border-border transition-all hover:border-primary hover:glow-gold shimmer"
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-gradient-gold px-3 py-1 rounded text-xs font-heading font-bold text-primary-foreground tracking-wider">
                  {box.tag}
                </span>
              </div>

              <div className="aspect-square overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {box.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{box.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-heading text-3xl font-bold text-primary">
                    {box.price}
                  </span>
                  <button className="bg-gradient-gold px-6 py-2 rounded font-heading text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:opacity-90">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoxes;

import { motion } from "framer-motion";
import silhouette1 from "@/assets/silhouette-1.png";
import silhouette2 from "@/assets/silhouette-2.png";
import silhouette3 from "@/assets/silhouette-3.png";
import silhouette4 from "@/assets/silhouette-4.png";
import silhouette5 from "@/assets/silhouette-5.png";
import silhouette6 from "@/assets/silhouette-6.png";

const activeBox = {
  name: "Mystery Character #1",
  price: "$29.99",
  image: silhouette1,
  description: "Who's inside? Unbox to reveal a legendary sports icon.",
  tag: "🔥 PRE-ORDER NOW",
};

const comingSoonBoxes = [
  { name: "Mystery Character #2", image: silhouette2 },
  { name: "Mystery Character #3", image: silhouette3 },
  { name: "Mystery Character #4", image: silhouette4 },
  { name: "Mystery Character #5", image: silhouette5 },
  { name: "Mystery Character #6", image: silhouette6 },
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
            MYSTERY CHARACTERS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Each box holds a mystery sports character. Pre-order now or wait for more drops.
          </p>
        </motion.div>

        {/* Active Pre-Order Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="group relative rounded-lg overflow-hidden bg-card border border-primary glow-gold shimmer max-w-sm mx-auto mb-16"
        >
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-gold px-3 py-1 rounded text-xs font-heading font-bold text-primary-foreground tracking-wider">
              {activeBox.tag}
            </span>
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={activeBox.image} alt={activeBox.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="p-6">
            <h3 className="font-heading text-2xl font-bold text-foreground">{activeBox.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{activeBox.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-heading text-3xl font-bold text-primary">{activeBox.price}</span>
              <button className="bg-background text-primary border border-primary px-6 py-2 rounded font-heading text-sm font-semibold tracking-wider transition-all hover:opacity-90">
                PRE-ORDER
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <h3 className="text-center text-2xl font-heading font-bold text-muted-foreground mb-8">COMING SOON</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {comingSoonBoxes.map((box, i) => (
            <motion.div
              key={box.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-lg overflow-hidden bg-card border border-border opacity-60"
            >
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-muted px-2 py-1 rounded text-xs font-heading font-bold text-muted-foreground tracking-wider">
                  🔒 COMING SOON
                </span>
              </div>
              <div className="aspect-square overflow-hidden">
                <img src={box.image} alt={box.name} className="h-full w-full object-cover grayscale" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-heading text-lg font-bold text-muted-foreground">{box.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoxes;

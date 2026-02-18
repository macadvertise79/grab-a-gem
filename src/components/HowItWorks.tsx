import { motion } from "framer-motion";
import { Package, Shuffle, Star } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "PICK YOUR BOX",
    description: "Choose from our Gold, Silver, or Legend tier blind boxes.",
  },
  {
    icon: Shuffle,
    title: "MYSTERY AWAITS",
    description: "Every box contains randomly selected premium sports collectibles.",
  },
  {
    icon: Star,
    title: "UNBOX GREATNESS",
    description: "Discover autographed items, rare cards, and exclusive memorabilia.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gradient-gold">
            HOW IT WORKS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="mx-auto mb-5 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <div className="font-heading text-sm tracking-wider text-muted-foreground mb-2">
                STEP {i + 1}
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

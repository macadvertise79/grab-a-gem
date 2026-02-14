import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Star Icons"
            className="mx-auto h-32 w-32 md:h-40 md:w-40 rounded-full glow-gold animate-pulse-gold"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight"
        >
          <span className="text-gradient-gold">UNBOX</span>
          <br />
          <span className="text-foreground">THE LEGEND</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground font-body"
        >
          Premium blind box sports collectibles featuring the biggest icons in sports history. Every box is a chance to own greatness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#boxes"
            className="bg-gradient-gold px-10 py-4 rounded font-heading text-lg font-semibold tracking-wider text-primary-foreground transition-all hover:opacity-90 glow-gold"
          >
            SHOP BOXES
          </a>
          <a
            href="#how-it-works"
            className="border border-primary px-10 py-4 rounded font-heading text-lg font-semibold tracking-wider text-primary transition-all hover:bg-primary/10"
          >
            HOW IT WORKS
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";
import ShootingStars from "@/components/ShootingStars";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <ShootingStars />

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8">

          <img
            src={logo}
            alt="Star Icons"
            className="mx-auto h-32 w-32 md:h-40 md:w-40 rounded-full glow-gold animate-pulse-gold" />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="#boxes"
            className="bg-gradient-gold px-10 py-4 rounded font-heading text-lg font-semibold tracking-wider transition-all hover:opacity-90 glow-gold text-primary bg-primary-foreground">
            SHOP ALL

          </a>
          





        </motion.div>
      </div>
    </section>);

};

export default HeroSection;
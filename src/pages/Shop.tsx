import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import silhouette1 from "@/assets/silhouette-1.png";
import silhouette2 from "@/assets/silhouette-2.png";
import silhouette3 from "@/assets/silhouette-3.png";
import silhouette4 from "@/assets/silhouette-4.png";
import silhouette5 from "@/assets/silhouette-5.png";
import silhouette6 from "@/assets/silhouette-6.png";

const characters = [
  { id: 1, name: "Gold Striker", image: silhouette1, available: true },
  { id: 2, name: "Mystery Character #2", image: silhouette2, available: false },
  { id: 3, name: "Mystery Character #3", image: silhouette3, available: false },
  { id: 4, name: "Mystery Character #4", image: silhouette4, available: false },
  { id: 5, name: "Mystery Character #5", image: silhouette5, available: false },
  { id: 6, name: "Mystery Character #6", image: silhouette6, available: false },
];

const Shop = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % characters.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + characters.length) % characters.length);
  };

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const character = characters[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-sm text-primary font-heading tracking-widest uppercase mb-2 font-bold">
              Series 1 — "The Eternals"
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
              THE <span className="text-gradient-gold">ETERNALS</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Six premium blindbox collectibles — each one a mystery until you open the box.
              Swipe through the lineup below.
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="max-w-sm sm:max-w-md mx-auto mb-12 px-2">
            <div className="relative">
              {/* Arrows */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 sm:-translate-x-12 md:-translate-x-16 z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 sm:translate-x-12 md:translate-x-16 z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Card */}
              <div className="overflow-hidden rounded-xl border border-primary/50 glow-gold bg-card">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className={`aspect-[3/4] overflow-hidden ${!character.available ? "grayscale opacity-60" : ""}`}>
                      <img
                        src={character.image}
                        alt={character.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <p className="text-xs text-primary font-heading tracking-widest uppercase mb-1">
                        ICON #{String(character.id).padStart(3, "0")}
                      </p>
                      <h3 className="font-heading text-xl font-bold text-foreground tracking-wide mb-2">
                        {character.available ? `"${character.name}"` : character.name}
                      </h3>
                      {character.available ? (
                        <Link
                          to="/icon/001"
                          className="inline-block bg-gradient-gold px-6 py-2.5 rounded font-heading text-sm font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90"
                        >
                          Preorder — $59
                        </Link>
                      ) : (
                        <span className="inline-block bg-muted px-4 py-2 rounded text-xs font-heading font-bold text-muted-foreground tracking-wider">
                          🔒 COMING SOON
                        </span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {characters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

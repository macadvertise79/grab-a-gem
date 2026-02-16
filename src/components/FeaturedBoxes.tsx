import { motion } from "framer-motion";
import { useState } from "react";
import silhouette1 from "@/assets/silhouette-1.png";
import silhouette2 from "@/assets/silhouette-2.png";
import silhouette3 from "@/assets/silhouette-3.png";
import silhouette4 from "@/assets/silhouette-4.png";
import silhouette5 from "@/assets/silhouette-5.png";
import silhouette6 from "@/assets/silhouette-6.png";

const comingSoonBoxes = [
  { name: "Mystery Character #2", image: silhouette2 },
  { name: "Mystery Character #3", image: silhouette3 },
  { name: "Mystery Character #4", image: silhouette4 },
  { name: "Mystery Character #5", image: silhouette5 },
  { name: "Mystery Character #6", image: silhouette6 },
];

const FeaturedBoxes = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="boxes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Featured Character - Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20 grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Left Side - Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-heading text-sm tracking-widest uppercase">
                Limited preorder live
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-2">
              Series 1 — "The Eternals"
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
              Collect the first<br />
              <span className="text-gradient-gold">STAR ICON.</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Premium blindbox-style sport collectibles.
              One character is available to preorder today —
              and 5 mystery characters are coming soon.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="/icon/001" className="bg-gradient-gold px-6 py-2.5 rounded font-heading text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:opacity-90">
                Preorder Now
              </a>
              <a href="#coming-soon" className="bg-background text-primary border border-primary px-6 py-2.5 rounded font-heading text-sm font-semibold tracking-wider transition-all hover:opacity-90">
                See Mystery Lineup
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-primary font-heading tracking-wider">
              <span>✦ Limited run</span>
              <span>✦ Gold details</span>
              <span>✦ Blindbox unboxing</span>
            </div>
          </div>

          {/* Right Side - Character Card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-xl overflow-hidden bg-card border border-primary/50 glow-gold"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <span className="font-heading text-sm font-bold text-foreground tracking-wider">Featured Character</span>
              <span className="font-heading text-lg font-bold text-primary">$59</span>
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={silhouette1}
                alt="Gold Striker"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-foreground tracking-wide mb-3">
                ICON #001 — "Gold Striker"
              </h3>

              {submitted ? (
                <div className="text-center py-3">
                  <p className="text-primary font-heading text-sm font-bold">✓ You're on the list!</p>
                  <p className="text-muted-foreground text-xs mt-1">We'll notify you when it's ready.</p>
                </div>
              ) : (
                <form onSubmit={handlePreorder} className="flex gap-2 mb-3">
                  <input
                    type="email"
                    required
                    placeholder="Email preorders"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-gold px-4 py-2 rounded font-heading text-xs font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed">
                Sport-hero silhouette with gold accents.
                Blindbox packaging, collector card, and stand. Ships when preorder window closes.
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-3 text-center">
                No spam — only launch + shipping updates
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Coming Soon */}
        <div id="coming-soon">
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
      </div>
    </section>
  );
};

export default FeaturedBoxes;

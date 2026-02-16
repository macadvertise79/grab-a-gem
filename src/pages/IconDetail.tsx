import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import silhouette1 from "@/assets/silhouette-1.png";

const IconDetail = () => {
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link
            to="/#boxes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden border border-primary/50 glow-gold"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={silhouette1}
                  alt="ICON #001 — Gold Striker"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-heading text-xs tracking-widest uppercase">
                  Limited Preorder Live
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-2">
                ICON #001
              </h1>
              <h2 className="text-2xl font-heading font-bold text-gradient-gold mb-6">
                "Gold Striker"
              </h2>

              <p className="text-2xl font-heading font-bold text-primary mb-6">$59</p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The inaugural Star Icon collectible — a premium blindbox-style sport figure
                featuring a dynamic striker silhouette with gold accents. Each box includes
                a collector card and display stand.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">✦</span>
                  <span>Limited production run — once sold out, it's gone</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">✦</span>
                  <span>Gold foil detail accents on figure and packaging</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">✦</span>
                  <span>Blindbox unboxing experience with collector card</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">✦</span>
                  <span>Ships when preorder window closes</span>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="text-primary font-heading text-sm font-bold">✓ You're on the list!</p>
                  <p className="text-muted-foreground text-xs mt-1">We'll notify you when it's ready to ship.</p>
                </div>
              ) : (
                <form onSubmit={handlePreorder} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email to preorder"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-gold px-6 py-3 rounded font-heading text-sm font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90"
                  >
                    Preorder Now — $59
                  </button>
                  <p className="text-[10px] text-muted-foreground/60 text-center">
                    No spam — only launch + shipping updates
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IconDetail;

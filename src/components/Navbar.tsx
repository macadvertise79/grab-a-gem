import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

const navLinks = ["Boxes", "How It Works", "About", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Star Icons" className="h-10 w-10 rounded-full" />
          <span className="font-heading text-xl font-bold tracking-widest text-gradient-gold">
            STAR ICONS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="font-heading text-sm tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
          <a
            href="#boxes"
            className="bg-background px-6 py-2 rounded font-heading text-sm font-semibold tracking-wider text-primary border border-primary transition-all hover:opacity-80"
          >
            SHOP NOW
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                  className="font-heading text-sm tracking-wider text-muted-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#boxes"
                className="bg-background px-6 py-2 rounded text-center font-heading text-sm font-semibold tracking-wider text-primary border border-primary"
                onClick={() => setOpen(false)}
              >
                SHOP NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

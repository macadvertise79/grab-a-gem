import logo from "@/assets/logo.jpg";
import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star Icons" className="h-10 w-10 rounded-full" />
            <span className="font-heading text-xl font-bold tracking-widest text-gradient-gold">
              STAR ICONS
            </span>
          </div>

          <div className="flex gap-6">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Star Icons. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

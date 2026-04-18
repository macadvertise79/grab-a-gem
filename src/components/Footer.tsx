import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="border-t border-border bg-card py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {/* Left side */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Join the Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to know about new product launches, exclusive discounts, and more.
            </p>
            {subscribed ? (
              <p className="text-sm text-primary font-medium">You're subscribed!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 bg-transparent border border-border px-3 sm:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 text-sm font-heading font-semibold tracking-wider hover:opacity-90 transition-opacity shrink-0"
                >
                  SIGN UP
                </button>
              </form>
            )}

            <div className="mt-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">customer service</p>
                  <p className="text-xs text-muted-foreground">Monday - Sunday 09:00 - 18:00</p>
                </div>
                <div className="border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">email</p>
                  <p className="text-xs text-muted-foreground">support@staricons.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground mb-3 sm:mb-4 tracking-widest">HELP</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {["FAQ", "Terms of Use", "Privacy Policy", "Shipping Policy", "Refund Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground mb-3 sm:mb-4 tracking-widest">INFORMATION</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {["About Us", "Contact Us", "Global Ambassador", "News"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-heading text-sm font-bold text-foreground mb-3 sm:mb-4 tracking-widest">SHOP</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {["Mystery Boxes", "Figures", "Accessories", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Star Icons" className="h-9 w-9 sm:h-10 sm:w-10 rounded-full" />
            <span className="font-heading text-lg sm:text-xl font-bold tracking-widest text-gradient-gold">
              STAR ICONS
            </span>
          </div>

          <div className="flex gap-4 sm:gap-5">
            {[
              {
                Icon: Instagram,
                label: "Instagram",
                href: "https://www.instagram.com/star_icons_collectibles/",
              },
              { Icon: Facebook, label: "Facebook", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Star Icons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

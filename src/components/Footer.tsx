import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { Instagram, Facebook } from "lucide-react";
import MarketingSignupForm from "@/components/MarketingSignupForm";

const helpLinks = [
  { label: "FAQ" },
  { label: "Terms of Use" },
  { label: "Privacy Policy" },
  { label: "Shipping Policy" },
  { label: "Refund Policy" },
];

const infoLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/#contact" },
  { label: "Global Ambassador" },
  { label: "News" },
];

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-card py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Join the Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Be the first to know about new product launches, exclusive discounts, and more.
            </p>
            <MarketingSignupForm
              buttonLabel="SIGN UP"
              placeholder="Enter your email address"
              successMessage="You're subscribed!"
              className="max-w-md"
              inputClassName="sm:px-4"
            />

            <div className="mt-8">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">email</p>
                  <p className="text-xs text-muted-foreground">support@staricons.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground mb-3 sm:mb-4 tracking-widest">HELP</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {helpLinks.map((item) => (
                  <li key={item.label}>
                    <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                      {item.label} (Coming soon)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground mb-3 sm:mb-4 tracking-widest">INFORMATION</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {infoLinks.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                        {item.label} (Coming soon)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

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
            ].map(({ Icon, label, href }) =>
              href === "#" ? (
                <span
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border text-muted-foreground/60 cursor-not-allowed"
                  title={`${label} link coming soon`}
                >
                  <Icon size={16} />
                </span>
              ) : (
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
              )
            )}
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

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import silhouette1 from "@/assets/silhouette-1.png";
import silhouette2 from "@/assets/silhouette-2.png";
import silhouette3 from "@/assets/silhouette-3.png";
import silhouette4 from "@/assets/silhouette-4.png";
import silhouette5 from "@/assets/silhouette-5.png";
import silhouette6 from "@/assets/silhouette-6.png";
import { PRODUCTS_QUERY, ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";

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
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 6 });
        setProducts(data?.data?.products?.edges ?? []);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      }
    };

    void fetchProducts();
  }, []);

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const featuredProduct = products[0];
  const featuredVariant = featuredProduct?.node.variants.edges[0]?.node;
  const featuredImage = featuredProduct?.node.images.edges[0]?.node.url ?? silhouette1;
  const featuredTitle = featuredProduct?.node.title ?? "Gold Striker";
  const featuredPrice = featuredVariant
    ? `$${parseFloat(featuredVariant.price.amount).toFixed(2)}`
    : "$59";
  const featuredDescription =
    featuredProduct?.node.description ||
    "Premium blindbox-style sport collectibles. One character is available to preorder today and 5 mystery characters are coming soon.";
  const collectionProducts = products.slice(1, 6);

  return (
    <section id="boxes" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16 sm:mb-20 grid md:grid-cols-2 gap-8 sm:gap-10 items-center"
        >
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 sm:mb-6 justify-center md:justify-start">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-heading text-sm tracking-widest uppercase">
                {featuredProduct ? "Shopify product live" : "Limited preorder live"}
              </span>
            </div>
            <p className="text-sm text-primary font-heading tracking-widest uppercase mb-2 font-bold">
              Series 1 - "The Eternals"
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
              Collect the first
              <br />
              <span className="text-gradient-gold">STAR ICON.</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
              {featuredDescription}
            </p>
            <div className="flex flex-wrap gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
              <Link
                to={featuredProduct ? `/products/${featuredProduct.node.handle}` : "/icon/001"}
                className="bg-gradient-gold px-5 sm:px-6 py-2.5 rounded font-heading text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:opacity-90"
              >
                {featuredProduct ? "Shop Product" : "Preorder Now"}
              </Link>
              <a
                href="#coming-soon"
                className="bg-background text-primary border border-primary px-5 sm:px-6 py-2.5 rounded font-heading text-sm font-semibold tracking-wider transition-all hover:opacity-90"
              >
                {collectionProducts.length > 0 ? "Browse Collection" : "See Mystery Lineup"}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-primary font-heading tracking-wider justify-center md:justify-start">
              <span>Limited run</span>
              <span>Gold details</span>
              <span>Blindbox unboxing</span>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-xl overflow-hidden bg-card border border-primary/50 glow-gold"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <span className="font-heading text-sm font-bold text-foreground tracking-wider">
                Featured Character
              </span>
              <span className="font-heading text-lg font-bold text-primary">{featuredPrice}</span>
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img src={featuredImage} alt={featuredTitle} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-foreground tracking-wide mb-3">
                {featuredProduct ? featuredTitle : 'ICON #001 - "Gold Striker"'}
              </h3>

              {featuredProduct ? (
                <Link
                  to={`/products/${featuredProduct.node.handle}`}
                  className="inline-flex w-full items-center justify-center bg-gradient-gold px-4 py-2 rounded font-heading text-xs font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90 whitespace-nowrap mb-3"
                >
                  View Details
                </Link>
              ) : submitted ? (
                <div className="text-center py-3">
                  <p className="text-primary font-heading text-sm font-bold">You're on the list!</p>
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
                {featuredProduct?.node.description ||
                  "Sport-hero silhouette with gold accents. Blindbox packaging, collector card, and stand. Ships when preorder window closes."}
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-3 text-center">
                {featuredProduct
                  ? "Live product data powered by Shopify"
                  : "No spam - only launch and shipping updates"}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div id="coming-soon">
          <p className="text-sm text-primary font-heading tracking-widest uppercase mb-2 font-bold text-center">
            Series 1 - "The Eternals"
          </p>
          <h3 className="text-center text-xl sm:text-2xl font-heading font-bold text-muted-foreground mb-6 sm:mb-8">
            {collectionProducts.length > 0 ? "SHOPIFY COLLECTION" : "COMING SOON"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 max-w-6xl mx-auto">
            {(collectionProducts.length > 0 ? collectionProducts : comingSoonBoxes).map((box, i) => {
              const isProduct = "node" in box;
              const image = isProduct ? box.node.images.edges[0]?.node.url ?? silhouette1 : box.image;
              const title = isProduct ? box.node.title : box.name;

              return (
                <motion.div
                  key={isProduct ? box.node.id : box.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-lg overflow-hidden bg-card border border-border ${
                    isProduct ? "" : "opacity-60"
                  }`}
                >
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-heading font-bold text-muted-foreground tracking-wider">
                      {isProduct ? "LIVE" : "SOON"}
                    </span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className={`h-full w-full object-cover ${isProduct ? "" : "grayscale"}`}
                    />
                  </div>
                  <div className="p-2 sm:p-4 text-center">
                    {isProduct ? (
                      <Link
                        to={`/products/${box.node.handle}`}
                        className="font-heading text-xs sm:text-base font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {title}
                      </Link>
                    ) : (
                      <h3 className="font-heading text-xs sm:text-base font-bold text-muted-foreground">
                        {title}
                      </h3>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoxes;

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { PRODUCTS_QUERY, ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";
import StorefrontStatusBanner from "@/components/StorefrontStatusBanner";

const fallbackCharacters = [
  { id: 1, name: "Gold Striker", image: silhouette1, available: true, handle: "001", price: "$59" },
  { id: 2, name: "Mystery Character #2", image: silhouette2, available: false, handle: null, price: null },
  { id: 3, name: "Mystery Character #3", image: silhouette3, available: false, handle: null, price: null },
  { id: 4, name: "Mystery Character #4", image: silhouette4, available: false, handle: null, price: null },
  { id: 5, name: "Mystery Character #5", image: silhouette5, available: false, handle: null, price: null },
  { id: 6, name: "Mystery Character #6", image: silhouette6, available: false, handle: null, price: null },
];

const Shop = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12 });
        setProducts(data?.data?.products?.edges ?? []);
      } catch (error) {
        console.error("Failed to fetch Shopify products:", error);
      }
    };

    void fetchProducts();
  }, []);

  const items =
    products.length > 0
      ? products.map((product, index) => {
          const variant = product.node.variants.edges[0]?.node;

          return {
            id: index + 1,
            name: product.node.title,
            image: product.node.images.edges[0]?.node.url ?? silhouette1,
            available: Boolean(variant?.availableForSale),
            handle: product.node.handle,
            price: variant ? `$${parseFloat(variant.price.amount).toFixed(2)}` : null,
          };
        })
      : fallbackCharacters;

  useEffect(() => {
    setCurrent((prev) => (prev >= items.length ? 0 : prev));
  }, [items.length]);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const character = items[current];

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
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto mb-8">
            <StorefrontStatusBanner hasProducts={products.length > 0} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-sm text-primary font-heading tracking-widest uppercase mb-2 font-bold">
              Series 1 - "The Eternals"
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
              {products.length > 0 ? (
                <>
                  SHOP THE <span className="text-gradient-gold">COLLECTION</span>
                </>
              ) : (
                <>
                  THE <span className="text-gradient-gold">ETERNALS</span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base px-2">
              {products.length > 0
                ? "Live products are loading from your Shopify store. Swipe through the lineup below."
                : "Six premium blindbox collectibles - each one a mystery until you open the box. Swipe through the lineup below."}
            </p>
          </motion.div>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-primary/50 glow-gold bg-card">
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={character.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div
                      className={`aspect-[3/4] overflow-hidden ${
                        !character.available ? "grayscale opacity-60" : ""
                      }`}
                    >
                      <img src={character.image} alt={character.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4 sm:p-5 text-center">
                      <p className="text-xs text-primary font-heading tracking-widest uppercase mb-1">
                        {products.length > 0
                          ? character.available
                            ? "AVAILABLE NOW"
                            : "SOLD OUT"
                          : `ICON #${String(character.id).padStart(3, "0")}`}
                      </p>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground tracking-wide mb-2">
                        {products.length > 0 || !character.available ? character.name : `"${character.name}"`}
                      </h3>
                      {character.available ? (
                        <Link
                          to={character.handle ? `/products/${character.handle}` : "/icon/001"}
                          className="inline-block bg-gradient-gold px-5 sm:px-6 py-2.5 rounded font-heading text-sm font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90"
                        >
                          {products.length > 0 ? `View Product - ${character.price}` : "Join Preorder List"}
                        </Link>
                      ) : (
                        <span className="inline-block bg-muted px-4 py-2 rounded text-xs font-heading font-bold text-muted-foreground tracking-wider">
                          {products.length > 0 ? "UNAVAILABLE" : "COMING SOON"}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {items.map((item, i) => (
                <button
                  key={item.id}
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

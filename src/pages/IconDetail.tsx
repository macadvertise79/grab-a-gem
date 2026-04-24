import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import silhouette1 from "@/assets/silhouette-1.png";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  ShopifyProduct,
  storefrontApiRequest,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import MarketingSignupForm from "@/components/MarketingSignupForm";
import StorefrontStatusBanner from "@/components/StorefrontStatusBanner";

const IconDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (handle) {
          const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
          const foundProduct = data?.data?.productByHandle;
          if (foundProduct) {
            setProduct({ node: foundProduct });
          }
          return;
        }

        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 10 });
        const products: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        setProduct(products[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const result = await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });

    if (result.success) {
      toast.success("Added to cart!", {
        description: product.node.title,
        position: "top-center",
      });
      return;
    }

    toast.error("Couldn't add this item to the cart", {
      description: result.message ?? "Shopify did not accept the request.",
      position: "top-center",
    });
  };

  const productImage = product?.node.images.edges[0]?.node.url ?? silhouette1;
  const productTitle = product?.node.title ?? "ICON #001";
  const productDesc =
    product?.node.description ||
    "The inaugural Star Icons collectible - a premium blindbox-style sport figure featuring a dynamic striker silhouette with gold accents. Each box includes a collector card and display stand.";
  const variant = product?.node.variants.edges[0]?.node;
  const price = variant ? `$${parseFloat(variant.price.amount).toFixed(2)}` : "$29.99";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-8">
            <StorefrontStatusBanner hasProducts={Boolean(product)} />
          </div>
          <Link
            to="/#boxes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden border border-primary/50 glow-gold"
            >
              <div className="aspect-[3/4] overflow-hidden bg-background/40 p-4 sm:p-6">
                <img src={productImage} alt={productTitle} className="h-full w-full object-contain object-center" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-heading text-xs tracking-widest uppercase">
                  {product ? "Shopify product live" : "Storefront placeholder"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-2">
                {product ? productTitle : "No live Shopify product yet"}
              </h1>
              <h2 className="text-2xl font-heading font-bold text-gradient-gold mb-6">
                {product ? "Storefront product" : "Join the preorder list while the catalog is being published"}
              </h2>

              <p className="text-2xl font-heading font-bold text-primary mb-6">{price}</p>

              <p className="text-muted-foreground leading-relaxed mb-6">{productDesc}</p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>Limited production run - once sold out, it&apos;s gone</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>Gold foil detail accents on figure and packaging</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>Blindbox unboxing experience with collector card</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  <span>Secure checkout handled by Shopify</span>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : product ? (
                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading || !variant?.availableForSale}
                  className="w-full bg-gradient-gold px-6 py-3 rounded font-heading text-sm font-bold tracking-wider text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {cartLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `Add to Cart - ${price}`
                  )}
                </button>
              ) : (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <p className="text-primary font-heading text-sm font-bold text-center">Preorder updates</p>
                  <p className="text-muted-foreground text-xs mt-1 mb-4 text-center">
                    This route is a placeholder until a live Shopify product is published.
                  </p>
                  <MarketingSignupForm
                    buttonLabel="Notify Me"
                    placeholder="Email preorders"
                    successMessage="You're on the list! We'll notify you when the product goes live."
                    className="max-w-none"
                    inputClassName="bg-background"
                  />
                </div>
              )}
              <p className="text-[10px] text-muted-foreground/60 text-center mt-3">
                Secure checkout powered by Shopify
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IconDetail;

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SHOPIFY_CONFIG_STATUS } from "@/lib/shopify";

interface StorefrontStatusBannerProps {
  hasProducts: boolean;
}

const StorefrontStatusBanner = ({ hasProducts }: StorefrontStatusBannerProps) => {
  if (!SHOPIFY_CONFIG_STATUS.isConfigured || hasProducts) {
    return null;
  }

  return (
    <Alert className="border-primary/40 bg-card/70">
      <AlertTitle>Shopify is connected, but the storefront is empty</AlertTitle>
      <AlertDescription>
        The site can reach your Shopify Storefront API, but there are no published products available
        to render yet. Publish products to the sales channel to enable live shopping and checkout.
      </AlertDescription>
    </Alert>
  );
};

export default StorefrontStatusBanner;

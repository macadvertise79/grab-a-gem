import { useState } from "react";
import { subscribeToPreorders } from "@/lib/shopify";
import { cn } from "@/lib/utils";

interface MarketingSignupFormProps {
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  successMessage?: string;
}

const MarketingSignupForm = ({
  buttonLabel = "Sign Up",
  className,
  inputClassName,
  placeholder = "Enter your email",
  successMessage = "You're on the list!",
}: MarketingSignupFormProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await subscribeToPreorders(email.trim());
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe marketing email:", error);
      setSubmitError("We couldn't save your email just now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <p className="text-sm text-primary font-medium">{successMessage}</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={cn("flex w-full max-w-md gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 min-w-0 bg-transparent border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary rounded",
            inputClassName
          )}
          disabled={isSubmitting}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-4 py-2.5 text-sm font-heading font-semibold tracking-wider hover:opacity-90 transition-opacity shrink-0 rounded"
        >
          {isSubmitting ? "Saving..." : buttonLabel}
        </button>
      </form>
      {submitError ? <p className="mt-2 text-[11px] text-destructive">{submitError}</p> : null}
    </>
  );
};

export default MarketingSignupForm;

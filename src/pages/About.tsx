import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-28 pb-16">
        <h1 className="font-heading text-3xl font-bold tracking-widest text-gradient-gold mb-8">
          ABOUT US
        </h1>
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Star Icons brings you collectible mystery boxes and figures from your favorite franchises.
            We curate premium, limited-edition items so every unboxing feels special.
          </p>
          <p className="leading-relaxed">
            Our mission is to connect fans with high-quality merchandise and memorable unboxing experiences.
            Whether you're building your collection or hunting for that one rare piece, we're here to make it fun and rewarding.
          </p>
          <p className="leading-relaxed">
            Thank you for being part of the Star Icons community. We can't wait to see what you discover in your next box.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

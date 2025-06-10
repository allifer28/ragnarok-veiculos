import Hero from "@/components/hero"
import FeaturedCarsSafe from "@/components/featured-cars-safe"
import AboutSection from "@/components/about-section"
import InstagramFeed from "@/components/instagram-feed"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCarsSafe />
      <AboutSection />
      <InstagramFeed />
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Entre em Contato</h2>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

import Hero from "@/components/hero"
import FeaturedCarsSafe from "@/components/featured-cars-safe"
import AboutSection from "@/components/about-section"
import InstagramFeed from "@/components/instagram-feed"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import ScrollReveal from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Car, Newspaper, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Seção de Serviços */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Oferecemos uma experiência completa para você encontrar o veículo perfeito.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1} width="100%">
              <div className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Car className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Compra e Venda</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Encontre o carro dos seus sonhos ou venda o seu com as melhores condições do mercado.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/catalogo">
                    Ver Catálogo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} width="100%">
              <div className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Newspaper className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Blog Automotivo</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Fique por dentro das últimas novidades, dicas e tendências do mundo automotivo.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/blog">
                    Ler Artigos
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} width="100%">
              <div className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <MessageSquare className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Atendimento</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Equipe especializada para te ajudar em todas as etapas da compra ou venda do seu veículo.
                </p>
                <Button asChild variant="outline" className="w-full group">
                  <Link href="/contato">
                    Fale Conosco
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FeaturedCarsSafe />
      <AboutSection />
      <InstagramFeed />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Entre em Contato</h2>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}

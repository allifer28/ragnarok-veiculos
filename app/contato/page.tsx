import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Entre em Contato</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Endereço</h3>
                <p className="text-muted-foreground">
                  Av. dos Automóveis, 1234
                  <br />
                  Bairro Motorista, São Paulo - SP
                  <br />
                  CEP: 01234-567
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Telefone</h3>
                <p className="text-muted-foreground">(11) 5555-5555</p>
                <p className="text-muted-foreground">(11) 98765-4321 (WhatsApp)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">E-mail</h3>
                <p className="text-muted-foreground">contato@ragnarokveiculos.com.br</p>
                <p className="text-muted-foreground">vendas@ragnarokveiculos.com.br</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Horário de Funcionamento</h3>
                <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                <p className="text-muted-foreground">Sábado: 9h às 15h</p>
                <p className="text-muted-foreground">Domingo: Fechado</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden h-64 border border-border">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Mapa de Localização</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  )
}

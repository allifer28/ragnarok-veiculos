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
                  Av. Duque de Caxias, 5161
                  <br />
                  Vila São Caetano, Londrina - PR
                  <br />
                  CEP: 86025-140
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Telefone e Whatsapp </h3>
              <p className="text-muted-foreground">(43) 98867-4226 </p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">E-mail</h3>
                <p className="text-muted-foreground">ragnarokveiculos@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Horário de Funcionamento</h3>
                <p className="text-muted-foreground">Segunda a Sexta: 8:30 às 18h</p>
                <p className="text-muted-foreground">Sábado: 8:30 às 13h</p>
                <p className="text-muted-foreground">Domingo: Fechado</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden h-64 border border-border">
                <iframe
                  title="Mapa de Localização"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.989781567611!2d-51.1686029!3d-23.3052268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb436c249cd20b%3A0xd91462c1df7b8888!2sAv.%20Duque%20de%20Caxias%2C%205161%20-%20Vila%20S%C3%A3o%20Caetano%2C%20Londrina%20-%20PR%2C%2086025-140!5e0!3m2!1spt-BR!2sbr!4v1716851621623!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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

import Image from "next/image"
import Footer from "@/components/footer"

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sobre a Ragnarok Veículos</h1>

        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src="https://lh3.googleusercontent.com/p/AF1QipOCr2KOQDJKypCLWpW7a-MgoPgmZ9fi4m411jTC=s680-w680-h510-rw"
            alt="Equipe Ragnarok Veículos"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg">
            Fundada em 2023, a Ragnarok Veículos nasceu com a missão de revolucionar o mercado automotivo, oferecendo
            veículos de qualidade com transparência e excelência no atendimento.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Nossa Missão</h2>
          <p>
            Proporcionar a melhor experiência na compra de veículos, com atendimento personalizado e veículos
            criteriosamente selecionados para garantir a satisfação total de nossos clientes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Nossos Valores</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Transparência em todas as negociações</li>
            <li>Compromisso com a qualidade dos veículos</li>
            <li>Excelência no atendimento ao cliente</li>
            <li>Responsabilidade socioambiental</li>
            <li>Inovação constante em nossos processos</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Por que escolher a Ragnarok Veículos?</h2>
          <p>
            Na Ragnarok Veículos, cada veículo passa por uma rigorosa inspeção técnica antes de ser disponibilizado para
            venda. Oferecemos garantia em todos os nossos veículos e facilitamos o financiamento com as melhores taxas
            do mercado.
          </p>
          <p>
            Nossa equipe é formada por profissionais apaixonados por carros e comprometidos em encontrar o veículo
            perfeito para você, respeitando seu orçamento e necessidades.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

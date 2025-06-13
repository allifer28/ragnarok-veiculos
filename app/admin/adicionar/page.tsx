import AdminHeader from "@/components/admin/admin-header"
import CarFormProduction from "@/components/admin/car-form-production"

export default function AdicionarCarroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-6">Adicionar Novo Veículo</h1>
        <CarFormProduction />
      </div>
    </div>
  )
}

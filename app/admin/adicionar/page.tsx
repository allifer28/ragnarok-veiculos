import AdminHeader from "@/components/admin/admin-header"
import CarForm from "@/components/admin/car-form"

export default function AdicionarCarroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-6">Adicionar Novo Veículo</h1>
        <CarForm />
      </div>
    </div>
  )
}

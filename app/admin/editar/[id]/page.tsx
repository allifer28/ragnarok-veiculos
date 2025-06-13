import AdminHeader from "@/components/admin/admin-header"
import CarFormProduction from "@/components/admin/car-form-production"
import { getCar } from "@/lib/data"

export default async function EditarCarroPage({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminHeader />

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-6">Editar Veículo</h1>
        {car ? (
          <CarFormProduction initialData={car} />
        ) : (
          <div className="p-4 border border-destructive text-destructive rounded-md">Veículo não encontrado</div>
        )}
      </div>
    </div>
  )
}

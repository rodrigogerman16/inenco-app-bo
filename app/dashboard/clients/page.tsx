import { getAllClients } from "@/lib/database"
import ClientsManager from "@/components/clients-manager"

export default async function ClientsPage() {
  const clients = await getAllClients()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <p className="text-gray-600">Gestiona la información de tus clientes</p>
      </div>

      <ClientsManager initialClients={clients} />
    </div>
  )
}

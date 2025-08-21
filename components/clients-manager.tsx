"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Mail, Phone, Building } from "lucide-react"
import ClientForm from "./client-form"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import { deleteClientAction } from "@/app/actions/clients"
import type { Client } from "@/lib/database"

interface ClientsManagerProps {
  initialClients: Client[]
}

export default function ClientsManager({ initialClients }: ClientsManagerProps) {
  const [clients, setClients] = useState(initialClients)
  const [editingClient, setEditingClient] = useState<Client | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    setIsEditFormOpen(false)
    setEditingClient(undefined)
    // Refresh the page to get updated data
    window.location.reload()
  }

  const handleDelete = async (id: string) => {
    const result = await deleteClientAction(id)
    if (result.success) {
      setClients(clients.filter((client) => client.id !== id))
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsEditFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Creado: {new Date(client.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DeleteConfirmDialog
                    onConfirm={() => handleDelete(client.id)}
                    title="Eliminar Cliente"
                    description="¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer."
                  >
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DeleteConfirmDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{client.phone}</span>
                  </div>
                )}
                {client.company && (
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{client.company}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <ClientForm client={editingClient} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

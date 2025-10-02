"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import ClientForm from "./client-form"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import { getClientsAction, deleteClientAction } from "@/app/actions/clients"
import type { Client } from "@/lib/database"
import Image from "next/image"

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    setLoading(true)
    const data = await getClientsAction()
    setClients(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await deleteClientAction(id)
    loadClients()
  }

  function handleEdit(client: Client) {
    setSelectedClient(client)
    setIsDialogOpen(true)
  }

  function handleSuccess() {
    setIsDialogOpen(false)
    setSelectedClient(null)
    loadClients()
  }

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedClient(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedClient ? "Editar" : "Crear"} Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm client={selectedClient || undefined} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <div className="relative h-24 mb-2 flex items-center justify-center">
                <Image
                  src={client.image || "/placeholder.svg"}
                  alt={client.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <CardTitle className="text-lg text-center">{client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteConfirmDialog onConfirm={() => handleDelete(client.id)}>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clients.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No hay clientes. Crea uno para comenzar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

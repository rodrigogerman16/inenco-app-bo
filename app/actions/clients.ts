"use server"

import { revalidatePath } from "next/cache"
import { getAllClients, createClient, updateClient, deleteClient } from "@/lib/database"
import type { Client } from "@/lib/database"

export async function getClientsAction(): Promise<Client[]> {
  try {
    console.log("🔄 Action: Getting all clients...")
    const clients = await getAllClients()
    console.log(`✅ Action: Retrieved ${clients.length} clients`)
    return clients
  } catch (error) {
    console.error("❌ Action: Error getting clients:", error)
    return []
  }
}

export async function createClientAction(prevState: any, formData: FormData) {
  try {
    console.log("🔄 Action: Creating client...")

    const name = formData.get("name")?.toString()
    const category = formData.get("category")?.toString()

    if (!name || !category) {
      return { error: "Nombre y categoría son requeridos" }
    }

    const clientData = {
      name: name.trim(),
      category: category.trim(),
    }

    const newClient = await createClient(clientData)
    console.log(`✅ Action: Created client with ID ${newClient.id}`)

    revalidatePath("/dashboard/clients")
    revalidatePath("/")

    return { success: true, message: "Cliente creado exitosamente", client: newClient }
  } catch (error) {
    console.error("❌ Action: Error creating client:", error)
    return { error: "Error al crear el cliente" }
  }
}

export async function updateClientAction(id: string, prevState: any, formData: FormData) {
  try {
    console.log(`🔄 Action: Updating client ${id}...`)

    const name = formData.get("name")?.toString()
    const category = formData.get("category")?.toString()

    if (!name || !category) {
      return { error: "Nombre y categoría son requeridos" }
    }

    const updateData = {
      name: name.trim(),
      category: category.trim(),
    }

    const updatedClient = await updateClient(id, updateData)
    console.log(`✅ Action: Updated client with ID ${id}`)

    revalidatePath("/dashboard/clients")
    revalidatePath("/")

    return { success: true, message: "Cliente actualizado exitosamente", client: updatedClient }
  } catch (error) {
    console.error("❌ Action: Error updating client:", error)
    return { error: "Error al actualizar el cliente" }
  }
}

export async function deleteClientAction(id: string) {
  try {
    console.log(`🔄 Action: Deleting client ${id}...`)

    await deleteClient(id)
    console.log(`✅ Action: Deleted client with ID ${id}`)

    revalidatePath("/dashboard/clients")
    revalidatePath("/")

    return { success: true, message: "Cliente eliminado exitosamente" }
  } catch (error) {
    console.error("❌ Action: Error deleting client:", error)
    return { error: "Error al eliminar el cliente" }
  }
}

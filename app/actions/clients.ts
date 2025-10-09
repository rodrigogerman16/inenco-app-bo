"use server"

import { revalidatePath } from "next/cache"
import { getClients, getClientById, createClient, updateClient, deleteClient, type Client } from "@/lib/mockDatabase"

export async function getClientsAction(): Promise<Client[]> {
  try {
    const clients = await getClients()
    return clients
  } catch (error) {
    console.error("❌ Error getting clients:", error)
    return []
  }
}

export async function getClientByIdAction(id: string): Promise<Client | null> {
  try {
    return await getClientById(id)
  } catch (error) {
    console.error("❌ Error getting client by id:", error)
    return null
  }
}

export async function createClientAction(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name")?.toString()
    const image = formData.get("image")?.toString()

    if (!name || !image) {
      return { error: "Nombre e imagen son requeridos" }
    }

    await createClient({
      name,
      image,
    })

    revalidatePath("/")
    revalidatePath("/dashboard/clients")

    return { success: true }
  } catch (error) {
    console.error("❌ Error creating client:", error)
    return { error: "Error al crear el cliente" }
  }
}

export async function updateClientAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id")?.toString()
    const name = formData.get("name")?.toString()
    const image = formData.get("image")?.toString()

    if (!id || !name || !image) {
      return { error: "Todos los campos son requeridos" }
    }

    await updateClient(id, {
      name,
      image,
    })

    revalidatePath("/")
    revalidatePath("/dashboard/clients")

    return { success: true }
  } catch (error) {
    console.error("❌ Error updating client:", error)
    return { error: "Error al actualizar el cliente" }
  }
}

export async function deleteClientAction(id: string) {
  try {
    await deleteClient(id)
    revalidatePath("/")
    revalidatePath("/dashboard/clients")
    return { success: true }
  } catch (error) {
    console.error("❌ Error deleting client:", error)
    return { error: "Error al eliminar el cliente" }
  }
}

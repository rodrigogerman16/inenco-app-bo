"use server"

import { revalidatePath } from "next/cache"
import { createClient, updateClient, deleteClient, getAllClients } from "@/lib/database"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/admin")
  }
  return session
}

export async function getClientsAction() {
  await requireAuth()
  return await getAllClients()
}

export async function createClientAction(prevState: any, formData: FormData) {
  await requireAuth()

  const name = formData.get("name")?.toString()
  const email = formData.get("email")?.toString()
  const phone = formData.get("phone")?.toString()
  const company = formData.get("company")?.toString()

  if (!name || !email) {
    return { error: "Nombre y email son requeridos" }
  }

  try {
    await createClient({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
    })

    revalidatePath("/dashboard/clients")
    return { success: "Cliente creado exitosamente" }
  } catch (error) {
    console.error("Error creating client:", error)
    return { error: "Error al crear el cliente" }
  }
}

export async function updateClientAction(prevState: any, formData: FormData) {
  await requireAuth()

  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  const email = formData.get("email")?.toString()
  const phone = formData.get("phone")?.toString()
  const company = formData.get("company")?.toString()

  if (!id || !name || !email) {
    return { error: "ID, nombre y email son requeridos" }
  }

  try {
    const updated = await updateClient(id, {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
    })

    if (!updated) {
      return { error: "Cliente no encontrado" }
    }

    revalidatePath("/dashboard/clients")
    return { success: "Cliente actualizado exitosamente" }
  } catch (error) {
    console.error("Error updating client:", error)
    return { error: "Error al actualizar el cliente" }
  }
}

export async function deleteClientAction(id: string) {
  await requireAuth()

  try {
    const deleted = await deleteClient(id)
    if (!deleted) {
      return { error: "Cliente no encontrado" }
    }

    revalidatePath("/dashboard/clients")
    return { success: "Cliente eliminado exitosamente" }
  } catch (error) {
    console.error("Error deleting client:", error)
    return { error: "Error al eliminar el cliente" }
  }
}

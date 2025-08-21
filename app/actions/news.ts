"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { createNews, updateNews, deleteNews, getAllNews } from "@/lib/database"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/admin")
  }
  return session
}

export async function getNewsAction() {
  await requireAuth()
  const news = await getAllNews()
  console.log("🔍 getNewsAction - Retrieved news:", news.length, "items")
  return news
}

export async function createNewsAction(prevState: any, formData: FormData) {
  console.log("🚀 Starting createNewsAction...")
  await requireAuth()

  const title = formData.get("title")?.toString()
  const shortDescription = formData.get("shortDescription")?.toString()
  const fullDescription = formData.get("fullDescription")?.toString()
  const date = formData.get("date")?.toString()
  const image = formData.get("image")?.toString()

  console.log("📝 Form data received:", {
    title,
    shortDescription: shortDescription?.substring(0, 50) + "...",
    fullDescription: fullDescription?.substring(0, 50) + "...",
    date,
    image,
  })

  if (!title || !shortDescription || !fullDescription || !date) {
    console.log("❌ Validation failed - missing required fields")
    return { error: "Todos los campos son requeridos" }
  }

  try {
    const newNews = await createNews({
      title,
      shortDescription,
      fullDescription,
      date,
      image: image || "/placeholder.svg?height=300&width=500&text=News",
    })

    console.log("✅ News created successfully in action:", newNews.id)

    // Comprehensive cache invalidation
    console.log("🔄 Revalidating paths and tags...")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/")
    revalidatePath("/api/news")
    revalidateTag("news")
    console.log("✅ All paths and tags revalidated")

    return { success: "Noticia creada exitosamente", newsId: newNews.id }
  } catch (error) {
    console.error("❌ Error creating news:", error)
    return { error: "Error al crear la noticia" }
  }
}

export async function updateNewsAction(prevState: any, formData: FormData) {
  console.log("🔄 Starting updateNewsAction...")
  await requireAuth()

  const id = formData.get("id")?.toString()
  const title = formData.get("title")?.toString()
  const shortDescription = formData.get("shortDescription")?.toString()
  const fullDescription = formData.get("fullDescription")?.toString()
  const date = formData.get("date")?.toString()
  const image = formData.get("image")?.toString()

  if (!id || !title || !shortDescription || !fullDescription || !date) {
    return { error: "Todos los campos son requeridos" }
  }

  try {
    const updated = await updateNews(id, {
      title,
      shortDescription,
      fullDescription,
      date,
      image,
    })

    if (!updated) {
      return { error: "Noticia no encontrada" }
    }

    // Comprehensive cache invalidation
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/")
    revalidatePath("/api/news")
    revalidateTag("news")

    return { success: "Noticia actualizada exitosamente" }
  } catch (error) {
    console.error("Error updating news:", error)
    return { error: "Error al actualizar la noticia" }
  }
}

export async function deleteNewsAction(id: string) {
  console.log("🗑️ Starting deleteNewsAction for ID:", id)
  await requireAuth()

  try {
    const deleted = await deleteNews(id)
    if (!deleted) {
      return { error: "Noticia no encontrada" }
    }

    // Comprehensive cache invalidation
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/")
    revalidatePath("/api/news")
    revalidateTag("news")

    return { success: "Noticia eliminada exitosamente" }
  } catch (error) {
    console.error("Error deleting news:", error)
    return { error: "Error al eliminar la noticia" }
  }
}

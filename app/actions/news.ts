"use server"

import { revalidatePath } from "next/cache"
import { createNews, updateNews, deleteNews, getAllNews } from "@/lib/database"
import type { NewsItem } from "@/lib/database"

export async function getNewsAction(): Promise<NewsItem[]> {
  try {
    console.log("🔄 Action: Getting all news...")
    const news = await getAllNews()
    console.log(`✅ Action: Retrieved ${news.length} news items`)
    return news
  } catch (error) {
    console.error("❌ Action: Error getting news:", error)
    return []
  }
}

export async function createNewsAction(prevState: any, formData: FormData) {
  try {
    console.log("🔄 Action: Creating news...")

    if (!formData) {
      console.error("❌ Action: FormData is null")
      return { error: "Datos del formulario no válidos" }
    }

    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()
    const date = formData.get("date")?.toString()

    console.log("🔄 Action: Form data received:", { title, shortDescription, content, image, date })

    if (!title || !shortDescription || !content || !date) {
      console.error("❌ Action: Missing required fields")
      return { error: "Todos los campos requeridos deben ser completados" }
    }

    const newsData = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      image: image?.trim() || "/placeholder.svg?height=300&width=500&text=Noticia",
      date: date.trim(),
    }

    const newNews = await createNews(newsData)
    console.log(`✅ Action: Created news with ID ${newNews.id}`)

    // Revalidate all relevant paths
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/api/news")

    return { success: true, message: "Noticia creada exitosamente", news: newNews }
  } catch (error) {
    console.error("❌ Action: Error creating news:", error)
    return { error: "Error al crear la noticia" }
  }
}

export async function updateNewsAction(id: string, prevState: any, formData: FormData) {
  try {
    console.log(`🔄 Action: Updating news ${id}...`)

    if (!formData) {
      console.error("❌ Action: FormData is null")
      return { error: "Datos del formulario no válidos" }
    }

    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()
    const date = formData.get("date")?.toString()

    console.log("🔄 Action: Form data received:", { title, shortDescription, content, image, date })

    if (!title || !shortDescription || !content || !date) {
      console.error("❌ Action: Missing required fields")
      return { error: "Todos los campos requeridos deben ser completados" }
    }

    const updateData = {
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      image: image?.trim() || "/placeholder.svg?height=300&width=500&text=Noticia",
      date: date.trim(),
    }

    const updatedNews = await updateNews(id, updateData)
    console.log(`✅ Action: Updated news with ID ${id}`)

    // Revalidate all relevant paths
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/api/news")

    return { success: true, message: "Noticia actualizada exitosamente", news: updatedNews }
  } catch (error) {
    console.error("❌ Action: Error updating news:", error)
    return { error: "Error al actualizar la noticia" }
  }
}

export async function deleteNewsAction(id: string) {
  try {
    console.log(`🔄 Action: Deleting news ${id}...`)

    await deleteNews(id)
    console.log(`✅ Action: Deleted news with ID ${id}`)

    // Revalidate all relevant paths
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/news")
    revalidatePath("/api/news")

    return { success: true, message: "Noticia eliminada exitosamente" }
  } catch (error) {
    console.error("❌ Action: Error deleting news:", error)
    return { error: "Error al eliminar la noticia" }
  }
}

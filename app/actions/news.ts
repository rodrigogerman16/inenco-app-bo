"use server"

import { revalidatePath } from "next/cache"
import { getNews, getNewsById, createNews, updateNews, deleteNews, type NewsItem } from "@/lib/database"

export async function getNewsAction(): Promise<NewsItem[]> {
  try {
    const news = await getNews()
    return news
  } catch (error) {
    console.error("❌ Error getting news:", error)
    return []
  }
}

export async function getNewsByIdAction(id: string): Promise<NewsItem | null> {
  try {
    return await getNewsById(id)
  } catch (error) {
    console.error("❌ Error getting news by id:", error)
    return null
  }
}

export async function createNewsAction(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()

    if (!title || !shortDescription || !content || !image) {
      return { error: "Todos los campos son requeridos" }
    }

    await createNews({
      title,
      shortDescription,
      content,
      image,
    })

    revalidatePath("/")
    revalidatePath("/dashboard/news")

    return { success: true }
  } catch (error) {
    console.error("❌ Error creating news:", error)
    return { error: "Error al crear la noticia" }
  }
}

export async function updateNewsAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id")?.toString()
    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()

    if (!id || !title || !shortDescription || !content || !image) {
      return { error: "Todos los campos son requeridos" }
    }

    await updateNews(id, {
      title,
      shortDescription,
      content,
      image,
    })

    revalidatePath("/")
    revalidatePath("/dashboard/news")

    return { success: true }
  } catch (error) {
    console.error("❌ Error updating news:", error)
    return { error: "Error al actualizar la noticia" }
  }
}

export async function deleteNewsAction(id: string) {
  try {
    await deleteNews(id)
    revalidatePath("/")
    revalidatePath("/dashboard/news")
    return { success: true }
  } catch (error) {
    console.error("❌ Error deleting news:", error)
    return { error: "Error al eliminar la noticia" }
  }
}

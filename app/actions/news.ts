"use server"

import { revalidatePath } from "next/cache"
import { getNews, createNews, updateNews, deleteNews } from "@/lib/news"
import type { NewsItem } from "@/lib/mockDatabase"

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

// CREATE NEWS
export async function createNewsAction(formData: FormData) {
  try {
    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()

    console.log("🧾 [createNewsAction] received form data:", {
      title,
      shortDescription,
      content,
      image,
    })

    if (!title || !shortDescription || !content || !image) {
      return { error: "Todos los campos son requeridos" }
    }

    // Supabase function expects the arguments in order
    const result = await createNews(title, shortDescription, content, image)
    console.log("✅ [createNewsAction] created news:", result)

    revalidatePath("/")
    revalidatePath("/dashboard/news")

    return { success: true, data: result }
  } catch (error) {
    console.error("❌ [createNewsAction] Error creating news:", error)
    return { error: "Error al crear la noticia" }
  }
}

// UPDATE NEWS
export async function updateNewsAction(formData: FormData) {
  try {
    const id = formData.get("id")?.toString()
    const title = formData.get("title")?.toString()
    const shortDescription = formData.get("shortDescription")?.toString()
    const content = formData.get("content")?.toString()
    const image = formData.get("image")?.toString()

    console.log("🧾 [updateNewsAction] received form data:", {
      id,
      title,
      shortDescription,
      content,
      image,
    })

    if (!id || !title || !shortDescription || !content || !image) {
      return { error: "Todos los campos son requeridos" }
    }

    const result = await updateNews(id, {
      title,
      shortDescription,
      content,
      image,
    })
    console.log("✅ [updateNewsAction] updated news:", result)

    revalidatePath("/")
    revalidatePath("/dashboard/news")

    return { success: true, data: result }
  } catch (error) {
    console.error("❌ [updateNewsAction] Error updating news:", error)
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

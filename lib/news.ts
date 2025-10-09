import { supabase } from "@/lib/supabaseClient"
import type { NewsItem } from "@/lib/mockDatabase"

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data as NewsItem[]
}

export async function createNews(
  title: string,
  shortDescription: string,
  content: string,
  image?: string
) {
  const { data, error } = await supabase
    .from("news")
    .insert([{ 
      title, 
      image, 
      short_description: shortDescription,
      content 
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateNews(
  id: string,
  updates: Partial<Pick<NewsItem, "title" | "shortDescription" | "content" | "image">>
): Promise<NewsItem> {
  const { data, error } = await supabase
    .from("news")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as NewsItem
}

export async function deleteNews(id: string): Promise<boolean> {
  const { error } = await supabase.from("news").delete().eq("id", id)
  if (error) throw new Error(error.message)
  return true
}

/**
 * Uploads an image to Supabase Storage and returns the public URL.
 * Make sure your bucket name matches what's in your Supabase project.
 */
export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`
  const bucket = "news-images" // ✅ Use a dedicated bucket

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true })

  if (error || !data?.path) {
    console.error("Upload error:", error)
    return null
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return publicUrl?.publicUrl ?? null
}

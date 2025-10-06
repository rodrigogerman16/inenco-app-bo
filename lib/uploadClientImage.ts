import { supabase } from "@/lib/supabaseClient"

export async function uploadClientImage(file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `clients/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from("clients")
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from("clients").getPublicUrl(filePath)
  return data.publicUrl
}
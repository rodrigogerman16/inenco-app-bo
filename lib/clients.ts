import { supabase } from "@/lib/supabaseClient";

export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createClient(name: string, image?: string) {
  const { data, error } = await supabase
    .from("clients")
    .insert([{ name, image }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateClient(
  id: string,
  updates: Partial<{ name: string; image: string }>
) {
  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .select("*")
    .maybeSingle(); 

  if (error) throw error;
  return data;
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) throw error;
  return true;
}

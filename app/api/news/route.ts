import { NextResponse } from "next/server"
import { getAllNews } from "@/lib/database"

export async function GET() {
  try {
    console.log("🔄 API: Getting all news...")
    const news = await getAllNews()
    console.log(`✅ API: Retrieved ${news.length} news items`)

    return NextResponse.json(news, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("❌ API: Error getting news:", error)
    return NextResponse.json({ error: "Error al obtener las noticias" }, { status: 500 })
  }
}

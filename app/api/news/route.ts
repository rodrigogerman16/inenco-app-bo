import { NextResponse } from "next/server"
import { getAllNews } from "@/lib/database"

export async function GET() {
  try {
    console.log("🔄 API: Fetching all news...")
    const news = await getAllNews()
    console.log(`✅ API: Retrieved ${news.length} news items`)

    return NextResponse.json(news, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("❌ API: Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

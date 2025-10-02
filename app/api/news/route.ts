import { NextResponse } from "next/server"
import { getNews } from "@/lib/database"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("📡 API: Fetching news...")
    const news = await getNews()
    console.log(`📡 API: Found ${news.length} news items`)

    return NextResponse.json(news, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("❌ API: Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

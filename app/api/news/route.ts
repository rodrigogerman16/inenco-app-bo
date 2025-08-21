import { NextResponse } from "next/server"
import { getAllNews } from "@/lib/database"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    console.log("🔍 API Route: Fetching all news...")
    const news = await getAllNews()
    console.log("📰 API Route: Retrieved news items:", news.length)
    console.log(
      "📋 API Route: News IDs and titles:",
      news.map((n) => ({ id: n.id, title: n.title })),
    )

    return NextResponse.json(news, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("❌ API Route: Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

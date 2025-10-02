import { NextResponse } from "next/server"
import { getClients } from "@/lib/database"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    console.log("📡 API: Fetching clients...")
    const clients = await getClients()
    console.log(`📡 API: Found ${clients.length} clients`)

    return NextResponse.json(clients, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("❌ API: Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

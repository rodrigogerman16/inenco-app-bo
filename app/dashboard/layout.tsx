import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader email={session.email} />
        <main className="flex-1 bg-muted/20">{children}</main>
      </div>
    </div>
  )
}

import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}

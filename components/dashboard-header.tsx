"use client"

import { Button } from "@/components/ui/button"
import { logoutAction } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <form action={logoutAction}>
          <Button variant="outline" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </form>
      </div>
    </header>
  )
}

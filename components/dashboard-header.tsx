"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logoutAction } from "@/app/actions/auth"

export default function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
        </div>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </form>
      </div>
    </header>
  )
}

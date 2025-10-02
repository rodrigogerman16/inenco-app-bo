"use client"

import { logoutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

interface DashboardHeaderProps {
  email: string
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-6 justify-between">
        <div>
          <h2 className="text-lg font-semibold">Panel de Administración</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span className="text-muted-foreground">{email}</span>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}

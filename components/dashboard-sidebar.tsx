"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FileText, Users, Settings } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Noticias", href: "/dashboard", icon: FileText },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Soluciones", href: "/dashboard/solutions", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">INENCO Admin</h2>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors",
                pathname === item.href ? "bg-gray-800 border-r-2 border-blue-500" : "",
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

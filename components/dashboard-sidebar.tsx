"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Newspaper, Users } from "lucide-react"

const navigation = [
  { name: "Noticias", href: "/dashboard/news", icon: Newspaper },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-muted/40">
      <nav className="space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

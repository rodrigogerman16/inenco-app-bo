"use client"

import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { type Client, getAllClients } from "@/lib/database"

// Import necessary components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function ClientsSection() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1 })
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await getAllClients()
        setClients(clientsData)
      } catch (error) {
        console.error("Error fetching clients:", error)
        // Fallback to default clients if there's an error
        setClients([
          { id: "1", name: "Client A", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
          { id: "2", name: "Client B", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
          { id: "3", name: "Client C", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
          { id: "4", name: "Client D", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
          { id: "5", name: "Client E", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
          { id: "6", name: "Client F", logo: "/placeholder-logo.svg", createdAt: "", updatedAt: "" },
        ])
      }
    }

    fetchClients()
  }, [])

  // Group clients alphabetically for dropdown
  const groupedClients = clients.reduce(
    (acc, client) => {
      const firstLetter = client.name.charAt(0).toUpperCase()
      if (firstLetter >= "A" && firstLetter <= "F") {
        acc["A-F"].push(client)
      } else if (firstLetter >= "G" && firstLetter <= "L") {
        acc["G-L"].push(client)
      } else if (firstLetter >= "M" && firstLetter <= "R") {
        acc["M-R"].push(client)
      } else {
        acc["S-Z"].push(client)
      }
      return acc
    },
    { "A-F": [] as Client[], "G-L": [] as Client[], "M-R": [] as Client[], "S-Z": [] as Client[] },
  )

  return (
    <section id="clientes" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 text-center">
        <div
          ref={ref}
          className={`space-y-4`}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
            Nuestros Clientes
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto dark:text-gray-400">
            La confianza de nuestros clientes es nuestro mayor aval. Trabajamos con empresas líderes en diversos
            sectores.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
          {clients.slice(0, 6).map((client, index) => (
            <div
              key={client.id}
              className={`flex items-center justify-center`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                alt={client.name}
                className="w-32 h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                height="80"
                src={client.logo || "/placeholder.svg"}
                style={{
                  aspectRatio: "120/80",
                  objectFit: "contain",
                }}
                width="120"
              />
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto dark:text-gray-400">
          Estos son algunos de nuestros Clientes
        </p>
        <div className="mt-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-8 py-4 text-lg bg-transparent">
                Ver lista completa de clientes
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nuestra Lista de Clientes</DialogTitle>
                <DialogDescription>
                  Explora la lista completa de nuestros valiosos clientes por rango alfabético.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {Object.entries(groupedClients).map(([range, rangeClients]) => (
                  <DropdownMenu key={range}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        {range} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                      {rangeClients.length > 0 ? (
                        rangeClients.map((client) => <DropdownMenuItem key={client.id}>{client.name}</DropdownMenuItem>)
                      ) : (
                        <DropdownMenuItem disabled>No hay clientes en este rango</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

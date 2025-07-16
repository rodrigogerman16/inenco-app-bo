"use client"

import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import Image from "next/image"

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
  const clients = [
    { name: "Client A", logo: "/placeholder-logo.svg" },
    { name: "Client B", logo: "/placeholder-logo.svg" },
    { name: "Client C", logo: "/placeholder-logo.svg" },
    { name: "Client D", logo: "/placeholder-logo.svg" },
    { name: "Client E", logo: "/placeholder-logo.svg" },
    { name: "Client F", logo: "/placeholder-logo.svg" },
  ]
  return (
    <section id="clientes" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 text-center">
        <div
          ref={ref}
          className={`space-y-4 transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
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
          {clients.map((client, index) => (
            <div
              key={index}
              className={`flex items-center justify-center transition-all duration-700 ease-out ${
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      A - F <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem>Cliente Alpha</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Beta</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Gamma</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      G - L <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem>Cliente Delta</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Epsilon</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Zeta</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      M - R <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem>Cliente Eta</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Theta</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Iota</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-transparent">
                      S - Z <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem>Cliente Kappa</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Lambda</DropdownMenuItem>
                    <DropdownMenuItem>Cliente Mu</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

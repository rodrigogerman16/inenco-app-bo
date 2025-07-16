"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react" // Importing Lucide React icons
import Image from "next/image" // Import Image component

export default function Header() {
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/#productos", label: "Productos" },
    { href: "/#clientes", label: "Clientes" },
    { href: "/#contacto", label: "Contacto" },
    { href: "/#novedades", label: "Novedades" },
  ]

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white/80 backdrop-blur-md dark:bg-gray-950/80 shadow-sm justify-between">
      {/* New wrapper for logo and desktop navigation */}
      <div className="flex items-center flex-1 md:justify-around">
        <Link className="flex items-center" href="/">
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
          <span className="sr-only">InencoApp</span>
        </Link>
        <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-auto md:hidden bg-transparent" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link className="mb-4 flex items-center" href="/">
            <Image
              src="/placeholder-logo.svg"
              alt="Company Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="sr-only">InencoApp</span>
          </Link>
          <nav className="grid gap-2 py-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="flex w-full items-center py-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

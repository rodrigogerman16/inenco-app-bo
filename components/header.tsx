"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon, ChevronDown, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/#productos", label: "Productos" },
    { href: "/#clientes", label: "Clientes" },
    { href: "/#novedades", label: "Novedades" },
  ]

  const solucionesLinks = [
    { href: "/sinco", label: "SINCO" },
    { href: "/actuaplus", label: "ACTUAPLUS" },
    { href: "/gesop", label: "GESOP" },
    { href: "/kukflot", label: "KUKFLOT" },
    { href: "/i-sam", label: "I-SAM" },
  ]

  return (
    <header className="fixed top-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white/80 backdrop-blur-md dark:bg-gray-950/80 shadow-sm justify-between">
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
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors">
              Soluciones
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                isDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              {solucionesLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-teal-600 dark:hover:text-teal-400 transition-colors first:rounded-t-md last:rounded-b-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
              key={"contacto"}
              className="text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              href={"/#contacto"}
            >
              {"Contacto"}
            </Link>
        </nav>
      </div>

      {/* Admin Login Button */}
      <div className="hidden md:block">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="bg-white">
            <User className="h-4 w-4 mr-2" />
            Entrar
          </Button>
        </Link>
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
            <div className="py-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Soluciones</span>
              <div className="ml-4 mt-2 space-y-2">
                {solucionesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-1 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/admin"
                className="flex items-center py-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

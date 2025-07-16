"use client"

import Link from "next/link"
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react" // Importing Lucide React icons
import Image from "next/image" // Import Image component

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-800 text-gray-300 dark:bg-gray-950">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <Link className="flex items-center" href="/">
            <Image src="/placeholder-logo.svg" alt="Company Logo" width={150} height={50} className="h-10 w-auto" />
            <span className="sr-only">InencoApp</span>
          </Link>
          <p className="text-sm">
            Soluciones tecnológicas que impulsan su negocio hacia el futuro. Innovación, eficiencia y soporte
            garantizado.
          </p>
          <div className="flex space-x-4">
            <Link aria-label="Facebook" href="#">
              <FacebookIcon className="h-6 w-6 hover:text-white transition-colors" />
            </Link>
            <Link aria-label="Twitter" href="#">
              <TwitterIcon className="h-6 w-6 hover:text-white transition-colors" />
            </Link>
            <Link aria-label="LinkedIn" href="#">
              <LinkedinIcon className="h-6 w-6 hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contacto</h3>
          <div className="space-y-2 text-sm">
            <p>Av. Corrientes 1234, CABA, Argentina</p>
            <p>Email: info@inencoapp.com</p>
            <p>Teléfono: +54 11 1234 5678</p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
        <p>&copy; 2024 InencoApp. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

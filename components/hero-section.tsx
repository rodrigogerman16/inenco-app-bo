"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

export default function HeroSection() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.1 })
  return (
    <section
      ref={ref}
      className={`relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden`}
    >
      <Image
        src="/placeholder.jpg" // Use a relevant background image
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/70 to-blue-800/70 dark:from-teal-800/70 dark:to-blue-950/70 z-10" />
      <div className="relative z-20 text-white space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
          Transformando Su Negocio con Tecnología
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-md">
          Soluciones de software y hardware a medida para impulsar su innovación y eficiencia.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/servicios">
            <Button className="px-8 py-3 text-lg bg-teal-600 hover:bg-teal-700 transition-colors duration-300">
              Nuestros Servicios
            </Button>
          </Link>
          <Link href="/#contacto">
            <Button
              className="px-8 py-3 text-lg border border-white text-white hover:bg-white hover:text-teal-600 transition-colors duration-300 bg-transparent"
              variant="outline"
            >
              Contáctenos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

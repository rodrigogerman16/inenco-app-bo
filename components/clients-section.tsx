"use client"

import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import Image from "next/image"

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
      </div>
    </section>
  )
}

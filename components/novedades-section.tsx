"use client"

import { CardContent, Card } from "@/components/ui/card"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Image from "next/image"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

export default function NovedadesSection() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ threshold: 0.1 })

  const notices = [
    {
      title: "Innovación en Soluciones Cloud para Empresas",
      date: "15 de Julio, 2024",
      summary:
        "Descubra cómo nuestras nuevas herramientas basadas en la nube están revolucionando la gestión de datos y la colaboración en equipos remotos. Adaptamos la tecnología para impulsar su negocio hacia el futuro.",
      image: "/placeholder.svg?text=Notice+1",
    },
    {
      title: "Seguridad Cibernética: Protegiendo sus Activos Digitales",
      date: "10 de Julio, 2024",
      summary:
        "En un mundo digital cada vez más complejo, la seguridad es primordial. Conozca nuestras estrategias avanzadas de ciberseguridad para proteger su información valiosa de amenazas emergentes.",
      image: "/placeholder.svg?text=Notice+2",
    },
    {
      title: "Inteligencia Artificial para la Optimización de Procesos",
      date: "05 de Julio, 2024",
      summary:
        "La IA ya no es futuro, es presente. Le mostramos cómo integrar soluciones de inteligencia artificial para automatizar tareas, analizar grandes volúmenes de datos y tomar decisiones más inteligentes en tiempo real.",
      image: "/placeholder.svg?text=Notice+3",
    },
    {
      title: "Transformación Digital en el Sector Financiero",
      date: "01 de Julio, 2024",
      summary:
        "Casos de éxito y lecciones aprendidas de la implementación de tecnología de punta en instituciones financieras. Prepárese para los desafíos y oportunidades de la banca digital.",
      image: "/placeholder.svg?text=Notice+4",
    },
    {
      title: "Desarrollo Sostenible a Través de la Tecnología Verde",
      date: "28 de Junio, 2024",
      summary:
        "Explore cómo la tecnología puede ser una aliada en la sostenibilidad. Desde la eficiencia energética en data centers hasta soluciones de monitoreo ambiental, contribuimos a un futuro más verde.",
      image: "/placeholder.svg?text=Notice+5",
    },
  ]

  return (
    <section id="novedades" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ease-out ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Últimas Novedades
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Manténgase informado sobre las últimas tendencias y noticias del sector tecnológico.
            </p>
          </div>
        </div>
        <Carousel
          className="w-full max-w-6xl mx-auto py-12"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {notices.map((notice, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-gray-900">
                  <Image
                    src={notice.image || "/placeholder.svg"}
                    alt={notice.title}
                    width={500}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 line-clamp-2">{notice.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{notice.date}</p>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{notice.summary}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

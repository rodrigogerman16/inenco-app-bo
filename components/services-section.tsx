"use client"

import { CardContent, Card } from "@/components/ui/card"
import { RocketIcon, LinkIcon, UsersIcon } from "lucide-react" // Importing Lucide React icons
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

export default function ServicesSection() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ threshold: 0.1 })

  const services = [
    {
      icon: <RocketIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />,
      title: "Desarrollo de Software a Medida",
      description:
        "Creamos soluciones de software personalizadas que se adaptan precisamente a sus necesidades operativas, mejorando la eficiencia y productividad de su negocio.",
    },
    {
      icon: <LinkIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />,
      title: "Consultoría IT y Estrategia Digital",
      description:
        "Ofrecemos asesoramiento experto para optimizar su infraestructura tecnológica y desarrollar estrategias digitales que impulsen su crecimiento en el mercado actual.",
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />,
      title: "Soporte Técnico y Mantenimiento Continuo",
      description:
        "Garantizamos el funcionamiento óptimo de sus sistemas con soporte técnico proactivo y servicios de mantenimiento, asegurando la continuidad de sus operaciones.",
    },
  ]

  return (
    <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ease-out ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Nuestros Servicios Principales
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Descubra cómo podemos ayudar a transformar su negocio con soluciones tecnológicas de vanguardia.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`flex flex-col items-center justify-center space-y-4 p-6 text-center transition-all duration-700 ease-out hover:shadow-lg dark:bg-gray-900 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }} // Stagger animation
            >
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-700">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

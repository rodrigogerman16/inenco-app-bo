import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RocketIcon, LinkIcon, UsersIcon } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: RocketIcon,
      title: "Plataforma de Gestión de Cobranzas",
      description:
        "Nuestra plataforma integral te permite automatizar y optimizar todo el proceso de cobranzas, desde la asignación de carteras hasta la gestión de pagos y reportes.",
      aos: "fade-right",
    },
    {
      icon: LinkIcon,
      title: "Integración con Sistemas Existentes",
      description:
        "Nos adaptamos a tu infraestructura. Nuestra solución se integra fácilmente con tus sistemas actuales (ERP, CRM, etc.) para una transición sin interrupciones.",
      aos: "fade-up",
    },
    {
      icon: UsersIcon,
      title: "Soporte y Capacitación",
      description:
        "Ofrecemos soporte técnico continuo y capacitación personalizada para que tu equipo aproveche al máximo todas las funcionalidades de nuestra plataforma.",
      aos: "fade-left",
    },
  ]

  return (
    <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Nuestros Servicios
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-400">
              Soluciones innovadoras para optimizar tu gestión de cobranzas.
            </p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 text-center hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              data-aos={service.aos}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  CodeIcon,
  GlobeIcon,
  BarChartIcon,
  GraduationCapIcon,
  LightbulbIcon,
  WrenchIcon,
  RefreshCwIcon,
  LifeBuoyIcon,
  SmartphoneIcon,
  ArrowUpIcon,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ServiciosPage() {
  const services = [
    {
      title: "Desarrollo",
      summary:
        "Creamos sistemas a medida que se adaptan a las necesidades específicas de su empresa, desde la concepción hasta la implementación. Nuestro equipo interdisciplinario asegura soluciones tecnológicas que impulsan la evolución de su negocio.",
      icon: CodeIcon, // Icon data still present, but not rendered
      aos: "fade-right",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Desarrollo",
    },
    {
      title: "Desarrollo Web",
      summary:
        "Aproveche el poder de Internet para agilizar operaciones y expandir su alcance. Ofrecemos asesoramiento experto y desarrollo para optimizar su presencia online, incluyendo e-commerce, email marketing y estrategias de redes sociales.",
      icon: GlobeIcon,
      aos: "fade-left",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Desarrollo+Web",
    },
    {
      title: "Business Intelligence",
      summary:
        "Transformamos grandes volúmenes de datos en información valiosa para una toma de decisiones precisa y oportuna. Implementamos soluciones de Data Warehousing y Business Intelligence para consolidar, analizar y presentar sus datos de manera efectiva.",
      icon: BarChartIcon,
      aos: "fade-right",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Business+Intelligence",
    },
    {
      title: "Capacitación",
      summary:
        "Mantenemos a su equipo a la vanguardia tecnológica con programas de capacitación personalizados. Identificamos necesidades, diseñamos planes y dictamos cursos en todas las tecnologías que proveemos, potenciando la ventaja competitiva de su organización.",
      icon: GraduationCapIcon,
      aos: "fade-left",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Capacitacion",
    },
    {
      title: "Consultoría",
      summary:
        "Le asistimos en la planificación, diseño e implementación de su infraestructura de red y componentes tecnológicos. Evaluamos sus sistemas actuales y desarrollamos estrategias para capitalizar la tecnología de IT en nuevas oportunidades de negocio.",
      icon: LightbulbIcon,
      aos: "fade-right",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Consultoria",
    },
    {
      title: "Instalación",
      summary:
        "Nuestra fortaleza es la puesta en marcha de servicios tecnológicos 'llave en mano'. Instalamos su hardware, periféricos y software con la máxima funcionalidad y en el menor tiempo, garantizando un funcionamiento óptimo desde el primer día.",
      icon: WrenchIcon,
      aos: "fade-left",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Instalacion",
    },
    {
      title: "Migración",
      summary:
        "Lo ayudamos a modernizar su empresa actualizando hardware, sistemas operativos o software para obtener el mejor rendimiento. Realizamos migraciones de datos y aplicaciones entre distintas plataformas, con guía experta en los cambios operativos.",
      icon: RefreshCwIcon,
      aos: "fade-right",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Migracion",
    },
    {
      title: "Soporte Técnico",
      summary:
        "Ofrecemos soporte técnico continuo para hardware y software, asegurando la atención constante de nuestros clientes. Asistimos ante consultas o inconvenientes, brindando soluciones rápidas y eficientes en la modalidad que su empresa necesite.",
      icon: LifeBuoyIcon,
      aos: "fade-left",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Soporte+Tecnico",
    },
    {
      title: "Smartphone",
      summary:
        "Aproveche la evolución de los dispositivos móviles para el crecimiento innovador de su empresa. Desde 2010, nuestro equipo se especializa en el desarrollo e implementación de soluciones sobre smartphones, ayudándole a crecer con esta tecnología emergente.",
      icon: SmartphoneIcon,
      aos: "fade-right",
      imageSrc: "/placeholder.svg?height=400&width=800&text=Smartphone",
    },
  ]

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-center overflow-hidden">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Servicios Hero Background"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/70 to-blue-800/70 dark:from-teal-800/70 dark:to-blue-950/70" />
          <div className="relative z-10 container px-4 md:px-6 text-white" data-aos="fade-in" data-aos-duration="1500">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              Nuestros Servicios
            </h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Soluciones tecnológicas innovadoras para impulsar el éxito de su empresa.
            </p>
          </div>
        </section>

        {/* Individual Service Sections */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div key={index}>
                <div
                  className={`relative flex flex-col items-center gap-8 lg:gap-12 p-8 rounded-lg overflow-hidden shadow-xl
                              ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}
                              bg-white dark:bg-gray-800`}
                  data-aos={service.aos}
                >
                  {/* Background Image */}
                  <Image
                    src={service.imageSrc || "/placeholder.svg"}
                    alt={`${service.title} Background`}
                    width={800}
                    height={400}
                    className="absolute inset-0 h-full w-full object-cover opacity-40" // Opacity changed to 40%
                  />
                  {/* Content Overlay to ensure readability */}
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />

                  {/* Removed the icon div */}
                  <div className="relative z-10 flex-1 text-center lg:text-left space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-700 md:text-xl dark:text-gray-300 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                </div>
                {index < services.length - 1 && (
                  <hr className="my-16 border-t border-gray-300 dark:border-gray-700 w-1/2 mx-auto" />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-300 z-50"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
      <Footer />
    </div>
  )
}

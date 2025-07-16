"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowUpIcon,
  CodeIcon,
  GlobeIcon,
  BrainIcon,
  GraduationCapIcon,
  NetworkIcon,
  WrenchIcon,
  RefreshCwIcon,
  SmartphoneIcon,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ServiciosPage() {
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const services = [
    {
      id: "desarrollo",
      title: "Desarrollo",
      summary:
        "Creamos sistemas a medida que se adaptan perfectamente a las necesidades de su empresa, desde la formulación hasta la implementación. Nuestro equipo interdisciplinario garantiza soluciones tecnológicas que sostienen el cambio y la evolución de su negocio.",
      icon: CodeIcon,
      imageSrc: "/placeholder.svg?text=Desarrollo",
    },
    {
      id: "desarrollo-web",
      title: "Desarrollo Web",
      summary:
        "Aproveche el poder de Internet para agilizar operaciones y difundir sus productos. Ofrecemos asesoramiento y soporte para optimizar su presencia online, incluyendo e-fulfillment, e-marketplace, e-payment, diseño web, e-commerce, email marketing y social media.",
      icon: GlobeIcon,
      imageSrc: "/placeholder.svg?text=Desarrollo+Web",
    },
    {
      id: "business-intelligence",
      title: "Business Intelligence",
      summary:
        "Transformamos grandes volúmenes de datos en información precisa y oportuna para la toma de decisiones estratégicas. Aplicamos inteligencia en la creación de estructuras de datos únicas y consolidadas, ofreciendo asesoramiento y servicios en Data Warehousing y Business Intelligence.",
      icon: BrainIcon,
      imageSrc: "/placeholder.svg?text=Business+Intelligence",
    },
    {
      id: "capacitacion",
      title: "Capacitación",
      summary:
        "Impulse la ventaja competitiva de su empresa con la constante capacitación de sus recursos humanos. Nuestro servicio abarca desde la detección de necesidades hasta el dictado de cursos en todas las tecnologías que proveemos, asegurando la evolución tecnológica de su equipo.",
      icon: GraduationCapIcon,
      imageSrc: "/placeholder.svg?text=Capacitación",
    },
    {
      id: "consultoria",
      title: "Consultoría",
      summary:
        "Lo asistimos en la planificación, diseño e instalación de redes y equipamiento. Evaluamos sus redes existentes y desarrollamos estrategias de diseño e implementación para sus necesidades actuales y futuras, capitalizando la tecnología IT en oportunidades de negocio.",
      icon: NetworkIcon,
      imageSrc: "/placeholder.svg?text=Consultoría",
    },
    {
      id: "instalacion",
      title: "Instalación",
      summary:
        "Nuestra fortaleza es la puesta a punto de los servicios tecnológicos. Entregamos desarrollos 'llave en mano' y ponemos en funcionamiento sus sistemas IT con máxima funcionalidad y en el menor tiempo, instalando hardware, periféricos y software con profesionales especialistas.",
      icon: WrenchIcon,
      imageSrc: "/placeholder.svg?text=Instalación",
    },
    {
      id: "migracion",
      title: "Migración",
      summary:
        "Lo ayudamos a actualizar su hardware, sistema operativo o software para lograr las mejores prestaciones. Realizamos la migración de datos y aplicativos entre distintas plataformas, y nuestros profesionales lo guiarán en los cambios operativos necesarios.",
      icon: RefreshCwIcon,
      imageSrc: "/placeholder.svg?text=Migración",
    },
    {
      id: "soporte-tecnico",
      title: "Soporte Técnico",
      summary:
        "Ofrecemos atención constante a nuestros clientes con soporte técnico de hardware y/o software. Lo asistimos ante consultas o inconvenientes, en los tiempos y la modalidad que su empresa necesite, asegurando la continuidad de sus operaciones.",
      icon: WrenchIcon,
      imageSrc: "/placeholder.svg?text=Soporte+Técnico",
    },
    {
      id: "smartphone",
      title: "Smartphone",
      summary:
        "Aproveche la tecnología móvil para el crecimiento de su empresa. Desde 2010, nuestro equipo técnico se capacita en el desarrollo e implementación de soluciones sobre dispositivos smartphone, ayudándolo a satisfacer las nuevas demandas del mercado.",
      icon: SmartphoneIcon,
      imageSrc: "/placeholder.svg?text=Smartphone",
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1200')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/70 to-blue-800/70"></div>
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">Nuestros Servicios</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Soluciones tecnológicas innovadoras para impulsar su negocio.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={service.id}>
              <div
                id={service.id}
                className={`relative flex flex-col lg:flex-row items-center gap-8 md:gap-12 p-8 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 group ${
                  index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:flex-row-reverse"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={service.imageSrc || "/placeholder.svg"}
                  alt={`Background for ${service.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 opacity-40"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

                {/* Content */}
                <div className="relative z-10 flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{service.summary}</p>
                </div>
              </div>
              {index < services.length - 1 && (
                <hr className="my-16 border-t border-gray-300 dark:border-gray-700 w-1/2 mx-auto" />
              )}
            </div>
          ))}
        </section>
      </main>
      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

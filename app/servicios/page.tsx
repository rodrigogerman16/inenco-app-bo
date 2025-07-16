"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useInViewAnimation } from "@/hooks/use-in-view-animation" // Ensure this is imported

export default function ServiciosPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const services = [
    {
      id: "desarrollo",
      title: "Desarrollo",
      summary:
        "Creamos sistemas a medida que se adaptan perfectamente a las necesidades de su empresa, desde la formulación hasta la implementación. Nuestro equipo interdisciplinario asegura la mejor solución tecnológica para su negocio, impulsando la eficiencia y la innovación.",
      imageSrc: "/placeholder.svg?text=Desarrollo",
    },
    {
      id: "desarrollo-web",
      title: "Desarrollo Web",
      summary:
        "Aproveche el poder de Internet para agilizar sus operaciones y difundir sus productos. Ofrecemos asesoramiento y soluciones para e-commerce, e-fulfillment, e-marketplace y e-payment, optimizando su presencia digital con la mejor relación precio/utilidad.",
      imageSrc: "/placeholder.svg?text=Desarrollo+Web",
    },
    {
      id: "business-intelligence",
      title: "Business Intelligence",
      summary:
        "Transformamos grandes volúmenes de datos en información precisa y consolidada para una toma de decisiones estratégica. Nuestra experiencia en Data Warehousing y Business Intelligence le permite aplicar inteligencia a sus datos, aumentando la confianza en cada decisión de negocio.",
      imageSrc: "/placeholder.svg?text=Business+Intelligence",
    },
    {
      id: "capacitacion",
      title: "Capacitación",
      summary:
        "Preparamos a sus recursos humanos para el constante cambio tecnológico. Desde la detección de necesidades hasta el dictado de cursos, nuestro servicio de capacitación asegura que sus recursos humanos evolucionen con la tecnología, manteniendo la ventaja competitiva de su organización.",
      imageSrc: "/placeholder.svg?text=Capacitación",
    },
    {
      id: "consultoria",
      title: "Consultoría",
      summary:
        "Lo asistimos en la planificación, diseño e instalación de redes y equipamiento. Evaluamos sus redes existentes y diseñamos arquitecturas para sus necesidades actuales y futuras, capitalizando la tecnología de IT en oportunidades de negocio para su empresa.",
      imageSrc: "/placeholder.svg?text=Consultoría",
    },
    {
      id: "instalacion",
      title: "Instalación",
      summary:
        'Nuestra fortaleza es la puesta a punto de sus servicios tecnológicos. Entregamos desarrollos "llave en mano" y ponemos en funcionamiento sus sistemas de IT con máxima funcionalidad y en el menor tiempo, con profesionales especialistas en cada producto o sector.',
      imageSrc: "/placeholder.svg?text=Instalación",
    },
    {
      id: "migracion",
      title: "Migración",
      summary:
        "Lo ayudamos a actualizar su hardware, sistema operativo o software para lograr las mejores prestaciones. Realizamos la migración de datos y aplicativos entre distintas plataformas, guiándolo en los cambios operativos necesarios para una transición exitosa.",
      imageSrc: "/placeholder.svg?text=Migración",
    },
    {
      id: "soporte-tecnico",
      title: "Soporte Técnico",
      summary:
        "Nuestros servicios no terminan con la instalación. Ofrecemos soporte técnico constante para hardware y software, asistiéndolo ante consultas o inconvenientes en el tiempo y la modalidad que su empresa necesite, demostrando nuestro interés en la atención continua de nuestros clientes.",
      imageSrc: "/placeholder.svg?text=Soporte+Técnico",
    },
    {
      id: "smartphone",
      title: "Smartphone",
      summary:
        "El mercado móvil es clave para el crecimiento de su empresa. Desde 2010, nuestro equipo técnico se capacita en el desarrollo e implementación de soluciones para smartphones, ayudándole a aprovechar esta tecnología emergente para satisfacer la demanda de su mercado.",
      imageSrc: "/placeholder.svg?text=Smartphone",
    },
  ]

  const serviceAnimations = services.map(() => useInViewAnimation({ threshold: 0.1, unobserveOnEnter: true }))

  useEffect(() => {
    // Hero fade-in effect
    setHeroLoaded(true)

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
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center px-4 transition-opacity duration-1000 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Nuestros+Servicios"
            alt="Servicios Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/70 to-blue-800/70 z-10" />
          <div className="relative z-20 text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Nuestros Servicios</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              Soluciones tecnológicas innovadoras para impulsar su negocio.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            {services.map((service, index) => {
              const { ref, isInView } = serviceAnimations[index]

              return (
                <div key={service.id}>
                  <div
                    id={service.id}
                    ref={ref} // Apply the ref from this specific hook call
                    className={`relative flex flex-col lg:flex-row items-center gap-8 py-12 md:py-16 overflow-hidden
                                transition-all duration-1000 ease-out
                                ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} // Fade-in from center
                  >
                    {/* Background Image for each section */}
                    <Image
                      src={service.imageSrc || "/placeholder.svg"}
                      alt={`${service.title} Background`}
                      layout="fill"
                      objectFit="cover"
                      quality={75}
                      className="absolute inset-0 z-0 opacity-20" // 20% opacity
                    />
                    {/* Content Overlay to ensure readability */}
                    <div className="absolute inset-0 z-10 bg-black/40" /> {/* Darker overlay for text contrast */}
                    {/* Content */}
                    <div className="relative z-20 flex-1 text-center lg:text-left space-y-4 px-6 md:px-12 py-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">{service.title}</h2>
                      <p className="text-lg text-gray-200">{service.summary}</p>
                    </div>
                  </div>
                  {index < services.length - 1 && (
                    <hr className="my-16 border-t border-gray-300 dark:border-gray-700 w-1/2 mx-auto" />
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors z-50"
          size="icon"
        >
          <ArrowUpIcon className="h-6 w-6" />
          <span className="sr-only">Back to top</span>
        </Button>
      )}
      <Footer />
    </div>
  )
}

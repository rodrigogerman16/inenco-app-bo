import SolutionLayout from "@/components/solution-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function GesopPage() {
  const features = [
    "Carga única de datos",
    "Georreferenciación de obras",
    "Control presupuestario",
    "Transparencia en la gestión",
    "Información oportuna para decisiones",
    "Seguimiento de demandas ciudadanas",
    "Redeterminación automática de costos",
  ]

  return (
    <>
      <Header />
      <SolutionLayout
        title="GESOP"
        description="Visión Integral y Gestión ordenada de la Obra Pública.

Ideal para entes públicos (nacionales, provinciales, municipales) que buscan una administración eficiente y transparente de sus proyectos de infraestructura.

Sistema completo que abarca desde la planificación hasta la ejecución y seguimiento de obras públicas."
        features={features}
        imageSrc="/placeholder.svg?height=400&width=600"
        imageAlt="GESOP - Gestión de Obra Pública"
      />
      <Footer />
    </>
  )
}

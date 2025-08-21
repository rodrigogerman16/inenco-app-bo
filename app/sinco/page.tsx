import SolutionLayout from "@/components/solution-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SincoPage() {
  const features = [
    "El manejo del Presupuesto y sus etapas",
    "Los movimientos de fondos que se derivan de la ejecución de ese Presupuesto",
    "Todas aquellas operaciones que implican un manejo de fondos",
    "Herramientas para la Gestión de los Bienes del Estado",
    "Administración de la Deuda Pública",
  ]

  return (
    <>
      <Header />
      <SolutionLayout
        title="SINCO"
        description="A través del registro contable de las actividades del Gobierno, sean éstas presupuestarias o no, logra la construcción de una Plataforma Informativa adecuada para la toma de decisiones y el seguimiento y control de la Gestión de Gobierno.

Es un Sistema integrado, por lo tanto permite contemplar en un mismo entorno todas las operaciones financieras del gobierno.

También provee herramientas para la Gestión de los Bienes del Estado y la administración de la Deuda Pública."
        features={features}
        imageSrc="/placeholder.svg?height=400&width=600"
        imageAlt="SINCO - Sistema de gestión financiera gubernamental"
      />
      <Footer />
    </>
  )
}

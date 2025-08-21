import SolutionLayout from "@/components/solution-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ActuaplusPage() {
  const features = [
    "Actuaciones - Gestión completa de casos",
    "Seguimiento - Control de estados y procesos",
    "Documentos - Generación automática de documentación",
    "Mediaciones - Manejo de procesos de mediación",
    "Recomendaciones - Sistema de recomendaciones",
    "Reportes - Informes detallados y estadísticas",
  ]

  return (
    <>
      <Header />
      <SolutionLayout
        title="ACTUAPLUS"
        description="Permite agilizar las tareas administrativas de un organismo de Defensoría del Pueblo.

Refleja totalmente el flujo de trabajo del organismo, implementando procesos propios y generando automáticamente la documentación necesaria.

Sistema integral que optimiza la gestión de casos y mejora la atención ciudadana."
        features={features}
        imageSrc="/placeholder.svg?height=400&width=600"
        imageAlt="ACTUAPLUS - Sistema para Defensoría del Pueblo"
      />
      <Footer />
    </>
  )
}

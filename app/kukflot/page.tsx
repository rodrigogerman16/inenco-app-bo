import SolutionLayout from "@/components/solution-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function KukflotPage() {
  const features = [
    "Crear planes de mantenimiento personalizados",
    "Registrar y controlar viajes",
    "Control de combustible y gastos",
    "Visualizar datos por centro de costo",
    "Mantenimiento preventivo y correctivo",
    "Gestión de flotas livianas, pesadas y viales",
    "Reportes detallados de rendimiento",
  ]

  return (
    <>
      <Header />
      <SolutionLayout
        title="KUKFLOT"
        description="Gestión eficiente de flotas (livianas, pesadas, viales).

Sistema integral que permite optimizar el uso de vehículos, reducir costos operativos y mejorar la eficiencia del mantenimiento.

Ideal para empresas y organismos públicos que manejan flotas vehiculares de cualquier tamaño."
        features={features}
        imageSrc="/placeholder.svg?height=400&width=600"
        imageAlt="KUKFLOT - Sistema de gestión de flotas"
      />
      <Footer />
    </>
  )
}

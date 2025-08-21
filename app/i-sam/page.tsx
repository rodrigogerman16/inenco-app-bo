import SolutionLayout from "@/components/solution-layout"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function IsamPage() {
  const features = [
    "Gestión de locales y unidades por marca/modelo",
    "Control de compra/venta de vehículos",
    "Seguimiento de pagos y gastos",
    "Modalidades de pago flexibles (señas, anticipos, créditos)",
    "Movimientos de caja detallados",
    "Gestión de proveedores",
    "Control de comisiones y rendiciones",
  ]

  return (
    <>
      <Header />
      <SolutionLayout
        title="I-SAM"
        description="Administración de Agencias de Autos, Motos o Camiones.

Sistema completo para concesionarios que permite gestionar todas las operaciones comerciales y administrativas de manera integrada.

Optimiza la gestión de inventario, ventas, finanzas y relaciones con clientes y proveedores."
        features={features}
        imageSrc="/placeholder.svg?height=400&width=600"
        imageAlt="I-SAM - Sistema para agencias de vehículos"
      />
      <Footer />
    </>
  )
}

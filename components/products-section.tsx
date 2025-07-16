"use client"

import { CardContent, Card, CardFooter } from "@/components/ui/card"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { useTilt } from "@/hooks/use-tilt" // Import the new hook

const products = [
  {
    title: "Hardware",
    description:
      "Ofrecemos soluciones de hardware personalizadas que se ajustan a sus necesidades operativas y presupuesto, optimizando la eficiencia de sus procesos con una inversión inteligente. Gracias a nuestras alianzas estratégicas con fabricantes líderes, garantizamos una excelente relación costo-beneficio en una amplia gama de productos tecnológicos.",
    icons: 4, // Number of placeholder icons
  },
  {
    title: "Software",
    description:
      "Desarrollamos soluciones de software a medida para impulsar la productividad y agilizar los procesos de su empresa. Gracias a nuestras alianzas estratégicas con líderes tecnológicos, ofrecemos licencias y herramientas de vanguardia que se adaptan perfectamente a las necesidades específicas de su negocio.",
    icons: 7, // Number of placeholder icons
  },
]

export default function ProductsSection() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ threshold: 0.1 })
  const tiltData = products.map((_, index) => useTilt({ maxTilt: 5, scale: 1.03 }))

  return (
    <section id="productos" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ease-out ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Nuestros Productos
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore nuestras soluciones de hardware y software diseñadas para su éxito.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          {products.map((product, index) => {
            const { ref: tiltRef, tiltStyle } = tiltData[index] // Get the specific tilt ref and style for this card

            return (
              <Card
                key={index}
                ref={tiltRef} // Attach the tilt ref to the Card
                className={`flex flex-col items-center h-full justify-center space-y-4 p-6 text-center transition-all duration-700 ease-out hover:shadow-lg dark:bg-gray-900 ${
                  sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ ...tiltStyle, transitionDelay: `${index * 100}ms` }} // Apply tilt style and stagger animation
              >
                <CardContent className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{product.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{product.description}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-center gap-2 mt-4">
                  {[...Array(product.icons)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-semibold"
                    >
                      {i + 1}
                    </div>
                  ))}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ProductsSection() {
  const products = [
    {
      title: "Hardware",
      description:
        "Podemos ofrecer la mejor solución en hardware que se adapte no solo a la necesidad planteada, sino también a su presupuesto. Entendemos que las soluciones que el Cliente espera están orientadas a aumentar la eficiencia en sus procesos de negocio tratando de minimizar las inversiones en tecnología para que sean las estrictamente necesarias y suficientes para lograrlo. Contamos con las alianzas necesarias para ofrecer la mejor alternativa precio/performance. Algunas de las líneas de producto de hardware que comercializamos:",
      iconsCount: 4,
      aos: "fade-right",
    },
    {
      title: "Software",
      description:
        "Contar con la plataforma de software adecuada es parte de la solución que su Empresa necesita. Esta plataforma tendrá que ser diseñada para optimizar la productividad y tiempos de respuesta que su negocio requiere para una gestión adecuada. Los acuerdos tecnológicos con empresas de primera línea en el mercado nacional e internacional, nos permiten ofrecer el que mejor se adapte a sus necesidades. Algunas de las Marcas y licencias que comercializamos son:",
      iconsCount: 7,
      aos: "fade-left",
    },
  ]

  return (
    <section id="productos" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Nuestros Productos
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Soluciones tecnológicas a medida para su negocio.
            </p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {products.map((product, index) => (
            <Card
              key={index}
              className="flex flex-col p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              data-aos={product.aos}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                {Array.from({ length: product.iconsCount }).map((_, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="w-12 h-12 rounded-full bg-teal-200 dark:bg-teal-700 flex items-center justify-center text-teal-800 dark:text-teal-200 text-sm font-bold"
                  >
                    Icon {iconIndex + 1}
                  </div>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

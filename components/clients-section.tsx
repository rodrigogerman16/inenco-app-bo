import Image from "next/image"

export default function ClientsSection() {
  const clientLogos = [
    "/placeholder.svg?height=60&width=180",
    "/placeholder.svg?height=60&width=180",
    "/placeholder.svg?height=60&width=180",
    "/placeholder.svg?height=60&width=180",
    "/placeholder.svg?height=60&width=180",
    "/placeholder.svg?height=60&width=180",
  ]

  return (
    <section id="clientes" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Nuestros Clientes
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Confían en nuestras soluciones para optimizar su gestión.
            </p>
          </div>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center"
          data-aos="fade-up"
        >
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt={`Client Logo ${index + 1}`}
                width={180}
                height={60}
                className="object-contain h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

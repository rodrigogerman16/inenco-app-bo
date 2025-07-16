import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="inicio" className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Hero Background"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-10"
        priority
      />
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6" data-aos="fade-up">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            INNOVACIÓN Y EFICIENCIA EN LA GESTIÓN DE COBRANZAS
          </h1>
          <p className="text-lg text-gray-700 md:text-xl dark:text-gray-300">
            Somos una empresa de tecnología que desarrolla soluciones de software para la gestión de cobranzas.
          </p>
          <div className="flex justify-center">
            <Link
              href="#servicios"
              className="inline-flex h-12 items-center justify-center rounded-md bg-teal-600 px-8 text-base font-medium text-white shadow hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 transition-colors"
              prefetch={false}
            >
              Conocé más
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

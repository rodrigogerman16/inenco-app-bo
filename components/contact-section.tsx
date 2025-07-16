import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              Contactanos
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Estamos aquí para responder tus preguntas y ayudarte a encontrar la solución perfecta.
            </p>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6" data-aos="fade-right">
            <form className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Tu email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Tu mensaje" className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Enviar Mensaje
              </Button>
            </form>
          </div>
          <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Información de Contacto</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-teal-600" />
                <span>Av. Corrientes 1234, CABA, Argentina</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-teal-600" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-teal-600" />
                <span>info@inencoapp.com.ar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

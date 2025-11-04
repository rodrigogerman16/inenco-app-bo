"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react" // Importing Lucide React icons


export default function ContactSection() {
  return (
    <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Contáctenos
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto dark:text-gray-400">
              Estamos listos para escuchar sus necesidades y ofrecerle las mejores soluciones.
            </p>
          </div>
        </div>
        <div className="grid max-w-5xl mx-auto gap-8 lg:grid-cols-2 mt-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MailIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              <p className="text-lg text-gray-700 dark:text-gray-300">info@inencoapp.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <PhoneIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              <p className="text-lg text-gray-700 dark:text-gray-300">+54 11 1234 5678</p>
            </div>
            <div className="flex items-start space-x-4">
              <MapPinIcon className="h-6 w-6 text-teal-600 dark:text-teal-400 shrink-0 mt-1" />
              <p className="text-lg text-gray-700 dark:text-gray-300">Av. Corrientes 1234, CABA, Argentina</p>
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Su nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Su email" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" placeholder="Asunto del mensaje" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea className="min-h-[100px]" id="message" placeholder="Su mensaje" />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-300" type="submit">
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

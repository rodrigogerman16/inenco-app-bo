"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import useEmblaCarousel from "embla-carousel-react"
import { useTicker } from "@/components/ui/carousel"

interface Client {
  id: string
  name: string
  image: string | null
  created_at: string
  updated_at: string
}

const clientGroups = {
  "A - C": [],
  "D - H": [],
  "I - N": [],
  "O - Z": [],
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: "start",
  skipSnaps: true,
})

useTicker(emblaApi, 0.5)
const [imagesLoaded, setImagesLoaded] = useState(false)

useEffect(() => {
  fetchClients()
}, [])

useEffect(() => {
  if (emblaApi && imagesLoaded) {
    emblaApi.reInit()
  }
}, [emblaApi, imagesLoaded])

  async function fetchClients() {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error("Error loading clients:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="clientes" className="py-20 bg-muted/50">
        <div className="container m-0 p-0 max-w-full">
          <h2 className="text-4xl font-bold text-center mb-8">Nuestros Clientes</h2>

          {loading ? (
            <div className="text-center">Cargando clientes...</div>
          ) : clients.length === 0 ? (
            <div className="text-center text-gray-500">No clients yet</div>
          ) : (
            <div className="overflow-hidden pointer-events-none" ref={emblaRef}>
              <div className="flex">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.id}-${index}`}
                    className="flex flex-col items-center justify-center min-w-[150px] p-4"
                  >
                    <Image
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover mb-2"
                      onLoad={() => {
                        // 🧩 mark as loaded only when all images are ready
                        if (index === [...clients, ...clients].length - 1) {
                          setImagesLoaded(true)
                        }
                      }}
                    />
                    <span className="font-medium text-center text-sm">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg">
            Ver lista completa
          </Button>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lista Completa de Clientes</DialogTitle>
          </DialogHeader>

          <Accordion type="single" collapsible className="w-full">
            {Object.entries(clientGroups).map(([range]) => {
              const groupClients = clients.filter((c) => {
                const firstLetter = c.name.charAt(0).toUpperCase()
                const [start, end] = range.split(" - ")
                return firstLetter >= start && firstLetter <= end
              })

              return (
                <AccordionItem key={range} value={range}>
                  <AccordionTrigger>{range}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {groupClients.length > 0 ? (
                        groupClients.map((client) => (
                          <div key={client.id} className="p-4 border rounded-lg text-center">
                            <Image
                              src={client.image || "/placeholder.svg"}
                              alt={client.name}
                              width={80}
                              height={80}
                              className="mx-auto mb-2 object-contain"
                            />
                            <p className="font-medium">{client.name}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground col-span-full text-center py-4">
                          No hay clientes en este rango
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </DialogContent>
      </Dialog>
    </>
  )
}

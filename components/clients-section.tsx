"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

interface Client {
  id: string
  name: string
  image: string
}

const clientGroups = {
  "A - C": ["YPF", "Pampa Energía", "Tecpetrol"],
  "D - H": ["Pan American Energy", "Total Austral"],
  "I - N": ["Pluspetrol"],
  "O - Z": [],
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    try {
      const response = await fetch("/api/clients")
      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error("Error fetching clients:", error)
    } finally {
      setLoading(false)
    }
  }

  const displayClients = clients.slice(0, 6)

  return (
    <>
      <section id="clientes" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Nuestros Clientes</h2>
          {loading ? (
            <div className="text-center">Cargando clientes...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
                {displayClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-center p-4 bg-background rounded-lg shadow-sm"
                  >
                    <Image
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-lg mb-4">Estos son algunos de nuestros Clientes</p>
              <div className="text-center">
                <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg">
                  Ver lista completa de clientes
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lista Completa de Clientes</DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(clientGroups).map(([range, defaultClients]) => {
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

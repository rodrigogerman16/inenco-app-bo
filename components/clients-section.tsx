"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { supabase } from '@/lib/supabaseClient';

interface Client {
  id: string;
  name: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const clientGroups = {
  "A - C": [],
  "D - H": [],
  "I - N": [],
  "O - Z": [],
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients()
  }, [])

async function fetchClients() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Supabase data:', data);
    console.log('Supabase error:', error);

    if (error) {
      console.error("Error al buscar Clientes:", error);
      return;
    }

    setClients(data || []);
  } catch (error) {
    console.error("Error inesperado al buscar Clientes:", error);
  } finally {
    setLoading(false);
  }
}

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
                   
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-around p-4 bg-background rounded-lg shadow-sm">
            <span>{client.name}</span>
            <span className="text-sm text-gray-500">
              <Image
        src={client.image || '/placeholder.svg'}
        alt={client.name}
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
            </span>
          </div>
        ))}
        {clients.length === 0 && (
          <li className="p-3 text-gray-500 text-center">No clients yet</li>
        )}
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

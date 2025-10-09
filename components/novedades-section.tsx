"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

interface NewsItem {
  id: string
  title: string
  short_description: string
  content: string
  image: string | null
  created_at: string
  updated_at: string
}

export default function NovedadesSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setNews(data || [])
      } catch (err: any) {
        console.error("Error fetching news:", err)
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  function openModal(item: NewsItem) {
    setSelectedNews(item)
    setIsDialogOpen(true)
  }

  if (loading) {
    return (
      <section id="novedades" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Novedades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="novedades" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Novedades</h2>
          <Card className="border-destructive">
            <CardContent className="p-6 text-center">
              <p className="text-destructive">Error al cargar las novedades: {error}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return (
      <section id="novedades" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Novedades</h2>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No hay novedades disponibles en este momento.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="novedades" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Novedades</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {news.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full transition hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 mb-4">
                        <Image
                          src={item.image || "https://picsum.photos/500"}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{item.short_description}</p>
                    </div>
                    <Button
                      variant="secondary"
                      className="mt-4 w-full"
                      onClick={() => openModal(item)}
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Modal for detailed view */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={selectedNews.image || "https://picsum.photos/600"}
                  alt={selectedNews.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-muted-foreground mb-4">
                {selectedNews.short_description}
              </p>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {selectedNews.content}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

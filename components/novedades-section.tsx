"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface NewsItem {
  id: string
  title: string
  shortDescription: string
  content: string
  image: string
  createdAt: string
}

export default function NovedadesSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        console.log("🔄 NovedadesSection: Fetching news...")
        const response = await fetch("/api/news", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("✅ NovedadesSection: Fetched news:", data)
        setNews(data)
        setError(null)
      } catch (err) {
        console.error("❌ NovedadesSection: Error fetching news:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

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
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.shortDescription}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

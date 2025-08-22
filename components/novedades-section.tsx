"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { NewsItem } from "@/lib/database"

export default function NovedadesSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      console.log("🔄 NovedadesSection: Fetching news...")
      const response = await fetch("/api/news", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ NovedadesSection: Fetched ${data.length} news items`)
      setNews(data)
      setError(null)
    } catch (error) {
      console.error("❌ NovedadesSection: Error fetching news:", error)
      setError("Error al cargar las noticias")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()

    // Auto-refresh every 30 seconds to get latest news
    const interval = setInterval(fetchNews, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <section id="novedades" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Novedades</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente al día con las últimas noticias y actualizaciones
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="novedades" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Novedades</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente al día con las últimas noticias y actualizaciones
            </p>
          </div>
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button onClick={fetchNews} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Reintentar
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return (
      <section id="novedades" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Novedades</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente al día con las últimas noticias y actualizaciones
            </p>
          </div>
          <div className="text-center text-gray-600">
            <p>No hay noticias disponibles en este momento.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="novedades" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Novedades</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente al día con las últimas noticias y actualizaciones
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {news.map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(item.date)}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{item.shortDescription}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Actualizado: {formatDate(item.updatedAt || item.createdAt)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Mostrando {news.length} {news.length === 1 ? "noticia" : "noticias"}
          </p>
        </div>
      </div>
    </section>
  )
}

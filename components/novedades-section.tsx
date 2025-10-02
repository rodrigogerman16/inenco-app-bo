"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { NewsItem } from "@/lib/database"

export default function NovedadesSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("🔄 NovedadesSection: Fetching news...")
        const response = await fetch("/api/news", {
          cache: "no-store",
        })
        const data = await response.json()
        console.log(`✅ NovedadesSection: Fetched ${data.length} news items`)
        setNews(data)
      } catch (error) {
        console.error("❌ NovedadesSection: Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNews, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <section id="novedades" className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Novedades</h2>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return (
      <section id="novedades" className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Novedades</h2>
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">No hay noticias disponibles en este momento</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="novedades" className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Novedades</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {news.map((item) => (
              <CarouselItem key={item.id}>
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.shortDescription}</p>
                      <p className="text-sm leading-relaxed">{item.content}</p>
                    </div>
                  </div>
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

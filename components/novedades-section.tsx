"use client"

import { CardContent, Card } from "@/components/ui/card"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import Image from "next/image"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { useEffect, useState, useCallback } from "react"
import type { NewsItem } from "@/lib/database"

export default function NovedadesSection() {
  const { ref: sectionRef, isInView: sectionInView } = useInViewAnimation({ threshold: 0.1 })
  const [notices, setNotices] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      console.log("🔍 NovedadesSection: Starting to fetch news...")
      setLoading(true)
      setError(null)

      const response = await fetch("/api/news", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const news: NewsItem[] = await response.json()
      console.log("📰 NovedadesSection: Fetched news items:", news.length)
      console.log(
        "📋 NovedadesSection: News details:",
        news.map((n) => ({ id: n.id, title: n.title, date: n.date })),
      )

      // Sort by date (newest first) and take only the latest 5
      const sortedNews = news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

      setNotices(sortedNews)
      console.log("✅ NovedadesSection: Successfully updated notices state with", sortedNews.length, "items")
    } catch (error) {
      console.error("❌ NovedadesSection: Error fetching news:", error)
      setError("Error al cargar las noticias")
      setNotices([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log("🚀 NovedadesSection: Component mounted, fetching initial news...")
    fetchNews()

    // Listen for storage events (when data changes in other tabs)
    const handleStorageChange = () => {
      console.log("📡 NovedadesSection: Storage change detected, refreshing...")
      fetchNews()
    }

    // Listen for custom news update events
    const handleNewsUpdate = () => {
      console.log("📡 NovedadesSection: News update event received, refreshing...")
      setTimeout(fetchNews, 1000) // Wait 1 second to ensure data is saved
    }

    // Listen for page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("👁️ NovedadesSection: Page became visible, refreshing...")
        fetchNews()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("newsUpdated", handleNewsUpdate)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Refresh every 15 seconds
    const interval = setInterval(() => {
      console.log("⏰ NovedadesSection: Periodic refresh...")
      fetchNews()
    }, 15000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("newsUpdated", handleNewsUpdate)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearInterval(interval)
    }
  }, [fetchNews])

  const handleManualRefresh = () => {
    console.log("🔄 NovedadesSection: Manual refresh triggered")
    fetchNews()
  }

  if (loading && notices.length === 0) {
    return (
      <section id="novedades" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Cargando Novedades...
            </h2>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="novedades" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ease-out ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-50">
              Últimas Novedades
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Manténgase informado sobre las últimas tendencias y noticias del sector tecnológico.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span>Mostrando: {notices.length} noticias</span>
              {loading && <span className="animate-pulse text-blue-500">🔄 Actualizando...</span>}
              <button
                onClick={handleManualRefresh}
                className="text-blue-500 hover:text-blue-700 underline transition-colors"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar ahora"}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
                <button onClick={handleManualRefresh} className="ml-2 underline">
                  Reintentar
                </button>
              </div>
            )}
          </div>
        </div>

        {notices.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay novedades disponibles en este momento.</p>
            <p className="text-sm text-gray-400 mt-2">Las noticias creadas en el dashboard aparecerán aquí.</p>
            <button
              onClick={handleManualRefresh}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Recargar Noticias
            </button>
          </div>
        ) : (
          <Carousel
            className="w-full max-w-6xl mx-auto py-12"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {notices.map((notice, index) => (
                <CarouselItem key={`${notice.id}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-gray-900">
                    <Image
                      src={notice.image || "/placeholder.svg?height=300&width=500&text=News"}
                      alt={notice.title}
                      width={500}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 line-clamp-2">{notice.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(notice.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{notice.shortDescription}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>ID: {notice.id}</span>
                        <span>Creado: {new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  )
}

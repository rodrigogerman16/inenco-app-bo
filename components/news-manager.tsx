"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

import NewsForm from "./news-form"
import DeleteConfirmDialog from "./delete-confirm-dialog"
import { getNews, createNews, updateNews, deleteNews } from "@/lib/news"
import type { NewsItem } from "@/lib/mockDatabase"

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    try {
      setLoading(true)
      const data = await getNews()
      setNews(data)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNews(id)
      setNews((prev) => prev.filter((n) => n.id !== id))
    } catch (error) {
      console.error("Error deleting news:", error)
    }
  }

  function handleEdit(item: NewsItem) {
    setSelectedNews(item)
    setIsDialogOpen(true)
  }

  function handleSuccess() {
    setIsDialogOpen(false)
    setSelectedNews(null)
    loadNews()
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Cargando noticias...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Noticias</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedNews(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Noticia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedNews ? "Editar Noticia" : "Nueva Noticia"}</DialogTitle>
            </DialogHeader>
            <NewsForm news={selectedNews || undefined} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Card key={item.id} className="overflow-hidden transition hover:shadow-md">
            <CardHeader className="p-0">
              <div className="relative h-40 w-full">
                <Image
                  src={item.image || "https://picsum.photos/400"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="p-4 text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.shortDescription}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>

                <DeleteConfirmDialog onConfirm={() => handleDelete(item.id)}>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DeleteConfirmDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && !loading && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No hay noticias. Crea una para comenzar.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
